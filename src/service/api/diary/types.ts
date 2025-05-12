import { ApiRes } from '../shared';

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
  title: string;
  slug: string;
  thumbnail: string | null;
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  shareCount: number;
  publishedAt: string;
  updatedAt: string;
  tags: Tag[];
  author: Author;
  thumbnailMeta?: ThumbnailMeta;
}

// 日记详情
export interface DiaryDetail extends DiaryBase {
  content: string;
  images: string[];
  status?: 'pending' | 'approved' | 'rejected';
  reason?: string;
  liked?: boolean;
  isLiked?: boolean;
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
  totalPage: number;
}
export type DiaryListRes = ApiRes<DiaryListData>;

// 日记详情
export type DiaryDetailRes = ApiRes<DiaryDetail>;

// 创建/更新日记
export interface CreateDiaryReq {
  title: string;
  content: string;
  images?: string[];
  video?: string;
  thumbnail?: string;
  tags?: string[];
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
  isLiked?: boolean;
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
  query: string;
  page?: number;
  size?: number;
}
export type SearchDiaryRes = DiaryListRes;
export type RecommendDiaryRes = DiaryListRes;
