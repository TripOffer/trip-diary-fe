import React from 'react';
import { Icon } from '@iconify/react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import toast from '@/utils/toast';

export interface LikeButtonProps {
  liked: boolean;
  likeCount: number;
  onLikeChange?: (liked: boolean, likeCount: number) => void;
  iconSize?: number;
  disabled?: boolean;
}

const popDotCount = 6;
const popDotDistance = 16;

const LikeButton: React.FC<LikeButtonProps> = ({
  liked,
  likeCount,
  onLikeChange,
  iconSize = 16,
}) => {
  const { token } = useAuthStore();
  const [likedState, setLikedState] = React.useState(liked);
  const [likeNum, setLikeNum] = React.useState(likeCount);
  const controls = useAnimation();
  const [popDots, setPopDots] = React.useState<Array<{ id: number; angle: number }>>([]);
  const [lastLikeNum, setLastLikeNum] = React.useState(likeCount);
  const [likeNumDirection, setLikeNumDirection] = React.useState<'up' | 'down'>('up');

  React.useEffect(() => {
    setLikedState(liked);
  }, [liked]);
  React.useEffect(() => {
    setLikeNum(likeCount);
  }, [likeCount]);

  React.useEffect(() => {
    if (likeNum > lastLikeNum) {
      setLikeNumDirection('up');
    } else if (likeNum < lastLikeNum) {
      setLikeNumDirection('down');
    }
    setLastLikeNum(likeNum);
  }, [likeNum]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) {
      toast.info('请先登录后再点赞');
      return;
    }
    if (likedState) {
      setLikedState(false);
      setLikeNum((n) => Math.max(0, n - 1));
      onLikeChange?.(false, likeNum - 1);
    } else {
      setLikedState(true);
      setLikeNum((n) => n + 1);
      onLikeChange?.(true, likeNum + 1);
      const dots = Array.from({ length: popDotCount }).map((_, i) => ({
        id: Date.now() + i,
        angle: (360 / popDotCount) * i + (Math.random() * 8 - 4),
      }));
      setPopDots(dots);
    }
    await controls.start({ scale: 0.8, transition: { duration: 0.08 } });
    await controls.start({ scale: 1.2, transition: { duration: 0.12 } });
    await controls.start({ scale: 1, transition: { type: 'spring', stiffness: 300, damping: 12 } });
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer select-none relative"
      onClick={handleLikeClick}
      style={{ position: 'relative' }}
    >
      <motion.span
        animate={controls}
        initial={{ scale: 1 }}
        style={{
          width: iconSize,
          height: iconSize,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s',
          zIndex: 3,
          position: 'relative',
        }}
      >
        <AnimatePresence>
          {popDots.map(({ id, angle }) => (
            <motion.span
              key={id}
              initial={{
                scale: 0.7,
                opacity: 0.7,
                x: 0,
                y: 0,
              }}
              animate={{
                scale: 0.4,
                opacity: 0,
                x: Math.cos((angle * Math.PI) / 180) * popDotDistance,
                y: Math.sin((angle * Math.PI) / 180) * popDotDistance,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: -3,
                marginTop: -3,
                zIndex: 2,
                pointerEvents: 'none',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#f43f5e',
              }}
              onAnimationComplete={() => {
                setPopDots((prev) => prev.filter((d) => d.id !== id));
              }}
            />
          ))}
        </AnimatePresence>
        <Icon
          icon={likedState ? 'mdi:heart' : 'mdi:heart-outline'}
          color={likedState ? '#f43f5e' : '#aaa'}
          width={iconSize}
          height={iconSize}
        />
      </motion.span>
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          minWidth: 16,
          height: 20,
          verticalAlign: 'middle',
        }}
      >
        <AnimatePresence initial={false} custom={likeNumDirection}>
          <motion.span
            key={likeNum}
            initial={
              likeNumDirection === 'up'
                ? { y: 6, opacity: 0, scale: 0.92 }
                : { y: -6, opacity: 0, scale: 0.92 }
            }
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={
              likeNumDirection === 'up'
                ? { y: -6, opacity: 0, scale: 0.92 }
                : { y: 6, opacity: 0, scale: 0.92 }
            }
            transition={{ duration: 0.32, ease: [0.4, 0.0, 0.2, 1] }}
            className={likedState ? ' text-rose-500' : ' text-gray-500'}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              textAlign: 'center',
              fontSize: 14,
              zIndex: 3,
              display: 'inline-block',
            }}
          >
            {likeNum}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
};

export default LikeButton;
