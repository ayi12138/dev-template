import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemeType, ThemeContextType, ThemeColors } from '../types/theme';

/**
 * 主题配置对象
 * 定义了每个主题的具体颜色值
 */
const themes: Record<ThemeType, ThemeColors> = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#1E90FF',
    border: '#E1E1E1',
    inputBackground: '#F5F5F5',
    placeholder: '#9E9E9E',
    error: '#FF3B30',
    success: '#34C759',
    card: '#FFFFFF',
    disabled: '#CCCCCC',
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
    border: '#333333',
    inputBackground: '#1C1C1E',
    placeholder: '#666666',
    error: '#FF453A',
    success: '#32D74B',
    card: '#1C1C1E',
    disabled: '#666666',
  },
};

/**
 * 创建主题上下文
 * 提供默认值以支持在 Provider 外使用
 */
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  themes,
});

/**
 * 自定义 Hook，用于在组件中访问主题上下文
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * 主题提供者组件
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 管理主题状态
  const [theme, setTheme] = useState<ThemeType>('light');

  // 组件挂载时加载保存的主题设置
  useEffect(() => {
    loadTheme();
  }, []);

  /**
   * 从持久化存储加载主题设置
   */
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('加载主题失败:', error);
    }
  };

  /**
   * 切换主题并保存到持久化存储
   */
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('保存主题失败:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}; 