import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
/**
 * API 响应的通用接口
 * 使用泛型 T 来定义响应数据的类型
 */
export interface ApiResponse<T> {
  code: number;     // 响应状态码
  msg: string;      // 响应消息
  data: T;          // 响应数据，类型由泛型 T 决定
  timestamp: number; // 响应时间戳
}

// API 基础 URL，实际开发中应该根据环境配置
const baseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];
  return __DEV__ ? `http://${localhost}:3000/app-api` : 'https://ayixitielu.top/app-api';
}

/**
 * 创建 axios 实例
 * 配置基础 URL 和超时时间
 */
const api: AxiosInstance = axios.create({
  baseURL: baseUrl(),
  timeout: 10000,
});

/**
 * 请求拦截器
 * 在请求发送前添加认证信息
 */
api.interceptors.request.use(
  async (config) => {
    // 白名单：不需要 token 的接口路径
    const whiteList = [
      '/auth/login',
      '/auth/register',
    ];
    
    // 检查是否在白名单中
    const isWhiteList = whiteList.some(path => config.url?.includes(path));
    
    // 如果在白名单中，直接放行
    if (isWhiteList) {
      return config;
    }
    
    // 不在白名单中的所有请求都需要添加 token
    const token = await SecureStore.getItemAsync('userToken');

    if (token) {
      // 直接使用 token，不需要解析
      config.headers.token = token;
      // config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('Token 不存在');
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 统一处理响应数据和错误
 * 使用泛型确保类型安全
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response);
    return response.data;
  },
  // <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  //   const responseData = response.data;
  //   // 检查业务状态码
  //   if (responseData.code !== 200) {
  //     Alert.alert("错误", responseData.msg);
  //     throw new Error(responseData.msg);
  //   }
  //   // 只返回数据部分
  //   return responseData.data;
  // },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api; 