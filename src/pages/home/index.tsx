import React, { useRef } from 'react';
import DiaryMasonry from '@/components/DiaryMasonry';
import TopBar from './components/TopBar';
import itemsRaw from './items.mock.json';

const items = itemsRaw as any[];

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <TopBar scrollContainerRef={scrollRef} />
      <div ref={scrollRef} className="h-full overflow-auto px-4 py-20">
        <DiaryMasonry items={items} />
      </div>
    </>
  );
};

export default Home;
