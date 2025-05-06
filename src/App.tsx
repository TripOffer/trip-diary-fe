import { Calendar } from 'tdesign-mobile-react';
import './locales/index';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function App() {
  const { t, i18n } = useTranslation();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN');
  };
  return (
    <main>
      <h1>{t('welcome')}</h1>
      <button onClick={toggleLang}>{t('language')}</button>
      <button onClick={() => setCalendarVisible(true)} style={{ marginLeft: 8 }}>
        显示日历
      </button>
      <Calendar
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        firstDayOfWeek={1}
      />
    </main>
  );
}

export default App;
