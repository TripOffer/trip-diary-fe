import React from 'react';
import { Input } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface TitleInputProps {
  value: string;
  onChange: (val: string) => void;
}

const MAX_LENGTH = 50;

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  // 适配 tdesign Input 的 onChange 类型
  const handleChange = (val: string | number) => {
    onChange(String(val));
  };
  // 根据长度判断 status
  const status = value.length > MAX_LENGTH ? 'error' : 'default';
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
        status={status}
        clearable
        className={`rounded-lg border ${value.length > MAX_LENGTH ? 'border-red-400' : 'border-gray-200 hover:border-blue-500'} px-3 py-2 text-base transition-all duration-200 bg-white`}
      />
      <div
        className={`text-xs mt-1 text-right w-full ${value.length > MAX_LENGTH ? 'text-red-500' : 'text-gray-400'}`}
      >
        {value.length}/{MAX_LENGTH}
      </div>
    </div>
  );
};

export default TitleInput;
