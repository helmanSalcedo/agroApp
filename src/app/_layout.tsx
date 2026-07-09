import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AuthProvider, useAuth } from '@/context/auth-context';

const PUBLIC_ROUTES = new Set([
  'splash',
  'welcome',
  'onboarding-1',
  'onboarding-2',
  'onboarding-3',
  'login',
  'register',
]);

function RootNavigator() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const { isReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const current = segments[0] ?? 'splash';
    const isPublicRoute = PUBLIC_ROUTES.has(current);
    const isOnboardingRoute = current.startsWith('onboarding-');

    if (current === 'splash') {
      return;
    }

    if (isAuthenticated) {
      if (current === 'welcome') {
        return;
      }

      if (isPublicRoute) {
        router.replace('/(tabs)');
      }
      return;
    }

    const allowedWithoutSession = current === 'welcome' || current === 'login' || current === 'register' || isOnboardingRoute;
    if (!allowedWithoutSession) {
      router.replace('/welcome');
    }
  }, [isReady, isAuthenticated, segments, router]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="splash" screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="onboarding-1" />
        <Stack.Screen name="onboarding-2" />
        <Stack.Screen name="onboarding-3" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="farm-detail" />
        <Stack.Screen name="lots-list" />
        <Stack.Screen name="lot-detail" />
        <Stack.Screen name="lot-create" />
        <Stack.Screen name="lot-result" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="activity-select" />
        <Stack.Screen name="activity-register" />
        <Stack.Screen name="activity-detail" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="expense-create" />
        <Stack.Screen name="expense-history" />
        <Stack.Screen name="expense-detail" />
        <Stack.Screen name="production-lot" />
        <Stack.Screen name="production-general" />
        <Stack.Screen name="farm-edit" />
        <Stack.Screen name="lot-edit" />
        <Stack.Screen name="farm-create" />
        <Stack.Screen name="profile-edit" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}

export default function TabLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
