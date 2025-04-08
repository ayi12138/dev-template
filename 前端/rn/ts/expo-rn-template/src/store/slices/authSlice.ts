import { createSlice } from '@reduxjs/toolkit';

/**
 * 用户信息接口
 * 定义用户基本信息的数据结构
 */
interface UserInfo {
  id: string;
  username: string;
  email: string;
}

/**
 * 认证状态接口
 * 定义整个认证模块的状态结构
 */
interface AuthState {
  isAuthenticated: boolean;  // 是否已认证
  token: string | null;      // JWT token
  userInfo: UserInfo | null; // 用户信息
}

/**
 * 初始状态
 * 默认为未认证状态
 */
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userInfo: null,
};

/**
 * 认证状态切片
 * 处理登录、登出等认证相关的状态更新
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 登录动作：更新认证状态和用户信息
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    // 登出动作：清除所有认证信息
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 