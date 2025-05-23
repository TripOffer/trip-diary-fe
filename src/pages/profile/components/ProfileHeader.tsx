import React, { useRef } from 'react';
import { Avatar, Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProfileHeader.module.scss';
import { userApi } from '@/service/api/user';
import { uploadResource } from '@/utils/upload';
import Toast from '@/utils/toast';
import { useAuthStore } from '@/store/auth';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';

interface UserData {
  name: string;
  userId: string;
  avatar: string;
  bio: string;
}

interface StatsData {
  followCount: number;
  fansCount: number;
}

interface ProfileHeaderProps {
  userData: UserData;
  statsData: StatsData;
  onAvatarChange?: (newAvatar: string) => void;
}

const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData, statsData, onAvatarChange }) => {
  const { t } = useTranslation('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const statusBarHeight = getStatusBarHeight();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);

  let avatarUrl = '';
  if (userData.avatar) {
    avatarUrl = userData.avatar.startsWith('http') ? userData.avatar : OSS_PREFIX + userData.avatar;
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // 上传头像到OSS
      const ossObject = await uploadResource(file, 'thumb');
      if (!ossObject || !ossObject.key) {
        throw new Error('OSS上传失败，未返回有效的key');
      }

      // 更新用户头像
      const response = await userApi.updateAvatar({ avatar: ossObject.key });
      if (response && response.data) {
        const newAvatarUrl = OSS_PREFIX + ossObject.key;
        Toast.success(t('avatarUpdateSuccess'));
        onAvatarChange?.(newAvatarUrl);

        // 更新auth store中的用户头像
        if (authUser) {
          setAuthUser({
            ...authUser,
            avatar: ossObject.key,
          });
        }
      }
    } catch {
      Toast.error(t('avatarUpdateFailed'));
    }
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleGoToSettings = () => {
    navigate('/setting');
  };

  // 跳转到关注列表
  const handleGoToFollowingList = () => {
    navigate(`/profile/following`);
  };

  // 跳转到粉丝列表
  const handleGoToFollowersList = () => {
    navigate(`/profile/followers`);
  };

  return (
    <div className={styles.profileHeader} style={{ paddingTop: `${statusBarHeight}px` }}>
      <div className={styles.userInfo}>
        <div className={styles.avatar} onClick={handleAvatarClick}>
          {avatarUrl ? (
            <div className={styles.avatarWrapper}>
              <Avatar
                className={styles.avatarImage}
                shape="circle"
                size="large"
                image={avatarUrl}
                alt={userData.name}
              />
              <div className={styles.changeAvatarHint}>
                <Icon icon="mdi:camera" width="16" height="16" />
                <span>{t('avatarChange')}</span>
              </div>
            </div>
          ) : (
            <div className={styles.emptyAvatar}>
              <Icon icon="mdi:account" width="32" height="32" color="#CCCCCC" />
              <div className={styles.uploadHint}>
                <Icon icon="mdi:camera" width="14" height="14" />
                <span>{t('avatarUpload')}</span>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.userMeta}>
          <div className={styles.nameRow}>
            <h2 className={styles.name}>{userData.name}</h2>
            <span className={styles.userId}>@{userData.userId}</span>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem} onClick={handleGoToFollowingList}>
              <span className={styles.count}>{statsData.followCount}</span>
              <span className={styles.label}>{t('following')}</span>
            </div>
            <div className={styles.statItem} onClick={handleGoToFollowersList}>
              <span className={styles.count}>{statsData.fansCount}</span>
              <span className={styles.label}>{t('followers')}</span>
            </div>
          </div>
          <p className={styles.bio}>{userData.bio}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          className={styles.editBtn}
          icon={<Icon icon="mdi:pencil" />}
          onClick={handleEditProfile}
        >
          {t('edit')}
        </Button>
        <Button
          className={styles.settingBtn}
          icon={<Icon icon="mdi:cog" />}
          onClick={handleGoToSettings}
          variant="outline"
        >
          {t('setting')}
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
