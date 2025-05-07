import { getStatusBarHeight } from '@/utils/getStatusBarHeight';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Switch } from 'tdesign-mobile-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [immersive, setImmersive] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [usePaddingTop, setUsePaddingTop] = useState(true);

  useEffect(() => {
    if (window.Android) {
      console.log('Android bridge detected');
    }
  }, []);

  useEffect(() => {
    setStatusBarHeight(getStatusBarHeight());
  }, []);

  return (
    <div
      className={`p-4 box-border bg-[#DDEEFF] ${usePaddingTop ? '' : ''}`}
      style={{
        marginTop: usePaddingTop ? statusBarHeight : 0,
      }}
    >
      <div className="mb-2">首页（Home）</div>
      <Button onClick={() => navigate('/search')} className="my-2 mx-2" theme="primary" block>
        进入搜索页
      </Button>
      <Button onClick={() => navigate('/diary/123')} className="my-2 mx-2" theme="primary" block>
        进入详细页（示例ID:123）
      </Button>
      <hr className="my-2" />
      <Button
        onClick={() => window.Android?.showToast?.('Hello from JS!')}
        className="my-2 mx-2"
        block
      >
        测试 showToast
      </Button>
      <div className="my-2 mx-2 flex items-center">
        <span className="mr-2">沉浸式状态栏</span>
        <Switch
          value={immersive}
          onChange={(val) => {
            const boolVal = val === true || val === 'true';
            setImmersive(boolVal);
            window.Android?.setImmersiveStatusBar?.(boolVal);
          }}
        />
      </div>
      <div className="my-2 mx-2 flex items-center">
        <span className="mr-2">状态栏深色模式</span>
        <Switch
          value={darkMode}
          onChange={(val) => {
            const boolVal = val === true || val === 'true';
            setDarkMode(boolVal);
            window.Android?.setStatusBarLightMode?.(boolVal);
          }}
        />
      </div>
      <div className="my-2 mx-2 flex items-center">
        <span className="mr-2">隐藏状态栏（全屏）</span>
        <Switch
          value={fullScreen}
          onChange={(val) => {
            const boolVal = val === true || val === 'true';
            setFullScreen(boolVal);
            window.Android?.setFullScreen?.(boolVal);
          }}
        />
      </div>
      <div className="my-2 mx-2 flex items-center">
        <span className="mr-2">顶部 paddingTop</span>
        <Switch
          value={usePaddingTop}
          onChange={(val) => {
            const boolVal = val === true || val === 'true';
            setUsePaddingTop(boolVal);
          }}
        />
      </div>
      <Button
        onClick={() => window.Android?.setStatusBarColor?.('#FF0000')}
        className="my-2 mx-2"
        block
      >
        设置状态栏为红色
      </Button>
      <Button className="my-2 mx-2" block>
        获取状态栏高度（px）：{statusBarHeight}
      </Button>
    </div>
  );
};

export default Home;
