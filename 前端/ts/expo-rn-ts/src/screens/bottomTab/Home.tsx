import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useI18n } from '../../contexts/I18nContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import type { MainTabParamList } from '../../types/navigation';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// 导入不同角色的首页组件
import UserHome from '../home/user';
import WorkerHome from '../home/worker';
import ManagerHome from '../home/manager';
/**
 * 首页组件的属性类型
 */
type HomeScreenProps = BottomTabScreenProps<MainTabParamList, 'Home'>;

/**
 * 首页组件
 * 根据用户角色显示不同的首页内容
 */
const Home = ({ navigation }: HomeScreenProps) => {
  const { user } = useAuth();
  const { theme, themes } = useTheme();

  // 根据用户角色渲染对应的首页组件
  const renderHomeContent = () => {
    switch (user?.role) {
      case 'USER':
        return <UserHome />;
      case 'WORKER':
        return <WorkerHome />;
      case 'ADMIN':
        return <ManagerHome />;
      default:
        return null;
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: themes[theme].background }
    ]}>
      {renderHomeContent()}
    </View>
  );
};

/**
 * 样式定义
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home; 