import React, { useRef } from 'react';
import { Avatar, Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.scss';
import { userApi } from '@/service/api/user';
import { uploadResource } from '@/utils/upload';
import Toast from '@/utils/toast';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
        Toast.success('头像更新成功');
        onAvatarChange?.(newAvatarUrl);
      }
    } catch {
      Toast.error('头像更新失败，请重试');
    }
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleGoToSettings = () => {
    navigate('/setting');
  };

  return (
    <div className={styles.profileHeader}>
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
                <span>更换头像</span>
              </div>
            </div>
          ) : (
            <div className={styles.emptyAvatar}>
              <Icon icon="mdi:account" width="32" height="32" color="#CCCCCC" />
              <div className={styles.uploadHint}>
                <Icon icon="mdi:camera" width="14" height="14" />
                <span>上传头像</span>
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
            <div className={styles.statItem}>
              <span className={styles.count}>{statsData.followCount}</span>
              <span className={styles.label}>正在关注</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.count}>{statsData.fansCount}</span>
              <span className={styles.label}>关注者</span>
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
          编辑个人资料
        </Button>
        <Button
          className={styles.settingBtn}
          icon={<Icon icon="mdi:cog" />}
          onClick={handleGoToSettings}
          variant="outline"
        >
          设置
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
