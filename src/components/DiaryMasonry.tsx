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

  // 虚拟滚动相关
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const OVERSCAN = 400; // 预渲染区域高度

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

  // 计算每列累计高度
  const getColumnMeta = useCallback(() => {
    return columns.map((col) => {
      const heights: number[] = [];
      let acc = 0;
      for (const item of col) {
        const h = itemHeights[item.id] || 220; // 默认高度
        heights.push(acc);
        acc += h;
      }
      return { heights, total: acc };
    });
  }, [columns, itemHeights]);

  // 虚拟滚动：计算可见区间
  const getVisibleRange = useCallback(
    (colIdx: number) => {
      const meta = getColumnMeta()[colIdx];
      const { heights } = meta;
      const start = heights.findIndex(
        (h) =>
          h + (itemHeights[columns[colIdx][heights.indexOf(h)]?.id] || 220) > scrollTop - OVERSCAN,
      );
      let end = heights.findIndex((h) => h > scrollTop + containerHeight + OVERSCAN);
      if (end === -1) end = columns[colIdx].length;
      return [Math.max(0, start), end];
    },
    [getColumnMeta, columns, scrollTop, containerHeight, itemHeights],
  );

  // 滚动事件
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    setScrollTop(containerRef.current.scrollTop);
    setContainerHeight(containerRef.current.clientHeight);
    if (loading || !hasMore) return;
    // 距底部 100px 内触发
    if (
      containerRef.current.scrollHeight -
        containerRef.current.scrollTop -
        containerRef.current.clientHeight <
      100
    ) {
      onLoadMore && onLoadMore();
    }
  }, [onLoadMore, loading, hasMore]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerHeight(el.clientHeight);
    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // 渲染列
  const renderColumn = (colIdx: number) => {
    const col = columns[colIdx];
    const meta = getColumnMeta()[colIdx];
    const [start, end] = getVisibleRange(colIdx);
    const top = meta.heights[start] || 0;
    const bottom = meta.total - (meta.heights[end] || meta.total);
    return (
      <div
        className={
          colIdx === 0 ? 'w-1/2 float-left pr-1 box-border' : 'w-1/2 float-left pl-1 box-border'
        }
        style={{ position: 'relative', minHeight: meta.total }}
      >
        <div style={{ height: top }} />
        {col.slice(start, end).map((item: any, idx: number) => (
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
        <div style={{ height: bottom }} />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto py-20 px-4 clearfix"
      style={{ position: 'relative' }}
    >
      {renderColumn(0)}
      {renderColumn(1)}
      <div className="clear-both" />
      <div className="w-full flex justify-center items-center py-4 text-gray-400 text-sm select-none">
        {loading ? '加载中...' : hasMore ? '' : '没有更多了'}
      </div>
    </div>
  );
};

export default DiaryMasonry;
