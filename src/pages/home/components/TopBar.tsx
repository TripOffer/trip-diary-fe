import React, { useRef, useEffect, useState, RefObject } from 'react';
import styles from './TopBar.module.scss';
import { Icon } from '@iconify/react';

interface TopBarProps {
  scrollContainerRef: RefObject<HTMLDivElement>;
}

const TopBar: React.FC<TopBarProps> = ({ scrollContainerRef }) => {
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
      <div className={styles.fakeSearchBox}>
        <span className={styles.searchIcon}>
          <Icon icon="mdi:magnify" width="20" height="20" />
        </span>
        <span className={styles.placeholder}>搜索日记、用户、标签</span>
      </div>
    </div>
  );
};

export default TopBar;
