/**
 * DTOs de Granjas - Alineados con backend NestJS
 */

// ========== REQUESTS ==========

export interface CreateFarmDto {
  name: string;
  description?: string;
  location?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  totalAreaHa?: number;
  industryType?: 'AGRICULTURA' | 'GANADERIA' | 'MIXTO' | 'ACUICULTURA' | 'FLORICULTURA' | 'APICULTURA' | 'VITICULTURA';
}

export interface UpdateFarmDto {
  name?: string;
  description?: string;
  location?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  totalAreaHa?: number;
  industryType?: string;
}

// ========== RESPONSES ==========

export interface FarmResponseDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  location?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  totalAreaHa?: number;
  industryType?: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ========== DOMAIN MODELS ==========

export interface Farm extends FarmResponseDto {}

export interface FarmsState {
  farms: Farm[];
  loading: boolean;
  error: string | null;
}
