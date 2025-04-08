import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Card, Text, Button, useTheme, Divider, List, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import userService from '../../services/userService';

const UserDetailScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const userId = route.params?.userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId && userId !== 'new') {
          const data = await userService.getUser(userId);
          setUser(data);
        } else {
          setUser({
            username: '',
            email: '',
            phone: '',
            roles: ['USER']
          });
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
        Alert.alert(t('error.title'), t('user.loadError'));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    if (!user?.id) return;
    
    Alert.alert(
      t('user.deleteConfirmTitle'),
      t('user.deleteConfirmMessage', { username: user.username }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('common.confirm'), 
          onPress: async () => {
            try {
              setIsDeleting(true);
              await userService.deleteUser(user.id);
              navigation.goBack();
            } catch (error) {
              console.error('Failed to delete user', error);
              Alert.alert(t('error.title'), t('user.deleteError'));
            } finally {
              setIsDeleting(false);
            }
          } 
        }
      ]
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (user.id) {
        // 更新现有用户
        await userService.updateUser(user.id, user);
        Alert.alert(t('success.title'), t('user.updateSuccess'));
      } else {
        // 创建新用户
        const newUser = await userService.createUser(user);
        setUser(newUser);
        Alert.alert(t('success.title'), t('user.createSuccess'));
      }
    } catch (error) {
      console.error('Failed to save user', error);
      Alert.alert(t('error.title'), t('user.saveError'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={user?.username?.charAt(0)?.toUpperCase() || '?'}
          style={{ backgroundColor: theme.colors.primary }}
          labelStyle={{ color: theme.colors.onPrimary }}
        />
        <Text variant="titleLarge" style={[styles.username, { color: theme.colors.text }]}>
          {user?.username || t('user.newUser')}
        </Text>
      </View>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <List.Item
            title={t('user.username')}
            description={user?.username || ''}
            left={props => <List.Icon {...props} icon="account" />}
          />
          <Divider />
          <List.Item
            title={t('user.email')}
            description={user?.email || t('common.notSet')}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          <List.Item
            title={t('user.phone')}
            description={user?.phone || t('common.notSet')}
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <Divider />
          <List.Item
            title={t('user.roles')}
            description={user?.roles?.join(', ')}
            left={props => <List.Icon {...props} icon="security" />}
          />
        </Card.Content>
      </Card>

      {currentUser?.roles?.includes('ADMIN') && (
        <View style={styles.actions}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('UserEdit', { user })}
            disabled={!user?.id}
          >
            {t('common.edit')}
          </Button>
          
          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: theme.colors.error }]}
            onPress={handleDelete}
            loading={isDeleting}
            disabled={isDeleting || !user?.id}
          >
            {t('common.delete')}
          </Button>
        </View>
      )}

      {userId === 'new' && (
        <Button
          mode="contained"
          style={[styles.saveButton, { marginTop: 16 }]}
          onPress={handleSave}
          loading={loading}
          disabled={loading}
        >
          {t('common.save')}
        </Button>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  saveButton: {
    marginHorizontal: 16,
  },
});

export default UserDetailScreen;