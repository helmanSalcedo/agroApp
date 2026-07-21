import { apiInstance } from '@/api/client';
import { normalizeError } from '@/api/errors';
import {
  SendInvitationDto,
  AcceptInvitationDto,
  InvitationResponseDto,
} from '@/types/invitations.types';

/**
 * InvitationsService - Servicio tipado para operaciones de invitaciones
 */
export class InvitationsService {
  /**
   * Envía una invitación a un nuevo usuario
   */
  static async sendInvitation(payload: SendInvitationDto): Promise<InvitationResponseDto> {
    try {
      const response = await apiInstance.post<InvitationResponseDto>(
        '/invitations/send',
        payload,
      );
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Acepta una invitación y crea la cuenta del usuario
   */
  static async acceptInvitation(payload: AcceptInvitationDto): Promise<any> {
    try {
      const response = await apiInstance.post('/invitations/accept', payload);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Obtiene todas las invitaciones pendientes de la organización
   */
  static async getInvitations(): Promise<InvitationResponseDto[]> {
    try {
      const response = await apiInstance.get<InvitationResponseDto[]>('/invitations');
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Cancela una invitación pendiente
   */
  static async cancelInvitation(invitationId: string): Promise<void> {
    try {
      await apiInstance.delete(`/invitations/${invitationId}`);
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
