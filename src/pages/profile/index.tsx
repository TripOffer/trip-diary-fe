import React from 'react';
import styles from './index.module.scss';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

const Profile: React.FC = () => {
  const userData = {
    name: '用户test',
    userId: '349595329',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  };

  const statsData = {
    followCount: 243,
    fansCount: 19,
    likeCount: 7,
  };

  return (
    <div className={styles.container}>
      {/* 顶部个人信息区 */}
      <ProfileHeader userData={userData} statsData={statsData} />

      {/* 内容区Content */}
      <ProfileContent />
    </div>
  );
};

export default Profile;
