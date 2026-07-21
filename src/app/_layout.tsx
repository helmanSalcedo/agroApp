import { Stack, useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { useEffect, useRef } from 'react';

import { AuthProvider, useAuth } from '@/context/auth-context';
import { FarmProvider } from '@/context/farm-context';
import { LotProvider } from '@/context/lot-context';
import { ActivityProvider } from '@/context/activity-context';
import { ExpenseProvider } from '@/context/expense-context';
import { ProductionProvider } from '@/context/production-context';
import { NotificationProvider } from '@/context/notification-context';
import { OrganizationProvider } from '@/context/organization-context';
import { TaskProvider } from '@/context/task-context';
import { AlertManager } from '@/components/alert-manager';

function RootNavigator() {
  const router = useRouter();
  const { isReady, isAuthenticated } = useAuth();
  const navigationReadyRef = useRef(false);

  useEffect(() => {
    if (!isReady) return;

    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/welcome');
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#020403' }}>
        <Text style={{ color: '#52FF94', fontSize: 24, fontWeight: 'bold' }}>AgroApp</Text>
      </View>
    );
  }

  return (
    <>
      <AlertManager />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} initialRouteName="welcome">
        {/* Auth Screens */}
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="onboarding-1" />
        <Stack.Screen name="onboarding-2" />
        <Stack.Screen name="onboarding-3" />

        {/* Main Tabs */}
        <Stack.Screen name="(tabs)" />

        {/* Organization Screens */}
        <Stack.Screen name="organizations" />
        <Stack.Screen name="organization-detail" />

        {/* Farm Screens */}
        <Stack.Screen name="farm-detail" />
        <Stack.Screen name="farm-create" />
        <Stack.Screen name="farm-edit" />

        {/* Lot Screens */}
        <Stack.Screen name="lots-list" />
        <Stack.Screen name="lot-detail" />
        <Stack.Screen name="lot-create" />
        <Stack.Screen name="lot-edit" />
        <Stack.Screen name="lot-result" />

        {/* Activity Screens */}
        <Stack.Screen name="activity-select" />
        <Stack.Screen name="activity-register" />
        <Stack.Screen name="activity-detail" />

        {/* Expense Screens */}
        <Stack.Screen name="expense-create" />
        <Stack.Screen name="expense-history" />
        <Stack.Screen name="expense-detail" />
        <Stack.Screen name="expense-select" />
        <Stack.Screen name="expense-register" />

        {/* Production Screens */}
        <Stack.Screen name="production-lot" />
        <Stack.Screen name="production-general" />
        <Stack.Screen name="production-register" />
        <Stack.Screen name="production-list" />
        <Stack.Screen name="production-dashboard" />
        <Stack.Screen name="production-detail" />

        {/* Sales Screens */}
        <Stack.Screen name="sale-register" />

        {/* Inventory Screens */}
        <Stack.Screen name="inventory" />
        <Stack.Screen name="inventory-detail" />

        {/* News & Marketplace */}
        <Stack.Screen name="news" />
        <Stack.Screen name="product-detail" />

        {/* Profile */}
        <Stack.Screen name="profile-edit" />

        {/* New Screens - Phase 1+ */}
        <Stack.Screen name="professional-dashboard" />
        <Stack.Screen name="professional-questions" />
        <Stack.Screen name="professional-question-detail" />
        <Stack.Screen name="professional-appointments" />
        <Stack.Screen name="professional-reviews" />
        <Stack.Screen name="professional-services" />
        <Stack.Screen name="tasks-list" />
        <Stack.Screen name="task-detail" />
        <Stack.Screen name="task-create" />
        <Stack.Screen name="calendar-view" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="livestock" />
        <Stack.Screen name="aquaculture" />
        <Stack.Screen name="marketplace" />
        <Stack.Screen name="notifications-center" />
        <Stack.Screen name="ai-tips" />
        <Stack.Screen name="professionals-network" />
        <Stack.Screen name="professionals-register" />
        <Stack.Screen name="professional-detail" />
        <Stack.Screen name="financial-summary" />
        <Stack.Screen name="qr-management" />
        <Stack.Screen name="permissions-management" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <OrganizationProvider>
        <FarmProvider>
          <LotProvider>
            <ActivityProvider>
              <ExpenseProvider>
                <ProductionProvider>
                  <NotificationProvider>
                    <TaskProvider>
                      <RootNavigator />
                    </TaskProvider>
                  </NotificationProvider>
                </ProductionProvider>
              </ExpenseProvider>
            </ActivityProvider>
          </LotProvider>
        </FarmProvider>
      </OrganizationProvider>
    </AuthProvider>
  );
}
