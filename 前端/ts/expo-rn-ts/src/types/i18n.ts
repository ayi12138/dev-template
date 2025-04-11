/**
 * 支持的语言类型
 * 使用联合类型定义可选的语言选项
 * zh_CN: 简体中文
 * en_US: 美式英语
 */
export type LanguageType = 'zh_CN' | 'en_US';

/**
 * 翻译文本的类型定义
 * 使用嵌套的接口来组织翻译文本的结构
 */
export interface Translations {
  /**
   * 认证相关的翻译文本
   */
  auth: {
    username: string;    // 用户名标签
    password: string;    // 密码标签
    login: string;      // 登录按钮文本
    register: string;   // 注册按钮文本
    role: string;       // 角色选择标签
    user: string;       // 普通用户选项
    worker: string;     // 工作人员选项
  };

  /**
   * 通用翻译文本
   */
  common: {
    home: string;       // 首页标签
    settings: string;   // 设置标签
    theme: string;      // 主题设置标签
    language: string;   // 语言设置标签
    logout: string;     // 登出按钮文本
  };
}

/**
 * 国际化上下文的类型定义
 * 定义了上下文提供的功能和数据
 */
export interface I18nContextType {
  /**
   * 当前激活的语言
   */
  language: LanguageType;

  /**
   * 切换语言的方法
   * @param lang - 目标语言类型
   */
  setLanguage: (lang: LanguageType) => void;

  /**
   * 翻译函数
   * @param key - 翻译键，使用点号分隔的路径格式（如 'auth.login'）
   * @returns 对应的翻译文本，如果未找到则返回原键
   */
  t: (key: string) => string;

  /**
   * 当前语言的所有翻译文本
   */
  translations: Translations;
} 