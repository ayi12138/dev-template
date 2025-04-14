import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';

/**
 * 认证相关页面的路由参数列表
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

/**
 * 底部标签页面的路由参数列表
 */
export type MainTabParamList = {
  Home: undefined;     // 首页
  Settings: undefined; // 设置页
};

/**
 * 主页面内部的路由参数列表
 */
export type HomeStackParamList = {
  UserHome: undefined;    // 用户首页
  WorkerHome: undefined;  // 工作人员首页
  ManagerHome: undefined; // 管理员首页
  // 其他主页面相关的路由...
};

/**
 * 根导航的路由参数列表
 */
export type RootStackParamList = {
  Auth: undefined;  // 认证导航
  Main: undefined;  // 主导航
};

/**
 * 组合导航类型
 */
export type RootNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

/**
 * 主页面导航类型
 */
export type HomeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  RootNavigationProp
>;

/**
 * 页面属性类型定义
 */
export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList>;
export type MainTabScreenProps = BottomTabScreenProps<MainTabParamList>;
export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList>;
export type SettingsScreenProps = {
  navigation: RootNavigationProp;
}; 