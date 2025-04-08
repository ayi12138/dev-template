import api from '../config/axios';
import * as SecureStore from 'expo-secure-store';

const userService = {
  /**
   * 获取用户列表（分页）
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页数量
   * @param {string} params.search - 搜索关键词
   * @returns {Promise<{items: Array, total: number}>}
   */
  async getUsers(params = { page: 1, size: 10, search: '' }) {
    try {
      const response = await api.get('/users', { params });
      return {
        items: response.data.items || [],
        total: response.data.total || 0,
      };
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  /**
   * 获取单个用户详情
   * @param {string|number} userId - 用户ID
   * @returns {Promise<Object>}
   */
  async getUser(userId) {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch user ${userId}:`, error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  /**
   * 创建新用户
   * @param {Object} userData - 用户数据
   * @param {string} userData.username - 用户名
   * @param {string} userData.password - 密码
   * @param {string} userData.email - 邮箱
   * @param {string} userData.phone - 手机号
   * @param {Array} userData.roles - 角色数组
   * @returns {Promise<Object>}
   */
  async createUser(userData) {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },

  /**
   * 更新用户信息
   * @param {string|number} userId - 用户ID
   * @param {Object} userData - 要更新的用户数据
   * @returns {Promise<Object>}
   */
  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update user ${userId}:`, error);
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },

  /**
   * 删除用户
   * @param {string|number} userId - 用户ID
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    try {
      await api.delete(`/users/${userId}`);
    } catch (error) {
      console.error(`Failed to delete user ${userId}:`, error);
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  /**
   * 获取当前登录用户信息
   * @returns {Promise<Object>}
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/users/me');
      
      // 更新本地存储的用户数据
      await SecureStore.setItemAsync('userData', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch current user');
    }
  },

  /**
   * 更新当前用户密码
   * @param {string} currentPassword - 当前密码
   * @param {string} newPassword - 新密码
   * @returns {Promise<void>}
   */
  async changePassword(currentPassword, newPassword) {
    try {
      await api.put('/users/change-password', { currentPassword, newPassword });
    } catch (error) {
      console.error('Failed to change password:', error);
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },

  /**
   * 更新用户头像
   * @param {string|number} userId - 用户ID
   * @param {Object} image - 图片文件
   * @returns {Promise<Object>} - 返回更新后的用户信息
   */
  async uploadAvatar(userId, image) {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || `avatar-${userId}.jpg`,
      });

      const response = await api.put(`/users/${userId}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw new Error(error.response?.data?.message || 'Failed to upload avatar');
    }
  },

  /**
   * 搜索用户
   * @param {string} query - 搜索关键词
   * @param {Object} options - 搜索选项
   * @param {number} options.limit - 返回结果数量限制
   * @returns {Promise<Array>}
   */
  async searchUsers(query, options = { limit: 10 }) {
    try {
      const response = await api.get('/users/search', {
        params: { query, ...options },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search users:', error);
      throw new Error(error.response?.data?.message || 'Failed to search users');
    }
  },
};

export default userService;