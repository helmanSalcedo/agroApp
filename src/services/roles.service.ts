import { apiInstance } from '@/api/client';
import { normalizeError } from '@/api/errors';
import { CreateRoleDto, UpdateRoleDto, RoleResponseDto } from '@/types/roles.types';

/**
 * RolesService - Servicio tipado para operaciones de roles
 */
export class RolesService {
  /**
   * Obtiene todos los roles de la organización
   */
  static async getRoles(): Promise<RoleResponseDto[]> {
    try {
      const response = await apiInstance.get<RoleResponseDto[]>('/roles');
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Obtiene un rol específico por ID
   */
  static async getRole(roleId: string): Promise<RoleResponseDto> {
    try {
      const response = await apiInstance.get<RoleResponseDto>(`/roles/${roleId}`);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Crea un nuevo rol
   */
  static async createRole(payload: CreateRoleDto): Promise<RoleResponseDto> {
    try {
      const response = await apiInstance.post<RoleResponseDto>('/roles', payload);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Actualiza un rol existente
   */
  static async updateRole(roleId: string, payload: UpdateRoleDto): Promise<RoleResponseDto> {
    try {
      const response = await apiInstance.patch<RoleResponseDto>(`/roles/${roleId}`, payload);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Elimina un rol (solo si no es sistema)
   */
  static async deleteRole(roleId: string): Promise<void> {
    try {
      await apiInstance.delete(`/roles/${roleId}`);
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
