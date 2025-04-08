import axios from 'axios';
import { API_URL } from '@env';
import { store } from '../store';

/**
 * 创建 axios 实例
 * 配置基础 URL 和超时时间
 */
const http = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 请求超时时间：10秒
});

/**
 * 请求拦截器
 * 在发送请求之前做一些处理
 * - 添加认证 token
 * - 处理请求错误
 */
http.interceptors.request.use(
  (config) => {
    // 从 Redux store 获取认证 token
    const token = store.getState().auth.token;
    // 如果有 token，添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 在获取响应后做一些处理
 * - 提取响应数据
 * - 处理认证错误（401）
 * - 处理其他错误
 */
http.interceptors.response.use(
  (response) => {
    // 直接返回响应数据部分
    return response.data;
  },
  (error) => {
    // 处理 401 未授权错误
    if (error.response?.status === 401) {
      // token 过期或无效，执行登出操作
      store.dispatch({ type: 'auth/logout' });
    }
    return Promise.reject(error);
  }
);

export default http;