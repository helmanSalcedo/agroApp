import { apiInstance } from '@/api/client';
import { normalizeError } from '@/api/errors';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponseDto,
  MeResponseDto,
  OrganizationsListResponseDto,
  RefreshTokenRequest,
} from '@/types/auth.types';

/**
 * AuthService - Servicio tipado para todas las operaciones de autenticación
 * Abstrae la comunicación con el backend y normaliza errores
 */
export class AuthService {
  /**
   * Login con email y contraseña
   */
  static async login(payload: LoginRequest): Promise<AuthResponseDto> {
    try {
      const response = await apiInstance.post<AuthResponseDto>('/auth/login', payload);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Registro de nuevo usuario y creación automática de organización
   */
  static async register(payload: RegisterRequest): Promise<AuthResponseDto> {
    try {
      const response = await apiInstance.post<AuthResponseDto>('/auth/register', payload);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Refresca el access token usando el refresh token
   */
  static async refreshToken(payload: RefreshTokenRequest): Promise<AuthResponseDto> {
    try {
      const response = await apiInstance.post<AuthResponseDto>('/auth/refresh', payload);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Obtiene el perfil del usuario actual autenticado
   */
  static async getMe(): Promise<MeResponseDto> {
    try {
      const response = await apiInstance.get<MeResponseDto>('/auth/me');
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Obtiene todas las organizaciones del usuario actual
   */
  static async getMyOrganizations(): Promise<OrganizationsListResponseDto> {
    try {
      const response = await apiInstance.get<OrganizationsListResponseDto>('/auth/organizations');
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Cambia la organización activa sin desconectarse
   */
  static async switchOrganization(organizationId: string): Promise<AuthResponseDto> {
    try {
      const response = await apiInstance.post<AuthResponseDto>(
        `/auth/switch-organization/${organizationId}`,
      );
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Cierra sesión revocando la sesión actual
   */
  static async logout(): Promise<{ message: string }> {
    try {
      const response = await apiInstance.post<{ message: string }>('/auth/logout');
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Verifica email con token
   */
  static async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const response = await apiInstance.post<{ message: string }>('/auth/verify-email', {
        token,
      });
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
