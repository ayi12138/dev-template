import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation';
import { store } from './src/store';

/**
 * 应用程序根组件
 * 配置了必要的提供者和全局组件
 * - Redux Provider：提供状态管理
 * - Navigation：提供路由导航
 * - StatusBar：配置状态栏样式
 */
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
    </Provider>
  );
}
