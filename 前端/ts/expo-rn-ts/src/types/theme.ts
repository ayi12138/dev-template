/**
 * 主题类型
 * 定义应用支持的主题模式
 */
export type ThemeType = 'light' | 'dark';

/**
 * 主题颜色接口
 * 定义主题中需要的所有颜色值
 */
export interface ThemeColors {
  background: string;      // 背景色
  text: string;           // 文本颜色
  primary: string;        // 主要颜色，用于按钮等强调元素
  border: string;         // 边框颜色
  inputBackground: string; // 输入框背景色
  placeholder: string;    // 占位符文本颜色
  error: string;         // 错误提示文本颜色
  success: string;       // 成功提示文本颜色
  card: string;          // 卡片背景色
  disabled: string;      // 禁用状态颜色
}

/**
 * 主题上下文类型
 * 定义主题相关的状态和操作
 */
export interface ThemeContextType {
  /**
   * 当前激活的主题
   */
  theme: ThemeType;

  /**
   * 切换主题的方法
   * 在 light 和 dark 之间切换
   */
  toggleTheme: () => void;

  /**
   * 主题配置对象
   * 包含每个主题的具体颜色值
   */
  themes: Record<ThemeType, ThemeColors>;
} 