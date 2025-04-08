import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthProvider } from './src/components/AuthProvider';
import { ThemeProvider, useThemeContext } from './src/hooks/useTheme';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationTheme } from './src/config/theme';
import './src/config/i18n';

const Main = () => {
  const { theme, isDarkTheme } = useThemeContext();
  const navTheme = isDarkTheme ? navigationTheme.dark : navigationTheme.light;
  
  if (!theme) {
    // 添加防御性检查
    console.error('Theme is undefined');
    return null;
  }
  
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navTheme}>
        <AuthProvider>
          <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}