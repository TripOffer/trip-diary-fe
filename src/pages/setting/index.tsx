import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Button, Dialog, DialogProps } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useAuthStore } from '@/store/auth';
import Toast from '@/utils/toast';
import styles from './index.module.scss';

const SettingPage: React.FC = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [dialogProps, setDialogProps] = useState<DialogProps>({ visible: false });

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogoutClick = () => {
    setDialogProps({
      visible: true,
      title: '退出登录',
      content: '确定要退出登录吗？',
      confirmBtn: '确定',
      cancelBtn: '取消',
      onConfirm: handleLogoutConfirm,
    });
  };

  const handleLogoutConfirm = () => {
    authStore.clearToken();
    authStore.clearUser();
    Toast.success('已退出登录');
    navigate('/login', { replace: true });
    setDialogProps({ ...dialogProps, visible: false });
  };

  const handleSwitchAccountClick = () => {
    setDialogProps({
      visible: true,
      title: '切换账号',
      content: '确定要切换账号吗？当前账号将退出登录',
      confirmBtn: '确定',
      cancelBtn: '取消',
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
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>设置</h1>
        <div className={styles.dummySpace}></div>
      </div>

      <div className={styles.content}>
        {/* 通用设置 */}
        <div className={styles.section}>
          <Cell
            title="通用设置"
            leftIcon={<Icon icon="mdi:cog" />}
            arrow
            onClick={() => Toast.info('功能开发中')}
            className={styles.cell}
          />
          <Cell
            title="内容偏好调节"
            leftIcon={<Icon icon="mdi:tune" />}
            arrow
            onClick={() => Toast.info('功能开发中')}
            className={styles.cell}
          />
        </div>

        {/* 帮助与关于 */}
        <div className={styles.section}>
          <Cell
            title="帮助与客服"
            leftIcon={<Icon icon="mdi:help-circle" />}
            arrow
            onClick={() => Toast.info('功能开发中')}
            className={styles.cell}
          />

          <Cell
            title="关于旅行日记"
            leftIcon={<Icon icon="mdi:information" />}
            arrow
            onClick={() => Toast.info('功能开发中')}
            className={styles.cell}
          />

          <Cell
            title="存储空间"
            note="136 MB"
            onClick={() => Toast.info('功能开发中')}
            className={styles.cell}
          />
        </div>

        {/* 账号操作 */}
        <div className={styles.accountActions}>
          <Button block onClick={handleSwitchAccountClick} className={styles.switchBtn}>
            切换账号
          </Button>

          <Button block theme="danger" onClick={handleLogoutClick} className={styles.logoutBtn}>
            退出登录
          </Button>
        </div>

        {/* 隐私政策 */}
        <div className={styles.privacyLinks}>
          <span onClick={() => Toast.info('功能开发中')}>《个人信息收集清单》</span>
          <span onClick={() => Toast.info('功能开发中')}>《第三方信息共享清单》</span>
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
