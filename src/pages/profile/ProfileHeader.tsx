import React from 'react';
import { Avatar, Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import styles from './ProfileHeader.module.scss';

interface ProfileHeaderProps {
  userData?: {
    name: string;
    userId: string;
    avatar: string;
  };
  statsData?: {
    followCount: number;
    fansCount: number;
    likeCount: number;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userData = {
    name: '用户test',
    userId: '349595329',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  },
  statsData = {
    followCount: 243,
    fansCount: 19,
    likeCount: 7,
  },
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerBg}></div>

      {/* 用户信息部分 */}
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <Avatar size="large" image={userData.avatar} className={styles.avatar} />
          <div className={styles.avatarAddBtn}>
            <Icon icon="material-symbols:add" color="#fff" width="16" />
          </div>
        </div>
        <div className={styles.userName}>{userData.name}</div>
        <div className={styles.userId}>平台账号：{userData.userId}</div>
      </div>

      {/* 数据统计区域和操作按钮在同一行 */}
      <div className={styles.statsAndActions}>
        {/* 数据统计区域 */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{statsData.followCount}</div>
            <div className={styles.statLabel}>关注</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{statsData.fansCount}</div>
            <div className={styles.statLabel}>粉丝</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{statsData.likeCount}</div>
            <div className={styles.statLabel}>获赞与收藏</div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className={styles.actions}>
          <Button variant="outline" shape="round" className={styles.editBtn}>
            编辑资料
          </Button>
          <Button
            icon={<Icon icon="material-symbols:settings-outline" width="20" />}
            shape="circle"
            variant="outline"
            className={styles.settingBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
