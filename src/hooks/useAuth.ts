import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import {
  LoginRequest,
  RegisterRequest,
  MeResponseDto,
  OrganizationsListResponseDto,
} from '@/types/auth.types';
import { ApiError } from '@/api/errors';

const QUERY_KEYS = {
  me: ['auth', 'me'] as const,
  organizations: ['auth', 'organizations'] as const,
};

/**
 * Hook para obtener el perfil actual del usuario
 * Usa React Query para cacheo y refetch automático
 */
export const useMe = () => {
  const { isAuthenticated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  return useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: () => AuthService.getMe(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
  });
};

/**
 * Hook para obtener las organizaciones del usuario
 */
export const useMyOrganizations = () => {
  const { isAuthenticated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  return useQuery({
    queryKey: QUERY_KEYS.organizations,
    queryFn: () => AuthService.getMyOrganizations(),
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: 1,
  });
};

/**
 * Hook para login
 * Gestiona el estado de carga, error y refetch automático
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      await login(payload);
    },
    onSuccess: () => {
      // Invalidar queries de autenticación
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.organizations });
    },
    onError: (error: ApiError) => {
      console.error('[useLogin] Error:', error.message);
    },
  });
};

/**
 * Hook para registro
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  const register = useAuthStore((state) => state.register);

  return useMutation({
    mutationFn: async (payload: RegisterRequest) => {
      await register(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.organizations });
    },
    onError: (error: ApiError) => {
      console.error('[useRegister] Error:', error.message);
    },
  });
};

/**
 * Hook para logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      // Limpiar cache completamente
      queryClient.clear();
    },
    onError: (error: ApiError) => {
      console.error('[useLogout] Error:', error.message);
    },
  });
};

/**
 * Hook para cambiar organización activa
 */
export const useSwitchOrganization = () => {
  const queryClient = useQueryClient();
  const switchOrganization = useAuthStore((state) => state.switchOrganization);

  return useMutation({
    mutationFn: async (organizationId: string) => {
      await switchOrganization(organizationId);
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con la nueva org
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.organizations });
    },
    onError: (error: ApiError) => {
      console.error('[useSwitchOrganization] Error:', error.message);
    },
  });
};

/**
 * Hook para restaurar sesión (usado en SplashScreen)
 */
export const useRestoreSession = () => {
  const restoreSession = useAuthStore((state) => state.restoreSession);

  return useQuery({
    queryKey: ['auth', 'restore'],
    queryFn: () => restoreSession(),
    staleTime: Infinity, // No refetchar automáticamente
    retry: 1,
  });
};
