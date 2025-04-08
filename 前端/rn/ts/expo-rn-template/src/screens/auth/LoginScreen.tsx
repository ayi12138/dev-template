import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../types/navigation';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login } from '../../store/slices/authSlice';

export function LoginScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    // 模拟登录成功
    dispatch(login({
      token: 'fake-token',
      userInfo: {
        id: '1',
        username: 'test',
        email: 'test@example.com'
      }
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.link}>还没有账号？去注册</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    color: '#007AFF',
    marginTop: 10,
  },
}); 