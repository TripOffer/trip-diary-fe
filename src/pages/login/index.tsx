import React, { useState } from 'react';
import { Button, Input, Toast } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

// 定义表单类型
type FormType = 'login' | 'register';

const Login: React.FC = () => {
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
  const handleSendCode = () => {
    if (!registerForm.email) {
      Toast.warning({
        message: '请输入邮箱',
        duration: 2000,
      });
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      Toast.warning({
        message: '请输入有效的邮箱地址',
        duration: 2000,
      });
      return;
    }

    // 启动倒计时
    setCounting(true);
    setCountdown(60);

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

    Toast.success({
      message: '验证码已发送',
      duration: 2000,
    });
  };

  // 处理登录
  const handleLogin = () => {
    if (!loginForm.email) {
      Toast.warning({
        message: '请输入邮箱',
        duration: 2000,
      });
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) {
      Toast.warning({
        message: '请输入有效的邮箱地址',
        duration: 2000,
      });
      return;
    }

    if (!loginForm.password) {
      Toast.warning({
        message: '请输入密码',
        duration: 2000,
      });
      return;
    }

    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      setLoading(false);
      Toast.success({
        message: '登录成功',
        duration: 1500,
      });
      setTimeout(() => navigate('/'), 1600);
    }, 1500);
  };

  // 处理注册
  const handleRegister = () => {
    if (!registerForm.email) {
      Toast.warning({
        message: '请输入邮箱',
        duration: 2000,
      });
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      Toast.warning({
        message: '请输入有效的邮箱地址',
        duration: 2000,
      });
      return;
    }

    if (!registerForm.password) {
      Toast.warning({
        message: '请输入密码',
        duration: 2000,
      });
      return;
    }

    if (!registerForm.verifyCode) {
      Toast.warning({
        message: '请输入验证码',
        duration: 2000,
      });
      return;
    }

    setLoading(true);

    // 模拟注册请求
    setTimeout(() => {
      setLoading(false);
      Toast.success({
        message: '注册成功',
        duration: 1500,
      });
      // 注册成功后切换到登录
      setFormType('login');
    }, 1500);
  };

  // 渲染登录表单
  const renderLoginForm = () => (
    <>
      <div className={styles.formTitle}>{formType === 'login' ? '登录' : '注册'}</div>

      <div className={styles.formItem}>
        <Input
          placeholder="请输入邮箱"
          value={loginForm.email}
          onChange={(val) => handleLoginInputChange(val, 'email')}
          prefixIcon={<Icon icon="material-symbols:mail" />}
          clearable
          type="text"
        />
      </div>

      <div className={styles.formItem}>
        <Input
          placeholder="请输入密码"
          value={loginForm.password}
          onChange={(val) => handleLoginInputChange(val, 'password')}
          prefixIcon={<Icon icon="material-symbols:lock" />}
          clearable
          type="password"
        />
      </div>
    </>
  );

  // 渲染注册表单
  const renderRegisterForm = () => (
    <>
      <div className={styles.formTitle}>{formType === 'login' ? '登录' : '注册'}</div>

      <div className={styles.formItem}>
        <Input
          placeholder="请输入邮箱"
          value={registerForm.email}
          onChange={(val) => handleRegisterInputChange(val, 'email')}
          prefixIcon={<Icon icon="material-symbols:mail" />}
          clearable
          type="text"
        />
      </div>

      <div className={styles.formItem}>
        <Input
          placeholder="请输入密码"
          value={registerForm.password}
          onChange={(val) => handleRegisterInputChange(val, 'password')}
          prefixIcon={<Icon icon="material-symbols:lock" />}
          clearable
          type="password"
        />
      </div>

      <div className={styles.formItem}>
        <div className={styles.codeInput}>
          <Input
            placeholder="请输入验证码"
            value={registerForm.verifyCode}
            onChange={(val) => handleRegisterInputChange(val, 'verifyCode')}
            prefixIcon={<Icon icon="material-symbols:shield-lock" />}
            clearable
            type="text"
          />
          <Button
            variant="outline"
            className={styles.codeButton}
            onClick={handleSendCode}
            disabled={counting}
          >
            {counting ? `${countdown}秒后重发` : '获取验证码'}
          </Button>
        </div>
      </div>
    </>
  );

  // 渲染提交按钮
  const renderActionButton = () => (
    <Button
      block
      className={styles.actionButton}
      loading={loading}
      onClick={formType === 'login' ? handleLogin : handleRegister}
    >
      {formType === 'login' ? '登 录' : '注 册'}
    </Button>
  );

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginHeader}>
        <div className={styles.headerImage}></div>
        <h1 className={styles.title}>旅途日记</h1>
        <p className={styles.subtitle}>记录旅行，分享生活</p>
      </div>

      {/* 表单区域 */}
      <div className={styles.formContainer}>
        <div className={styles.loginForm}>
          {formType === 'login' ? renderLoginForm() : renderRegisterForm()}

          <div className={styles.formActions}>{renderActionButton()}</div>

          <div className={styles.switchButtons}>
            {formType === 'login' ? (
              <div className={styles.switchText}>
                <span>没有账号？</span>
                <span className={styles.switchLink} onClick={() => toggleFormType('register')}>
                  立即注册
                </span>
              </div>
            ) : (
              <div className={styles.switchText}>
                <span>已有账号？</span>
                <span className={styles.switchLink} onClick={() => toggleFormType('login')}>
                  去登录
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.loginFooter}>
        <p>登录或注册即代表同意《用户协议》和《隐私政策》</p>
      </div>
    </div>
  );
};

export default Login;
