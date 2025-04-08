import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const RegisterScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { register } = useAuth();
  const { t } = useTranslation();
  
  // 角色选项
  const roleOptions = [
    // { value: 'manager', label: t('register.roles.manager') },
    { value: 'worker', label: t('register.roles.worker') },
    { value: 'user', label: t('register.roles.user') }
  ];
  
  // 表单状态
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' // 默认角色为用户
  });
  
  // 模态框状态
  const [showRolePicker, setShowRolePicker] = useState(false);
  
  // 错误状态
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // 获取角色标签
  const getRoleLabel = (roleValue) => {
    return roleOptions.find(option => option.value === roleValue)?.label || t('register.selectRole');
  };

  // 验证规则
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'username':
        if (!value) error = t('register.errors.usernameRequired');
        else if (value.length < 4) error = t('register.errors.usernameMinLength');
        else if (value.length > 20) error = t('register.errors.usernameMaxLength');
        break;
        
      case 'email':
        if (!value) error = t('register.errors.emailRequired');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = t('register.errors.invalidEmail');
        }
        break;
        
      case 'phone':
        if (!value) error = t('register.errors.phoneRequired');
        else if (value && !/^1[3-9]\d{9}$/.test(value)) {
          error = t('register.errors.invalidPhone');
        }
        break;
        
      case 'password':
        if (!value) error = t('register.errors.passwordRequired');
        else if (value.length < 6) error = t('register.errors.passwordMinLength');
        break;
        
      case 'confirmPassword':
        if (!value) error = t('register.errors.confirmPasswordRequired');
        else if (value !== formData.password) error = t('register.errors.passwordsNotMatch');
        break;
        
      default:
        break;
    }
    
    return error;
  };

  // 表单字段变更处理
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 实时验证
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  // 角色选择变更
  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  // 表单提交
  const handleSubmit = async () => {
    // 验证所有字段
    const newErrors = {
      username: validateField('username', formData.username),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword)
    };
    
    setErrors(newErrors);
    
    // 检查是否有错误
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) return;
    
    try {
      setIsSubmitting(true);
      setServerError('');
      
      // 调用注册方法
      const result = await register({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        roles: [formData.role] // 将角色作为数组传递给后端
      });
      
      if (result.success) {
        // 注册成功，导航到主页或其他页面
        navigation.replace('Home');
      } else {
        setServerError(result.message || t('register.errors.registrationFailed'));
      }
    } catch (error) {
      console.error('Registration error:', error);
      setServerError(t('register.errors.registrationFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 字段失去焦点时验证
  const handleBlur = (name) => {
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, formData[name])
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.inner}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
          {t('register.title')}
        </Text>
        
        {/* 用户名输入 */}
        <TextInput
          label={t('register.username')}
          value={formData.username}
          onChangeText={(text) => handleChange('username', text)}
          onBlur={() => handleBlur('username')}
          error={!!errors.username}
          style={styles.input}
          autoCapitalize="none"
          left={<TextInput.Icon icon="account" />}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
        
        {/* 邮箱输入 */}
        <TextInput
          label={t('register.email')}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          onBlur={() => handleBlur('email')}
          error={!!errors.email}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email" />}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
        
        {/* 手机号输入 */}
        <TextInput
          label={t('register.phone')}
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          onBlur={() => handleBlur('phone')}
          error={!!errors.phone}
          style={styles.input}
          keyboardType="phone-pad"
          left={<TextInput.Icon icon="phone" />}
        />
        {errors.phone && (
          <Text style={styles.errorText}>{errors.phone}</Text>
        )}
        
        {/* 密码输入 */}
        <TextInput
          label={t('register.password')}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          onBlur={() => handleBlur('password')}
          error={!!errors.password}
          style={styles.input}
          secureTextEntry
          left={<TextInput.Icon icon="lock" />}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        
        {/* 确认密码输入 */}
        <TextInput
          label={t('register.confirmPassword')}
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          onBlur={() => handleBlur('confirmPassword')}
          error={!!errors.confirmPassword}
          style={styles.input}
          secureTextEntry
          left={<TextInput.Icon icon="lock-check" />}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
        
        {/* 角色选择器 */}
        <View style={styles.pickerContainer}>
          <Text style={[styles.pickerLabel, { color: theme.colors.text }]}>
            {t('register.selectRole')}
          </Text>
          <TouchableOpacity 
            style={[
              styles.pickerButton, 
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }
            ]}
            onPress={() => setShowRolePicker(true)}
          >
            <Text style={[styles.pickerButtonText, { color: theme.colors.text }]}>
              {getRoleLabel(formData.role)}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* 角色选择模态框 */}
        <Modal
          visible={showRolePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowRolePicker(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[
              styles.modalContent, 
              { backgroundColor: theme.colors.surface }
            ]}>
              <Text style={[
                styles.modalTitle, 
                { color: theme.colors.text }
              ]}>
                {t('register.selectRole')}
              </Text>
              
              {roleOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.roleOption,
                    formData.role === option.value && [
                      styles.selectedRole,
                      { backgroundColor: theme.colors.primaryContainer }
                    ]
                  ]}
                  onPress={() => {
                    handleRoleSelect(option.value);
                    setShowRolePicker(false);
                  }}
                >
                  <Text style={[
                    styles.roleOptionText,
                    { color: theme.colors.text },
                    formData.role === option.value && [
                      styles.selectedRoleText,
                      { color: theme.colors.primary }
                    ]
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  { backgroundColor: theme.colors.errorContainer }
                ]}
                onPress={() => setShowRolePicker(false)}
              >
                <Text style={[
                  styles.cancelButtonText,
                  { color: theme.colors.error }
                ]}>
                  {t('common.cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/* 服务器错误显示 */}
        {serverError && (
          <Text style={[styles.errorText, styles.serverError]}>
            {serverError}
          </Text>
        )}
        
        {/* 注册按钮 */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.button}
        >
          {t('register.button')}
        </Button>
        
        {/* 登录链接 */}
        <Button
          onPress={() => navigation.navigate('Login')}
          style={styles.link}
          labelStyle={{ color: theme.colors.primary }}
        >
          {t('register.loginLink')}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  pickerContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  pickerLabel: {
    marginBottom: 8,
    fontSize: 12,
  },
  pickerButton: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pickerButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  roleOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  selectedRole: {
    // 选中状态样式
  },
  roleOptionText: {
    fontSize: 16,
  },
  selectedRoleText: {
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
    paddingVertical: 5,
  },
  link: {
    marginTop: 16,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 16,
  },
  serverError: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
});

export default RegisterScreen;