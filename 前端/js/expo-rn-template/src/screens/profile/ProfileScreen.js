import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Card, Text, Button, useTheme, Divider, List } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../hooks/useTheme';

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    Alert.alert(
      t('profile.logoutConfirmTitle'),
      t('profile.logoutConfirmMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.confirm'),
          onPress: () => logout(),
        },
      ]
    );
  };

  const profileOptions = [
    {
      title: t('profile.settings'),
      icon: 'cog',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: t('profile.theme'),
      icon: 'theme-light-dark',
      onPress: toggleTheme,
      right: () => (
        <Text style={{ color: theme.colors.text }}>
          {isDarkTheme ? t('theme.dark') : t('theme.light')}
        </Text>
      ),
    },
    {
      title: t('profile.language'),
      icon: 'translate',
      onPress: () => navigation.navigate('Language'),
    },
    {
      title: t('profile.help'),
      icon: 'help-circle',
      onPress: () => navigation.navigate('Help'),
    },
  ];

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>{t('profile.notLoggedIn')}</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Login')}>
          {t('profile.login')}
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.profileHeader}>
        <Avatar.Text 
          size={80} 
          label={user.username.charAt(0).toUpperCase()}
          style={{ backgroundColor: theme.colors.primary }}
          labelStyle={{ color: theme.colors.onPrimary }}
        />
        <Text variant="titleLarge" style={[styles.username, { color: theme.colors.text }]}>
          {user.username}
        </Text>
        <Text style={{ color: theme.colors.secondary }}>
          {user.roles?.join(', ')}
        </Text>
      </View>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <List.Item
            title={t('profile.email')}
            description={user.email || t('profile.notSet')}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          <List.Item
            title={t('profile.phone')}
            description={user.phone || t('profile.notSet')}
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <Divider />
          <List.Item
            title={t('profile.registrationDate')}
            description={new Date(user.createTime).toLocaleDateString()}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          {profileOptions.map((option, index) => (
            <React.Fragment key={index}>
              <List.Item
                title={option.title}
                left={props => <List.Icon {...props} icon={option.icon} />}
                right={option.right}
                onPress={option.onPress}
              />
              {index < profileOptions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        onPress={handleLogout}
      >
        {t('profile.logout')}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  username: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 8,
    marginHorizontal: 16,
  },
});

export default ProfileScreen;