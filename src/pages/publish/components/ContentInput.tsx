import React from 'react';
import { Textarea, TextareaValue } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface ContentInputProps {
  value: string;
  onChange: (val: string) => void;
}

const MAX_LENGTH = 2000;

const ContentInput: React.FC<ContentInputProps> = ({ value, onChange }) => {
  // 只做长度提示，不做强制限制
  const overLimit = value.length > MAX_LENGTH;
  return (
    <div className="mb-5">
      <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
        <Icon icon="mdi:text-box-outline" className="mr-1 text-blue-500" />
        正文内容
      </label>{' '}
      <Textarea
        placeholder="记录你的旅行故事和精彩瞬间..."
        value={value}
        onChange={(value: TextareaValue) => onChange(String(value))}
        autosize={{ minRows: 5, maxRows: 15 }}
        className={`rounded-lg border ${overLimit ? 'border-red-400' : 'border-gray-200 hover:border-blue-500'} px-3 py-3 text-base transition-all duration-200 bg-white w-full resize-none`}
      />
      <div
        className={`text-xs mt-1 text-right w-full ${overLimit ? 'text-red-500' : 'text-gray-400'}`}
      >
        {value.length}/{MAX_LENGTH}
      </div>
    </div>
  );
};

export default ContentInput;
