import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';
import api from '../config/axios';
import { useNavigation } from '@react-navigation/native';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { i18n } = useTranslation();
  const navigation = useNavigation();

  // 初始化时加载保存的用户信息
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        const userData = await SecureStore.getItemAsync('userData');
        
        if (token && userData) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          // 设置用户偏好语言
          if (parsedUser.language) {
            i18n.changeLanguage(parsedUser.language);
          }
        }
      } catch (err) {
        console.error('Failed to load user data', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 登录方法
  const login = useCallback(async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/login', { 
        username, 
        password 
      });

      const { user: userData, token } = response.data;
      
      // 保存token和用户数据到安全存储
      await SecureStore.setItemAsync('authToken', token);
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
      
      // 设置axios默认授权头
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // 更新状态
      setUser(userData);
      
      // 设置用户偏好语言
      if (userData.language) {
        i18n.changeLanguage(userData.language);
      }
      
      return { success: true, user: userData };
    } catch (err) {
      console.error('Login failed:', err);
      let errorMessage = 'Login failed';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Invalid username or password';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // 注册方法
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/register', userData);
      
      const { user: userData, token } = response.data;
      
      // 保存token和用户数据
      await SecureStore.setItemAsync('authToken', token);
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
      
      // 设置axios默认授权头
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // 更新状态
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (err) {
      console.error('Registration failed:', err);
      
      let errorMessage = 'Registration failed';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // 登出方法
  const logout = useCallback(async () => {
    try {
      // 调用后端登出接口（如果有）
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout API error:', err);
      // 即使API调用失败也继续本地登出流程
    } finally {
      // 清除本地存储
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      
      // 清除axios授权头
      delete api.defaults.headers.common['Authorization'];
      
      // 重置状态
      setUser(null);
      setError(null);
      
      // 导航到登录页
      navigation.navigate('Login');
    }
  }, [navigation]);

  // 刷新token方法（静默刷新）
  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh');
      const { token } = response.data;
      
      await SecureStore.setItemAsync('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return true;
    } catch (err) {
      console.error('Failed to refresh token:', err);
      await logout(); // 刷新失败则登出
      return false;
    }
  }, [logout]);

  // 更新用户信息
  const updateUser = useCallback(async (updatedUser) => {
    try {
      setLoading(true);
      
      // 更新后端数据
      const response = await api.put(`/users/${updatedUser.id}`, updatedUser);
      
      // 更新本地存储
      await SecureStore.setItemAsync('userData', JSON.stringify(response.data));
      
      // 更新状态
      setUser(response.data);
      
      return { success: true, user: response.data };
    } catch (err) {
      console.error('Failed to update user:', err);
      
      let errorMessage = 'Update failed';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // 检查认证状态
  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  // 检查用户角色
  const hasRole = useCallback((role) => {
    return user?.roles?.includes(role);
  }, [user]);

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    refreshToken,
    updateUser,
    isAuthenticated,
    hasRole,
  };
};