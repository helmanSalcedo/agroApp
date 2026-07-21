import { useEffect } from 'react';
import { useFarmContext } from '@/context/farm-context';
import { useLotContext } from '@/context/lot-context';
import { useActivityContext } from '@/context/activity-context';
import { useNotificationContext } from '@/context/notification-context';
import { useAuth } from '@/context/auth-context';
import { NotificationType } from '@/types/domain';

export function useAutoAlerts() {
  const { farms } = useFarmContext();
  const { lots } = useLotContext();
  const { activities } = useActivityContext();
  const { addNotification } = useNotificationContext();
  const { user } = useAuth();

  useEffect(() => {
    generateAlerts();
  }, [lots, activities]);

  const generateAlerts = () => {
    const now = new Date();

    // Alertar sobre cosechas próximas
    lots.forEach((lot) => {
      if (!lot.expectedHarvestDate || lot.status !== 'active') return;

      const harvestDate = new Date(lot.expectedHarvestDate);
      const daysUntilHarvest = Math.ceil(
        (harvestDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysUntilHarvest === 5) {
        addNotification({
          title: '🌾 Cosecha próxima',
          message: `${lot.name} está listo para cosechar en ${daysUntilHarvest} días`,
          type: NotificationType.REMINDER,
          read: false,
          userId: user ? user.id : 'unknown',
          relatedLotId: lot.id,
        });
      } else if (daysUntilHarvest === 0) {
        addNotification({
          title: '🌾 ¡Es hora de cosechar!',
          message: `${lot.name} está listo para ser cosechado hoy`,
          type: NotificationType.ALERT,
          read: false,
          userId: user ? user.id : 'unknown',
          relatedLotId: lot.id,
        });
      }
    });

    // Alertar sobre lotes sin actividades recientes
    lots.forEach((lot) => {
      if (lot.status !== 'active') return;

      const lotActivities = activities.filter((a) => a.lotId === lot.id);
      if (lotActivities.length === 0) return;

      const lastActivity = lotActivities.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

      const daysSinceLastActivity = Math.ceil(
        (now.getTime() - new Date(lastActivity.date).getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastActivity === 7) {
        addNotification({
          title: '⏰ Actividad pendiente',
          message: `${lot.name} no ha tenido actividades en 7 días. Registra una labor`,
          type: NotificationType.REMINDER,
          read: false,
          userId: user ? user.id : 'unknown',
          relatedLotId: lot.id,
        });
      }
    });

    // Alertar sobre lotes nuevos sin actividades
    lots.forEach((lot) => {
      if (lot.status !== 'active') return;

      const lotActivities = activities.filter((a) => a.lotId === lot.id);
      if (lotActivities.length > 0) return;

      const daysSinceLotCreated = Math.ceil(
        (now.getTime() - new Date(lot.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLotCreated === 1) {
        addNotification({
          title: '🌱 Nuevo lote sin actividades',
          message: `Comienza a registrar actividades en ${lot.name}`,
          type: NotificationType.INFO,
          read: false,
          userId: user ? user.id : 'unknown',
          relatedLotId: lot.id,
        });
      }
    });
  };
}
