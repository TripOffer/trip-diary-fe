import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'tdesign-mobile-react';

interface PublishEntryProps {
  className?: string;
}

const PublishEntry: React.FC<PublishEntryProps> = ({ className }) => {
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
    if (window?.Android && typeof window.Android.showToast === 'function') {
      window.Android.showToast('进入图文发布');
    } else {
      alert('进入图文发布');
    }
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
        e.target.value = '';
        return;
      }
      navigate('/publish/edit', { state: { files: Array.from(files), type: 'image' } });
    }
    e.target.value = '';
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      navigate('/publish/edit', { state: { file: file, type: 'video' } });
    }
    e.target.value = '';
  };

  return (
    <div className={`pt-8 px-4 ${className || ''}`}>
      {/* 隐藏的文件选择器 */}
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
        multiple
      />
      <input
        type="file"
        accept="video/*"
        ref={videoInputRef}
        style={{ display: 'none' }}
        onChange={handleVideoChange}
      />
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

export default PublishEntry;
