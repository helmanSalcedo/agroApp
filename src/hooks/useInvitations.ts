import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InvitationsService } from '@/services/invitations.service';
import {
  SendInvitationDto,
  AcceptInvitationDto,
  InvitationResponseDto,
} from '@/types/invitations.types';
import { useAuthStore } from '@/store/auth.store';
import { ApiError } from '@/api/errors';

const QUERY_KEYS = {
  all: ['invitations'] as const,
};

/**
 * Hook para obtener todas las invitaciones pendientes
 */
export const useInvitations = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: () => InvitationsService.getInvitations(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/**
 * Hook para enviar una invitación a un nuevo usuario
 */
export const useSendInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendInvitationDto) => InvitationsService.sendInvitation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error: ApiError) => {
      console.error('[useSendInvitation] Error:', error.message);
    },
  });
};

/**
 * Hook para aceptar una invitación y crear cuenta
 */
export const useAcceptInvitation = () => {
  return useMutation({
    mutationFn: (payload: AcceptInvitationDto) =>
      InvitationsService.acceptInvitation(payload),
    onError: (error: ApiError) => {
      console.error('[useAcceptInvitation] Error:', error.message);
    },
  });
};

/**
 * Hook para cancelar una invitación
 */
export const useCancelInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) =>
      InvitationsService.cancelInvitation(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
    },
    onError: (error: ApiError) => {
      console.error('[useCancelInvitation] Error:', error.message);
    },
  });
};
