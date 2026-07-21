/**
 * DTOs de Roles - Alineados con backend NestJS
 */

// ========== REQUESTS ==========

export interface CreateRoleDto {
  name: string;
  description?: string;
  permissionIds?: string[];
  color?: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissionIds?: string[];
  color?: string;
}

// ========== RESPONSES ==========

export interface PermissionDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
}

export interface RoleResponseDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  isSystem: boolean;
  permissions: PermissionDto[];
  createdAt: string;
  updatedAt: string;
}

// ========== DOMAIN MODELS ==========

export interface Role extends RoleResponseDto {}

export interface RolesState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}
