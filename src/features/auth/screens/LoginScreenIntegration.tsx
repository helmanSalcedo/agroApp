/**
 * EJEMPLO DE INTEGRACIÓN: LoginScreen
 *
 * Este archivo demuestra cómo usar la capa de integración completa
 * en una pantalla real de login.
 *
 * Flujo:
 * 1. Usuario ingresa email, password y selecciona organización
 * 2. Se ejecuta el mutation de login (useLogin hook)
 * 3. Se guarda token y usuario en almacenamiento seguro
 * 4. Se actualiza el estado global de Zustand
 * 5. React Query invalida el cache de datos
 * 6. Se navega a la pantalla principal
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLogin, useMyOrganizations } from '@/hooks/useAuth';
import { useActiveOrganization, useAuthUser } from '@/store/auth.store';
import { getUserFriendlyMessage } from '@/api/errors';
import { ApiError } from '@/api/errors';

export interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

/**
 * Componente de login integrado con backend
 */
export const LoginScreenIntegration: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  // ============= STATE =============
  const [email, setEmail] = useState('owner@fincaloscampos.com');
  const [password, setPassword] = useState('Password123!');
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');

  // ============= HOOKS =============
  const loginMutation = useLogin();
  const { data: orgs, isLoading: orgsLoading } = useMyOrganizations();
  const user = useAuthUser();
  const activeOrg = useActiveOrganization();

  // Determinar ID de org a usar
  const organizationIdToUse =
    selectedOrgId || (activeOrg?.id && 'id' in activeOrg ? activeOrg.id : '');

  // ============= HANDLERS =============
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!organizationIdToUse) {
      Alert.alert('Error', 'Please select an organization');
      return;
    }

    try {
      // El mutation automáticamente:
      // 1. Llama a AuthService.login()
      // 2. Guarda tokens en almacenamiento seguro
      // 3. Actualiza Zustand store
      // 4. Invalida React Query cache
      await loginMutation.mutateAsync({
        email,
        password,
        organizationId: organizationIdToUse,
      });

      // Navegar a pantalla principal
      onLoginSuccess?.();
    } catch (error) {
      const apiError = error as ApiError;
      const friendlyMessage = getUserFriendlyMessage(apiError);
      Alert.alert('Login Failed', friendlyMessage);
    }
  };

  // ============= RENDER =============
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>AgroApp Login</Text>
      <Text style={styles.subtitle}>
        Sign in to manage your farms
      </Text>

      {/* Email Input */}
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          editable={!loginMutation.isPending}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loginMutation.isPending}
        />
      </View>

      {/* Organization Selector */}
      <View style={styles.field}>
        <Text style={styles.label}>Organization</Text>
        <Text style={styles.info}>
          Demo organizations after first login. For now, use a pre-seeded org ID.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter organization ID (UUID)"
          value={selectedOrgId}
          onChangeText={setSelectedOrgId}
          editable={!loginMutation.isPending}
        />
        {orgsLoading && <Text style={styles.loading}>Loading organizations...</Text>}
        {orgs?.organizations && orgs.organizations.length > 0 && (
          <View style={styles.orgList}>
            {orgs.organizations.map((org) => (
              <TouchableOpacity
                key={org.id}
                style={[
                  styles.orgButton,
                  selectedOrgId === org.id && styles.orgButtonActive,
                ]}
                onPress={() => setSelectedOrgId(org.id)}
                disabled={loginMutation.isPending}
              >
                <Text
                  style={[
                    styles.orgButtonText,
                    selectedOrgId === org.id && styles.orgButtonTextActive,
                  ]}
                >
                  {org.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Error Message */}
      {loginMutation.error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {getUserFriendlyMessage(loginMutation.error as ApiError)}
          </Text>
        </View>
      )}

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, loginMutation.isPending && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <>
            <ActivityIndicator color="#fff" style={styles.spinner} />
            <Text style={styles.buttonText}>Signing in...</Text>
          </>
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Debug Info (solo en development) */}
      {__DEV__ && user && (
        <View style={styles.debugBox}>
          <Text style={styles.debugTitle}>Debug Info</Text>
          <Text style={styles.debugText}>User: {user.fullName}</Text>
          <Text style={styles.debugText}>Email: {user.email}</Text>
          {activeOrg && (
            <Text style={styles.debugText}>Org: {activeOrg.name}</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  info: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  loading: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  orgList: {
    marginTop: 8,
  },
  orgButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  orgButtonActive: {
    backgroundColor: '#52FF94',
    borderColor: '#52FF94',
  },
  orgButtonText: {
    fontSize: 14,
    color: '#333',
  },
  orgButtonTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#52FF94',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  spinner: {
    marginRight: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  debugBox: {
    marginTop: 32,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  debugTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 12,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
});
