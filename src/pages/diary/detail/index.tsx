import React, { useState } from 'react';
import { Message } from 'tdesign-mobile-react';
import DetailNavBar from '@/components/DetailNavBar';
import styles from './index.module.scss';

const DiaryDetailPage: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    Message.success({
      content: isFollowing ? '已取消关注' : '已关注',
      duration: 1000,
    });
  };

  const handleShareClick = () => {
    Message.info({
      content: '分享功能开发中',
      duration: 1000,
    });
  };

  return (
    <div className={styles.container}>
      <DetailNavBar
        title="叁叁拾"
        isFollowing={isFollowing}
        onFollowClick={handleFollowClick}
        onShareClick={handleShareClick}
      />

      <div className={styles.content}>
        {/* 笔记详情的内容-暂时留空 */}
        <div className={styles.placeholder}>笔记详情内容区域</div>
      </div>
    </div>
  );
};

export default DiaryDetailPage;
