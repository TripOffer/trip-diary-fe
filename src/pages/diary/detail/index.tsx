import React, { useState } from 'react';
import { Message } from 'tdesign-mobile-react';
import DetailNavBar from '../components/DetailNavBar';
import BottomBar from '../components/BottomBar';
import CommentPopup from '../components/CommentPopup';
import styles from './index.module.scss';

const DiaryDetailPage: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [likeCount, setLikeCount] = useState(32);
  const [starCount, setStarCount] = useState(20);
  const [commentCount, setCommentCount] = useState(113);
  const [commentPopupVisible, setCommentPopupVisible] = useState(false);

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

  const handleLikeChange = (liked: boolean) => {
    setIsLiked(liked);
    setLikeCount((prev) => (liked ? prev + 1 : Math.max(0, prev - 1)));
    Message.success({
      content: liked ? '已点赞' : '已取消点赞',
      duration: 1000,
    });
  };

  const handleStarChange = (starred: boolean) => {
    setIsStarred(starred);
    setStarCount((prev) => (starred ? prev + 1 : Math.max(0, prev - 1)));
    Message.success({
      content: starred ? '已收藏' : '已取消收藏',
      duration: 1000,
    });
  };

  const handleCommentClick = () => {
    setCommentPopupVisible(true);
  };

  const handleCommentSubmit = (content: string) => {
    Message.success({
      content: '评论成功: ' + content,
      duration: 1000,
    });
    setCommentCount((prev) => prev + 1);
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

        <div className={styles.dummyContent}>
          <h2>我在厦门很想你</h2>
          <p>笔记内容区域...</p>
        </div>
      </div>

      <BottomBar
        likeCount={likeCount}
        starCount={starCount}
        commentCount={commentCount}
        isLiked={isLiked}
        isStarred={isStarred}
        onLikeChange={handleLikeChange}
        onStarChange={handleStarChange}
        onCommentClick={handleCommentClick}
        onCommentSubmit={handleCommentSubmit}
      />

      {/* 评论弹窗 */}
      <CommentPopup visible={commentPopupVisible} onVisibleChange={setCommentPopupVisible} />
    </div>
  );
};

export default DiaryDetailPage;
