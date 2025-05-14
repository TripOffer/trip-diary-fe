import React, { useEffect, useState } from 'react';
import { Cell, Toast, Tag, Loading, Dialog, PullDownRefresh } from 'tdesign-mobile-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '@/service/api';
import EntryItem from './EntryItem';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';

const statusMap: Record<string, { theme: 'warning' | 'success' | 'danger'; text: string }> = {
  pending: { theme: 'warning', text: '待审核' },
  approved: { theme: 'success', text: '已通过' },
  rejected: { theme: 'danger', text: '已拒绝' },
};

const ManageEntries: React.FC = () => {
  const statusBarHeight = getStatusBarHeight();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dialogProps, setDialogProps] = useState<any>({ visible: false });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const loadMoreLoadingRef = React.useRef(loadMoreLoading);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // 获取第一页
  const fetchEntries = async (reset = false) => {
    if (reset) setRefreshing(true);
    else setLoading(true);
    try {
      // @ts-ignore
      const res = await Api.diaryApi.getMyDiaries({ page: 1, size: pageSize });
      // @ts-ignore
      setData(res.data?.list || []);
      // @ts-ignore
      setTotal(res.data?.total || 0);
      setPage(1);
    } catch (e) {
      Toast.error('获取数据失败');
    } finally {
      if (reset) setRefreshing(false);
      else setLoading(false);
    }
  };

  // 检查是否需要刷新（从编辑页返回时）
  useEffect(() => {
    if (location.state?.refresh) {
      fetchEntries();
      // 清除 state，避免重复刷新
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line
  }, [location.state]);

  // 加载更多
  const loadMore = async () => {
    if (loadMoreLoadingRef.current || loading) return;
    if (page * pageSize >= total) return;
    setLoadMoreLoading(true);
    loadMoreLoadingRef.current = true;
    try {
      const nextPage = page + 1;
      // @ts-ignore
      const res = await Api.diaryApi.getMyDiaries({ page: nextPage, size: pageSize });
      // @ts-ignore
      setData((prev) => [...prev, ...(res.data?.list || [])]);
      setPage(nextPage);
      // @ts-ignore
      setTotal(res.data?.total || total);
    } catch (e) {
      Toast.error('加载失败');
    } finally {
      setLoadMoreLoading(false);
      loadMoreLoadingRef.current = false;
    }
  };

  React.useEffect(() => {
    loadMoreLoadingRef.current = loadMoreLoading;
  }, [loadMoreLoading]);

  useEffect(() => {
    fetchEntries();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handler = () => {
      fetchEntries();
    };
    window.addEventListener('refresh-diary-list', handler);
    return () => {
      window.removeEventListener('refresh-diary-list', handler);
    };
  }, []);

  // 下拉刷新回调
  const handleRefresh = async () => {
    await fetchEntries(true);
  };

  // 滚动到底部自动加载更多
  const handleScroll = React.useCallback(() => {
    if (!scrollRef.current || loadMoreLoadingRef.current || loading) return;
    const el = scrollRef.current;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      loadMore();
    }
  }, [loading, loadMore]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDialogProps({
      visible: true,
      title: '确定删除？',
      content: '删除后不可恢复',
      confirmBtn: '删除',
      cancelBtn: '取消',
    });
  };

  const handlePublish = async (id: string) => {
    try {
      await Api.diaryApi.publishDiary(id, true);
      Toast.success('发布成功');
      fetchEntries();
    } catch {
      Toast.error('发布失败');
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      await Api.diaryApi.publishDiary(id, false);
      Toast.success('已取消发布');
      fetchEntries();
    } catch {
      Toast.error('取消发布失败');
    }
  };

  const handleEdit = (id: string) => {
    window.location.href = `/publish/edit?id=${id}`;
  };

  return (
    <PullDownRefresh
      onRefresh={handleRefresh}
      loadingBarHeight={60}
      loadingTexts={['', '松开刷新', '正在刷新', '']}
      style={{ minHeight: '100vh' }}
    >
      <div
        className="bg-white rounded-lg p-4 mt-6"
        ref={scrollRef}
        style={{ height: `calc(100vh - ${statusBarHeight + 60}px)`, overflow: 'auto' }}
      >
        <h2 className="text-lg font-bold mb-4">我的稿件管理</h2>
        {loading && !refreshing ? (
          <div className="flex justify-center py-8">
            <Loading />
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <div className="text-center text-gray-400 py-8">暂无稿件</div>
            ) : (
              <div className="pb-20">
                {data.map((item) => (
                  <EntryItem
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPublish={handlePublish}
                    onUnpublish={handleUnpublish}
                    canUnpublish={!!item.published}
                  />
                ))}
                <div className="w-full flex justify-center items-center py-4 text-gray-400 text-sm select-none">
                  {loadMoreLoading ? '加载中...' : page * pageSize >= total ? '没有更多了' : ''}
                </div>
              </div>
            )}
          </>
        )}
        <Dialog
          {...dialogProps}
          onClose={() => setDialogProps({ ...dialogProps, visible: false })}
          onConfirm={async () => {
            setDialogProps({ ...dialogProps, visible: false });
            if (deleteId) {
              try {
                await Api.diaryApi.deleteDiary(deleteId);
                Toast.success('删除成功');
                fetchEntries();
              } catch {
                Toast.error('删除失败');
              }
            }
          }}
        />
      </div>
    </PullDownRefresh>
  );
};

export default ManageEntries;
