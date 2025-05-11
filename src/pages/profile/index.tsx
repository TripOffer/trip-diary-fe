import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { userApi } from '@/service/api/user';
import { MyUserDetailData } from '@/service/api/user/types';
import { ApiRes } from '@/service/api/shared';
import { Message } from 'tdesign-mobile-react';

interface ApiResponse {
  code: number;
  msg: string;
  data: MyUserDetailData;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<MyUserDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  // 获取用户详情数据
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // 使用类型断言
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
  }, []);

  // 构建传递给ProfileHeader的数据
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
        likeCount: 0, // API返回数据中没有赞的数量，暂时设为0
      }
    : null;

  if (loading) {
    return <div className={styles.container}>加载中...</div>;
  }

  return (
    <div className={styles.container}>
      {/* 顶部个人信息区 */}
      {userData && <ProfileHeader userData={headerUserData!} statsData={statsData!} />}

      {/* 内容区Content */}
      <ProfileContent />
    </div>
  );
};

export default Profile;
