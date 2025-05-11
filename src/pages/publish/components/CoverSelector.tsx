import React, { useRef, ChangeEvent } from 'react';
import type { UploadFile } from 'tdesign-mobile-react/es/upload/type';
import { Icon } from '@iconify/react';

interface CoverSelectorProps {
  currentCover: UploadFile | null;
  onCoverChange: (newCover: UploadFile | null) => void;
  // 已移除 buttonText 属性
}

const CoverSelector: React.FC<CoverSelectorProps> = ({
  currentCover,
  onCoverChange,
  // 已移除 buttonText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 如果有旧的封面且是 blob URL，释放它
      if (currentCover?.url && currentCover.url.startsWith('blob:')) {
        URL.revokeObjectURL(currentCover.url);
      }

      const newCoverFile: UploadFile = {
        name: file.name,
        raw: file,
        url: URL.createObjectURL(file),
        status: 'success', // 也可以用 'selected'，视业务而定
      };
      onCoverChange(newCoverFile);
    }
    // 重置 input 以便可以重复选择同一文件
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      {currentCover && currentCover.url ? (
        <div className="relative group mb-4 cursor-pointer" onClick={triggerFileInput}>
          <img
            src={currentCover.url}
            alt="当前封面"
            className="rounded-lg max-w-xs w-full max-h-60 object-cover shadow-md transition-opacity group-hover:opacity-75"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <Icon icon="mdi:camera-flip-outline" className="text-white text-4xl" />
          </div>
        </div>
      ) : (
        <div
          className="w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={triggerFileInput}
        >
          <Icon icon="mdi:image-plus" className="text-4xl text-gray-400 mb-2" />
          <span className="text-gray-500">选择封面</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {/* 已按要求移除多余按钮 */}
    </div>
  );
};

export default CoverSelector;
