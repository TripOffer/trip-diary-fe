import React, { useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import LikeButton from '@/components/LikeButton';
import Api from '@/service/api';
import Toast from '@/utils/toast';
import styles from './BottomBar.module.scss';

interface BottomBarProps {
  diaryId: string;
  likeCount: number;
  starCount: number;
  commentCount: number;
  onCommentClick?: () => void;
  onCommentSubmit?: (content: string) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
  diaryId,
  likeCount,
  starCount,
  commentCount,
  onCommentClick,
  onCommentSubmit,
}) => {
  const [commentText, setCommentText] = useState('');
  const [localStarCount, setLocalStarCount] = useState(starCount);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLocalLikeCount(likeCount);
    setLocalStarCount(starCount);
  }, [likeCount, starCount]);

  const handleStarClick = useCallback(async () => {
    try {
      if (isStarred) {
        setLocalStarCount((prev) => Math.max(0, prev - 1));
        setIsStarred(false);
        await Api.diaryApi.unfavoriteDiary(diaryId);
        Toast.success('已取消收藏', { duration: 1000 });
      } else {
        setLocalStarCount((prev) => prev + 1);
        setIsStarred(true);
        await Api.diaryApi.favoriteDiary(diaryId);
        Toast.success('已收藏', { duration: 1000 });
      }
    } catch (error) {
      console.error('收藏操作失败:', error);
      Toast.error('操作失败，请重试');
      setLocalStarCount(isStarred ? Math.max(0, localStarCount - 1) : localStarCount + 1);
      setIsStarred(!isStarred);
    }
  }, [diaryId, isStarred, localStarCount]);

  const handleCommentClick = () => {
    onCommentClick?.();
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || submitting) return;

    setSubmitting(true);

    try {
      await Api.diaryApi.createComment({
        diaryId: diaryId,
        content: commentText.trim(),
      });

      //,清空输入框
      setCommentText('');

      // 通知父组件
      onCommentSubmit?.(commentText.trim());

      Toast.success('评论发布成功', { duration: 1000 });
    } catch (error) {
      console.error('评论发布失败:', error);
      Toast.error('评论发布失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleLikeCountChange = (liked: boolean, newCount: number) => {
    setIsLiked(liked);
    setLocalLikeCount(newCount);
  };

  return (
    <div className={styles.bottomBar}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="说点什么..."
          className={styles.commentInput}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitting}
        />
      </div>

      <div className={styles.actionButtons}>
        <div className={styles.actionButton}>
          <LikeButton
            liked={isLiked}
            likeCount={localLikeCount}
            onLikeChange={handleLikeCountChange}
            iconSize={24}
          />
        </div>

        <div className={styles.actionButton} onClick={handleStarClick}>
          <Icon
            icon={isStarred ? 'mdi:star' : 'mdi:star-outline'}
            className={`${styles.actionIcon} ${isStarred ? styles.starActive : ''}`}
            width="24"
            height="24"
          />
          <span className={`${styles.actionCount} ${isStarred ? styles.starActive : ''}`}>
            {localStarCount}
          </span>
        </div>

        <div className={styles.actionButton} onClick={handleCommentClick}>
          <Icon icon="mdi:comment-outline" className={styles.actionIcon} width="24" height="24" />
          <span className={styles.actionCount}>{commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
