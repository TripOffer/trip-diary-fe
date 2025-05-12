import React, { FormEvent } from 'react';
import { Textarea, TextareaValue } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface ContentInputProps {
  value: string;
  onChange: (val: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ value, onChange }) => {
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
        maxlength={2000}
        className="rounded-lg border border-gray-200 hover:border-blue-500 px-3 py-3 text-base transition-all duration-200 bg-white w-full resize-none"
      />
      <div className="flex justify-between mt-1">
        {/* <div className="text-xs text-gray-500">支持 Markdown 语法</div> */}
        <div className="text-xs text-gray-400 mt-1 text-right w-full">{value.length}/2000</div>
      </div>
    </div>
  );
};

export default ContentInput;
