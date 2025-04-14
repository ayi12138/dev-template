import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useI18n } from '../../../contexts/I18nContext';
import { useTheme } from '../../../contexts/ThemeContext';

const WorkerHome = () => {
  const { t } = useI18n();
  const { theme, themes } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themes[theme].background }]}>
      <Text style={{ color: themes[theme].text }}>
        {t('home.worker.title')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkerHome;
