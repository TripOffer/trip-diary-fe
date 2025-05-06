import React from 'react';
import ReactDOM from 'react-dom/client';
import 'tdesign-mobile-react/es/style/index.css';
import App from './App';
import './index.css';
import { ConfigProvider } from 'tdesign-mobile-react';
import { useTranslation } from 'react-i18next';
import zhConfig from 'tdesign-mobile-react/es/locale/zh_CN';
import enConfig from 'tdesign-mobile-react/es/locale/en_US';

function Main() {
  const { i18n } = useTranslation();
  const globalConfig = i18n.language === 'en-US' ? { ...enConfig } : { ...zhConfig };
  return (
    <ConfigProvider globalConfig={globalConfig}>
      <App />
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
