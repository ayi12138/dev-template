import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { ActivityIndicator, Button, Card, Text, useTheme } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { userService } from '../../services/userService';
import { useTranslation } from 'react-i18next';

export default function UserListScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadUsers();
  };

  const renderItem = ({ item }) => (
    <Card 
      style={styles.card}
      onPress={() => navigation.navigate('UserDetail', { userId: item.id })}
    >
      <Card.Title 
        title={item.username}
        subtitle={`ID: ${item.id}`}
        left={(props) => <Text {...props}>👤</Text>}
      />
      <Card.Content>
        <Text variant="bodyMedium">{t('users.email')}: {item.email}</Text>
        <Text variant="bodyMedium">{t('users.phone')}: {item.phone}</Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {user?.roles?.includes('ADMIN') && (
        <Button 
          mode="contained" 
          style={styles.addButton}
          onPress={() => navigation.navigate('UserDetail', { userId: 'new' })}
        >
          {t('users.addUser')}
        </Button>
      )}
      
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t('users.noUsers')}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  addButton: {
    margin: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});