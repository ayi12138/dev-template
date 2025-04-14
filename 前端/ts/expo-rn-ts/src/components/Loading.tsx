import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/I18nContext';

/**
 * 全屏加载组件
 * 显示一个居中的加载指示器
 */
const Loading = () => {
  const { theme, themes } = useTheme();
  const { t } = useI18n();

  return (
    <View style={[
      styles.container,
      { backgroundColor: themes[theme].background }
    ]}>
      <ActivityIndicator 
        size="large" 
        color={themes[theme].primary}
      />
      <Text style={[
        styles.loadingText,
        { color: themes[theme].text }
      ]}>
        {t('system.loading')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Loading;
