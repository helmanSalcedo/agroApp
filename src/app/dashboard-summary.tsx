import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Spacing } from '@/constants/theme';
import {
  useFarmContext,
  useLotContext,
  useExpenseContext,
  useActivityContext,
  useProductionContext,
} from '@/context';
import { LotStatus } from '@/types/domain';
import { formatCurrency } from '@/utils/calculation-utils';

/**
 * Dashboard Summary - Full view of all KPIs
 * Shown when user clicks "Ver Resumen Completo" from main dashboard
 */
export default function DashboardSummaryScreen() {
  const { farms } = useFarmContext();
  const { lots } = useLotContext();
  const { expenses } = useExpenseContext();
  const { activities } = useActivityContext();
  const { productions, getAverageROI } = useProductionContext();

  const totalFarms = farms.length;
  const totalLots = lots.length;
  const activeLots = lots.filter((l) => l.status === LotStatus.ACTIVE).length;
  const totalArea = lots.reduce((sum, l) => sum + l.area, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalProductions = productions.length;
  const averageRoi = getAverageROI();
  const totalIncome = productions.reduce((sum, p) => sum + p.grossIncome, 0);

  const now = new Date();
  const currentMonthExpenses = expenses.filter((e) => {
    const eDate = new Date(e.date);
    return eDate.getMonth() === now.getMonth() && eDate.getFullYear() === now.getFullYear();
  });
  const currentMonthTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

  const harvestSoon = lots.filter((l) => {
    if (!l.expectedHarvestDate || l.status !== LotStatus.ACTIVE) return false;
    const harvest = new Date(l.expectedHarvestDate);
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return harvest <= thirtyDaysFromNow && harvest > now;
  }).length;

  return (
    <AgroScreen withBottomInset>
      <AppScreenHeader
        title="Resumen Completo"
        subtitle="Todos tus indicadores clave"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Operations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Operaciones</Text>
          <View style={styles.kpiGrid}>
            <KPISummaryCard
              icon="🏘️"
              label="Granjas"
              value={totalFarms}
              color="#52FF94"
            />
            <KPISummaryCard
              icon="🌱"
              label="Lotes Totales"
              value={totalLots}
              color="#22C55E"
            />
            <KPISummaryCard
              icon="✅"
              label="Lotes Activos"
              value={activeLots}
              color="#10B981"
            />
            <KPISummaryCard
              icon="📍"
              label="Área Total"
              value={totalArea.toFixed(1)}
              unit="ha"
              color="#06B6D4"
            />
          </View>
        </View>

        {/* Harvest Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌾 Cosecha</Text>
          <View style={styles.kpiGrid}>
            <KPISummaryCard
              icon="⏰"
              label="Por Cosechar (30d)"
              value={harvestSoon}
              unit="lotes"
              color={harvestSoon > 0 ? '#F59E0B' : '#6B7280'}
            />
            <KPISummaryCard
              icon="📦"
              label="Cosechas Registradas"
              value={totalProductions}
              color="#F59E0B"
            />
          </View>
        </View>

        {/* Financial Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Finanzas</Text>
          <View style={styles.kpiGrid}>
            <KPISummaryCard
              icon="📉"
              label="Gastos Este Mes"
              value={formatCurrency(currentMonthTotal)}
              color="#EF4444"
            />
            <KPISummaryCard
              icon="📊"
              label="Gastos Totales"
              value={formatCurrency(totalExpenses)}
              color="#8B5CF6"
            />
          </View>

          <View style={styles.kpiGrid}>
            <KPISummaryCard
              icon="📈"
              label="Ingresos Totales"
              value={formatCurrency(totalIncome)}
              color="#22C55E"
            />
            <KPISummaryCard
              icon="🎯"
              label="ROI Promedio"
              value={`${averageRoi.toFixed(1)}%`}
              color={getRoiColor(averageRoi)}
            />
          </View>
        </View>

        {/* Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Actividades</Text>
          <View style={styles.kpiGrid}>
            <KPISummaryCard
              icon="🔔"
              label="Actividades Registradas"
              value={activities.length}
              color="#3B82F6"
            />
          </View>
        </View>

        {/* Back Button */}
        <Pressable
          style={[AgroSurface.secondaryButton, styles.backButton]}
          onPress={() => router.back()}
        >
          <Text style={AgroSurface.secondaryButtonText}>Volver al Dashboard</Text>
        </Pressable>
      </ScrollView>
    </AgroScreen>
  );
}

interface KPISummaryCardProps {
  icon: string;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}

function KPISummaryCard({
  icon,
  label,
  value,
  unit,
  color,
}: KPISummaryCardProps) {
  return (
    <View style={[AgroSurface.card, styles.kpiCard]}>
      <Text style={styles.kpiIcon}>{icon}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
      <View style={styles.kpiValueContainer}>
        <Text style={[styles.kpiValue, { color }]}>{value}</Text>
        {unit && <Text style={styles.kpiUnit}>{unit}</Text>}
      </View>
    </View>
  );
}

function getRoiColor(roi: number): string {
  if (roi >= 30) return '#22C55E';
  if (roi >= 10) return '#3B82F6';
  if (roi >= 0) return '#F59E0B';
  return '#EF4444';
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },

  section: {
    gap: Spacing.two,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginHorizontal: Spacing.one,
  },

  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },

  kpiCard: {
    width: '48%',
    padding: Spacing.two,
    alignItems: 'center',
    gap: Spacing.one,
  },

  kpiIcon: {
    fontSize: 24,
  },

  kpiLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },

  kpiValueContainer: {
    alignItems: 'baseline',
    gap: 2,
    flexDirection: 'row',
  },

  kpiValue: {
    fontSize: 18,
    fontWeight: '800',
  },

  kpiUnit: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },

  backButton: {
    marginTop: Spacing.two,
  },
});
