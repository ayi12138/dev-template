import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import en from '../../assets/locales/en.json';
import zh from '../../assets/locales/zh.json';

const LANGUAGE_STORAGE_KEY = 'app_language';

// 支持的语言列表
export const LANGUAGES = {
  en: { label: 'English', value: 'en' },
  zh: { label: '中文', value: 'zh' }
};

// 加载保存的语言设置
const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await SecureStore.getItemAsync(LANGUAGE_STORAGE_KEY);
    return savedLanguage || 'en'; // 默认返回英语
  } catch (error) {
    console.error('Failed to load language preference:', error);
    return 'en'; // 出错时返回英语
  }
};

// 保存语言设置
export const saveLanguagePreference = async (language) => {
  try {
    await SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
};

// 初始化i18n
const initializeI18n = async () => {
  const savedLanguage = await loadSavedLanguage();
  
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        zh: { translation: zh }
      },
      lng: savedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
};

// 执行初始化
initializeI18n();

// 语言切换函数
export const changeLanguage = async (language) => {
  await i18n.changeLanguage(language);
  await saveLanguagePreference(language);
};

export default i18n;