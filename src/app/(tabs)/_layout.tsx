import { Redirect, Tabs } from 'expo-router';
import { Text } from 'react-native';

import { Radius } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

const TAB_ICONS: Record<string, string> = {
  index: '🏠',
  explore: '🌿',
  activities: '🧾',
  expenses: '💰',
  profile: '👤',
};

export default function TabsLayout() {
  const { isReady, isAuthenticated } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#52FF94',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.45)',
        tabBarStyle: {
          backgroundColor: '#08120D',
          borderTopColor: 'rgba(255,255,255,0.08)',
          borderTopWidth: 1,
          paddingBottom: 8,
          height: 70,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 1,
        },
        tabBarItemStyle: {
          borderRadius: Radius.md,
          marginHorizontal: 2,
        },
        tabBarIcon: ({ focused, color, size }) => (
          <Text style={{ fontSize: focused ? size + 1 : size - 1, color }}>
            {TAB_ICONS[route.name] ?? '•'}
          </Text>
        ),
      })}>
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="explore" options={{ title: 'Fincas' }} />
      <Tabs.Screen name="activities" options={{ title: 'Actividades' }} />
      <Tabs.Screen name="expenses" options={{ title: 'Gastos' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
