import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RolesService } from '@/services/roles.service';
import { CreateRoleDto, UpdateRoleDto, RoleResponseDto } from '@/types/roles.types';
import { useAuthStore } from '@/store/auth.store';
import { ApiError } from '@/api/errors';

const QUERY_KEYS = {
  all: ['roles'] as const,
  detail: (id: string) => ['roles', id] as const,
};

/**
 * Hook para obtener todos los roles de la organización
 */
export const useRoles = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: () => RolesService.getRoles(),
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000, // 10 minutos (los roles cambian menos frecuentemente)
    retry: 1,
  });
};

/**
 * Hook para obtener un rol específico
 */
export const useRole = (roleId: string) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.detail(roleId),
    queryFn: () => RolesService.getRole(roleId),
    enabled: isAuthenticated && !!roleId,
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook para crear un nuevo rol
 */
export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRoleDto) => RolesService.createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error: ApiError) => {
      console.error('[useCreateRole] Error:', error.message);
    },
  });
};

/**
 * Hook para actualizar un rol
 */
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, data }: { roleId: string; data: UpdateRoleDto }) =>
      RolesService.updateRole(roleId, data),
    onSuccess: (_, { roleId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(roleId) });
    },
    onError: (error: ApiError) => {
      console.error('[useUpdateRole] Error:', error.message);
    },
  });
};

/**
 * Hook para eliminar un rol
 */
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleId: string) => RolesService.deleteRole(roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error: ApiError) => {
      console.error('[useDeleteRole] Error:', error.message);
    },
  });
};
