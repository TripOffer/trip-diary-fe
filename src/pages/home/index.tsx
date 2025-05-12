import React, { useRef, useEffect, useState, useCallback } from 'react';
import DiaryMasonry from '@/components/DiaryMasonry';
import TopBar from './components/TopBar';
import Api from '@/service/api';
import Loading from 'tdesign-mobile-react/es/loading';
import { PullDownRefresh } from 'tdesign-mobile-react';
import styles from './index.module.scss';

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDiaries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Api.diaryApi.getRecommendDiaries({ page: 1, size: 10 });
      // @ts-ignore
      setItems(res.data?.list || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  // 下拉刷新回调
  const handleRefresh = async () => {
    await fetchDiaries();
  };

  return (
    <>
      <TopBar scrollContainerRef={scrollRef} />
      <PullDownRefresh
        className={styles.pullDownRefresh}
        style={{ WebkitOverflowScrolling: 'touch' }}
        loadingBarHeight={60}
        loadingProps={{}}
        loadingTexts={['下拉刷新', '松开刷新', '正在刷新', '刷新完成']}
        onRefresh={handleRefresh}
      >
        <div ref={scrollRef} className="h-full overflow-auto flex justify-center px-4 py-20">
          {loading ? <Loading theme="dots" size="40px" /> : <DiaryMasonry items={items} />}
        </div>
      </PullDownRefresh>
    </>
  );
};

export default Home;
