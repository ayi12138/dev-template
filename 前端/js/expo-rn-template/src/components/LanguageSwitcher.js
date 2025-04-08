import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Divider, Button, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../hooks/useAuth';

const LanguageSwitcher = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const { user, updateUser } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    // 添加更多语言...
  ];

  const changeLanguage = async (language) => {
    try {
      // 更新i18n语言
      await i18n.changeLanguage(language);
      setSelectedLanguage(language);
      
      // 如果用户已登录，更新用户偏好
      if (user) {
        await updateUser({
          ...user,
          language
        });
      }
      
      // 保存语言偏好到本地存储
      await SecureStore.setItemAsync('userLanguage', language);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setVisible(false);
    }
  };

  // 获取当前语言的显示名称
  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === selectedLanguage);
    return lang ? `${lang.flag} ${lang.name}` : 'Select Language';
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button 
            mode="outlined" 
            onPress={() => setVisible(true)}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={{ color: theme.colors.text }}
          >
            {getCurrentLanguageName()}
          </Button>
        }
        contentStyle={[
          styles.menuContent, 
          { backgroundColor: theme.colors.surface }
        ]}
      >
        {languages.map((language) => (
          <React.Fragment key={language.code}>
            <Menu.Item
              title={`${language.flag} ${language.name}`}
              onPress={() => changeLanguage(language.code)}
              titleStyle={[
                styles.menuItemText,
                selectedLanguage === language.code && styles.selectedLanguage
              ]}
            />
            <Divider />
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  button: {
    borderColor: '#666',
  },
  buttonContent: {
    flexDirection: 'row-reverse', // 图标在右边
  },
  menuContent: {
    borderRadius: 8,
    elevation: 4,
  },
  menuItemText: {
    fontSize: 16,
  },
  selectedLanguage: {
    fontWeight: 'bold',
    color: '#6200EE', // 使用主题主色
  },
});

export default LanguageSwitcher;