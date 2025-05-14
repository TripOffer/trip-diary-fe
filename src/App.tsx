import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';
import './index.css';
import KeepAliveOutlet from '@/components/KeepAliveOutlet';

const tabList = [
  { value: '/', icon: 'material-symbols:home-rounded', label: '首页' },
  { value: '/publish', icon: 'material-symbols:add-circle-outline-rounded', label: '发布' },
  { value: '/profile', icon: 'material-symbols:person-rounded', label: '我的' },
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // 只在首页、发布页、我的页面显示TabBar
  const showTabBar = ['/', '/profile', '/publish'].includes(location.pathname);

  // 判断是否是详情页
  const isDiaryDetail = location.pathname.includes('/diary/');

  const handleTabChange = (value: string | number) => {
    if (typeof value === 'string') {
      navigate(value);
    }
  };
  return (
    <div className="app-container">
      <div
        className="app-content"
        style={{
          position: 'relative',
          overflow: isDiaryDetail ? 'auto' : 'hidden',
        }}
      >
        <KeepAliveOutlet />
      </div>
      {showTabBar && (
        <div className="transform -translate-y-4 z-100">
          <TabBar
            className=""
            value={location.pathname}
            onChange={handleTabChange}
            shape="round"
            theme="tag"
            split={false}
          >
            {tabList.map((item) => (
              <TabBarItem
                key={item.value}
                icon={<Icon icon={item.icon} width={24} />}
                value={item.value}
                aria-label={item.label}
              />
            ))}
          </TabBar>
        </div>
      )}
    </div>
  );
}

export default App;
