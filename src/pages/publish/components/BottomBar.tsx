import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface BottomBarProps {
  onArchive?: () => void;
  onPublish?: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onArchive, onPublish }) => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow z-50 flex items-center py-3 px-4"
      style={{ boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.04)', height: 64 }}
    >
      <button
        className="flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 transition-all duration-150 mr-4"
        style={{ width: 48, height: 48, minWidth: 48, minHeight: 48 }}
        onClick={onArchive}
      >
        <Icon icon="mdi:archive-outline" className="text-2xl" />
      </button>
      <button
        className="flex-1 h-12 rounded-full bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition-all duration-150 flex items-center justify-center text-lg"
        style={{ minWidth: 0 }}
        onClick={onPublish}
      >
        发布
      </button>
    </div>
  );
};

export default BottomBar;
