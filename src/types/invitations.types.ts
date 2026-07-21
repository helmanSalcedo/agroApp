/**
 * DTOs de Invitaciones - Alineados con backend NestJS
 */

// ========== REQUESTS ==========

export interface SendInvitationDto {
  email: string;
  roleId?: string;
  message?: string;
}

export interface AcceptInvitationDto {
  token: string;
  fullName?: string;
  password: string;
}

// ========== RESPONSES ==========

export interface InvitationResponseDto {
  id: string;
  email: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  roleId?: string;
  expiresAt: string;
  acceptedAt?: string;
  invitedAt: string;
  createdAt: string;
}

// ========== DOMAIN MODELS ==========

export interface Invitation extends InvitationResponseDto {}

export interface InvitationsState {
  invitations: Invitation[];
  loading: boolean;
  error: string | null;
}
