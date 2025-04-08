import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

/**
 * 类型安全的 dispatch hook
 * 包装了 Redux 的 useDispatch，添加了正确的类型信息
 * 用于分发 action 到 Redux store
 */
export const useAppDispatch = () => useDispatch<AppDispatch>(); 