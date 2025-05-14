import React, { useState, useEffect } from 'react';
import { List, Cell, PullDownRefresh, Avatar, Message } from 'tdesign-mobile-react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailNavBar from './DetailNavBar';
import Api from '@/service/api';
import LikeButton from '@/components/LikeButton';
import dayjs from 'dayjs';
import styles from './CommentPage.module.scss';
import { useTranslation } from 'react-i18next';

interface Author {
  id: number;
  name: string;
  avatar: string;
}

interface CommentData {
  id: string;
  diaryId: string;
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  likeCount: number;
  replyCount: number;
  author: Author;
  isLiked: boolean;
}

interface CommentListParams {
  page: number;
  size: number;
}

interface CommentListRes {
  list: CommentData[];
  total: number;
  page: number;
  size: number;
  totalPage: number;
}

const CommentPage: React.FC = () => {
  const { t } = useTranslation('diary');
  const { id } = useParams<{ id: string }>();
  const diaryId = id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [totalComments, setTotalComments] = useState(0);
  const pageSize = 10;

  // 获取OSS URL前缀
  const ossUrlPrefix = import.meta.env.VITE_OSS_URL || '';

  // 加载数据
  const loadData = async (isRefresh: boolean = false) => {
    if (!diaryId) {
      console.error('无效的日记ID');
      Message.error({
        content: t('invalidDiaryId', { ns: 'diary', defaultValue: '无效的日记ID' }),
        duration: 2000,
      });
      return;
    }

    try {
      const currentPage = isRefresh ? 1 : page;
      const params: CommentListParams = {
        page: currentPage,
        size: pageSize,
      };

      const response = await Api.diaryApi.getComments(diaryId, params);

      if (response && response.data) {
        const responseData = response.data as unknown as CommentListRes;
        const newComments = responseData.list;
        const total = responseData.total;

        setTotalComments(total);

        if (isRefresh) {
          setComments(newComments);
        } else {
          setComments((prev) => [...prev, ...newComments]);
        }

        setPage(currentPage + 1);
        setHasMore(currentPage * pageSize < total);
      }
    } catch (error) {
      console.error('获取评论失败:', error);
      Message.error({
        content: t('fetchCommentFailed', { ns: 'diary', defaultValue: '加载评论失败' }),
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
    if (diaryId) {
      onLoadMore();
    }
  }, [diaryId]);

  // 点赞评论
  const handleLikeChange = async (commentId: string, liked: boolean) => {
    if (!diaryId) {
      console.error('无效的日记ID');
      Message.error({
        content: t('invalidDiaryId', { ns: 'diary', defaultValue: '操作失败，无效的日记ID' }),
        duration: 2000,
      });
      return;
    }

    try {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: liked,
            likeCount: liked ? comment.likeCount + 1 : Math.max(0, comment.likeCount - 1),
          };
        }
        return comment;
      });

      setComments(updatedComments);

      // 调用API，同时传递日记ID和评论ID（不转换为数字）
      if (liked) {
        await Api.diaryApi.likeComment(diaryId, commentId);
      } else {
        await Api.diaryApi.unlikeComment(diaryId, commentId);
      }
    } catch (error) {
      console.error('点赞/取消点赞评论失败:', error);

      // 发生错误时回滚UI状态
      const originalComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !liked,
            likeCount: !liked ? comment.likeCount + 1 : Math.max(0, comment.likeCount - 1),
          };
        }
        return comment;
      });

      setComments(originalComments);

      Message.error({
        content: t('actionFailed', { ns: 'diary', defaultValue: '操作失败，请重试' }),
        duration: 2000,
      });
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !diaryId) return;

    try {
      await Api.diaryApi.createComment({
        diaryId,
        content: commentText.trim(),
      });

      // 重新加载最新评论
      setPage(1);
      setRefreshing(true);
      onLoadMore(true);

      // 清空输入框
      setCommentText('');

      Message.success({
        content: t('commentSuccess', { ns: 'diary', defaultValue: '评论发布成功' }),
        duration: 2000,
      });
    } catch (error) {
      console.error('提交评论失败:', error);
      Message.error({
        content: t('commentFailed', { ns: 'diary', defaultValue: '评论发布失败' }),
        duration: 2000,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  // 返回上一页
  const handleBackClick = () => {
    navigate(-1);
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD HH:mm');
  };

  // 渲染单个评论项
  const renderCommentItem = (comment: CommentData) => {
    // 添加OSS前缀到头像URL
    const avatarUrl = comment.author.avatar ? `${ossUrlPrefix}${comment.author.avatar}` : undefined;

    return (
      <div className={styles.commentItem} key={comment.id}>
        <Avatar shape="circle" image={avatarUrl} />
        <div className={styles.commentContent}>
          <div className={styles.commentHeader}>
            <span className={styles.authorName}>{comment.author.name}</span>
            <span className={styles.commentTime}>{formatDate(comment.createdAt)}</span>
          </div>
          <div className={styles.commentText}>{comment.content}</div>
          <div className={styles.commentActions}>
            <div className={styles.likeAction}>
              <LikeButton
                liked={comment.isLiked}
                likeCount={comment.likeCount}
                onLikeChange={(liked) => handleLikeChange(comment.id, liked)}
                iconSize={20}
              />
            </div>
            <div className={styles.replyAction}>
              <span>{t('reply', { ns: 'diary', defaultValue: '回复' })}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.commentPageContainer}>
      <DetailNavBar
        title={`${t('comment', { ns: 'diary', defaultValue: '评论' })} (${totalComments})`}
        onBackClick={handleBackClick}
        showFollow={false}
      />

      <div className={styles.commentList}>
        <PullDownRefresh
          value={refreshing}
          onChange={(val) => setRefreshing(val)}
          onRefresh={onRefresh}
          loadingTexts={[
            t('pullToRefresh', { ns: 'diary', defaultValue: '下拉刷新' }),
            t('releaseToRefresh', { ns: 'diary', defaultValue: '释放刷新' }),
            t('loading', { ns: 'diary', defaultValue: '加载中...' }),
          ]}
        >
          <List asyncLoading={loading} onScroll={onScroll}>
            {comments.map((comment) => (
              <Cell key={comment.id} title={renderCommentItem(comment)} />
            ))}
            {loading && (
              <div className={styles.loadingMore}>
                {t('loadingMoreComments', { ns: 'diary', defaultValue: '加载更多评论...' })}
              </div>
            )}
            {!loading && !hasMore && comments.length > 0 && (
              <div className={styles.noMore}>
                {t('noMoreComments', { ns: 'diary', defaultValue: '没有更多评论了' })}
              </div>
            )}
            {!loading && comments.length === 0 && (
              <div className={styles.empty}>
                {t('noComments', { ns: 'diary', defaultValue: '暂无评论，来抢沙发吧!' })}
              </div>
            )}
          </List>
        </PullDownRefresh>
      </div>

      <div className={styles.commentInputContainer}>
        <input
          type="text"
          placeholder={t('saySomething', { ns: 'diary', defaultValue: '说点什么...' })}
          className={styles.commentInput}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div
          className={`${styles.sendButton} ${!commentText.trim() ? styles.disabled : ''}`}
          onClick={handleCommentSubmit}
        >
          {t('send', { ns: 'diary', defaultValue: '发送' })}
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
