import React from 'react';
import { Input } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface TitleInputProps {
  value: string;
  onChange: (val: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  // 适配 tdesign Input 的 onChange 类型
  const handleChange = (val: string | number) => {
    onChange(String(val));
  };
  return (
    <div className="mb-5">
      <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
        <Icon icon="mdi:format-title" className="mr-1 text-blue-500" />
        标题
      </label>{' '}
      <Input
        placeholder="请输入吸引人的日记标题"
        value={value}
        onChange={handleChange}
        maxlength={50}
        clearable
        className="rounded-lg border border-gray-200 hover:border-blue-500 px-3 py-2 text-base transition-all duration-200 bg-white"
      />
      <div className="text-xs text-gray-400 mt-1 text-right w-full">{value.length}/50</div>
    </div>
  );
};

export default TitleInput;
