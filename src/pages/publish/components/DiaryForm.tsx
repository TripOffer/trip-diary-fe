import React from 'react';
import TitleInput from './TitleInput';
import ContentInput from './ContentInput';
import TagInput from './TagInput';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslation } from 'react-i18next';

interface DiaryFormProps {
  title: string;
  content: string;
  tags: string[];
  onTitleChange: (val: string) => void;
  onContentChange: (val: string) => void;
  onTagsChange: (tags: string[]) => void;
}

const DiaryForm: React.FC<DiaryFormProps> = ({
  title,
  content,
  tags,
  onTitleChange,
  onContentChange,
  onTagsChange,
}) => {
  const { t } = useTranslation('diary');
  return (
    <form className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
          <Icon icon="mdi:pencil-outline" className="mr-2 text-blue-500" />
          <span>{t('baseInfo', { defaultValue: '基本信息' })}</span>
        </h3>
        <div>
          <TitleInput value={title} onChange={onTitleChange} />
          <ContentInput value={content} onChange={onContentChange} />
          <TagInput tags={tags} onChange={onTagsChange} />
        </div>
      </div>
    </form>
  );
};

export default DiaryForm;
