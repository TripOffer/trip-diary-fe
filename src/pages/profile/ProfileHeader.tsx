import React from 'react';
import { Avatar, Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import styles from './ProfileHeader.module.scss';

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
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData, statsData }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <Avatar image={userData.avatar || 'default-avatar.png'} />
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
        <Button className={styles.editBtn} icon={<Icon icon="mdi:pencil" />}>
          编辑个人资料
        </Button>
        <Button className={styles.settingsBtn} icon={<Icon icon="mdi:cog" />} />
      </div>
    </div>
  );
};

export default ProfileHeader;
