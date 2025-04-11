import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * 全屏加载组件
 * 显示一个居中的加载指示器
 */
const Loading = () => {
  const { theme, themes } = useTheme();

  return (
    <View style={[
      styles.container,
      { backgroundColor: themes[theme].background }
    ]}>
      <ActivityIndicator 
        size="large" 
        color={themes[theme].primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
