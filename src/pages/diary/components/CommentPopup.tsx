import React, { useState, useEffect, useRef } from 'react';
import { Popup, List, Cell, PullDownRefresh, Avatar, Divider } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { Comment, generateMockComments } from '@/mock/comments';
import styles from './CommentPopup.module.scss';

interface CommentPopupProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ visible, onVisibleChange }) => {
  const [loading, setLoading] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const commentList = useRef<Comment[]>([]);

  // 加载数据
  const loadData = (isRefresh?: boolean) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const temp = generateMockComments(10, isRefresh ? [] : commentList.current);

        if (isRefresh) {
          commentList.current = temp;
        } else {
          commentList.current = [...commentList.current, ...temp];
        }

        setLoading('');
        setRefreshing(false);
        resolve();
      }, 1000);
    });
  };

  const onLoadMore = (isRefresh?: boolean) => {
    if ((commentList.current.length >= 50 && !isRefresh) || loading) {
      return;
    }
    setLoading('loading');
    loadData(isRefresh);
  };

  const onScroll = (scrollBottom: number) => {
    if (scrollBottom < 50) {
      onLoadMore();
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    onLoadMore(true);
  };

  // 初始加载数据
  useEffect(() => {
    if (visible && commentList.current.length === 0) {
      onLoadMore();
    }
  }, [visible]);

  // 点赞评论
  const handleLikeComment = (commentId: string) => {
    const updatedComments = commentList.current.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
        };
      }
      return comment;
    });

    commentList.current = updatedComments;
    setLoading((prev) => (prev === ' ' ? '' : ' '));
  };

  // 渲染单个评论项
  const renderCommentItem = (comment: Comment) => {
    return (
      <div className={styles.commentItem} key={comment.id}>
        <Avatar shape="circle" image={comment.authorAvatar} />
        <div className={styles.commentContent}>
          <div className={styles.commentHeader}>
            <span className={styles.authorName}>{comment.authorName}</span>
            <span className={styles.commentTime}>{comment.createdAt}</span>
          </div>
          <div className={styles.commentText}>{comment.content}</div>
          <div className={styles.commentActions}>
            <div
              className={`${styles.likeAction} ${comment.isLiked ? styles.liked : ''}`}
              onClick={() => handleLikeComment(comment.id)}
            >
              <Icon
                icon={comment.isLiked ? 'mdi:heart' : 'mdi:heart-outline'}
                width={16}
                height={16}
              />
              <span>{comment.likeCount}</span>
            </div>
            <div className={styles.replyAction}>
              <span>回复</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Popup
      visible={visible}
      placement="bottom"
      onVisibleChange={onVisibleChange}
      style={{ height: '70vh' }}
      showOverlay
    >
      <div className={styles.commentPopupHeader}>
        <div className={styles.headerTitle}>评论 {commentList.current.length}</div>
        <Icon
          icon="mdi:close"
          className={styles.closeIcon}
          onClick={() => onVisibleChange(false)}
        />
      </div>

      <Divider />

      <div className={styles.commentList}>
        <PullDownRefresh
          value={refreshing}
          onChange={(val) => setRefreshing(val)}
          onRefresh={onRefresh}
          loadingTexts={['下拉刷新', '释放刷新', '加载中...']}
        >
          <List asyncLoading={loading} onScroll={onScroll}>
            {commentList.current.map((comment) => (
              <Cell key={comment.id} title={renderCommentItem(comment)} />
            ))}
            {loading && <div className={styles.loadingMore}>加载更多评论...</div>}
          </List>
        </PullDownRefresh>
      </div>
    </Popup>
  );
};

export default CommentPopup;
