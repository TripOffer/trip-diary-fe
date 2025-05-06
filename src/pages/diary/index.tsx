import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiaryDetail: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <div>日记详细页面（DiaryDetail）</div>
      <button onClick={() => navigate('/user/456')} style={{ margin: 8 }}>
        进入作者主页（示例ID:456）
      </button>
    </div>
  );
};

export default DiaryDetail;
