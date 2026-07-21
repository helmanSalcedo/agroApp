/**
 * EJEMPLO: Root Layout integrado con React Query + Zustand + API
 *
 * Este archivo muestra cómo configurar la aplicación para:
 * 1. Inicializar React Query
 * 2. Restaurar sesión al iniciar
 * 3. Renderizar condicional (loading, auth, app)
 * 4. Manejar errores globales
 */

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import { useAuthStore, useIsAuthenticated } from '@/store/auth.store';
import { useRestoreSession } from '@/hooks/useAuth';
import { LoginScreenIntegration } from '@/features/auth/screens/LoginScreenIntegration';

// Simular RootNavigator (stack de navegación real)
const AuthStack = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreenIntegration
        onLoginSuccess={() => {
          console.log('[Navigation] Login successful, navigate to app');
        }}
      />
    </View>
  );
};

const AppStack = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Welcome! App Stack Here
      </Text>
      <Text style={{ marginTop: 8, color: '#666' }}>
        (Other screens would go here)
      </Text>
    </View>
  );
};

/**
 * Componente que maneja la lógica de restauración de sesión
 * Separado para que pueda usar hooks sin problemas
 */
const SessionRestorer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: restoreResult, isLoading, error } = useRestoreSession();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isLoading) {
      console.log('[SessionRestorer] Restore complete', {
        authenticated: isAuthenticated,
        hasError: !!error,
      });
    }
  }, [isLoading, isAuthenticated, error]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#52FF94" />
        <Text style={{ marginTop: 12, color: '#666' }}>Initializing AgroApp...</Text>
      </View>
    );
  }

  if (error) {
    console.error('[SessionRestorer] Error:', error);
    // No bloquear la app si hay error, dejar que el usuario pueda hacer login
  }

  return <>{children}</>;
};

/**
 * Root Layout component
 *
 * Stack de providers:
 * 1. QueryClientProvider (React Query)
 * 2. SessionRestorer (restaura sesión y muestra splash)
 * 3. Conditional rendering (Auth Stack o App Stack)
 */
export const RootLayoutIntegration: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionRestorer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </SessionRestorer>
    </QueryClientProvider>
  );
};

export default RootLayoutIntegration;
