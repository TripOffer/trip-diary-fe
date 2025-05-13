/**
 * 日记详情相关类型定义
 */

export interface DiaryDetail {
  id: string;
  title: string;
  content: string;
  images?: string[];
  video?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  viewCount: number;
  author: {
    id: string | number;
    name: string;
    avatar: string;
  };
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  isLiked?: boolean;
  isFavorite?: boolean;
  tags?: Array<{ id: string; name: string }>;
  isFollowedAuthor?: boolean;
  thumbnailMeta?: {
    width: number;
    height: number;
  };
}
