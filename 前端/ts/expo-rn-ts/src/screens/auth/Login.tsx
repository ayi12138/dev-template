import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useI18n } from '../../contexts/I18nContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import type { AuthScreenProps } from '../../types/navigation';

/**
 * 登录页面组件
 * 使用 AuthScreenProps 类型来确保导航属性的类型安全
 */
export default function LoginScreen({ navigation }: AuthScreenProps) {
  // 状态管理：用户名和密码
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // 使用自定义 hooks 获取上下文
  const { t } = useI18n();                // 国际化
  const { theme, themes } = useTheme();    // 主题
  const { signIn } = useAuth();          // 认证


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
   * 处理登录逻辑
   * 使用 async/await 处理异步操作
   */
  const handleLogin = async () => {
    if (validateForm()) {
      const response = await signIn({ username, password });
      if (response.code === 200) {
        Alert.alert(t('auth.tips.title'), t('auth.validation.loginSuccess'));
      } else {
        Alert.alert(t('auth.tips.title'), t('auth.validation.loginFailed'), [
          { text: t('common.confirm') }
        ]);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: themes[theme].background }]}
    >
      <View style={styles.logoContainer}>
        <Text style={[styles.welcomeText, { color: themes[theme].text }]}>
          {t('auth.welcome')}
        </Text>
      </View>

      <View style={styles.formContainer}>
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

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themes[theme].primary }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>{t('auth.login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.registerText, { color: themes[theme].primary }]}>
            {t('auth.noAccount')} {t('auth.register')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/**
 * 样式定义
 * 使用 StyleSheet.create 可以提供更好的性能和类型检查
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  input: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
  },
});