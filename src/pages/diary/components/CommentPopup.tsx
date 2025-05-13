import React, { useState, useEffect, useRef } from 'react';
import { Popup, List, Cell, PullDownRefresh, Avatar, Divider, Message } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { Comment, generateMockComments } from '@/mock/comments';
import styles from './CommentPopup.module.scss';

interface CommentPopupProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  diaryId: string;
}

interface CommentData {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ visible, onVisibleChange, diaryId }) => {
  const [loading, setLoading] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  // 加载数据
  const loadData = async (isRefresh: boolean = false) => {
    if (!diaryId) return;

    try {
      const currentPage = isRefresh ? 1 : page;

      // 模拟API调用
      const mockResponse = await new Promise<{ data: { list: Comment[]; total: number } }>(
        (resolve) => {
          setTimeout(() => {
            const newComments = generateMockComments(pageSize, isRefresh ? [] : comments);
            resolve({
              data: {
                list: newComments,
                total: 100, // 模拟总数
              },
            });
          }, 1000);
        },
      );

      const newComments = mockResponse.data.list;
      const total = mockResponse.data.total;

      if (isRefresh) {
        setComments(newComments);
      } else {
        setComments((prev) => [...prev, ...newComments]);
      }

      setPage(currentPage + 1);
      setHasMore(comments.length + newComments.length < total);
    } catch (error) {
      console.error('Failed to load comments:', error);
      Message.error({
        content: '加载评论失败',
        duration: 2000,
      });
    } finally {
      setLoading('');
      setRefreshing(false);
    }
  };

  const onLoadMore = (isRefresh: boolean = false) => {
    if ((!hasMore && !isRefresh) || loading) {
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
    setPage(1);
    onLoadMore(true);
  };

  // 初始加载数据
  useEffect(() => {
    if (visible && comments.length === 0 && diaryId) {
      onLoadMore();
    }
  }, [visible, diaryId]);

  // 点赞评论
  const handleLikeComment = async (commentId: string) => {
    try {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          // 模拟点赞/取消点赞操作
          // 实际应用中，这里应该调用API
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
          };
        }
        return comment;
      });

      setComments(updatedComments);

      // 实际应用中的API调用
      // const comment = comments.find(c => c.id === commentId);
      // if (comment) {
      //   if (comment.isLiked) {
      //     await Api.diaryApi.unlikeComment(Number(commentId));
      //   } else {
      //     await Api.diaryApi.likeComment(Number(commentId));
      //   }
      // }
    } catch (error) {
      console.error('Failed to like/unlike comment:', error);
      Message.error({
        content: '操作失败',
        duration: 2000,
      });
    }
  };

  // 渲染单个评论项
  const renderCommentItem = (comment: CommentData) => {
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
        <div className={styles.headerTitle}>评论 {comments.length}</div>
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
            {comments.map((comment) => (
              <Cell key={comment.id} title={renderCommentItem(comment)} />
            ))}
            {loading && <div className={styles.loadingMore}>加载更多评论...</div>}
            {!loading && !hasMore && comments.length > 0 && (
              <div className={styles.noMore}>没有更多评论了</div>
            )}
            {!loading && comments.length === 0 && (
              <div className={styles.empty}>暂无评论，来抢沙发吧!</div>
            )}
          </List>
        </PullDownRefresh>
      </div>
    </Popup>
  );
};

export default CommentPopup;
