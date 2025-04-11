import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useI18n } from '../../contexts/I18nContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { SettingsScreenProps } from '../../types/navigation';
const Settings = ({ navigation }: SettingsScreenProps) => {
  const { t, language, setLanguage } = useI18n();
  const { theme, themes, toggleTheme } = useTheme();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: themes[theme].background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themes[theme].text }]}>
          {t('common.language')}
        </Text>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: themes[theme].card }]}
          onPress={() => setLanguage(language === 'zh_CN' ? 'en_US' : 'zh_CN')}
        >
          <Text style={[styles.optionText, { color: themes[theme].text }]}>
            {language === 'zh_CN' ? '中文' : 'English'}
          </Text>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={themes[theme].text} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themes[theme].text }]}>
          {t('common.theme')}
        </Text>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: themes[theme].card }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.optionText, { color: themes[theme].text }]}>
            {theme === 'light' ? t('common.lightTheme') : t('common.darkTheme')}
          </Text>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={themes[theme].text} 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: themes[theme].error }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>{t('common.logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Settings; 