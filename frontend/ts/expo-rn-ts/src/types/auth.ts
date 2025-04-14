/**
 * 认证凭据接口
 * 定义用户认证所需的基本信息
 */
export interface AuthCredentials {
  username: string;      // 用户名
  password: string;      // 密码
  role?: string;        // 可选的用户角色，用于注册时指定
}

/**
 * 认证上下文类型
 * 定义了认证相关的所有操作方法
 */
export interface AuthContextType {
  /**
   * 用户登录方法
   * @param credentials - 登录凭据（用户名和密码）
   * @returns Promise<void> - 登录成功后 resolve，失败则 reject
   */
  signIn: (credentials: AuthCredentials) => Promise<void>;

  /**
   * 用户登出方法
   * 清除本地存储的认证信息
   * @returns Promise<void>
   */
  signOut: () => Promise<void>;

  /**
   * 用户注册方法
   * @param credentials - 注册信息（用户名、密码和角色）
   * @returns Promise<void> - 注册成功后 resolve，失败则 reject
   */
  signUp: (credentials: AuthCredentials) => Promise<void>;
} 