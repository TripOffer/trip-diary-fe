import React, { useRef, useEffect, useState, RefObject } from 'react';
import styles from './TopBar.module.scss';
import { Icon } from '@iconify/react';
import { Button } from 'tdesign-mobile-react';

interface TopBarProps {
  scrollContainerRef: RefObject<HTMLDivElement>;
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  scrollContainerRef,
  searchValue,
  onSearchChange,
  onSearchSubmit,
}) => {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = container.scrollTop;
          if (scrollY <= 60) {
            setHidden(false);
          } else if (scrollY - lastScroll.current > 5 && scrollY > 60) {
            setHidden(true);
          } else if (lastScroll.current - scrollY > 5) {
            setHidden(false);
          }
          lastScroll.current = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [scrollContainerRef]);

  return (
    <div className={styles.topBar + (hidden ? ' ' + styles.hide : '')}>
      <div className={styles.searchBox} style={{ padding: 0 }}>
        <span className={styles.searchIcon}>
          <Icon icon="mdi:magnify" width="20" height="20" />
        </span>
        <input
          className={styles.placeholder}
          type="search"
          enterKeyHint="search"
          placeholder="搜索日记、@用户、#标签"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearchSubmit();
          }}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            flex: 1,
            fontSize: 16,
            color: '#333',
          }}
        />
        <Button
          className={styles.searchButton}
          theme="light"
          size="medium"
          onClick={onSearchSubmit}
          style={{ marginLeft: 8 }}
        >
          搜索
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
