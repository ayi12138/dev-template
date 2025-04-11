import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { authService, type LoginRequest, type RegisterRequest, type LoginResponse } from '../services/auth';
import type { ApiResponse } from '../services/base';

interface AuthContextType {
  signIn: (credentials: LoginRequest) => Promise<ApiResponse<LoginResponse>>;
  signUp: (credentials: RegisterRequest) => Promise<ApiResponse<void>>;
  signOut: () => Promise<ApiResponse<boolean>>;
  user: LoginResponse | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signIn: async () => ({ code: 0, msg: '', data: null as any, timestamp: 0 }),
  signUp: async () => ({ code: 0, msg: '', data: null as any, timestamp: 0 }),
  signOut: async () => ({ code: 0, msg: '', data: false as any, timestamp: 0 }),
  user: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 登录
  const signIn = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    if (response.code === 200 && response.data) {
      // 保存用户信息和token
      await SecureStore.setItemAsync('userToken', response.data.token);
      await SecureStore.setItemAsync('userInfo', JSON.stringify(response.data));
      setUser(response.data);
    }
    return response;
  };

  // 注册
  const signUp = async (credentials: RegisterRequest) => {
    return await authService.register(credentials);
  };

  // 退出登录
  const signOut = async () => {
    // 调用后端登出接口（如果失败也不影响前端登出）
    const response = await authService.logout();

    if(response.code === 200){
      // 清除本地存储
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userInfo');
      // 重置用户状态
      setUser(null);
    }
    return response;
  };

  // 初始化时检查用户状态
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        // 获取存储的用户信息
        const userInfoStr = await SecureStore.getItemAsync('userInfo');
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr) as LoginResponse;
          setUser(userInfo);
        }
      } catch (error) {
        console.error('加载用户信息失败:', error);
        // 如果出错，清除所有存储的信息
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userInfo');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}; 