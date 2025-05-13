import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const UserAgreementPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t('userAgreement.title');
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
        <div className={styles.navbarTitle}>{t('legal.userAgreement')}</div>
        <div className={styles.navbarRight}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{t('userAgreement.title')}</h1>

        <p className={styles.paragraph}>{t('userAgreement.welcome')}</p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.serviceIntro.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.serviceIntro.content')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.account.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.account.content1')}</p>
          <p className={styles.paragraph}>{t('userAgreement.account.content2')}</p>
          <p className={styles.paragraph}>{t('userAgreement.account.content3')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.content.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.content.content1')}</p>
          <p className={styles.paragraph}>{t('userAgreement.content.content2')}</p>
          <p className={styles.paragraph}>{t('userAgreement.content.content3')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.ip.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.ip.content1')}</p>
          <p className={styles.paragraph}>{t('userAgreement.ip.content2')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.service.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.service.content1')}</p>
          <p className={styles.paragraph}>{t('userAgreement.service.content2')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.disclaimer.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.disclaimer.content1')}</p>
          <p className={styles.paragraph}>{t('userAgreement.disclaimer.content2')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.modification.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.modification.content')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.law.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.law.content')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('userAgreement.contact.title')}</h2>
          <p className={styles.paragraph}>{t('userAgreement.contact.content')}</p>
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

export default UserAgreementPage;
