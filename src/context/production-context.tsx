import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Production, RecordProductionInput } from '@/types/domain';
import { MOCK_PRODUCTION } from '@/mock/mock-data';
import {
  calculateROI,
  calculateNetIncome,
  calculateYieldPerHectare,
} from '@/utils/calculation-utils';

const STORAGE_KEY = '@agroapp/production';

interface ProductionContextValue {
  productions: Production[];
  loading: boolean;
  error: string | null;

  recordProduction: (
    data: RecordProductionInput,
    totalExpenses: number,
  ) => Promise<void>;
  updateProduction: (id: string, data: Partial<Production>) => Promise<void>;
  deleteProduction: (id: string) => Promise<void>;
  loadProductions: () => Promise<void>;

  getProductionById: (id: string) => Production | null;
  getProductionByLot: (lotId: string) => Production | null;
  getProductionsByYear: (year: number) => Production[];
  getTotalYield: () => number;
  getAverageROI: () => number;
}

export const ProductionContext = createContext<
  ProductionContextValue | undefined
>(undefined);

interface ProductionProviderProps {
  children: React.ReactNode;
}

export function ProductionProvider({ children }: ProductionProviderProps) {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProductions();
  }, []);

  const loadProductions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored).map((prod: any) => ({
          ...prod,
          harvestDate: new Date(prod.harvestDate),
          createdAt: new Date(prod.createdAt),
          updatedAt: new Date(prod.updatedAt),
        }));
        setProductions(parsed);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PRODUCTION));
        setProductions(MOCK_PRODUCTION);
      }
    } catch (err) {
      console.error('Error loading productions:', err);
      setError('Error al cargar registros de producción');
    } finally {
      setLoading(false);
    }
  }, []);

  const recordProduction = useCallback(
    async (data: RecordProductionInput, totalExpenses: number) => {
      try {
        const grossIncome = data.quantity * data.pricePerUnit;
        const netIncome = calculateNetIncome(grossIncome, totalExpenses);
        const roi = calculateROI(grossIncome, totalExpenses);

        const newProduction: Production = {
          id: `prod_${Date.now()}`,
          ...data,
          grossIncome,
          totalExpenses,
          netIncome,
          roi,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const updated = [...productions, newProduction];
        setProductions(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error recording production:', err);
        throw err;
      }
    },
    [productions],
  );

  const updateProduction = useCallback(
    async (id: string, data: Partial<Production>) => {
      try {
        const updated = productions.map((prod) =>
          prod.id === id ? { ...prod, ...data, updatedAt: new Date() } : prod,
        );

        setProductions(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error updating production:', err);
        throw err;
      }
    },
    [productions],
  );

  const deleteProduction = useCallback(
    async (id: string) => {
      try {
        const updated = productions.filter((prod) => prod.id !== id);

        setProductions(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error deleting production:', err);
        throw err;
      }
    },
    [productions],
  );

  const getProductionById = useCallback(
    (id: string) => {
      return productions.find((prod) => prod.id === id) || null;
    },
    [productions],
  );

  const getProductionByLot = useCallback(
    (lotId: string) => {
      return productions.find((prod) => prod.lotId === lotId) || null;
    },
    [productions],
  );

  const getProductionsByYear = useCallback(
    (year: number) => {
      return productions.filter(
        (prod) => new Date(prod.harvestDate).getFullYear() === year,
      );
    },
    [productions],
  );

  const getTotalYield = useCallback(() => {
    return productions.reduce((total, prod) => total + prod.quantity, 0);
  }, [productions]);

  const getAverageROI = useCallback(() => {
    if (productions.length === 0) return 0;
    const totalROI = productions.reduce((sum, prod) => sum + prod.roi, 0);
    return totalROI / productions.length;
  }, [productions]);

  const value: ProductionContextValue = {
    productions,
    loading,
    error,
    recordProduction,
    updateProduction,
    deleteProduction,
    loadProductions,
    getProductionById,
    getProductionByLot,
    getProductionsByYear,
    getTotalYield,
    getAverageROI,
  };

  return (
    <ProductionContext.Provider value={value}>
      {children}
    </ProductionContext.Provider>
  );
}

export function useProductionContext(): ProductionContextValue {
  const context = React.useContext(ProductionContext);
  if (!context) {
    throw new Error(
      'useProductionContext must be used within ProductionProvider',
    );
  }
  return context;
}
