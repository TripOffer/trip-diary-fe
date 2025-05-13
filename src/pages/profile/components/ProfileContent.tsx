import React, { useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from 'tdesign-mobile-react';
import { useNavigate } from 'react-router-dom';
import DiaryMasonry from '@/components/DiaryMasonry';
import { DiaryBase } from '@/service/api/user/types';
import { userApi } from '@/service/api/user';
import Toast from '@/utils/toast';
import styles from '../index.module.scss';

type TabType = '笔记' | '收藏' | '赞过';

const ProfileContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('笔记');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [diaries, setDiaries] = useState<DiaryBase[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const tabs: TabType[] = ['笔记', '收藏', '赞过'];
  const hasContent = diaries.length > 0;

  // 初始加载数据
  useEffect(() => {
    setLoading(true);
    setPage(1);

    const fetchData = async () => {
      try {
        let response;

        if (activeTab === '笔记') {
          response = await userApi.getMyDiaries({ page: 1, size: 10 });
        } else if (activeTab === '收藏') {
          response = await userApi.getFavoriteDiaries({ page: 1, size: 10 });
        } else {
          response = await userApi.getLinkDiaries({ page: 1, size: 10 });
        }

        // @ts-ignore
        if (response.data && response.data.list) {
          // @ts-ignore
          setDiaries(response.data.list);
          // @ts-ignore
          setHasMore(response.data.page < response.data.totalPage);
        } else {
          setDiaries([]);
          setHasMore(false);
        }
      } catch (error) {
        console.error('获取数据失败:', error);
        Toast.error('获取数据失败，请稍后重试');
        setDiaries([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handlePublish = () => {
    navigate('/publish');
  };

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    setLoading(true);

    try {
      let response;

      if (activeTab === '笔记') {
        response = await userApi.getMyDiaries({ page: nextPage, size: 10 });
      } else if (activeTab === '收藏') {
        response = await userApi.getFavoriteDiaries({ page: nextPage, size: 10 });
      } else {
        response = await userApi.getLinkDiaries({ page: nextPage, size: 10 });
      }

      // @ts-ignore
      if (response.data && response.data.list) {
        // @ts-ignore
        setDiaries((prev) => [...prev, ...response.data.list]);
        setPage(nextPage);
        // @ts-ignore
        setHasMore(response.data.page < response.data.totalPage);
      }
    } catch (error) {
      console.error('加载更多数据失败:', error);
      Toast.error('加载更多数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [activeTab, page, hasMore, loading]);

  // 处理标签切换
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    const container = document.querySelector(`.${styles.masonryContainer}`);
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* 标签栏 */}
      <div className={styles.tabBar}>
        <div className={styles.tabContent}>
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`${styles.tabItem} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      {loading && !hasContent ? (
        <div className={styles.loadingState}>
          <Icon icon="mdi:loading" className={`${styles.loadingIcon} ${styles.spinning}`} />
          <div className={styles.loadingText}>加载中...</div>
        </div>
      ) : hasContent ? (
        <div className={styles.masonryContainer}>
          <DiaryMasonry
            items={diaries}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={loading}
          />
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Icon icon="mdi:image-outline" className={styles.emptyIcon} />
          <div className={styles.emptyText}>
            {activeTab === '笔记'
              ? '还没有发布日记，去记录你的旅行吧'
              : activeTab === '收藏'
                ? '还没有收藏内容'
                : '还没有点赞内容'}
          </div>
          {activeTab === '笔记' && (
            <Button
              className={styles.publishBtn}
              icon={<Icon icon="mdi:plus" />}
              onClick={handlePublish}
            >
              去发布
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileContent;
