import { ApiRes } from '../shared';

export type Gender = 'secret' | 'male' | 'female';
export type Role = 'User' | 'Admin' | 'Reviewer' | 'Super';
export type DiaryStatus = 'Pending' | 'Approved' | 'Rejected';

// 用户基础信息
export interface UserBasicInfo {
  id: number;
  name: string;
  gender: Gender;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
  birthday?: string | null;
}

// 用户完整信息（部分接口有 email/role 字段）
export interface UserInfo extends UserBasicInfo {
  email?: string;
  role?: Role;
  updateAt?: string;
  birthday?: string | null;
}

// 获取用户列表
export interface UserListQuery {
  id?: number;
  name?: string;
  email?: string;
  role?: Role;
  page?: number;
  size?: number;
}
export interface UserListData {
  list: UserBasicInfo[] | UserInfo[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
export type UserListRes = ApiRes<UserListData>;

// 获取用户信息（通过ID）
export interface UserDetailData {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  gender: Gender;
  birthday: string;
  createdAt: string;
  followingCount: number;
  followersCount: number;
}
export type UserDetailRes = ApiRes<UserDetailData>;

// 获取我的用户信息
export interface MyUserDetailData extends UserDetailData {
  email: string;
  role: Role;
}
export type MyUserDetailRes = ApiRes<MyUserDetailData>;

// 更新用户信息
export interface UpdateUserReq {
  name?: string;
  bio?: string;
  gender?: Gender;
  birthday?: string | number;
}
export interface UpdateUserData {
  id: number;
  name: string;
  bio: string;
  gender: Gender;
  birthday: string;
}
export type UpdateUserRes = ApiRes<UpdateUserData>;

// 修改头像
export interface UpdateAvatarReq {
  avatar: string;
}
export interface UpdateAvatarData {
  id: number;
  avatar: string;
}
export type UpdateAvatarRes = ApiRes<UpdateAvatarData>;

// 修改角色
export interface ChangeRoleReq {
  role: Role;
}
export interface ChangeRoleData {
  id: number;
  name: string;
  role: Role;
}
export type ChangeRoleRes = ApiRes<ChangeRoleData>;

// 关注/取关关系对象
export interface FollowRelation {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: string;
}
export type FollowRes = ApiRes<FollowRelation>;
export type UnfollowRes = ApiRes<FollowRelation>;

// 关注/粉丝列表
export interface FollowListQuery {
  page?: number;
  size?: number;
}
export interface FollowListData {
  list: UserBasicInfo[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
export type FollowingListRes = ApiRes<FollowListData>;
export type FollowersListRes = ApiRes<FollowListData>;

// 关注/粉丝统计
export interface FollowStatsData {
  followingCount: number;
  followersCount: number;
}
export type FollowStatsRes = ApiRes<FollowStatsData>;

// 标签
export interface Tag {
  id: string;
  name: string;
}

// 作者
export interface Author {
  id: string | number;
  name: string;
  avatar: string | null;
}

// 缩略图元数据
export interface ThumbnailMeta {
  id: string;
  key: string;
  userId: string | number;
  ext: string;
  width: number;
  height: number;
  duration?: number | null;
  type: string;
  createdAt: string;
}

// 日记基础信息（列表用）
export interface DiaryBase {
  id: string;
  authorId: string | number;
  parentId: string | null;
  title: string;
  slug: string;
  thumbnail: string | null;
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  shareCount: number;
  published: boolean;
  publishedAt: string | null;
  status: DiaryStatus;
  rejectedReason: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  author?: Author;
  isLiked?: boolean;
  isFavorite?: boolean;
  thumbnailMeta?: ThumbnailMeta;
}

// 分页响应数据结构
export interface PaginatedResponse {
  list: DiaryBase[];
  total: number;
  page: number;
  size: number;
  totalPage: number;
}

// 我的日记列表
export interface MyListQuery {
  userId?: string | number;
  page?: number;
  size?: number;
}
export type MyListRes = ApiRes<PaginatedResponse>;

// 我的收藏列表
export interface MyFavoriteListQuery {
  userId?: string | number;
  page?: number;
  size?: number;
}
export type MyFavoriteListRes = ApiRes<PaginatedResponse>;

// 我的点赞列表
export interface MyLikeListQuery {
  userId?: string | number;
  page?: number;
  size?: number;
}
export type MyLikeListRes = ApiRes<PaginatedResponse>;
