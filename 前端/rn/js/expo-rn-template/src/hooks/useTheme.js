import { useState, useEffect, useMemo } from 'react';
import { Appearance } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { lightTheme, darkTheme } from '../config/theme';

const THEME_STORAGE_KEY = 'app_theme_mode';

export const useTheme = () => {
  // 获取系统颜色方案
  const colorScheme = Appearance.getColorScheme();
  
  // 状态管理当前主题是否是深色模式
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === 'dark');
  
  // 初始化时从本地存储加载主题设置
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDarkTheme(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };
    
    loadThemePreference();
  }, []);
  
  // 监听系统主题变化
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkTheme(colorScheme === 'dark');
      // 保存主题设置到本地
      SecureStore.setItemAsync(THEME_STORAGE_KEY, colorScheme);
    });
    
    return () => subscription.remove();
  }, []);
  
  // 切换主题
  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    try {
      // 保存新的主题设置到本地
      await SecureStore.setItemAsync(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };
  
  // 设置特定主题
  const setTheme = async (dark) => {
    setIsDarkTheme(dark);
    try {
      // 保存主题设置到本地
      await SecureStore.setItemAsync(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };
  
  // 根据当前主题返回对应的主题对象
  const theme = useMemo(() => {
    return isDarkTheme ? darkTheme : lightTheme;
  }, [isDarkTheme]);
  
  return {
    isDarkTheme,
    theme,
    toggleTheme,
    setTheme
  };
};

// 创建 ThemeContext 以便在其他组件中使用
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = useTheme();
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};