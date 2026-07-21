import { apiInstance } from '@/api/client';
import { normalizeError } from '@/api/errors';
import { CreateFarmDto, UpdateFarmDto, FarmResponseDto } from '@/types/farms.types';

/**
 * FarmsService - Servicio tipado para operaciones de granjas
 */
export class FarmsService {
  /**
   * Obtiene todas las granjas de la organización actual
   */
  static async getFarms(): Promise<FarmResponseDto[]> {
    try {
      const response = await apiInstance.get<FarmResponseDto[]>('/farms');
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Obtiene una granja específica por ID
   */
  static async getFarm(farmId: string): Promise<FarmResponseDto> {
    try {
      const response = await apiInstance.get<FarmResponseDto>(`/farms/${farmId}`);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Crea una nueva granja
   */
  static async createFarm(payload: CreateFarmDto): Promise<FarmResponseDto> {
    try {
      const response = await apiInstance.post<FarmResponseDto>('/farms', payload);
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Actualiza una granja existente
   */
  static async updateFarm(
    farmId: string,
    payload: UpdateFarmDto,
  ): Promise<FarmResponseDto> {
    try {
      const response = await apiInstance.patch<FarmResponseDto>(
        `/farms/${farmId}`,
        payload,
      );
      return response.data;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  /**
   * Elimina una granja (soft delete)
   */
  static async deleteFarm(farmId: string): Promise<void> {
    try {
      await apiInstance.delete(`/farms/${farmId}`);
    } catch (error) {
      throw normalizeError(error);
    }
  }
}
