// 用户登录与注册服务

import api from './base';
import { ApiResponse } from './base';

/**
 * 用户登录请求参数接口
 */
interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 用户注册请求参数接口
 */
interface RegisterRequest {
  username: string;
  password: string;
  role: 'USER' | 'WORKER';
}

/**
 * 登录响应数据接口
 */
interface LoginResponse {
  userId: number;  
  token: string;
  username: string;
  role: 'USER' | 'WORKER' | 'ADMIN';
}

/**
 * 注册响应数据接口
 */

/**
 * 认证相关的 API 服务
 */
export const authService = {
  /**
   * 用户登录
   * @param data - 登录信息（用户名和密码）
   * @returns Promise<LoginResponse> - 登录成功后的用户信息和令牌
   */
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return api.post('/auth/login', data);
  },

  /**
   * 用户注册
   * @param data - 注册信息（用户名、密码和角色）
   * @returns Promise<void>
   */
  register: (data: RegisterRequest): Promise<ApiResponse<void>> => {
    return api.post('/auth/register', data);
  },

  /**
   * 获取当前用户信息
   * @returns Promise<LoginResponse> - 当前登录用户的信息
   */
  getCurrentUser: (): Promise<ApiResponse<LoginResponse>> => {
    return api.get('/auth/current-user');
  },

  /**
   * 刷新认证令牌
   * @returns Promise<{ token: string }> - 新的认证令牌
   */
  refreshToken: (): Promise<ApiResponse<{ token: string }>> => {
    return api.post('/auth/refresh-token');
  },

  /**
   * 退出登录
   * @returns Promise<ApiResponse<void>>
   */
  logout: (): Promise<ApiResponse<boolean>> => {
    return api.get('/auth/logout');
  },
};

/**
 * 导出认证相关的类型定义
 */
export type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
};

export default authService;

