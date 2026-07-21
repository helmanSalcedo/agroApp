import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Lot, CreateLotInput, UpdateLotInput, LotStatus } from '@/types/domain';
import { MOCK_LOTS } from '@/mock/mock-data';

const STORAGE_KEY = '@agroapp/lots';

interface LotContextValue {
  lots: Lot[];
  loading: boolean;
  error: string | null;

  // Actions
  createLot: (data: CreateLotInput) => Promise<void>;
  updateLot: (id: string, data: UpdateLotInput) => Promise<void>;
  deleteLot: (id: string) => Promise<void>;
  loadLots: () => Promise<void>;

  // Queries
  getLotById: (id: string) => Lot | null;
  getLotsByFarm: (farmId: string) => Lot[];
  getActiveLots: () => Lot[];
  getLotsByStatus: (status: string) => Lot[];
}

export const LotContext = createContext<LotContextValue | undefined>(undefined);

interface LotProviderProps {
  children: React.ReactNode;
}

export function LotProvider({ children }: LotProviderProps) {
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar lotes al inicializar
  useEffect(() => {
    loadLots();
  }, []);

  const loadLots = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        // Parsear fechas que se guardaron como strings
        const parsed = JSON.parse(stored).map((lot: any) => ({
          ...lot,
          sowingDate: lot.sowingDate ? new Date(lot.sowingDate) : null,
          expectedHarvestDate: lot.expectedHarvestDate
            ? new Date(lot.expectedHarvestDate)
            : null,
          actualHarvestDate: lot.actualHarvestDate
            ? new Date(lot.actualHarvestDate)
            : null,
          createdAt: new Date(lot.createdAt),
          updatedAt: new Date(lot.updatedAt),
        }));
        setLots(parsed);
      } else {
        // Usar datos mock en primera carga
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_LOTS));
        setLots(MOCK_LOTS);
      }
    } catch (err) {
      console.error('Error loading lots:', err);
      setError('Error al cargar lotes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLot = useCallback(
    async (data: CreateLotInput) => {
      try {
        const newLot: Lot = {
          id: `lot_${Date.now()}`,
          ...data,
          status: LotStatus.PLANNING,
          sowingDate: null,
          expectedHarvestDate: null,
          actualHarvestDate: null,
          daysToHarvest: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const updated = [...lots, newLot];
        setLots(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error creating lot:', err);
        throw err;
      }
    },
    [lots],
  );

  const updateLot = useCallback(
    async (id: string, data: UpdateLotInput) => {
      try {
        const updated = lots.map((lot) =>
          lot.id === id
            ? { ...lot, ...data, updatedAt: new Date() }
            : lot,
        );

        setLots(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error updating lot:', err);
        throw err;
      }
    },
    [lots],
  );

  const deleteLot = useCallback(
    async (id: string) => {
      try {
        const updated = lots.filter((lot) => lot.id !== id);

        setLots(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error deleting lot:', err);
        throw err;
      }
    },
    [lots],
  );

  const getLotById = useCallback(
    (id: string) => {
      return lots.find((lot) => lot.id === id) || null;
    },
    [lots],
  );

  const getLotsByFarm = useCallback(
    (farmId: string) => {
      return lots.filter((lot) => lot.farmId === farmId);
    },
    [lots],
  );

  const getActiveLots = useCallback(() => {
    return lots.filter((lot) => lot.status === 'active');
  }, [lots]);

  const getLotsByStatus = useCallback(
    (status: string) => {
      return lots.filter((lot) => lot.status === status);
    },
    [lots],
  );

  const value: LotContextValue = {
    lots,
    loading,
    error,
    createLot,
    updateLot,
    deleteLot,
    loadLots,
    getLotById,
    getLotsByFarm,
    getActiveLots,
    getLotsByStatus,
  };

  return (
    <LotContext.Provider value={value}>{children}</LotContext.Provider>
  );
}

export function useLotContext(): LotContextValue {
  const context = React.useContext(LotContext);
  if (!context) {
    throw new Error('useLotContext must be used within LotProvider');
  }
  return context;
}
