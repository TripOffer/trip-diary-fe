import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCNTranslation from './zh-CN/translation.json';
import enUSTranslation from './en-US/translation.json';
import zhCNSettings from './zh-CN/settings.json';
import enUSSettings from './en-US/settings.json';
import zhCNDiary from './zh-CN/diary.json';
import enUSDiary from './en-US/diary.json';
import profileZh from './zh-CN/profile.json';
import profileEn from './en-US/profile.json';

const LANG_KEY = 'lang';
const getInitLang = () => localStorage.getItem(LANG_KEY) || 'zh-CN';

const resources = {
  'zh-CN': {
    translation: zhCNTranslation,
    settings: zhCNSettings,
    diary: zhCNDiary,
    profile: profileZh,
  },
  'en-US': {
    translation: enUSTranslation,
    settings: enUSSettings,
    diary: enUSDiary,
    profile: profileEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitLang(),
  fallbackLng: 'en-US',
  ns: ['translation', 'settings', 'diary'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
});

// 监听语言切换，存储到 localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANG_KEY, lng);
});

export default i18n;
