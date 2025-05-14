import React, { useRef, useEffect, useState, useCallback } from 'react';
import DiaryMasonry from '@/components/DiaryMasonry';
import TopBar from './components/TopBar';
import Api from '@/service/api';
import Loading from 'tdesign-mobile-react/es/loading';
import { PullDownRefresh } from 'tdesign-mobile-react';
import styles from './index.module.scss';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const statusBarHeight = getStatusBarHeight();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(''); // 输入框内容
  const [searchValue, setSearchValue] = useState(''); // 实际搜索内容

  // 获取第一页
  const fetchDiaries = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (!searchValue) {
        res = await Api.diaryApi.getRecommendDiaries({ page: 1, size: 10 });
      } else {
        res = await Api.diaryApi.searchDiaries({ query: searchValue, page: 1, size: 10 });
      }
      const data = res.data as any;
      setItems(data?.list || []);
      setPage(1);
      setTotalPage(data?.totalPage || data?.totalPages || 1);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  // 加载更多
  const loadMore = useCallback(async () => {
    if (loadMoreLoading || loading) return;
    if (page >= totalPage) return;
    setLoadMoreLoading(true);
    try {
      const nextPage = page + 1;
      let res;
      if (!searchValue) {
        res = await Api.diaryApi.getRecommendDiaries({ page: nextPage, size: 10 });
      } else {
        res = await Api.diaryApi.searchDiaries({ query: searchValue, page: nextPage, size: 10 });
      }
      const data = res.data as any;
      setItems((prev) => [...prev, ...(data?.list || [])]);
      setPage(nextPage);
      setTotalPage(data?.totalPage || data?.totalPages || totalPage);
    } finally {
      setLoadMoreLoading(false);
    }
  }, [page, totalPage, loadMoreLoading, loading, searchValue]);

  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  // 下拉刷新回调
  const handleRefresh = async () => {
    await fetchDiaries();
  };

  // 搜索确认
  const handleSearchSubmit = () => {
    setSearchValue(searchInput);
  };

  return (
    <>
      <TopBar
        scrollContainerRef={scrollRef}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <PullDownRefresh
        className={styles.pullDownRefresh}
        style={{ WebkitOverflowScrolling: 'touch', paddingTop: `${statusBarHeight}px` }}
        loadingBarHeight={60}
        loadingProps={{}}
        loadingTexts={[
          t('home.refreshIdle'),
          t('home.refreshReady'),
          t('home.refreshing'),
          t('home.refreshSuccess'),
        ]}
        onRefresh={handleRefresh}
      >
        <div ref={scrollRef} className="h-full flex justify-center">
          {loading ? (
            <Loading theme="dots" size="40px" />
          ) : (
            <DiaryMasonry
              items={items}
              onLoadMore={loadMore}
              hasMore={page < totalPage}
              loading={loadMoreLoading}
            />
          )}
        </div>
      </PullDownRefresh>
    </>
  );
};

export default Home;
