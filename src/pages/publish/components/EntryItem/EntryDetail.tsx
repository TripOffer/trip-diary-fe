import React from 'react';
import { Icon } from '@iconify/react';
interface EntryDetailProps {
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  shareCount: number;
}

const iconStyle = { fontSize: 18 };

const EntryDetail: React.FC<EntryDetailProps> = ({
  viewCount,
  likeCount,
  favoriteCount,
  commentCount,
  shareCount,
}) => {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <span className="flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
        <Icon icon="mdi:eye-outline" style={iconStyle} />
        {viewCount.toLocaleString()}
      </span>
      <span className="flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
        <Icon icon="mdi:heart-outline" style={iconStyle} />
        {likeCount.toLocaleString()}
      </span>
      <span className="flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
        <Icon icon="mdi:star-outline" style={iconStyle} />
        {favoriteCount.toLocaleString()}
      </span>
      <span className="flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
        <Icon icon="mdi:comment-outline" style={iconStyle} />
        {commentCount.toLocaleString()}
      </span>
      <span className="flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
        <Icon icon="mdi:share-outline" style={iconStyle} />
        {shareCount.toLocaleString()}
      </span>
    </div>
  );
};

export default EntryDetail;
