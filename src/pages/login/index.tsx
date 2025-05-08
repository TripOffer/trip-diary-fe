import React, { useState } from 'react';
import { Button, Input, Message } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authApi } from '@/service/api/auth';
import styles from './index.module.scss';

// 定义表单类型
type FormType = 'login' | 'register';

const Login: React.FC = () => {
  const { t } = useTranslation();

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

      const res = await authApi.sendCode({ email: registerForm.email });

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
      const res = await authApi.login({
        email: loginForm.email,
        password: loginForm.password,
      });

      Message.success({
        content: t('login.loginSuccess'),
        duration: 1500,
      });

      setTimeout(() => navigate('/'), 1600);
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
      const res = await authApi.register({
        email: registerForm.email,
        password: registerForm.password,
        code: registerForm.verifyCode,
      });

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
    } catch (error) {
      Message.error({
        content: error instanceof Error ? error.message : t('login.registerFailed'),
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <>
      <div className={styles.formTitle}>
        {formType === 'login' ? t('login.loginTitle') : t('login.registerTitle')}
      </div>

      <div className={styles.formItem}>
        <Input
          placeholder={t('login.email')}
          value={loginForm.email}
          onChange={(val) => handleLoginInputChange(val, 'email')}
          prefixIcon={<Icon icon="material-symbols:mail" />}
          type="text"
        />
      </div>

      <div className={styles.formItem}>
        <Input
          placeholder={t('login.password')}
          value={loginForm.password}
          onChange={(val) => handleLoginInputChange(val, 'password')}
          prefixIcon={<Icon icon="material-symbols:lock" />}
          type="password"
        />
      </div>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <div className={styles.formTitle}>
        {formType === 'login' ? t('login.loginTitle') : t('login.registerTitle')}
      </div>

      <div className={styles.formItem}>
        <Input
          placeholder={t('login.email')}
          value={registerForm.email}
          onChange={(val) => handleRegisterInputChange(val, 'email')}
          prefixIcon={<Icon icon="material-symbols:mail" />}
          type="text"
        />
      </div>

      <div className={styles.formItem}>
        <Input
          placeholder={t('login.password')}
          value={registerForm.password}
          onChange={(val) => handleRegisterInputChange(val, 'password')}
          prefixIcon={<Icon icon="material-symbols:lock" />}
          type="password"
        />
      </div>

      <div className={styles.formItem}>
        <div className={styles.codeInput}>
          <Input
            placeholder={t('login.verifyCode')}
            value={registerForm.verifyCode}
            onChange={(val) => handleRegisterInputChange(val, 'verifyCode')}
            prefixIcon={<Icon icon="material-symbols:shield-lock" />}
            type="text"
          />
          <Button
            variant="outline"
            className={styles.codeButton}
            onClick={handleSendCode}
            disabled={counting}
          >
            {counting ? `${countdown}${t('login.resendAfter')}` : t('login.getVerifyCode')}
          </Button>
        </div>
      </div>
    </>
  );

  const renderActionButton = () => (
    <Button
      block
      className={styles.actionButton}
      loading={loading}
      onClick={formType === 'login' ? handleLogin : handleRegister}
    >
      {formType === 'login' ? t('login.loginButton') : t('login.registerButton')}
    </Button>
  );

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginHeader}>
        <div className={styles.headerImage}></div>
        <h1 className={styles.title}>{t('login.title')}</h1>
        <p className={styles.subtitle}>{t('login.subtitle')}</p>
      </div>

      {/* 表单区域 */}
      <div className={styles.formContainer}>
        <div className={styles.loginForm}>
          {formType === 'login' ? renderLoginForm() : renderRegisterForm()}

          <div className={styles.formActions}>{renderActionButton()}</div>

          <div className={styles.switchButtons}>
            {formType === 'login' ? (
              <div className={styles.switchText}>
                <span>{t('login.noAccount')}</span>
                <span className={styles.switchLink} onClick={() => toggleFormType('register')}>
                  {t('login.register')}
                </span>
              </div>
            ) : (
              <div className={styles.switchText}>
                <span>{t('login.hasAccount')}</span>
                <span className={styles.switchLink} onClick={() => toggleFormType('login')}>
                  {t('login.goLogin')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.loginFooter}>
        <p>
          {t('login.agreement')} {t('login.userAgreement')} {t('login.and')}{' '}
          {t('login.privacyPolicy')}
        </p>
      </div>
    </div>
  );
};

export default Login;
