import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

// 简单的 KeepAliveOutlet：缓存已访问过的页面
const KeepAliveOutlet = () => {
  const location = useLocation();
  const outlet = useOutlet();
  // 用 pathname 作为 key 缓存页面
  const pagesRef = useRef<Record<string, React.ReactNode>>({});

  // 只缓存首页、发布页、我的页面
  const keepAlivePaths = ['/', '/publish', '/profile'];
  const isKeepAlive = keepAlivePaths.includes(location.pathname);

  // 用于触发动画的状态
  const [showAnim, setShowAnim] = useState<'none' | 'enter' | 'exit'>('none');
  const [displayOutlet, setDisplayOutlet] = useState<React.ReactNode>(null);
  const [displayPath, setDisplayPath] = useState<string>('');
  const prevPathRef = useRef(location.pathname);
  const animTimeout = useRef<NodeJS.Timeout | null>(null);

  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  };

  const [routeKey, setRouteKey] = useState(location.pathname);

  useEffect(() => {
    if (!isKeepAlive) {
      setRouteKey(location.pathname);
      // 页面切换时，先播放退出动画
      if (prevPathRef.current !== location.pathname) {
        setShowAnim('exit');
        setDisplayOutlet(outlet);
        setDisplayPath(prevPathRef.current);
        if (animTimeout.current) clearTimeout(animTimeout.current);
        animTimeout.current = setTimeout(() => {
          // 退出动画结束后，切换到新页面并播放进入动画
          setDisplayOutlet(outlet);
          setDisplayPath(location.pathname);
          setShowAnim('enter');
          prevPathRef.current = location.pathname;
          if (animTimeout.current) clearTimeout(animTimeout.current);
          animTimeout.current = setTimeout(() => setShowAnim('none'), 350);
        }, 350);
      } else {
        // 首次加载或刷新
        setDisplayOutlet(outlet);
        setDisplayPath(location.pathname);
        setShowAnim('enter');
        prevPathRef.current = location.pathname;
        if (animTimeout.current) clearTimeout(animTimeout.current);
        animTimeout.current = setTimeout(() => setShowAnim('none'), 350);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isKeepAlive]);

  if (isKeepAlive) {
    pagesRef.current[location.pathname] = outlet;
  }

  return (
    <>
      {Object.entries(pagesRef.current).map(([path, node]) => (
        <div
          key={path}
          style={{ display: path === location.pathname ? 'block' : 'none', height: '100%' }}
        >
          {node}
        </div>
      ))}
      {/* 非缓存页面用 framer-motion 动画包裹 */}
      {!isKeepAlive && (
        <AnimatePresence mode="wait">
          <motion.div
            key={routeKey}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ height: '100%' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default KeepAliveOutlet;
