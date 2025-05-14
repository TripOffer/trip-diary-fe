import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCNTranslation from './zh-CN/translation.json';
import enUSTranslation from './en-US/translation.json';
import zhCNSettings from './zh-CN/settings.json';
import enUSSettings from './en-US/settings.json';

const LANG_KEY = 'lang';
const getInitLang = () => localStorage.getItem(LANG_KEY) || 'zh-CN';

const resources = {
  'zh-CN': {
    translation: zhCNTranslation,
    settings: zhCNSettings,
  },
  'en-US': {
    translation: enUSTranslation,
    settings: enUSSettings,
  },
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
