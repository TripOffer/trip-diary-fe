import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'tdesign-mobile-react';

const PublishPage = () => {
  const navigate = useNavigate();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (type: 'image' | 'video') => {
    if (type === 'video') {
      videoInputRef.current?.click();
      return;
    }
    if (type === 'image') {
      imageInputRef.current?.click();
      return;
    }
    // 兼容 Toast 组件不可用时，使用浏览器原生 alert
    if (window?.Android && typeof window.Android.showToast === 'function') {
      window.Android.showToast('进入图文发布');
    } else {
      alert('进入图文发布');
    }
    // navigate(`/publish/image`)
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files.length > 100) {
        if (window?.Android && typeof window.Android.showToast === 'function') {
          window.Android.showToast('最多只能选择100张图片');
        } else {
          alert('最多只能选择100张图片');
        }
        return;
      }
      // 将 FileList 转为数组传递
      navigate('/publish/edit', { state: { files: Array.from(files), type: 'image' } });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 传递 type: 'video' 和单个文件
      navigate('/publish/edit', { state: { file: file, type: 'video' } });
    }
  };

  return (
    <div className="min-h-screen bg-white pt-8 px-4">
      {/* 隐藏的文件选择器 */}
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
        multiple // 支持多选
      />
      <input
        type="file"
        accept="video/*"
        ref={videoInputRef}
        style={{ display: 'none' }}
        onChange={handleVideoChange}
      />
      <h2 className="text-2xl font-bold mb-8 text-center">发布</h2>
      <div className="flex gap-4">
        <div className="flex-1">
          <Cell
            title="图文"
            description="发布图文日记"
            leftIcon={<Icon icon="mdi:image" width="32" height="32" />}
            onClick={() => handleClick('image')}
            className="rounded-2xl shadow-md mb-4 bg-gray-50 active:shadow-lg transition-shadow"
          />
        </div>
        <div className="flex-1">
          <Cell
            title="视频"
            description="发布视频日记"
            leftIcon={<Icon icon="mdi:video" width="32" height="32" />}
            onClick={() => handleClick('video')}
            className="rounded-2xl shadow-md mb-4 bg-gray-50 active:shadow-lg transition-shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default PublishPage;
