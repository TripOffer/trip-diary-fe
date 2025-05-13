import React, { useEffect, useState } from 'react';
import { Message, Loading } from 'tdesign-mobile-react';
import { useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import ProfileHeader from './components/ProfileHeader';
import ProfileContent from './components/ProfileContent';
import { userApi } from '@/service/api/user';
import { MyUserDetailData } from '@/service/api/user/types';

interface ApiResponse {
  code: number;
  msg: string;
  data: MyUserDetailData;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<MyUserDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 获取用户详情数据
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const result = (await userApi.getMyDetail()) as unknown as ApiResponse;

        if (result && result.code === 0 && result.data) {
          setUserData(result.data);
        } else {
          throw new Error('Invalid response data');
        }
      } catch (error) {
        Message.error({
          content: '获取用户信息失败',
          duration: 2000,
        });
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [location.key]); 
  const handleAvatarChange = (newAvatar: string) => {
    if (userData) {
      setUserData({
        ...userData,
        avatar: newAvatar,
      });
    }
  };

  const headerUserData = userData
    ? {
        name: userData.name,
        userId: String(userData.id),
        avatar: userData.avatar || '',
        bio: userData.bio || '这个人很懒，什么都没留下',
      }
    : null;

  // 构建统计数据
  const statsData = userData
    ? {
        followCount: userData.followingCount || 0,
        fansCount: userData.followersCount || 0,
      }
    : null;

  if (loading) {
    return (
      <div className={`${styles.container} ${styles.loading}`}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 用户信息卡片 */}
        <div className={styles.card}>
          {userData && (
            <ProfileHeader
              userData={headerUserData!}
              statsData={statsData!}
              onAvatarChange={handleAvatarChange}
            />
          )}
        </div>

        {/* 内容展示区 */}
        <div className={styles.card}>
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default Profile;
