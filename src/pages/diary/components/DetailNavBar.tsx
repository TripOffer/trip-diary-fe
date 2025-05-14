import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './DetailNavBar.module.scss';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';

interface DetailNavBarProps {
  title: string;
  authorId?: string | number;
  authorAvatar?: string;
  isFollowing?: boolean;
  showFollow?: boolean;
  onFollowClick?: () => void;
  onShareClick?: () => void;
  onBackClick?: () => void;
}

const DetailNavBar: React.FC<DetailNavBarProps> = ({
  title,
  authorId,
  authorAvatar,
  isFollowing = false,
  showFollow = true,
  onFollowClick,
  onShareClick,
  onBackClick,
}) => {
  const { t } = useTranslation('diary');
  const navigate = useNavigate();
  const statusBarHeight = getStatusBarHeight();

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
      onShareClick();
    }
  };

  const goToUserProfile = () => {
    if (authorId) {
      navigate(`/profile/${authorId}`);
    }
  };

  return (
    <div
      className={styles.navBar}
      style={{ paddingTop: statusBarHeight, height: statusBarHeight + 60 }}
    >
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
              {isFollowing
                ? t('followed', { ns: 'diary', defaultValue: '已关注' })
                : t('follow', { ns: 'diary', defaultValue: '关注' })}
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
