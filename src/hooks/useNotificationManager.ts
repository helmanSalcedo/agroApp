import { useEffect, useRef } from 'react';
import {
  useFarmContext,
  useLotContext,
  useExpenseContext,
  useActivityContext,
  useNotificationContext,
} from '@/context';
import { LotStatus, NotificationType, ActivityType } from '@/types/domain';

/**
 * Hook que gestiona la creación automática de notificaciones
 * Monitorea cambios en las operaciones agrícolas y crea alertas relevantes
 */
export function useNotificationManager() {
  const { farms } = useFarmContext();
  const { lots } = useLotContext();
  const { expenses } = useExpenseContext();
  const { activities } = useActivityContext();
  const { addNotification } = useNotificationContext();

  const processedLotsRef = useRef<Set<string>>(new Set());
  const processedExpensesRef = useRef<Set<string>>(new Set());
  const processedActivitiesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Alertas para lotes próximos a cosechar
    lots.forEach((lot) => {
      if (processedLotsRef.current.has(lot.id)) return;

      if (
        lot.status === LotStatus.ACTIVE &&
        lot.expectedHarvestDate &&
        new Date(lot.expectedHarvestDate) <= thirtyDaysFromNow &&
        new Date(lot.expectedHarvestDate) > now
      ) {
        const daysUntilHarvest = Math.ceil(
          (new Date(lot.expectedHarvestDate).getTime() - now.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        addNotification({
          userId: farms[0]?.userId || 'unknown',
          title: `${lot.name} próximo a cosechar`,
          message: `Tu lote ${lot.name} estará listo para cosechar en ${daysUntilHarvest} día${daysUntilHarvest > 1 ? 's' : ''}`,
          type: NotificationType.ALERT,
          relatedLotId: lot.id,
          read: false,
        });

        processedLotsRef.current.add(lot.id);
      }

      // Alerta para lotes que ya pasaron fecha de cosecha
      if (
        lot.status === LotStatus.ACTIVE &&
        lot.expectedHarvestDate &&
        new Date(lot.expectedHarvestDate) <= now
      ) {
        addNotification({
          userId: farms[0]?.userId || 'unknown',
          title: `⚠️ ${lot.name} pasó su fecha de cosecha`,
          message: `Tu lote ${lot.name} ya pasó la fecha estimada de cosecha. Considera cosechar pronto.`,
          type: NotificationType.ALERT,
          relatedLotId: lot.id,
          read: false,
        });

        processedLotsRef.current.add(lot.id);
      }
    });

    // Alertas para gastos altos
    const EXPENSE_ALERT_THRESHOLD = 1000000; // 1 millón COP
    expenses.forEach((expense) => {
      if (processedExpensesRef.current.has(expense.id)) return;

      if (expense.amount > EXPENSE_ALERT_THRESHOLD) {
        addNotification({
          userId: farms[0]?.userId || 'unknown',
          title: '💰 Gasto Alto Registrado',
          message: `Se registró un gasto de $${expense.amount.toLocaleString('es-CO')} por ${expense.concept}`,
          type: NotificationType.REMINDER,
          read: false,
        });

        processedExpensesRef.current.add(expense.id);
      }
    });

    // Notificaciones para nuevas actividades completadas
    activities.forEach((activity) => {
      if (processedActivitiesRef.current.has(activity.id)) return;

      if (activity.completed) {
        const typeLabel = getActivityTypeLabel(activity.type);
        addNotification({
          userId: farms[0]?.userId || 'unknown',
          title: `✓ ${typeLabel} Completada`,
          message: `Se marcó como completada: ${activity.description}`,
          type: NotificationType.SUCCESS,
          relatedActivityId: activity.id,
          read: false,
        });

        processedActivitiesRef.current.add(activity.id);
      }
    });

    // Alerta si hay muchos lotes activos sin actividades
    const activeLots = lots.filter((l) => l.status === LotStatus.ACTIVE);
    const lotsWithoutRecentActivity = activeLots.filter((lot) => {
      const recentActivities = activities.filter(
        (a) =>
          a.lotId === lot.id &&
          new Date(a.date).getTime() > now.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      return recentActivities.length === 0;
    });

    if (lotsWithoutRecentActivity.length > 0 && lotsWithoutRecentActivity.length >= 2) {
      addNotification({
        userId: farms[0]?.userId || 'unknown',
        title: '📋 Lotes Sin Actividades Recientes',
        message: `${lotsWithoutRecentActivity.length} lote${lotsWithoutRecentActivity.length > 1 ? 's' : ''} no han tenido actividades en 7 días. Revisa su estado.`,
        type: NotificationType.INFO,
        read: false,
      });
    }
  }, [lots, expenses, activities, farms, addNotification]);
}

function getActivityTypeLabel(type: ActivityType): string {
  const labels: Record<ActivityType, string> = {
    [ActivityType.IRRIGATION]: 'Riego',
    [ActivityType.FERTILIZATION]: 'Fertilización',
    [ActivityType.PEST_CONTROL]: 'Control de Plagas',
    [ActivityType.WEEDING]: 'Deshierbe',
    [ActivityType.HARVESTING]: 'Cosecha',
    [ActivityType.PLANTING]: 'Siembra',
    [ActivityType.PRUNING]: 'Poda',
    [ActivityType.SALES]: 'Ventas',
    [ActivityType.SOIL_ANALYSIS]: 'Análisis de Suelo',
    [ActivityType.TRANSPLANTING]: 'Trasplante',
    [ActivityType.PEST_MONITORING]: 'Monitoreo de Plagas',
    [ActivityType.CROP_INSPECTION]: 'Inspección',
    [ActivityType.PACKING]: 'Empacado',
    [ActivityType.FUNGICIDE_APPLICATION]: 'Fungicida',
    [ActivityType.DISINFECTION]: 'Desinfección',
    [ActivityType.IRRIGATION_MAINTENANCE]: 'Mantenimiento',
    [ActivityType.OTHER]: 'Actividad',
  };
  return labels[type] || 'Actividad';
}
