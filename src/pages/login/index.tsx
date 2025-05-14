import React, { useState } from 'react';
import { Button, Input, Message } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authApi } from '@/service/api/auth';
import { useAuthStore } from '@/store/auth';
import styles from './index.module.scss';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';

// 定义表单类型
type FormType = 'login' | 'register';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const statusBarHeight = getStatusBarHeight();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  // 当前表单类型
  const [formType, setFormType] = useState<FormType>('login');

  // 登录表单数据
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // 注册表单数据
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    verifyCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [counting, setCounting] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const navigate = useNavigate();

  // 处理登录表单输入变化
  const handleLoginInputChange = (value: string | number, name: string) => {
    setLoginForm({
      ...loginForm,
      [name]: value.toString(),
    });
  };

  // 处理注册表单输入变化
  const handleRegisterInputChange = (value: string | number, name: string) => {
    setRegisterForm({
      ...registerForm,
      [name]: value.toString(),
    });
  };

  // 切换表单类型
  const toggleFormType = (type: FormType) => {
    setFormType(type);
  };

  // 发送验证码
  const handleSendCode = async () => {
    if (!registerForm.email) {
      Message.warning({
        content: t('login.emailRequired'),
        duration: 2000,
      });
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      Message.warning({
        content: t('login.emailInvalid'),
        duration: 2000,
      });
      return;
    }

    try {
      setCounting(true);
      setCountdown(60);

      await authApi.sendCode({ email: registerForm.email });

      // 倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCounting(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      Message.success({
        content: t('login.codeSent'),
        duration: 2000,
      });
    } catch (error) {
      // 发送失败时，停止倒计时
      setCounting(false);
      setCountdown(60);

      // 错误提示
      Message.error({
        content: error instanceof Error ? error.message : t('login.sendCodeFailed'),
        duration: 3000,
      });
    }
  };

  // 处理登录
  const handleLogin = async () => {
    if (!loginForm.email) {
      Message.warning({
        content: t('login.emailRequired'),
        duration: 2000,
      });
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) {
      Message.warning({
        content: t('login.emailInvalid'),
        duration: 2000,
      });
      return;
    }

    if (!loginForm.password) {
      Message.warning({
        content: t('login.passwordRequired'),
        duration: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.login({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (response?.data?.token) {
        setToken(response.data.token);
      }
      if (response?.data?.user) {
        setUser(response.data.user);
      }

      Message.success({
        content: t('login.loginSuccess'),
        duration: 1500,
      });

      setTimeout(() => navigate('/', { replace: true }), 1600);
    } catch (error) {
      Message.error({
        content: error instanceof Error ? error.message : t('login.loginFailed'),
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async () => {
    if (!registerForm.email) {
      Message.warning({
        content: t('login.emailRequired'),
        duration: 2000,
      });
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      Message.warning({
        content: t('login.emailInvalid'),
        duration: 2000,
      });
      return;
    }

    if (!registerForm.password) {
      Message.warning({
        content: t('login.passwordRequired'),
        duration: 2000,
      });
      return;
    }

    if (!registerForm.verifyCode) {
      Message.warning({
        content: t('login.verifyCodeRequired'),
        duration: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register({
        email: registerForm.email,
        password: registerForm.password,
        code: registerForm.verifyCode,
      });

      // 存储token
      if (response?.data?.token) {
        setToken(response.data.token);
        console.log('注册成功，Token已存储');
      }
      if (response?.data?.user) {
        setUser(response.data.user);
      }

      Message.success({
        content: t('login.registerSuccess'),
        duration: 1500,
      });

      const newLoginForm = {
        ...loginForm,
        email: registerForm.email,
        password: '',
      };
      setLoginForm(newLoginForm);
      setFormType('login');
      // 注册成功后跳转到首页并替换历史记录
      setTimeout(() => navigate('/', { replace: true }), 1600);
    } catch (error) {
      console.error('注册失败:', error);
      Message.error({
        content: error instanceof Error ? error.message : t('login.registerFailed'),
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // 返回按钮处理
  const handleBack = () => {
    if (window.history.length <= 1) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container} style={{ paddingTop: `${statusBarHeight}px` }}>
      {/* 返回按钮 */}
      <button className={styles.backBtn} onClick={handleBack}>
        <Icon icon="mdi:arrow-left" width="24" height="24" />
      </button>
      <div className={styles.logo}>
        <Icon icon="mdi:map-marker" width="28" height="28" />
        <h1>{t('login.appName')}</h1>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <div
            className={`${styles.formTab} ${formType === 'login' ? styles.active : ''}`}
            onClick={() => toggleFormType('login')}
          >
            {t('login.loginTab')}
          </div>
          <div
            className={`${styles.formTab} ${formType === 'register' ? styles.active : ''}`}
            onClick={() => toggleFormType('register')}
          >
            {t('login.registerTab')}
          </div>
        </div>

        {formType === 'login' ? (
          <div className={styles.form}>
            <div className={styles.formItem}>
              <Input
                placeholder={t('login.emailPlaceholder')}
                prefixIcon={<Icon icon="mdi:email" width="20" height="20" />}
                value={loginForm.email}
                onChange={(value) => handleLoginInputChange(value, 'email')}
              />
            </div>
            <div className={styles.formItem}>
              <Input
                type="password"
                placeholder={t('login.passwordPlaceholder')}
                prefixIcon={<Icon icon="mdi:lock" width="20" height="20" />}
                value={loginForm.password}
                onChange={(value) => handleLoginInputChange(value, 'password')}
              />
            </div>
            <div className={styles.forgotPassword}>
              <span>{t('login.forgotPassword')}</span>
            </div>
            <Button
              block
              theme="primary"
              className={styles.submitBtn}
              loading={loading}
              onClick={handleLogin}
            >
              {t('login.login')}
            </Button>
          </div>
        ) : (
          <div className={styles.form}>
            <div className={styles.formItem}>
              <Input
                placeholder={t('login.emailPlaceholder')}
                prefixIcon={<Icon icon="mdi:email" width="20" height="20" />}
                value={registerForm.email}
                onChange={(value) => handleRegisterInputChange(value, 'email')}
              />
            </div>
            <div className={styles.formItem}>
              <Input
                type="password"
                placeholder={t('login.passwordPlaceholder')}
                prefixIcon={<Icon icon="mdi:lock" width="20" height="20" />}
                value={registerForm.password}
                onChange={(value) => handleRegisterInputChange(value, 'password')}
              />
            </div>
            <div className={styles.formItem}>
              <div className={styles.codeInputWrapper}>
                <Input
                  placeholder={t('login.codePlaceholder')}
                  prefixIcon={<Icon icon="mdi:shield" width="20" height="20" />}
                  value={registerForm.verifyCode}
                  onChange={(value) => handleRegisterInputChange(value, 'verifyCode')}
                />
                <Button
                  size="small"
                  variant="outline"
                  disabled={counting}
                  onClick={handleSendCode}
                  className={styles.sendCodeBtn}
                >
                  {counting ? `${countdown}s` : t('login.sendCode')}
                </Button>
              </div>
            </div>
            <Button
              block
              theme="primary"
              className={styles.submitBtn}
              loading={loading}
              onClick={handleRegister}
            >
              {t('login.register')}
            </Button>
          </div>
        )}

        <div className={styles.divider}>
          <span>{t('login.orUse')}</span>
        </div>

        <div className={styles.socialLogin}>
          <div className={styles.socialIcon}>
            <Icon icon="mdi:wechat" width="28" height="28" />
          </div>
          <div className={styles.socialIcon}>
            <Icon icon="mdi:apple" width="28" height="28" />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>
          {t('login.footerTerms')} {t('login.footerPrivacy')} {t('login.footerHelp')}{' '}
          {t('login.footerVersion')}
        </p>
      </div>
    </div>
  );
};

export default Login;
