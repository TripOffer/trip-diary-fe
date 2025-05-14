import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Button, Dialog, DialogProps } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useAuthStore } from '@/store/auth';
import Toast from '@/utils/toast';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';

const SettingPage: React.FC = () => {
  const navigate = useNavigate();
  const statusBarHeight = getStatusBarHeight();
  const authStore = useAuthStore();
  const [dialogProps, setDialogProps] = useState<DialogProps>({ visible: false });
  const { t } = useTranslation('settings');

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogoutClick = () => {
    setDialogProps({
      visible: true,
      title: t('logoutDialogTitle'),
      content: t('logoutDialogContent'),
      confirmBtn: t('confirm'),
      cancelBtn: t('cancel'),
      onConfirm: handleLogoutConfirm,
    });
  };

  const handleLogoutConfirm = () => {
    authStore.clearToken();
    authStore.clearUser();
    Toast.success(t('logoutSuccess'));
    navigate('/login', { replace: true });
    setDialogProps({ ...dialogProps, visible: false });
  };

  const handleSwitchAccountClick = () => {
    setDialogProps({
      visible: true,
      title: t('switchDialogTitle'),
      content: t('switchDialogContent'),
      confirmBtn: t('confirm'),
      cancelBtn: t('cancel'),
      onConfirm: handleSwitchAccountConfirm,
    });
  };

  const handleSwitchAccountConfirm = () => {
    // 清除用户token和信息
    authStore.clearToken();
    authStore.clearUser();
    navigate('/login');
    setDialogProps({ ...dialogProps, visible: false });
  };

  const closeDialog = () => {
    setDialogProps({ ...dialogProps, visible: false });
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        style={{ paddingTop: statusBarHeight, height: 60 + statusBarHeight }}
      >
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>{t('title')}</h1>
        <div className={styles.dummySpace}></div>
      </div>

      <div className={styles.content}>
        {/* 通用设置 */}
        <div className={styles.section}>
          <Cell
            title={t('common')}
            leftIcon={<Icon icon="mdi:cog" />}
            arrow
            onClick={() => navigate('/setting/common')}
            className={styles.cell}
          />
          <Cell
            title={t('preference')}
            leftIcon={<Icon icon="mdi:tune" />}
            arrow
            onClick={() => navigate('/setting/preference')}
            className={styles.cell}
          />
        </div>

        {/* 帮助与关于 */}
        <div className={styles.section}>
          <Cell
            title={t('support')}
            leftIcon={<Icon icon="mdi:help-circle" />}
            arrow
            onClick={() => navigate('/setting/support')}
            className={styles.cell}
          />

          <Cell
            title={t('about')}
            leftIcon={<Icon icon="mdi:information" />}
            arrow
            onClick={() => navigate('/setting/about')}
            className={styles.cell}
          />

          <Cell title={t('storage')} note="136 MB" className={styles.cell} />
        </div>

        {/* 账号操作 */}
        <div className={styles.accountActions}>
          <Button block onClick={handleSwitchAccountClick} className={styles.switchBtn}>
            {t('switchAccount')}
          </Button>

          <Button block theme="danger" onClick={handleLogoutClick} className={styles.logoutBtn}>
            {t('logout')}
          </Button>
        </div>

        {/* 隐私政策 */}
        <div className={styles.privacyLinks}>
          <span onClick={() => navigate('/agreement')}>{t('userAgreement')}</span>
          <span onClick={() => navigate('/privacy')}>{t('privacyPolicy')}</span>
        </div>
      </div>

      {/* 对话框组件 */}
      <Dialog
        visible={dialogProps.visible}
        title={dialogProps.title}
        content={dialogProps.content}
        confirmBtn={dialogProps.confirmBtn}
        cancelBtn={dialogProps.cancelBtn}
        onClose={closeDialog}
        onConfirm={dialogProps.onConfirm}
        onCancel={closeDialog}
      />
    </div>
  );
};

export default SettingPage;
