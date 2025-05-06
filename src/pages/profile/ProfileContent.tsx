import React, { useState } from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import styles from './ProfileContent.module.scss';

const TabContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | number>('notes');

  return (
    <div className={styles.content}>
      <div className={styles.tabsHeader}>
        <div
          className={`${styles.tabItem} ${activeTab === 'notes' ? styles.active : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          笔记
        </div>
        <div
          className={`${styles.tabItem} ${activeTab === 'collections' ? styles.active : ''}`}
          onClick={() => setActiveTab('collections')}
        >
          <Icon icon="material-symbols:bookmark-outline" width="16" /> 收藏
        </div>
        <div
          className={`${styles.tabItem} ${activeTab === 'liked' ? styles.active : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          赞过
        </div>
      </div>

      {activeTab === 'notes' && (
        <div className={styles.notesContainer}>
          <div className={styles.notesHeader}>
            <div className={styles.notesType}>
              <div className={`${styles.typeItem} ${styles.active}`}>公开 0</div>
              <div className={styles.typeItem}>
                <Icon icon="material-symbols:lock" width="14" /> 私密 2
              </div>
              <div className={styles.typeItem}>合集 0</div>
            </div>
            <Icon icon="material-symbols:search" width="20" />
          </div>

          <div className={styles.emptyNotes}>
            <div className={styles.emptyIcon}>
              <Icon icon="material-symbols:image" width="64" color="#ddd" />
            </div>
            <div className={styles.emptyText}>晒出你的offer</div>
            <Button shape="round" size="small" className={styles.publishBtn}>
              去发布
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'collections' && (
        <div className={styles.collectionsContainer}>
          <div className={styles.emptyNotes}>
            <div className={styles.emptyIcon}>
              <Icon icon="material-symbols:bookmark-outline" width="64" color="#ddd" />
            </div>
            <div className={styles.emptyText}>还没有收藏内容</div>
          </div>
        </div>
      )}

      {activeTab === 'liked' && (
        <div className={styles.likedContainer}>
          <div className={styles.emptyNotes}>
            <div className={styles.emptyIcon}>
              <Icon icon="material-symbols:favorite-outline" width="64" color="#ddd" />
            </div>
            <div className={styles.emptyText}>还没有赞过内容</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabContent;
