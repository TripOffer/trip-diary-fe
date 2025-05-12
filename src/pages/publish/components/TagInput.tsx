import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useRef, useState } from 'react';
import { Tag } from 'tdesign-mobile-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.trim();
      if (value && !tags.includes(value) && tags.length < 10) {
        onChange([...tags, value]);
        setInput('');
      }
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      // 删除最后一个标签
      onChange(tags.slice(0, tags.length - 1));
    }
  };

  const handleRemove = (removeIdx: number) => {
    onChange(tags.filter((_, idx) => idx !== removeIdx));
  };
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg min-h-[44px] bg-white transition-all duration-200 hover:border-blue-500">
        {tags.map((tag, idx) => (
          <Tag
            key={tag}
            shape="round"
            closable
            icon={<Icon icon="mdi:tag" />}
            onClose={() => handleRemove(idx)}
            theme="primary"
            variant="light"
            className="mb-1"
          >
            {tag}
          </Tag>
        ))}{' '}
        <input
          ref={inputRef}
          className="flex-1 min-w-[80px] border-none outline-none py-1.5 px-2 bg-transparent text-base focus:bg-gray-50 rounded-lg transition-all placeholder:text-gray-400"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length >= 10 ? '最多10个标签' : '输入标签并回车'}
          maxLength={12}
          disabled={tags.length >= 10}
        />
      </div>
      <div className="text-xs text-gray-400 mt-1 text-right w-full">{tags.length}/10</div>
    </div>
  );
};

export default TagInput;
