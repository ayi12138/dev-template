import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE', // 主色调
    accent: '#03DAC6', // 强调色
    background: '#FFFFFF', // 背景色
    surface: '#FFFFFF', // 表面色
    text: '#000000', // 文本色
    error: '#B00020', // 错误色
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    accent: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    error: '#CF6679',
  },
};



// 添加导航主题配置
export const navigationTheme = {
  light: {
    dark: false,
    colors: {
      ...lightTheme.colors,
      background: lightTheme.colors.background,
      card: lightTheme.colors.surface,
      text: lightTheme.colors.text,
      border: lightTheme.colors.outline,
      notification: lightTheme.colors.error,
    },
  },
  dark: {
    dark: true,
    colors: {
      ...darkTheme.colors,
      background: darkTheme.colors.background,
      card: darkTheme.colors.surface,
      text: darkTheme.colors.text,
      border: darkTheme.colors.outline,
      notification: darkTheme.colors.error,
    },
  },
};

export default navigationTheme;