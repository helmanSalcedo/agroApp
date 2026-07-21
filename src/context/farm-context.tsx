import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Farm, CreateFarmInput, UpdateFarmInput } from '@/types/domain';
import { MOCK_FARMS } from '@/mock/mock-data';

const STORAGE_KEY = '@agroapp/farms';

interface FarmContextValue {
  farms: Farm[];
  selectedFarmId: string | null;
  loading: boolean;
  error: string | null;

  // Actions
  createFarm: (data: CreateFarmInput) => Promise<void>;
  updateFarm: (id: string, data: UpdateFarmInput) => Promise<void>;
  deleteFarm: (id: string) => Promise<void>;
  selectFarm: (id: string) => void;
  loadFarms: () => Promise<void>;
  getFarmById: (id: string) => Farm | null;
}

export const FarmContext = createContext<FarmContextValue | undefined>(undefined);

interface FarmProviderProps {
  children: React.ReactNode;
}

export function FarmProvider({ children }: FarmProviderProps) {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar granjas al inicializar
  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Intentar cargar del storage
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        setFarms(JSON.parse(stored));
      } else {
        // Usar datos mock en primera carga
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_FARMS));
        setFarms(MOCK_FARMS);
      }

      // Seleccionar primera granja por defecto
      if (!selectedFarmId) {
        setSelectedFarmId(MOCK_FARMS[0]?.id || null);
      }
    } catch (err) {
      console.error('Error loading farms:', err);
      setError('Error al cargar granjas');
    } finally {
      setLoading(false);
    }
  }, [selectedFarmId]);

  const createFarm = useCallback(async (data: CreateFarmInput) => {
    try {
      const newFarm: Farm = {
        id: `farm_${Date.now()}`,
        userId: 'user_001', // Mock userId
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updated = [...farms, newFarm];
      setFarms(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Seleccionar nueva granja
      if (!selectedFarmId) {
        setSelectedFarmId(newFarm.id);
      }
    } catch (err) {
      console.error('Error creating farm:', err);
      throw err;
    }
  }, [farms, selectedFarmId]);

  const updateFarm = useCallback(
    async (id: string, data: UpdateFarmInput) => {
      try {
        const updated = farms.map((farm) =>
          farm.id === id
            ? { ...farm, ...data, updatedAt: new Date() }
            : farm,
        );

        setFarms(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error updating farm:', err);
        throw err;
      }
    },
    [farms],
  );

  const deleteFarm = useCallback(
    async (id: string) => {
      try {
        const updated = farms.filter((farm) => farm.id !== id);

        setFarms(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Deseleccionar si era la seleccionada
        if (selectedFarmId === id) {
          setSelectedFarmId(updated[0]?.id || null);
        }
      } catch (err) {
        console.error('Error deleting farm:', err);
        throw err;
      }
    },
    [farms, selectedFarmId],
  );

  const selectFarm = useCallback((id: string) => {
    setSelectedFarmId(id);
  }, []);

  const getFarmById = useCallback(
    (id: string) => {
      return farms.find((farm) => farm.id === id) || null;
    },
    [farms],
  );

  const value: FarmContextValue = {
    farms,
    selectedFarmId,
    loading,
    error,
    createFarm,
    updateFarm,
    deleteFarm,
    selectFarm,
    loadFarms,
    getFarmById,
  };

  return (
    <FarmContext.Provider value={value}>{children}</FarmContext.Provider>
  );
}

export function useFarmContext(): FarmContextValue {
  const context = React.useContext(FarmContext);
  if (!context) {
    throw new Error('useFarmContext must be used within FarmProvider');
  }
  return context;
}
