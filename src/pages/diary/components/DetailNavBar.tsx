import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button } from 'tdesign-mobile-react';
import styles from './DetailNavBar.module.scss';

interface DetailNavBarProps {
  title: string;
  showFollow?: boolean;
  isFollowing?: boolean;
  authorId?: string | number;
  onFollowClick?: () => void;
  onShareClick?: () => void;
  onBackClick?: () => void;
}

const DetailNavBar: React.FC<DetailNavBarProps> = ({
  title,
  showFollow = true,
  isFollowing = false,
  onFollowClick,
  onShareClick,
  onBackClick,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const handleFollowClick = () => {
    onFollowClick?.();
  };

  const handleShareClick = () => {
    onShareClick?.();
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.leftSection} onClick={handleBackClick}>
        <Icon icon="mdi:arrow-left" className={styles.backIcon} />
      </div>

      <div className={styles.centerSection}>
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.rightSection}>
        {showFollow && (
          <Button
            className={`${styles.followButton} ${isFollowing ? styles.following : ''}`}
            variant={isFollowing ? 'outline' : 'base'}
            size="small"
            onClick={handleFollowClick}
          >
            {isFollowing ? '已关注' : '关注'}
          </Button>
        )}
        <div className={styles.shareIcon} onClick={handleShareClick}>
          <Icon icon="mdi:share-variant" />
        </div>
      </div>
    </div>
  );
};

export default DetailNavBar;
