import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from 'tdesign-mobile-react';
import { useNavigate } from 'react-router-dom';
import styles from '../index.module.scss';

type TabType = '笔记' | '收藏' | '赞过';

const ProfileContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('笔记');
  const navigate = useNavigate();

  const tabs: TabType[] = ['笔记', '收藏', '赞过'];

  const handlePublish = () => {
    navigate('/publish');
  };

  return (
    <>
      {/* 标签栏 */}
      <div className={styles.tabBar}>
        <div className={styles.tabContent}>
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`${styles.tabItem} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* 空状态 */}
      <div className={styles.emptyState}>
        <Icon icon="mdi:image-outline" className={styles.emptyIcon} />
        <div className={styles.emptyText}>晒出你的旅行日记</div>
        <Button
          className={styles.publishBtn}
          icon={<Icon icon="mdi:plus" />}
          onClick={handlePublish}
        >
          去发布
        </Button>
      </div>
    </>
  );
};

export default ProfileContent;
