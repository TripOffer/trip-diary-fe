import { ApiRes } from '../shared';

// 日记基础信息
export interface DiaryBase {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string | null;
  title: string;
  cover: string | null;
  summary: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  liked?: boolean;
  favorited?: boolean;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  viewCount: number;
}

// 日记详情
export interface DiaryDetail extends DiaryBase {
  content: string;
  images: string[];
  status?: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

// 日记列表
export interface DiaryListQuery {
  userId?: number;
  page?: number;
  size?: number;
}
export interface DiaryListData {
  list: DiaryBase[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
export type DiaryListRes = ApiRes<DiaryListData>;

// 日记详情
export type DiaryDetailRes = ApiRes<DiaryDetail>;

// 创建/更新日记
export interface CreateDiaryReq {
  title: string;
  content: string;
  images?: string[];
  cover?: string;
  summary?: string;
}
export type CreateDiaryRes = ApiRes<{ id: number }>;
export interface UpdateDiaryReq extends Partial<CreateDiaryReq> {
  id: number;
}
export type UpdateDiaryRes = ApiRes<null>;

// 删除日记
export type DeleteDiaryRes = ApiRes<null>;

// 发布/审核日记
export interface PublishDiaryReq {
  id: number;
  published: boolean;
}
export type PublishDiaryRes = ApiRes<null>;
export interface ReviewDiaryReq {
  id: number;
  status: 'approved' | 'rejected';
  reason?: string;
}
export type ReviewDiaryRes = ApiRes<null>;
export type ReviewListRes = DiaryListRes;

// 点赞/收藏
export type LikeDiaryRes = ApiRes<null>;
export type UnlikeDiaryRes = ApiRes<null>;
export type FavoriteDiaryRes = ApiRes<null>;
export type UnfavoriteDiaryRes = ApiRes<null>;

// 评论
export interface CreateCommentReq {
  diaryId: number;
  content: string;
  parentId?: number;
}
export type CreateCommentRes = ApiRes<{ id: number }>;
export interface DeleteCommentReq {
  id: number;
}
export type DeleteCommentRes = ApiRes<null>;
export interface CommentBase {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string | null;
  content: string;
  createdAt: string;
  likeCount: number;
  liked?: boolean;
  parentId?: number;
  replyCount?: number;
}
export interface CommentListQuery {
  diaryId: number;
  page?: number;
  size?: number;
}
export interface CommentListData {
  list: CommentBase[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
export type CommentListRes = ApiRes<CommentListData>;
export interface ReplyListQuery {
  commentId: number;
  page?: number;
  size?: number;
}
export type ReplyListRes = CommentListRes;
export type LikeCommentRes = ApiRes<null>;
export type UnlikeCommentRes = ApiRes<null>;

// 搜索/推荐
export interface SearchDiaryQuery {
  keyword: string;
  page?: number;
  size?: number;
}
export type SearchDiaryRes = DiaryListRes;
export type RecommendDiaryRes = DiaryListRes;
