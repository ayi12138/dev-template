import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import zhCN from '../constants/zh_CN.json';
import enUS from '../constants/en_US.json';
import type { I18nContextType, LanguageType, Translations } from '../types/i18n';

/**
 * 翻译资源对象，使用 Record 类型确保键为 LanguageType，值为 Translations
 * Record<K, T> 是 TypeScript 的工具类型，用于创建具有特定键类型 K 和值类型 T 的对象类型
 */
const translations: Record<LanguageType, Translations> = {
  zh_CN: zhCN,
  en_US: enUS,
};

/**
 * 创建国际化上下文
 * createContext 需要提供一个默认值，这个默认值的类型必须匹配 I18nContextType
 */
const I18nContext = createContext<I18nContextType>({
  language: 'zh_CN',
  setLanguage: () => {}, // 空函数作为默认值
  t: (key: string) => key, // 默认直接返回 key
  translations: translations.zh_CN,
});

/**
 * 自定义 Hook，用于在组件中获取国际化上下文
 * useContext 是 React 的内置 Hook，用于订阅上下文的变化
 */
export const useI18n = () => useContext(I18nContext);

/**
 * 国际化提供者组件
 * FC (FunctionComponent) 是 TypeScript 中的函数组件类型
 * children 是 React 的特殊属性，代表组件的子元素
 */
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 使用 useState 管理当前语言状态
  const [language, setLanguage] = useState<LanguageType>('zh_CN');

  // 组件挂载时加载保存的语言设置
  useEffect(() => {
    loadLanguage();
  }, []);

  /**
   * 从持久化存储加载语言设置
   * 使用 async/await 处理异步操作
   */
  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      // 类型守卫，确保读取的值是有效的语言类型
      if (savedLanguage && (savedLanguage === 'zh_CN' || savedLanguage === 'en_US')) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('加载语言设置失败:', error);
    }
  };

  /**
   * 处理语言切换并保存到持久化存储
   * @param newLanguage 新的语言类型
   */
  const handleSetLanguage = async (newLanguage: LanguageType) => {
    setLanguage(newLanguage);
    try {
      await AsyncStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('保存语言设置失败:', error);
    }
  };

  /**
   * 翻译函数
   * @param key 翻译键，使用点号分隔的路径格式（如 'auth.login'）
   * @returns 翻译后的文本，如果未找到则返回原键
   */
  const t = (key: string) => {
    try {
      // 将键拆分为路径数组
      const keys = key.split('.');
      // 从翻译对象开始遍历
      let current: any = translations[language];

      // 沿着路径遍历对象
      for (const k of keys) {
        // 类型检查和空值检查
        if (!current || typeof current !== 'object') {
          console.warn(`Invalid translation path: ${key}`);
          return key;
        }
        current = current[k];
      }

      // 确保最终值是字符串
      if (typeof current !== 'string') {
        console.warn(`No translation found for key: ${key}`);
        return key;
      }

      return current;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  /**
   * 构建上下文值对象
   * 显式类型注解确保类型安全
   */
  const contextValue: I18nContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
    translations: translations[language],
  };

  // 提供上下文给子组件
  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}; 