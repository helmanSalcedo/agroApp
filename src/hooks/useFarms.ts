import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FarmsService } from '@/services/farms.service';
import { CreateFarmDto, UpdateFarmDto, FarmResponseDto } from '@/types/farms.types';
import { useAuthStore } from '@/store/auth.store';
import { ApiError } from '@/api/errors';

const QUERY_KEYS = {
  all: ['farms'] as const,
  detail: (id: string) => ['farms', id] as const,
};

/**
 * Hook para obtener todas las granjas de la organización actual
 * Usa React Query para cacheo automático
 */
export const useFarms = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: () => FarmsService.getFarms(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
  });
};

/**
 * Hook para obtener una granja específica
 */
export const useFarm = (farmId: string) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.detail(farmId),
    queryFn: () => FarmsService.getFarm(farmId),
    enabled: isAuthenticated && !!farmId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook para crear una nueva granja
 */
export const useCreateFarm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateFarmDto) => FarmsService.createFarm(payload),
    onSuccess: () => {
      // Invalidar la lista de granjas para refrescar
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error: ApiError) => {
      console.error('[useCreateFarm] Error:', error.message);
    },
  });
};

/**
 * Hook para actualizar una granja
 */
export const useUpdateFarm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ farmId, data }: { farmId: string; data: UpdateFarmDto }) =>
      FarmsService.updateFarm(farmId, data),
    onSuccess: (_, { farmId }) => {
      // Invalidar tanto la lista como el detalle
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(farmId) });
    },
    onError: (error: ApiError) => {
      console.error('[useUpdateFarm] Error:', error.message);
    },
  });
};

/**
 * Hook para eliminar una granja
 */
export const useDeleteFarm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (farmId: string) => FarmsService.deleteFarm(farmId),
    onSuccess: () => {
      // Invalidar la lista de granjas
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error: ApiError) => {
      console.error('[useDeleteFarm] Error:', error.message);
    },
  });
};
