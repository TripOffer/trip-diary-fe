import React from 'react';
import ReactDOM from 'react-dom/client';
import 'tdesign-mobile-react/es/style/index.css'; // 少量公共样式
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
