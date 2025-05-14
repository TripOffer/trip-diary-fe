import React, { useState, useEffect } from 'react';
import PublishEntry from './components/PublishEntry';
import ManageEntries from './components/ManageEntries';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PublishPage = () => {
  const { t } = useTranslation('diary');
  const statusBarHeight = getStatusBarHeight();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentValue, setCurrentValue] = useState('publish');

  const tabList = [
    { value: 'publish', label: t('publishTab', { defaultValue: '发布' }) },
    { value: 'manage', label: t('manageTab', { defaultValue: '管理' }) },
  ];

  // 检查 location.state.tab，自动切换Tab
  useEffect(() => {
    if (location.state?.tab && location.state.tab !== currentValue) {
      setCurrentValue(location.state.tab);
      // 清空state，避免重复切换
      navigate(location.pathname, { replace: true, state: { ...location.state, tab: undefined } });
    }
    // eslint-disable-next-line
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: `${statusBarHeight}px` }}>
      <div className="flex border-b border-gray-200 sticky top-0 z-10 bg-white">
        {tabList.map((tab) => (
          <button
            key={tab.value}
            className={`flex-1 py-3 text-lg font-bold transition-colors duration-150 ${
              currentValue === tab.value
                ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50'
                : 'text-gray-500 border-b-2 border-transparent bg-white'
            }`}
            onClick={() => setCurrentValue(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-0">
        <div style={{ display: currentValue === 'publish' ? 'block' : 'none' }}>
          <PublishEntry />
        </div>
        <div style={{ display: currentValue === 'manage' ? 'block' : 'none' }}>
          <ManageEntries />
        </div>
      </div>
    </div>
  );
};

export default PublishPage;
