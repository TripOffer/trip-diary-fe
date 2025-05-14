import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import styles from './DetailNavBar.module.scss';

interface DetailNavBarProps {
  title: string;
  diaryId?: string | number;
  authorId?: string | number;
  authorAvatar?: string;
  isFollowing?: boolean;
  showFollow?: boolean;
  onFollowClick?: () => void;
  onShareClick?: (diaryId?: string | number) => void;
  onBackClick?: () => void;
}

const DetailNavBar: React.FC<DetailNavBarProps> = ({
  title,
  diaryId,
  authorId,
  authorAvatar,
  isFollowing = false,
  showFollow = true,
  onFollowClick,
  onShareClick,
  onBackClick,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const handleFollow = () => {
    if (onFollowClick) {
      onFollowClick();
    }
  };

  const handleShare = () => {
    if (onShareClick) {
      onShareClick(diaryId);
    }
  };

  const goToUserProfile = () => {
    if (authorId) {
      navigate(`/profile/${authorId}`);
    }
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.leftSection}>
        <div className={styles.backIcon} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" width={24} height={24} />
        </div>
      </div>

      <div className={styles.centerSection} onClick={goToUserProfile}>
        {authorAvatar && (
          <div className={styles.avatarWrapper}>
            <img src={authorAvatar} className={styles.avatar} alt={title} />
          </div>
        )}
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.rightSection}>
        {showFollow && authorId && (
          <div className={styles.followButton} onClick={handleFollow}>
            <Button
              shape="round"
              size="small"
              variant={isFollowing ? 'outline' : 'base'}
              className={isFollowing ? styles.following : ''}
            >
              {isFollowing ? '已关注' : '关注'}
            </Button>
          </div>
        )}
        <div className={styles.shareIcon} onClick={handleShare}>
          <Icon icon="mdi:share-variant-outline" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default DetailNavBar;
