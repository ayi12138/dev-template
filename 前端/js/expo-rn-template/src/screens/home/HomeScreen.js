import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useThemeContext } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isDarkTheme } = useThemeContext();

  const features = [
    {
      title: t('home.features.users'),
      icon: 'account-group',
      iconComponent: <MaterialCommunityIcons name="account-group" size={24} />,
      onPress: () => navigation.navigate('Users'),
      visible: user?.roles?.includes('ADMIN')
    },
    {
      title: t('home.features.profile'),
      icon: 'account-circle',
      iconComponent: <MaterialCommunityIcons name="account-circle" size={24} />,
      onPress: () => navigation.navigate('Profile')
    },
    {
      title: t('home.features.settings'),
      icon: 'cog',
      iconComponent: <MaterialCommunityIcons name="cog" size={24} />,
      onPress: () => navigation.navigate('Settings')
    },
    {
      title: t('home.features.analytics'),
      icon: 'chart-bar',
      iconComponent: <MaterialCommunityIcons name="chart-bar" size={24} />,
      onPress: () => navigation.navigate('Analytics'),
      comingSoon: true
    }
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
          {t('home.welcome')}, {user?.username || t('home.guest')}!
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
          {t('home.description')}
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        {features.filter(f => f.visible !== false).map((feature, index) => (
          <Card 
            key={index} 
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
            onPress={feature.onPress}
            disabled={feature.comingSoon}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardIcon}>
                <Text 
                  style={[styles.icon, { color: theme.colors.primary }]}
                >{feature.iconComponent}</Text>
              </View>
              <Text variant="titleMedium" style={{ color: theme.colors.text }}>
                {feature.title}
              </Text>
              
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.themeInfo}>
        <Text variant="bodySmall" style={{ color: theme.colors.text }}>
          {t('home.currentTheme')}: {isDarkTheme ? t('home.dark') : t('home.light')}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    marginBottom: 16,
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cardIcon: {
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
    fontFamily: 'MaterialCommunityIcons',
  },
  comingSoon: {
    marginTop: 4,
    color: '#888',
  },
  themeInfo: {
    marginTop: 8,
    alignItems: 'center',
  },
});

export default HomeScreen;