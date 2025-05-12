import DiaryCard from '@/components/DiaryCard';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface DiaryMasonryProps {
  items: any[]; // Diary[]
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

const COLUMN_COUNT = 2;

const DiaryMasonry: React.FC<DiaryMasonryProps> = ({
  items,
  onLoadMore,
  hasMore = false,
  loading = false,
}) => {
  const [itemHeights, setItemHeights] = useState<{ [id: string]: number }>({});
  const [columns, setColumns] = useState<any[][]>(Array.from({ length: COLUMN_COUNT }, () => []));
  const [itemIndexMap, setItemIndexMap] = useState<{ [id: string]: number }>({});
  const cardRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 监听每个卡片高度
  useEffect(() => {
    const observers: ResizeObserver[] = [];
    items.forEach((item) => {
      const id = item.id;
      const el = cardRefs.current[id];
      if (el) {
        const observer = new ResizeObserver((entries) => {
          for (let entry of entries) {
            const h = entry.contentRect.height;
            setItemHeights((prev) => {
              if (prev[id] !== h) {
                return { ...prev, [id]: h };
              }
              return prev;
            });
          }
        });
        observer.observe(el);
        observers.push(observer);
      }
    });
    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [items]);

  // 交替分配 items 到两列（左右左右）并记录原始索引
  useEffect(() => {
    const cols: any[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    const itemIndexMap: { [id: string]: number } = {};
    items.forEach((item, idx) => {
      cols[idx % COLUMN_COUNT].push(item);
      itemIndexMap[item.id] = idx;
    });
    setColumns(cols);
    setItemIndexMap(itemIndexMap);
  }, [items]);

  // 滚动到底部自动加载更多
  const handleScroll = useCallback(() => {
    if (!containerRef.current || loading || !hasMore) return;
    const el = containerRef.current;
    // 距底部 100px 内触发
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      onLoadMore && onLoadMore();
    }
  }, [onLoadMore, loading, hasMore]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto py-20 px-4 clearfix"
      style={{ position: 'relative' }}
    >
      <div className="w-1/2 float-left pr-1 box-border">
        {columns[0].map((item: any) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (itemIndexMap[item.id] || 0) * 0.15 }}
          >
            <DiaryCard
              diary={item}
              ref={(el: HTMLDivElement | null) => (cardRefs.current[item.id] = el)}
            />
          </motion.div>
        ))}
      </div>
      <div className="w-1/2 float-left pl-1 box-border">
        {columns[1].map((item: any) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (itemIndexMap[item.id] || 0) * 0.15 }}
          >
            <DiaryCard
              diary={item}
              ref={(el: HTMLDivElement | null) => (cardRefs.current[item.id] = el)}
            />
          </motion.div>
        ))}
      </div>
      <div className="clear-both" />
      <div className="w-full flex justify-center items-center py-4 text-gray-400 text-sm select-none">
        {loading ? '加载中...' : hasMore ? '' : '没有更多了'}
      </div>
    </div>
  );
};

export default DiaryMasonry;
