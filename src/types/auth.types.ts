/**
 * DTOs de Autenticación - Alineados con backend NestJS
 */

// ========== REQUESTS ==========

export interface LoginRequest {
  email: string;
  password: string;
  organizationId: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  organizationName: string;
  organizationSlug?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface VerifyEmailRequest {
  token: string;
}

// ========== RESPONSES ==========

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isVerifiedEmail: boolean;
}

export interface OrganizationDto {
  id: string;
  name: string;
  slug: string;
  tenantId: string;
  logoUrl?: string;
  subscriptionPlan: string;
  isActive: boolean;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserDto;
  organizations: OrganizationDto[];
  activeOrganization: OrganizationDto;
}

export interface MeResponseDto {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  isVerifiedEmail: boolean;
}

export interface OrganizationsListResponseDto {
  organizations: OrganizationDto[];
}

// ========== DOMAIN MODELS ==========

export interface AuthState {
  user: UserDto | null;
  activeOrganization: OrganizationDto | null;
  organizations: OrganizationDto[];
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  organizationName: string;
  phone?: string;
}
