import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Cell, Radio, Message } from 'tdesign-mobile-react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const CommonSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('settings');

  // 当前语言
  const [language, setLanguage] = useState<string>(i18n.language);

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  // 处理语言切换
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
    Message.success(
      value === 'zh-CN' ? '语言已切换为中文' : 'Language has been changed to English',
    );
  };

  return (
    <div className={styles.settingPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>{t('common')}</h1>
        <div className={styles.dummySpace}></div>
      </div>

      <div className={styles.content}>
        {/* 语言设置 */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Icon icon="mdi:translate" className={styles.sectionIcon} />
            <span>{t('language')}</span>
          </div>
          <div className={styles.optionList}>
            <Cell
              title="简体中文"
              rightIcon={
                <Radio
                  checked={language === 'zh-CN'}
                  onChange={() => handleLanguageChange('zh-CN')}
                />
              }
              onClick={() => handleLanguageChange('zh-CN')}
              className={styles.cell}
            />
            <Cell
              title="English"
              rightIcon={
                <Radio
                  checked={language === 'en-US'}
                  onChange={() => handleLanguageChange('en-US')}
                />
              }
              onClick={() => handleLanguageChange('en-US')}
              className={styles.cell}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonSettingPage;
