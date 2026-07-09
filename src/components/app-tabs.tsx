import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';
import { Text } from 'react-native';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#839084',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E7EFE5',
          borderTopWidth: 1,
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabIcon label="⌂" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Fincas',
          tabBarIcon: ({ color }) => <TabIcon label="◱" color={color} />,
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Actividades',
          tabBarIcon: ({ color }) => <TabIcon label="✓" color={color} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Gastos',
          tabBarIcon: ({ color }) => <TabIcon label="$" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabIcon label="◯" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ label, color }: { label: string; color: ColorValue }) {
  return <Text style={{ fontSize: 18, color, lineHeight: 22 }}>{label}</Text>;
}
