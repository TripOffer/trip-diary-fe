import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <div>首页（Home）</div>
      <button onClick={() => navigate('/search')} style={{ margin: 8 }}>
        进入搜索页
      </button>
      <button onClick={() => navigate('/diary/123')} style={{ margin: 8 }}>
        进入详细页（示例ID:123）
      </button>
    </div>
  );
};

export default Home;
