import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Cell, Divider } from 'tdesign-mobile-react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';

// 应用版本信息
const APP_VERSION = '1.0.0';
const BUILD_NUMBER = '20250514';

const AboutPage: React.FC = () => {
  const { t } = useTranslation('settings');
  const statusBarHeight = getStatusBarHeight();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.aboutPage}>
      {/* 页面头部 */}
      <div
        className={styles.header}
        style={{ paddingTop: statusBarHeight, height: statusBarHeight + 60 }}
      >
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>{t('aboutTitle')}</h1>
        <div className={styles.dummySpace}></div>
      </div>

      {/* 应用信息 */}
      <div className={styles.appInfo}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Icon icon="mdi:book-open-page-variant" width="48" height="48" color="#0052d9" />
          </div>
        </div>
        <h2 className={styles.appName}>{t('about')}</h2>
        <div className={styles.versionInfo}>
          版本 {APP_VERSION}（{BUILD_NUMBER}）
        </div>
      </div>

      <Divider />

      {/* 详细信息列表 */}
      <div className={styles.infoList}>
        <Cell title={t('featureIntro')} note={t('featureIntroNote')} className={styles.cell} />

        <Cell
          title={t('userAgreement')}
          arrow
          onClick={() => navigate('/agreement')}
          className={styles.cell}
        />

        <Cell
          title={t('privacyPolicy')}
          arrow
          onClick={() => navigate('/privacy')}
          className={styles.cell}
        />
      </div>

      <Divider />

      {/* 底部联系信息 */}
      <div className={styles.contactInfo}>
        <p className={styles.companyText}>
          {t('about')} - {t('featureIntroNote')}
        </p>
        <p className={styles.companyText}>© 2025 {t('company')}</p>
        <p className={styles.companyText}>{t('rights')}</p>
        <p>{t('contact')}</p>
        <p>{t('website')}</p>
      </div>
    </div>
  );
};

export default AboutPage;
