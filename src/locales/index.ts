import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCN from './zh-CN/translation.json';
import enUS from './en-US/translation.json';

const LANG_KEY = 'lang';
const getInitLang = () => localStorage.getItem(LANG_KEY) || 'zh-CN';

const resources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitLang(),
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

// 监听语言切换，存储到 localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANG_KEY, lng);
});

export default i18n;
