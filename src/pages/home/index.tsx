import { getStatusBarHeight } from '@/utils/getStatusBarHeight';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Image, Switch, Toast } from 'tdesign-mobile-react';
import axios from 'axios';

// 工具函数：将图片url转为base64
async function urlToBase64(url: string): Promise<string> {
  const res = await axios.get(url, { responseType: 'blob' });
  const blob = res.data;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const demoImgUrl = 'https://oss.trip.mengchen.xyz/202412032339610.jpg';

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
      <Image src="https://image.trip.mengchen.xyz/?url=https://oss.trip.mengchen.xyz/202412032339610.jpg" />
      <Button
        onClick={async () => {
          const base64 = await urlToBase64(demoImgUrl);
          window.Android?.shareImageBase64?.(base64, 'demo.jpg', '分享图片');
        }}
        className="my-2 mx-2"
        block
      >
        分享图片（base64）
      </Button>
      <Button
        onClick={async () => {
          const base64 = await urlToBase64(demoImgUrl);
          const success = window.Android?.saveImageToGallery?.(base64, 'demo.jpg');
          Toast({
            message: success ? '保存成功' : '保存失败',
            theme: success ? 'success' : 'error',
            direction: 'column',
          });
        }}
        className="my-2 mx-2"
        block
      >
        保存图片到相册
      </Button>
      <Button
        onClick={() => {
          window.Android?.shareText?.('这是要分享的内容', '分享文字标题');
        }}
        className="my-2 mx-2"
        block
      >
        分享文字
      </Button>
    </div>
  );
};

export default Home;
