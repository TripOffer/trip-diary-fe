import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import DetailNavBar from '../components/DetailNavBar';
import BottomBar from '../components/BottomBar';
import DetailContent from '../components/DetailContent';
import Api from '@/service/api';
import { DiaryDetail } from '@/types/diary';
import Toast from '@/utils/toast';
import styles from './index.module.scss';

const DiaryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [diaryData, setDiaryData] = useState<DiaryDetail | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [starCount, setStarCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [authorId, setAuthorId] = useState<string | number>('');
  const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';

  // 格式化日期
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD HH:mm');
  };

  // 获取日记详情数据
  useEffect(() => {
    const fetchDiaryDetail = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await Api.diaryApi.getDiaryDetail(id);
        if (response && response.data) {
          const diaryDetail = response.data as unknown as DiaryDetail;
          setDiaryData(diaryDetail);

          // 初始化状态数据
          setLikeCount(diaryDetail.likeCount || 0);
          setStarCount(diaryDetail.favoriteCount || 0);
          setCommentCount(diaryDetail.commentCount || 0);
          setIsFollowing(diaryDetail.isFollowedAuthor || false);

          // 设置作者信息
          if (diaryDetail.author) {
            setAuthorName(diaryDetail.author.name || '');
            setAuthorAvatar(
              diaryDetail.author.avatar
                ? diaryDetail.author.avatar.startsWith('http')
                  ? diaryDetail.author.avatar
                  : OSS_PREFIX + diaryDetail.author.avatar
                : '',
            );
            setAuthorId(diaryDetail.author.id || '');
          }
        }
      } catch (error) {
        console.error('Failed to fetch diary detail:', error);
        Toast.error('获取日记详情失败');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaryDetail();
  }, [id]);

  const handleFollowClick = async () => {
    if (!authorId) return;

    try {
      if (isFollowing) {
        await Api.userApi.unfollowUser(authorId);
      } else {
        await Api.userApi.followUser(authorId);
      }

      setIsFollowing(!isFollowing);
      Toast.success(isFollowing ? '已取消关注' : '已关注', { duration: 1000 });
    } catch {
      Toast.error('操作失败，请重试');
    }
  };

  const handleShareClick = async (diaryId?: string | number) => {
    if (!diaryId) {
      Toast.info('分享失败，无法获取日记ID', { duration: 1000 });
      return;
    }

    try {
      await Api.diaryApi.shareDiary(diaryId);
      Toast.success('分享成功', { duration: 1000 });
    } catch (error) {
      console.error('分享失败:', error);
      Toast.error('分享失败，请重试', { duration: 1000 });
    }
  };

  const handleCommentClick = () => {
    if (id) {
      navigate(`/diary/${id}/comments`);
    }
  };

  // 评论提交处理，现在只保留API调用，实际提交会在评论页面进行
  const handleCommentSubmit = async (content: string) => {
    if (!id || !content.trim()) return;

    try {
      setCommentCount((prev) => prev + 1);
      Toast.success('评论成功', { duration: 1000 });
    } catch (error) {
      console.error('Failed to submit comment:', error);
      Toast.error('评论失败，请重试');
    }
  };

  const title = authorName || '加载中...';

  return (
    <div className={styles.container}>
      <DetailNavBar
        title={title}
        diaryId={id}
        isFollowing={isFollowing}
        authorId={authorId}
        authorAvatar={authorAvatar}
        onFollowClick={handleFollowClick}
        onShareClick={handleShareClick}
      />

      <DetailContent
        diaryData={diaryData}
        isLoading={isLoading}
        OSS_PREFIX={OSS_PREFIX}
        formatDate={formatDate}
      />

      {id && (
        <BottomBar
          diaryId={id}
          likeCount={likeCount}
          starCount={starCount}
          commentCount={commentCount}
          onCommentClick={handleCommentClick}
          onCommentSubmit={handleCommentSubmit}
        />
      )}
    </div>
  );
};

export default DiaryDetailPage;
