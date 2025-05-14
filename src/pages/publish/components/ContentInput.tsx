import React from 'react';
import { Textarea, TextareaValue } from 'tdesign-mobile-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslation } from 'react-i18next';

interface ContentInputProps {
  value: string;
  onChange: (val: string) => void;
}

const MAX_LENGTH = 2000;

const ContentInput: React.FC<ContentInputProps> = ({ value, onChange }) => {
  const { t } = useTranslation('diary');
  // 只做长度提示，不做强制限制
  const overLimit = value.length > MAX_LENGTH;
  return (
    <div className="mb-5">
      <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
        <Icon icon="mdi:text-box-outline" className="mr-1 text-blue-500" />
        {t('content.label')}
      </label>{' '}
      <Textarea
        placeholder={t('content.placeholder')}
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
