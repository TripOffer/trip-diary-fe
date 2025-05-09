import React from 'react';
import { Image } from 'tdesign-mobile-react';
import SimpleSkeleton from './SimpleSkeleton';
import Avatar from 'tdesign-mobile-react/es/avatar/Avatar';
import { Icon } from '@iconify/react';

export interface Tag {
  id: string;
  name: string;
}

export interface Author {
  id: number | string;
  name: string;
  avatar: string;
}

export interface Diary {
  id: string;
  authorId: number | string;
  title: string;
  slug: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  shareCount?: number;
  publishedAt: string;
  updatedAt: string;
  tags: Tag[];
  author: Author;
  isLiked?: boolean;
  liked?: boolean;
  width?: number;
  height?: number;
}

export interface DiaryCardProps {
  diary: Diary;
}

const MAX_RATIO = 4 / 3;
const MIN_RATIO = 3 / 4;
const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';

const DiaryCard: React.FC<DiaryCardProps> = ({ diary }) => {
  const { thumbnail, title, author, likeCount, isLiked, liked, width, height } = diary;
  const [autoWidth, setAutoWidth] = React.useState<number | undefined>(width);
  const [autoHeight, setAutoHeight] = React.useState<number | undefined>(height);
  const handleImageLoad = (context: { e: React.SyntheticEvent<HTMLImageElement> }) => {
    if (!width || !height) {
      const target = context.e.target as HTMLImageElement;
      setAutoWidth(target.naturalWidth);
      setAutoHeight(target.naturalHeight);
    }
  };
  let ratio = autoWidth && autoHeight ? autoWidth / autoHeight : 1;
  if (ratio > MAX_RATIO) ratio = MAX_RATIO;
  if (ratio < MIN_RATIO) ratio = MIN_RATIO;
  const wrapperStyle: React.CSSProperties = { width: '100%', aspectRatio: String(ratio) };

  const avatarUrl = author && author.avatar ? OSS_PREFIX + author.avatar : undefined;
  const authorName = author && author.name ? author.name : '未知用户';
  const likedState = typeof isLiked === 'boolean' ? isLiked : liked;

  return (
    <div
      className="w-full box-border bg-white overflow-hidden rounded-md shadow-sm flex flex-col p-0"
      style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)' }}
    >
      <div
        className="w-full relative flex items-center justify-center bg-gray-100 overflow-hidden"
        style={{ ...wrapperStyle }}
      >
        <Image
          src={OSS_PREFIX + thumbnail}
          alt={title}
          fit="cover"
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          loading={<SimpleSkeleton className="w-full h-full" />}
          error={<SimpleSkeleton className="w-full h-full" />}
        />
      </div>
      <div className="px-3 pt-2 pb-3 flex flex-col gap-1">
        <p className="text-sm text-gray-900 line-clamp-2 leading-tight mb-1 text-left">{title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-left min-w-0">
            <Avatar shape="circle" image={avatarUrl} size="24px" />
            <span className="text-xs text-gray-500 font-medium truncate">{authorName}</span>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <Icon
              icon={likedState ? 'mdi:heart' : 'mdi:heart-outline'}
              color={likedState ? '#f43f5e' : '#aaa'}
              width={18}
              height={18}
            />
            <span className="text-xs text-gray-500 font-medium">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;
