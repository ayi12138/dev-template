import { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark';

export const ThemeContext = createContext<{
  theme: ThemeType;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const saveTheme = async (theme: ThemeType) => {
  try {
    await AsyncStorage.setItem('theme', theme);
  } catch (error) {
    console.error('保存主题失败:', error);
  }
};

export const getStoredTheme = async (): Promise<ThemeType> => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    return (theme as ThemeType) || 'light';
  } catch (error) {
    console.error('获取主题失败:', error);
    return 'light';
  }
}; 