import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

/**
 * 根堆栈导航参数列表
 * 定义顶层导航路由及其参数
 */
export type RootStackParamList = {
  Login: undefined;     // 登录页面，无参数
  Register: undefined;  // 注册页面，无参数
  MainTabs: undefined;  // 主标签页面，无参数
};

/**
 * 主标签导航参数列表
 * 定义底部标签导航路由及其参数
 */
export type MainTabParamList = {
  Home: undefined;     // 首页，无参数
  Profile: undefined;  // 个人中心，无参数
  Settings: undefined; // 设置页面，无参数
};

/**
 * 堆栈导航器的导航属性
 * 用于堆栈导航的类型检查
 */
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * 底部标签导航器的导航属性
 * 用于标签导航的类型检查
 */
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

/**
 * 组合导航属性
 * 允许在任何页面中使用所有导航功能
 * 包含堆栈导航和标签导航的所有方法
 */
export type AppNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  MainTabNavigationProp
>; 