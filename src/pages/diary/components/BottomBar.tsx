import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import LikeButton from '@/components/LikeButton';
import styles from './BottomBar.module.scss';

interface BottomBarProps {
  likeCount: number;
  starCount: number;
  commentCount: number;
  isLiked: boolean;
  isStarred: boolean;
  onLikeChange?: (liked: boolean) => void;
  onStarChange?: (starred: boolean) => void;
  onCommentClick?: () => void;
  onCommentSubmit?: (content: string) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
  likeCount,
  starCount,
  commentCount,
  isLiked,
  isStarred,
  onLikeChange,
  onStarChange,
  onCommentClick,
  onCommentSubmit,
}) => {
  const [commentText, setCommentText] = useState('');

  const handleStarClick = () => {
    onStarChange?.(!isStarred);
  };

  const handleCommentClick = () => {
    onCommentClick?.();
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onCommentSubmit?.(commentText.trim());
      setCommentText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommentSubmit();
    }
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
        />
      </div>

      <div className={styles.actionButtons}>
        <div className={styles.actionButton}>
          <LikeButton
            liked={isLiked}
            likeCount={likeCount}
            onLikeChange={(liked) => onLikeChange?.(liked)}
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
            {starCount}
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
