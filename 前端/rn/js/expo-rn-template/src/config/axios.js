import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Constants from 'expo-constants';
import { Platform } from 'react-native';
/**
 * 无参函数
 * @returns {string} 返回一个 baseURL
 * 
 */
const getBaseUrl = () => {

    // 开发环境逻辑
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localhost = debuggerHost?.split(':')[0];

    if (__DEV__) {
        return Platform.OS === 'web'
            ? 'http://localhost:3000/app-api'
            : `http://${localhost}:3000/app-api`;
    }

    // 默认生产环境 URL
    return 'https://ayixitielu.top/app-api';
};

const api = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

// 响应拦截器
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // 处理HTTP错误状态码
            if (error.response.status === 401) {
                // 处理未授权错误
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;