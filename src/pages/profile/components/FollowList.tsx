import React, { useState, useEffect } from 'react';
import { Avatar, Button, Loading, Message } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/service/api/user';
import { UserBasicInfo, FollowListQuery, FollowListData } from '@/service/api/user/types';
import { useAuthStore } from '@/store/auth';
import styles from './FollowList.module.scss';

const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';

type ListType = 'following' | 'followers';

interface FollowListProps {
  userId?: string | number;
  type?: ListType;
}

const FollowList: React.FC<FollowListProps> = ({ type = 'following' }) => {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const [userList, setUserList] = useState<UserBasicInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  // 记录用户关注状态
  const [followStatusMap, setFollowStatusMap] = useState<Record<number, boolean>>({});

  const userId = authUser?.id ? String(authUser.id) : undefined;

  // 获取列表数据
  const fetchUserList = async (query: FollowListQuery = {}) => {
    if (!userId) {
      Message.error('未能获取用户信息，请重新登录');
      return;
    }

    try {
      setLoading(true);
      const params = { page: page, size: 10, ...query };

      const response =
        type === 'following'
          ? await userApi.getFollowingList(userId, params)
          : await userApi.getFollowersList(userId, params);

      if (response && response.data) {
        const data = response.data as unknown as FollowListData;

        if (page === 1) {
          setUserList(data.list);
        } else {
          setUserList((prev) => [...prev, ...data.list]);
        }

        setTotalCount(data.total);
        setHasMore(data.list.length > 0 && page < data.totalPages);

        // 粉丝列表需检查是否已关注
        if (type === 'followers' && data.list.length > 0) {
          await checkFollowStatus(data.list);
        }
      }
    } catch (error) {
      console.error(`获取${type === 'following' ? '关注' : '粉丝'}列表失败:`, error);
      Message.error(`获取${type === 'following' ? '关注' : '粉丝'}列表失败，请重试`);
    } finally {
      setLoading(false);
    }
  };

  // 检查粉丝是否已被关注
  const checkFollowStatus = async (users: UserBasicInfo[]) => {
    if (users.length === 0 || !userId) return;

    try {
      const response = await userApi.getFollowingList(userId, { page: 1, size: 100 });
      if (response && response.data) {
        const data = response.data as unknown as FollowListData;
        const followingIds = new Set(data.list.map((user) => user.id));

        // 创建关注状态映射
        const statusMap: Record<number, boolean> = {};
        users.forEach((user) => {
          statusMap[user.id] = followingIds.has(user.id);
        });

        setFollowStatusMap(statusMap);
      }
    } catch (error) {
      console.error('检查关注状态失败:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      setPage(1);
      fetchUserList({ page: 1 });
    }
  }, [userId, type]);

  // 加载更多数据
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      fetchUserList({ page: page + 1 });
    }
  };

  // 取消关注
  const handleUnfollow = async (followingId: number) => {
    try {
      await userApi.unfollowUser(followingId);
      Message.success('取消关注成功');

      // 更新关注状态映射
      if (type === 'followers') {
        setFollowStatusMap((prev) => ({ ...prev, [followingId]: false }));
      } else {
        // 刷新关注列表
        setPage(1);
        fetchUserList({ page: 1 });
      }
    } catch (error) {
      Message.error('取消关注失败，请重试');
    }
  };

  // 关注用户
  const handleFollow = async (followerId: number) => {
    try {
      await userApi.followUser(followerId);
      Message.success('关注成功');
      setFollowStatusMap((prev) => ({ ...prev, [followerId]: true }));
    } catch (error) {
      Message.error('关注失败，请重试');
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

  // 渲染按钮
  const renderButton = (user: UserBasicInfo) => {
    if (type === 'following') {
      return (
        <Button
          size="small"
          className={styles.followButton}
          onClick={() => handleUnfollow(user.id)}
        >
          已关注
        </Button>
      );
    } else {
      return followStatusMap[user.id] ? (
        <Button
          size="small"
          className={styles.followButton}
          onClick={() => handleUnfollow(user.id)}
        >
          已关注
        </Button>
      ) : (
        <Button
          size="small"
          className={`${styles.followButton} ${styles.primaryButton}`}
          onClick={() => handleFollow(user.id)}
        >
          回关
        </Button>
      );
    }
  };

  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  const getTitle = () => {
    return type === 'following' ? '我的关注' : '我的粉丝';
  };

  return (
    <div className={styles.followListContainer}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>{getTitle()}</h1>
        <div className={styles.dummySpace}></div>
      </div>

      {/* 计数 */}
      <div className={styles.countInfo}>
        <span className={styles.count}>共 {totalCount} 人</span>
        <div className={styles.sortButton}>
          <span>综合排序</span>
          <Icon icon="mdi:sort" className={styles.sortIcon} />
        </div>
      </div>

      {/* 用户列表 */}
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
        ) : userList.length === 0 ? (
          <div className={styles.emptyState}>
            <Icon icon="mdi:account-multiple-outline" className={styles.emptyIcon} />
            <span>{type === 'following' ? '暂无关注' : '暂无粉丝'}</span>
          </div>
        ) : (
          <>
            {userList.map((user) => (
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
                  {renderButton(user)}
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

            {!hasMore && userList.length > 0 && <div className={styles.noMore}>没有更多了</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowList;
