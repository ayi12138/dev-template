import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function LoginScreen({ navigation }) {
  const theme = useTheme();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await login(username, password);
      if (!result.success) {
        setError(result.message || t('login.error'));
      }
    } catch (err) {
      setError(t('login.error'));
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.inner}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
          {t('login.title')}
        </Text>
        
        <TextInput
          label={t('login.username')}
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          left={<TextInput.Icon icon="account" />}
        />
        
        <TextInput
          label={t('login.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
        />
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          {t('login.button')}
        </Button>
        
        <Button
          onPress={() => navigation.navigate('Register')}
          style={styles.link}
        >
          {t('login.registerLink')}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

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
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  link: {
    marginTop: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

