import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Activity, CreateActivityInput, UpdateActivityInput } from '@/types/domain';
import { MOCK_ACTIVITIES } from '@/mock/mock-data';

const STORAGE_KEY = '@agroapp/activities';

interface ActivityContextValue {
  activities: Activity[];
  loading: boolean;
  error: string | null;

  createActivity: (data: CreateActivityInput) => Promise<void>;
  updateActivity: (id: string, data: UpdateActivityInput) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  loadActivities: () => Promise<void>;

  getActivityById: (id: string) => Activity | null;
  getActivitiesByLot: (lotId: string) => Activity[];
  getPendingActivities: () => Activity[];
  getCompletedActivities: () => Activity[];
}

export const ActivityContext = createContext<ActivityContextValue | undefined>(
  undefined,
);

interface ActivityProviderProps {
  children: React.ReactNode;
}

export function ActivityProvider({ children }: ActivityProviderProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored).map((act: any) => ({
          ...act,
          date: new Date(act.date),
          createdAt: new Date(act.createdAt),
          updatedAt: new Date(act.updatedAt),
        }));
        setActivities(parsed);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ACTIVITIES));
        setActivities(MOCK_ACTIVITIES);
      }
    } catch (err) {
      console.error('Error loading activities:', err);
      setError('Error al cargar actividades');
    } finally {
      setLoading(false);
    }
  }, []);

  const createActivity = useCallback(
    async (data: CreateActivityInput) => {
      try {
        const newActivity: Activity = {
          id: `act_${Date.now()}`,
          ...data,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const updated = [...activities, newActivity];
        setActivities(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error creating activity:', err);
        throw err;
      }
    },
    [activities],
  );

  const updateActivity = useCallback(
    async (id: string, data: UpdateActivityInput) => {
      try {
        const updated = activities.map((act) =>
          act.id === id ? { ...act, ...data, updatedAt: new Date() } : act,
        );

        setActivities(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error updating activity:', err);
        throw err;
      }
    },
    [activities],
  );

  const deleteActivity = useCallback(
    async (id: string) => {
      try {
        const updated = activities.filter((act) => act.id !== id);

        setActivities(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error deleting activity:', err);
        throw err;
      }
    },
    [activities],
  );

  const getActivityById = useCallback(
    (id: string) => {
      return activities.find((act) => act.id === id) || null;
    },
    [activities],
  );

  const getActivitiesByLot = useCallback(
    (lotId: string) => {
      return activities.filter((act) => act.lotId === lotId);
    },
    [activities],
  );

  const getPendingActivities = useCallback(() => {
    return activities.filter((act) => !act.completed);
  }, [activities]);

  const getCompletedActivities = useCallback(() => {
    return activities.filter((act) => act.completed);
  }, [activities]);

  const value: ActivityContextValue = {
    activities,
    loading,
    error,
    createActivity,
    updateActivity,
    deleteActivity,
    loadActivities,
    getActivityById,
    getActivitiesByLot,
    getPendingActivities,
    getCompletedActivities,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivityContext(): ActivityContextValue {
  const context = React.useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivityContext must be used within ActivityProvider');
  }
  return context;
}
