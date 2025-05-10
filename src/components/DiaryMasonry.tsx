import DiaryCard from '@/components/DiaryCard';
import { Masonry } from 'masonic';
import React from 'react';

export interface DiaryItem {
  id: number;
  title: string;
  img: string;
  desc: string;
  width?: number;
  height?: number;
}

export interface DiaryMasonryProps {
  items: any[]; // 直接用 any 或 Diary 类型，兼容新结构
}

const DiaryMasonry: React.FC<DiaryMasonryProps> = ({ items }) => {
  return (
    <Masonry
      columnGutter={8}
      items={items}
      columnCount={2}
      render={({ data }) => <DiaryCard diary={data} />} // 直接传 diary
    />
  );
};

export default DiaryMasonry;
