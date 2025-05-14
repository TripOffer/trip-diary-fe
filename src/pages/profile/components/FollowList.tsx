import React, { useState, useEffect } from 'react';
import { Avatar, Button, Loading, Message } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/service/api/user';
import { UserBasicInfo, FollowListQuery, FollowListData } from '@/service/api/user/types';
import { useAuthStore } from '@/store/auth';
import styles from './FollowList.module.scss';

const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';

interface FollowListProps {
  userId?: string | number;
}

const FollowList: React.FC<FollowListProps> = () => {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const [followingList, setFollowingList] = useState<UserBasicInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalFollowing, setTotalFollowing] = useState(0);

  // 优先使用传入的userId，如果没有则使用store中的用户ID
  const userId = authUser?.id ? String(authUser.id) : undefined;

  // 获取关注列表
  const fetchFollowingList = async (query: FollowListQuery = {}) => {
    if (!userId) {
      Message.error('未能获取用户信息，请重新登录');
      return;
    }

    try {
      setLoading(true);
      const params = { page: page, size: 10, ...query };
      const response = await userApi.getFollowingList(userId, params);

      if (response && response.data) {
        const data = response.data as unknown as FollowListData;

        if (page === 1) {
          setFollowingList(data.list);
        } else {
          setFollowingList((prev) => [...prev, ...data.list]);
        }

        setTotalFollowing(data.total);
        setHasMore(data.list.length > 0 && page < data.totalPages);
      }
    } catch (error) {
      console.error('获取关注列表失败:', error);
      Message.error('获取关注列表失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      setPage(1);
      fetchFollowingList({ page: 1 });
    }
  }, [userId]);

  // 加载更多数据
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      fetchFollowingList({ page: page + 1 });
    }
  };

  // 取消关注
  const handleUnfollow = async (followingId: number) => {
    try {
      await userApi.unfollowUser(followingId);
      Message.success('取消关注成功');
      // 刷新列表
      setPage(1);
      fetchFollowingList({ page: 1 });
    } catch (error) {
      Message.error('取消关注失败，请重试');
    }
  };

  const renderAvatar = (user: UserBasicInfo) => {
    const avatarUrl = user.avatar
      ? user.avatar.startsWith('http')
        ? user.avatar
        : OSS_PREFIX + user.avatar
      : '';

    return avatarUrl ? (
      <Avatar image={avatarUrl} shape="circle" size="medium" />
    ) : (
      <Avatar icon={<Icon icon="mdi:account" />} shape="circle" size="medium" />
    );
  };

  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  return (
    <div className={styles.followListContainer}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>我的关注</h1>
        <div className={styles.dummySpace}></div>
      </div>

      {/* 关注计数 */}
      <div className={styles.countInfo}>
        <span className={styles.count}>共 {totalFollowing} 人</span>
        <div className={styles.sortButton}>
          <span>综合排序</span>
          <Icon icon="mdi:sort" className={styles.sortIcon} />
        </div>
      </div>

      {/* 关注列表 */}
      <div className={styles.listContainer}>
        {loading && page === 1 ? (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        ) : !userId ? (
          <div className={styles.emptyState}>
            <Icon icon="mdi:alert-circle-outline" className={styles.emptyIcon} />
            <span>获取用户信息失败</span>
          </div>
        ) : followingList.length === 0 ? (
          <div className={styles.emptyState}>
            <Icon icon="mdi:account-multiple-outline" className={styles.emptyIcon} />
            <span>暂无关注</span>
          </div>
        ) : (
          <>
            {followingList.map((user) => (
              <div key={user.id} className={styles.userItem}>
                <div className={styles.userInfo}>
                  {renderAvatar(user)}
                  <div className={styles.userDetail}>
                    <div className={styles.nameRow}>
                      <span className={styles.userName}>{user.name}</span>
                    </div>
                    <div className={styles.bioText}>{user.bio || '这个人很懒，什么都没留下'}</div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <Button
                    size="small"
                    className={styles.followButton}
                    onClick={() => handleUnfollow(user.id)}
                  >
                    已关注
                  </Button>
                  <Icon icon="mdi:dots-horizontal" className={styles.moreIcon} />
                </div>
              </div>
            ))}

            {/* 加载更多 */}
            {loading && page > 1 && (
              <div className={styles.loadingMore}>
                <Loading />
              </div>
            )}

            {!loading && hasMore && (
              <div className={styles.loadMoreButton} onClick={loadMore}>
                加载更多
              </div>
            )}

            {!hasMore && followingList.length > 0 && (
              <div className={styles.noMore}>没有更多了</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowList;
