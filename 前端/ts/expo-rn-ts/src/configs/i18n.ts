import { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import zhCN from '../constants/zh_CN.json';
import enUS from '../constants/en_US.json';

export type LanguageType = 'zh_CN' | 'en_US';

const translations = {
  zh_CN: zhCN,
  en_US: enUS,
};

export const I18nContext = createContext<{
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
}>({
  language: 'zh_CN',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useI18n = () => useContext(I18nContext);

export const saveLanguage = async (language: LanguageType) => {
  try {
    await AsyncStorage.setItem('language', language);
  } catch (error) {
    console.error('保存语言设置失败:', error);
  }
};

export const getStoredLanguage = async (): Promise<LanguageType> => {
  try {
    const language = await AsyncStorage.getItem('language');
    return (language as LanguageType) || 'zh_CN';
  } catch (error) {
    console.error('获取语言设置失败:', error);
    return 'zh_CN';
  }
}; 