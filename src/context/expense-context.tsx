import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Expense, CreateExpenseInput } from '@/types/domain';
import { MOCK_EXPENSES } from '@/mock/mock-data';

const STORAGE_KEY = '@agroapp/expenses';

interface ExpenseContextValue {
  expenses: Expense[];
  loading: boolean;
  error: string | null;

  createExpense: (data: CreateExpenseInput) => Promise<void>;
  updateExpense: (id: string, data: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  loadExpenses: () => Promise<void>;

  getExpenseById: (id: string) => Expense | null;
  getExpensesByFarm: (farmId: string) => Expense[];
  getExpensesByLot: (lotId: string) => Expense[];
  getExpensesByMonth: (year: number, month: number) => Expense[];
  getTotalExpensesByFarm: (farmId: string) => number;
  getTotalExpensesByMonth: (year: number, month: number) => number;
}

export const ExpenseContext = createContext<ExpenseContextValue | undefined>(
  undefined,
);

interface ExpenseProviderProps {
  children: React.ReactNode;
}

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored).map((exp: any) => ({
          ...exp,
          date: new Date(exp.date),
          createdAt: new Date(exp.createdAt),
          updatedAt: new Date(exp.updatedAt),
        }));
        setExpenses(parsed);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_EXPENSES));
        setExpenses(MOCK_EXPENSES);
      }
    } catch (err) {
      console.error('Error loading expenses:', err);
      setError('Error al cargar gastos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createExpense = useCallback(
    async (data: CreateExpenseInput) => {
      try {
        const newExpense: Expense = {
          id: `exp_${Date.now()}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const updated = [...expenses, newExpense];
        setExpenses(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error creating expense:', err);
        throw err;
      }
    },
    [expenses],
  );

  const updateExpense = useCallback(
    async (id: string, data: Partial<Expense>) => {
      try {
        const updated = expenses.map((exp) =>
          exp.id === id ? { ...exp, ...data, updatedAt: new Date() } : exp,
        );

        setExpenses(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error updating expense:', err);
        throw err;
      }
    },
    [expenses],
  );

  const deleteExpense = useCallback(
    async (id: string) => {
      try {
        const updated = expenses.filter((exp) => exp.id !== id);

        setExpenses(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error deleting expense:', err);
        throw err;
      }
    },
    [expenses],
  );

  const getExpenseById = useCallback(
    (id: string) => {
      return expenses.find((exp) => exp.id === id) || null;
    },
    [expenses],
  );

  const getExpensesByFarm = useCallback(
    (farmId: string) => {
      return expenses.filter((exp) => exp.farmId === farmId);
    },
    [expenses],
  );

  const getExpensesByLot = useCallback(
    (lotId: string) => {
      return expenses.filter((exp) => exp.lotId === lotId);
    },
    [expenses],
  );

  const getExpensesByMonth = useCallback(
    (year: number, month: number) => {
      return expenses.filter((exp) => {
        const expDate = new Date(exp.date);
        return expDate.getFullYear() === year && expDate.getMonth() === month;
      });
    },
    [expenses],
  );

  const getTotalExpensesByFarm = useCallback(
    (farmId: string) => {
      return getExpensesByFarm(farmId).reduce(
        (total, exp) => total + exp.amount,
        0,
      );
    },
    [expenses],
  );

  const getTotalExpensesByMonth = useCallback(
    (year: number, month: number) => {
      return getExpensesByMonth(year, month).reduce(
        (total, exp) => total + exp.amount,
        0,
      );
    },
    [expenses],
  );

  const value: ExpenseContextValue = {
    expenses,
    loading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
    loadExpenses,
    getExpenseById,
    getExpensesByFarm,
    getExpensesByLot,
    getExpensesByMonth,
    getTotalExpensesByFarm,
    getTotalExpensesByMonth,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export function useExpenseContext(): ExpenseContextValue {
  const context = React.useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within ExpenseProvider');
  }
  return context;
}
