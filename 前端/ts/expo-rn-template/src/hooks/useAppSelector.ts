import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../store';

/**
 * 类型安全的 selector hook
 * 包装了 Redux 的 useSelector，添加了正确的类型信息
 * 用于从 Redux store 中选择状态
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 