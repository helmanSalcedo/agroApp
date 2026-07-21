import { useFocusEffect, router } from 'expo-router';
import { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { KPICard } from '@/components/features/kpi-card';
import { ExpenseSummary } from '@/components/features/expense-summary';
import { LotSummary } from '@/components/features/lot-summary';
import { Spacing } from '@/constants/theme';
import {
  useFarmContext,
  useLotContext,
  useExpenseContext,
  useActivityContext,
} from '@/context';
import { LotStatus } from '@/types/domain';
import { formatCurrency } from '@/utils/calculation-utils';

/**
 * Pantalla de Dashboard - Resumen e indicadores clave
 * Muestra KPIs, gastos, lotes y actividades recientes
 */
export default function DashboardScreen() {
  const { farms } = useFarmContext();
  const { lots } = useLotContext();
  const { expenses } = useExpenseContext();
  const { activities } = useActivityContext();

  // Recalcular cuando la pantalla toma el foco
  useFocusEffect(
    useCallback(() => {
      // Lógica para refrescar datos si es necesaria
    }, [])
  );

  // Cálculos de KPIs
  const totalFarms = farms.length;
  const totalLots = lots.length;
  const activeLots = lots.filter((l) => l.status === LotStatus.ACTIVE).length;
  const totalArea = lots.reduce((sum, l) => sum + l.area, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const recentActivities = activities.slice(0, 5);

  // Gastos del mes actual
  const now = new Date();
  const currentMonthExpenses = expenses.filter((e) => {
    const eDate = new Date(e.date);
    return eDate.getMonth() === now.getMonth() && eDate.getFullYear() === now.getFullYear();
  });
  const currentMonthTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Lotes por cosechar (próximos 30 días)
  const harvestSoon = lots.filter((l) => {
    if (!l.expectedHarvestDate || l.status !== LotStatus.ACTIVE) return false;
    const harvest = new Date(l.expectedHarvestDate);
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return harvest <= thirtyDaysFromNow && harvest > now;
  }).length;

  if (farms.length === 0) {
    return (
      <AgroScreen withBottomInset>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📊</Text>
          <Text style={styles.emptyTitle}>Dashboard Vacío</Text>
          <Text style={styles.emptySubtitle}>
            Crea tu primera granja para ver el resumen de tu operación
          </Text>
          <Pressable
            style={styles.emptyButton}
            onPress={() => router.push('/farm-create')}
          >
            <Text style={styles.emptyButtonText}>Crear Granja</Text>
          </Pressable>
        </View>
      </AgroScreen>
    );
  }

  return (
    <AgroScreen withBottomInset scroll={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Buenos Días</Text>
            <Text style={styles.subtitle}>
              Aquí está tu resumen de operación
            </Text>
          </View>
          <Text style={styles.headerEmoji}>🌾</Text>
        </View>

        {/* KPI Grid - Primera Fila */}
        <View style={styles.kpiGrid}>
          <KPICard
            icon="🏘️"
            label="Granjas"
            value={totalFarms}
            color="#52FF94"
            style={{ flex: 1 }}
          />
          <KPICard
            icon="🌱"
            label="Lotes Activos"
            value={activeLots}
            unit={`de ${totalLots}`}
            color="#22C55E"
            style={{ flex: 1 }}
          />
        </View>

        {/* KPI Grid - Segunda Fila */}
        <View style={styles.kpiGrid}>
          <KPICard
            icon="📍"
            label="Área Total"
            value={totalArea.toFixed(1)}
            unit="ha"
            color="#06B6D4"
            style={{ flex: 1 }}
          />
          <KPICard
            icon="⏰"
            label="Por Cosechar"
            value={harvestSoon}
            unit="lotes"
            color={harvestSoon > 0 ? '#F59E0B' : '#6B7280'}
            style={{ flex: 1 }}
          />
        </View>

        {/* KPI Grid - Tercera Fila */}
        <View style={styles.kpiGrid}>
          <KPICard
            icon="💰"
            label="Gastos Este Mes"
            value={formatCurrency(currentMonthTotal)}
            color="#EF4444"
            style={{ flex: 1 }}
          />
          <KPICard
            icon="📋"
            label="Gastos Totales"
            value={formatCurrency(totalExpenses)}
            color="#8B5CF6"
            style={{ flex: 1 }}
          />
        </View>

        {/* Resumen de Gastos */}
        {expenses.length > 0 && (
          <ExpenseSummary expenses={expenses} style={{ marginTop: Spacing.two }} />
        )}

        {/* Resumen de Lotes */}
        {lots.length > 0 && (
          <LotSummary lots={lots} style={{ marginTop: Spacing.two }} />
        )}

        {/* Actividades Recientes */}
        {activities.length > 0 && (
          <View style={[AgroSurface.card, styles.activitiesCard]}>
            <View style={styles.activitiesHeader}>
              <Text style={styles.activitiesTitle}>Actividades Recientes</Text>
              <Text style={styles.activitiesCount}>{activities.length}</Text>
            </View>

            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Text style={styles.activityType}>
                  {getActivityTypeLabel(activity.type)}
                </Text>
                <Text style={styles.activityDesc} numberOfLines={1}>
                  {activity.description}
                </Text>
                <Text style={styles.activityDate}>
                  {formatActivityDate(activity.date)}
                </Text>
              </View>
            ))}

            {activities.length > 5 && (
              <Pressable
                style={styles.viewAllButton}
                onPress={() => router.push('/(tabs)/explore')}
              >
                <Text style={styles.viewAllText}>Ver todas ({activities.length})</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            <Pressable
              style={[AgroSurface.card, styles.quickActionCard]}
              onPress={() => router.push('/farm-create')}
            >
              <Text style={styles.quickActionEmoji}>➕</Text>
              <Text style={styles.quickActionLabel}>Nueva Granja</Text>
            </Pressable>

            <Pressable
              style={[AgroSurface.card, styles.quickActionCard]}
              onPress={() => router.push('/expense-select')}
            >
              <Text style={styles.quickActionEmoji}>💰</Text>
              <Text style={styles.quickActionLabel}>Registrar Gasto</Text>
            </Pressable>

            <Pressable
              style={[AgroSurface.card, styles.quickActionCard]}
              onPress={() => router.push('/activity-select')}
            >
              <Text style={styles.quickActionEmoji}>📋</Text>
              <Text style={styles.quickActionLabel}>Nueva Actividad</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </AgroScreen>
  );
}

function getActivityTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    irrigation: 'Riego',
    fertilization: 'Fertilización',
    'pest-control': 'Control de Plagas',
    weeding: 'Deshierbe',
    harvesting: 'Cosecha',
    planting: 'Siembra',
    pruning: 'Poda',
    other: 'Otra',
  };
  return labels[type] || 'Actividad';
}

function formatActivityDate(date: Date): string {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return `Hoy a las ${d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (d.toDateString() === yesterday.toDateString()) {
    return 'Ayer';
  } else {
    return d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  }
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: Spacing.two,
    paddingBottom: Spacing.four,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },

  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  headerEmoji: {
    fontSize: 32,
  },

  kpiGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },

  activitiesCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },

  activitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },

  activitiesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  activitiesCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.1)',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 6,
  },

  activityItem: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 2,
  },

  activityType: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52FF94',
  },

  activityDesc: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  activityDate: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },

  viewAllButton: {
    paddingVertical: Spacing.two,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },

  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#52FF94',
  },

  quickActions: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },

  quickActionsContainer: {
    gap: Spacing.two,
  },

  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginHorizontal: Spacing.one,
  },

  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },

  quickActionCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(15,118,110,0.08)',
    padding: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },

  quickActionEmoji: {
    fontSize: 28,
  },

  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
  },

  emptyEmoji: {
    fontSize: 64,
    marginBottom: Spacing.one,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },

  emptyButton: {
    marginTop: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    backgroundColor: '#52FF94',
    borderRadius: 12,
  },

  emptyButtonText: {
    color: '#041109',
    fontSize: 15,
    fontWeight: '700',
  },

  productSaleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    gap: Spacing.three,
  },

  productSaleEmoji: {
    fontSize: 32,
  },

  productSaleContent: {
    flex: 1,
    gap: Spacing.one,
  },

  productSaleLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  productSaleSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },

  chevron: {
    fontSize: 24,
    color: '#52FF94',
    fontWeight: '800',
  },
});
