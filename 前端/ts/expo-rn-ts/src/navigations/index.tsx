import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';

// 导入导航器类型
import type { 
  RootStackParamList, 
  AuthStackParamList, 
  MainTabParamList,
  HomeStackParamList 
} from '../types/navigation';

// 导入页面组件
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Home from '../screens/bottomTab/Home';
import Settings from '../screens/bottomTab/Settings';

// 创建导航器
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

/**
 * 认证导航
 */
const AuthNavigator = () => {
  const { t } = useI18n();
  const { theme, themes } = useTheme();

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themes[theme].background,
        },
        headerTintColor: themes[theme].text,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: themes[theme].background,
        },
      }}
    >
      <AuthStack.Screen 
        name="Login" 
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen 
        name="Register" 
        component={Register}
        options={{ 
          title: t('auth.register'),
          headerBackTitle: t('common.back'),
        }}
      />
    </AuthStack.Navigator>
  );
};

/**
 * 底部标签导航
 */
const MainTabNavigator = () => {
  const { t } = useI18n();
  const { theme, themes } = useTheme();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themes[theme].card,
          borderTopColor: themes[theme].border,
        },
        tabBarActiveTintColor: themes[theme].primary,
        tabBarInactiveTintColor: themes[theme].disabled,
        headerStyle: {
          backgroundColor: themes[theme].background,
        },
        headerTintColor: themes[theme].text,
        headerShadowVisible: false,
      }}
    >
      <MainTab.Screen 
        name="Home" 
        component={Home}
        options={{
          title: t('navigation.home'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen 
        name="Settings" 
        component={Settings}
        options={{
          title: t('navigation.settings'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

/**
 * 根导航
 */
const Navigation = () => {
  const { user, isLoading } = useAuth();
  const { theme, themes } = useTheme();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: themes[theme].background,
          },
        }}
      >
        {user ? (
          <RootStack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 