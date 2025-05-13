import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const PrivacyPolicyPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t('privacyPolicy.title');
  }, [t]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" width={24} height={24} />
        </div>
        <div className={styles.navbarTitle}>{t('legal.privacyPolicy')}</div>
        <div className={styles.navbarRight}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{t('privacyPolicy.title')}</h1>

        <p className={styles.paragraph}>{t('privacyPolicy.welcome')}</p>
        <p className={styles.paragraph}>{t('privacyPolicy.intro')}</p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacyPolicy.collection.title')}</h2>
          <p className={styles.subtitle}>{t('privacyPolicy.collection.subtitle1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.collection.content1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.collection.content2')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.collection.content3')}</p>

          <p className={styles.subtitle}>{t('privacyPolicy.collection.subtitle2')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.collection.content4')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.collection.content5')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.collection.content6')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacyPolicy.usage.title')}</h2>
          <p className={styles.subtitle}>{t('privacyPolicy.usage.subtitle1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.usage.content1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.usage.content2')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.usage.content3')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.usage.content4')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.usage.content5')}</p>

          <p className={styles.paragraph}>{t('privacyPolicy.usage.subtitle2')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacyPolicy.sharing.title')}</h2>
          <p className={styles.subtitle}>{t('privacyPolicy.sharing.subtitle')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.sharing.content1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.sharing.content2')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.sharing.content3')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.sharing.content4')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacyPolicy.storage.title')}</h2>
          <p className={styles.subtitle}>{t('privacyPolicy.storage.subtitle1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.storage.content1')}</p>
          <p className={styles.subtitle}>{t('privacyPolicy.storage.subtitle2')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.storage.content2')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacyPolicy.security.title')}</h2>
          <p className={styles.paragraph}>{t('privacyPolicy.security.content1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.security.content2')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacyPolicy.rights.title')}</h2>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.intro')}</p>

          <h3 className={styles.subSectionTitle}>{t('privacyPolicy.rights.access.title')}</h3>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.access.content1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.access.content2')}</p>

          <h3 className={styles.subSectionTitle}>{t('privacyPolicy.rights.correction.title')}</h3>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.correction.content')}</p>

          <h3 className={styles.subSectionTitle}>{t('privacyPolicy.rights.deletion.title')}</h3>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.deletion.content')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.deletion.content1')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.deletion.content2')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.deletion.content3')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.deletion.content4')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.rights.deletion.content5')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacyPolicy.changes.title')}</h2>
          <p className={styles.paragraph}>{t('privacyPolicy.changes.content')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacyPolicy.contact.title')}</h2>
          <p className={styles.paragraph}>{t('privacyPolicy.contact.content')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.contact.email')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.contact.phone')}</p>
          <p className={styles.paragraph}>{t('privacyPolicy.contact.response')}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <Button block theme="primary" onClick={handleBack}>
          {i18n.language === 'zh-CN' ? '我已阅读并同意' : 'I have read and agreed'}
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
