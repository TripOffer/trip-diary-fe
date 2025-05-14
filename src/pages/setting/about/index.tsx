import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Cell, Divider } from 'tdesign-mobile-react';
import styles from './index.module.scss';

// 应用版本信息
const APP_VERSION = '1.0.0';
const BUILD_NUMBER = '20240530';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.aboutPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>关于旅行日记</h1>
        <div className={styles.dummySpace}></div>
      </div>

      {/* 应用信息 */}
      <div className={styles.appInfo}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Icon icon="mdi:book-open-page-variant" width="48" height="48" color="#0052d9" />
          </div>
        </div>
        <h2 className={styles.appName}>旅行日记</h2>
        <div className={styles.versionInfo}>
          版本 {APP_VERSION}（{BUILD_NUMBER}）
        </div>
      </div>

      <Divider />

      {/* 详细信息列表 */}
      <div className={styles.infoList}>
        <Cell title="功能介绍" note="记录旅行点滴，分享精彩瞬间" className={styles.cell} />

        <Cell
          title="用户协议"
          arrow
          onClick={() => navigate('/agreement')}
          className={styles.cell}
        />

        <Cell title="隐私政策" arrow onClick={() => navigate('/privacy')} className={styles.cell} />
      </div>

      <Divider />

      {/* 底部联系信息 */}
      <div className={styles.contactInfo}>
        <p className={styles.companyText}>旅行日记 - 您的旅途记录者</p>
        <p className={styles.companyText}>© 2024 旅行日记科技有限公司</p>
        <p className={styles.companyText}>保留所有权利</p>
        <p>联系我们: support@trip-diary.com</p>
        <p>官方网站: www.trip-diary.com</p>
      </div>
    </div>
  );
};

export default AboutPage;
