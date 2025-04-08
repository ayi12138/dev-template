import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, useTheme } from 'react-native-paper';
import { useThemeContext } from '../../hooks/useTheme';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const theme = useTheme();
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>
        <List.Subheader>{t('settings.appearance')}</List.Subheader>
        <List.Item
          title={t('settings.darkMode')}
          right={() => (
            <Switch 
              value={isDarkTheme} 
              onValueChange={toggleTheme} 
            />
          )}
        />
        
        <List.Subheader>{t('settings.language')}</List.Subheader>
        <LanguageSwitcher />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});