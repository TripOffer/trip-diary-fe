import React, { useState } from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react';
import PublishEntry from './components/PublishEntry';
import ManageEntries from './components/ManageEntries';
import { getStatusBarHeight } from '@/utils/getStatusBarHeight';

const tabList = [
  { value: 'publish', label: <span className="text-xl">发布</span> },
  { value: 'manage', label: <span className="text-xl">管理</span> },
];

const PublishPage = () => {
  const statusBarHeight = getStatusBarHeight();

  const [currentValue, setCurrentValue] = useState('publish');

  const handleTabChange = (value: string | number, label: string) => {
    setCurrentValue(String(value));
    console.log(`Tab changed to ${value}`);
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: `${statusBarHeight}px` }}>
      <Tabs value={currentValue} list={tabList} onChange={handleTabChange}>
        <div>
          {/* @ts-ignore */}
          <TabPanel key="publish" value="publish" label="发布">
            <PublishEntry />
          </TabPanel>
          {/* @ts-ignore */}
          <TabPanel key="manage" value="manage" label="管理">
            <ManageEntries />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default PublishPage;
