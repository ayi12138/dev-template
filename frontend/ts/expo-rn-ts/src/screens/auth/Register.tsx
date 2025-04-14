import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { useI18n } from '../../contexts/I18nContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import type { AuthScreenProps } from '../../types/navigation';

import { authService } from '../../services/auth';


type RoleOption = {
  label: string;
  value: 'USER' | 'WORKER';
};

interface UserData {
  id: number;
  username: string;
  role: string;
}

/**
 * 注册页面组件
 * 处理用户注册流程，包括用户名、密码和角色选择
 */
const Register = ({ navigation }: AuthScreenProps) => {
  // 使用自定义 hooks 获取上下文
  const { t } = useI18n();                // 国际化
  const { theme, themes } = useTheme();    // 主题
  const { signUp } = useAuth();           // 认证

  // 表单状态管理
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'WORKER'>('USER');
  const [showRolePicker, setShowRolePicker] = useState(false);

  const roleOptions: RoleOption[] = [
    { label: t('auth.user'), value: 'USER' },
    { label: t('auth.worker'), value: 'WORKER' },
  ];

  // 处理表单验证
  const validateForm = () => {
    if (!username.trim()) {
      Alert.alert(t('auth.tips.title'), t('auth.validation.usernameRequired'));
      return false;
    } else if (!password.trim()) {
      Alert.alert(t('auth.tips.title'), t('auth.validation.passwordRequired'));
      return false;
    } else if (password.length < 6) {
      Alert.alert(t('auth.tips.title'), t('auth.validation.passwordLength'));
      return false;
    }
    return true;
  };
  /**
   * 处理注册逻辑
   * 注册成功后跳转到登录页面
   */
  const handleRegister = async () => {
    if (validateForm()) {
      const response = await authService.register({ username, password, role });
      if (response.code === 200) {
        navigation.navigate('Login');
        Alert.alert(t('auth.tips.title'), t('auth.validation.registerSuccess'));
      } else {
        Alert.alert(t('auth.tips.title'), t('auth.validation.registerFailed'), [
          { text: t('common.confirm') }
        ]);
      }
    }
  };

  const selectedRoleLabel = roleOptions.find(option => option.value === role)?.label;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: themes[theme].background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, { color: themes[theme].text }]}>
            {t('auth.register')}
          </Text>
          <Text style={[styles.subHeaderText, { color: themes[theme].placeholder }]}>
            {t('auth.registerSubtitle')}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: themes[theme].text }]}>
              {t('auth.username')}
            </Text>
            <TextInput
              placeholder={t('auth.placeholder.username')}
              value={username}
              onChangeText={setUsername}
              style={[styles.input, { 
                color: themes[theme].text,
                backgroundColor: themes[theme].inputBackground,
                borderColor: themes[theme].border 
              }]}
              placeholderTextColor={themes[theme].placeholder}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: themes[theme].text }]}>
              {t('auth.password')}
            </Text>
            <TextInput
              placeholder={t('auth.placeholder.password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, { 
                color: themes[theme].text,
                backgroundColor: themes[theme].inputBackground,
                borderColor: themes[theme].border 
              }]}
              placeholderTextColor={themes[theme].placeholder}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: themes[theme].text }]}>
              {t('auth.role')}
            </Text>
            <TouchableOpacity
              style={[styles.roleSelector, { 
                backgroundColor: themes[theme].inputBackground,
                borderColor: themes[theme].border 
              }]}
              onPress={() => setShowRolePicker(true)}
            >
              <Text style={[styles.roleSelectorText, { color: themes[theme].text }]}>
                {selectedRoleLabel}
              </Text>
              <Text style={[styles.roleSelectorIcon, { color: themes[theme].text }]}>
                ▼
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: themes[theme].primary }]}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>{t('auth.register')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.loginText, { color: themes[theme].primary }]}>
              {t('auth.hasAccount')} {t('auth.login')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showRolePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRolePicker(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowRolePicker(false)}
        >
          <View style={[styles.modalContent, { 
            backgroundColor: themes[theme].card,
            borderColor: themes[theme].border,
          }]}>
            {roleOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.roleOption, { 
                  backgroundColor: role === option.value ? themes[theme].primary + '20' : 'transparent'
                }]}
                onPress={() => {
                  setRole(option.value);
                  setShowRolePicker(false);
                }}
              >
                <Text style={[styles.roleOptionText, { 
                  color: themes[theme].text,
                  fontWeight: role === option.value ? '600' : 'normal'
                }]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

/**
 * 样式定义
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  roleSelector: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleSelectorText: {
    fontSize: 16,
  },
  roleSelectorIcon: {
    fontSize: 12,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  roleOption: {
    padding: 16,
  },
  roleOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Register; 