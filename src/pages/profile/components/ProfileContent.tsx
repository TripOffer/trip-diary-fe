import React, { useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from 'tdesign-mobile-react';
import { useNavigate } from 'react-router-dom';
import DiaryMasonry from '@/components/DiaryMasonry';
import { mockFetchMoreDiaries, DiaryItem } from '@/mock/diaries';
import styles from '../index.module.scss';

type TabType = '笔记' | '收藏' | '赞过';

const ProfileContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('笔记');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [diaries, setDiaries] = useState<DiaryItem[]>([]);
  const navigate = useNavigate();

  const tabs: TabType[] = ['笔记', '收藏', '赞过'];
  const hasContent = diaries.length > 0;

  // 初始加载数据
  useEffect(() => {
    const type = activeTab === '笔记' ? 'my' : activeTab === '收藏' ? 'favorite' : 'liked';
    setLoading(true);

    mockFetchMoreDiaries(type, 1)
      .then((data) => {
        setDiaries(data);
        setPage(1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeTab]);

  const handlePublish = () => {
    navigate('/publish');
  };

  const handleLoadMore = useCallback(() => {
    // 加载更多日记
    const nextPage = page + 1;
    const type = activeTab === '笔记' ? 'my' : activeTab === '收藏' ? 'favorite' : 'liked';

    setLoading(true);

    mockFetchMoreDiaries(type, nextPage)
      .then((newData) => {
        setDiaries((prev) => [...prev, ...newData]);
        setPage(nextPage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeTab, page]);

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
      {hasContent ? (
        <div className={styles.masonryContainer}>
          <DiaryMasonry
            items={diaries}
            onLoadMore={handleLoadMore}
            hasMore={true}
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
