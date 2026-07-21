import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';

import { Production, QualityRating } from '@/types/domain';
import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';
import { formatDate } from '@/utils/date-utils';
import { formatCurrency } from '@/utils/calculation-utils';

interface ProductionCardProps {
  production: Production;
  lotName?: string;
  onPress?: (production: Production) => void;
  style?: ViewStyle;
}

/**
 * Componente que muestra un registro de producción/cosecha
 * Incluye cantidad, ingresos, gastos, ganancia y ROI
 */
export function ProductionCard({
  production,
  lotName,
  onPress,
  style,
}: ProductionCardProps) {
  const qualityInfo = getQualityInfo(production.quality);

  return (
    <Pressable
      onPress={() => onPress?.(production)}
      style={[AgroSurface.card, styles.container, style]}
    >
      {/* Header: Lote y Fecha */}
      <View style={styles.header}>
        <View>
          <Text style={styles.lotName}>{lotName || 'Lote'}</Text>
          <Text style={styles.date}>{formatDate(production.harvestDate)}</Text>
        </View>
        <View style={[styles.qualityBadge, { backgroundColor: qualityInfo.backgroundColor }]}>
          <Text style={[styles.qualityText, { color: qualityInfo.color }]}>
            {qualityInfo.label}
          </Text>
        </View>
      </View>

      {/* Producción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Producción</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Cantidad</Text>
          <Text style={styles.value}>
            {production.quantity} kg
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Precio unitario</Text>
          <Text style={styles.value}>
            {formatCurrency(production.pricePerUnit)}/kg
          </Text>
        </View>
      </View>

      {/* Ingresos */}
      <View style={[styles.section, styles.incomeSection]}>
        <Text style={styles.sectionTitle}>Ingresos</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Ingresos brutos</Text>
          <Text style={styles.grossIncome}>
            {formatCurrency(production.grossIncome)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Gastos totales</Text>
          <Text style={styles.expense}>
            {formatCurrency(production.totalExpenses)}
          </Text>
        </View>
      </View>

      {/* Resultado Neto */}
      <View style={styles.resultSection}>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Ganancia Neta</Text>
          <Text style={[styles.resultValue, { color: getNetIncomeColor(production.netIncome) }]}>
            {formatCurrency(production.netIncome)}
          </Text>
        </View>

        <View style={styles.resultDivider} />

        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>ROI</Text>
          <Text style={[styles.resultValue, { color: getRoiColor(production.roi) }]}>
            {production.roi.toFixed(1)}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

interface QualityInfo {
  label: string;
  color: string;
  backgroundColor: string;
}

function getQualityInfo(quality: QualityRating): QualityInfo {
  const info: Record<QualityRating, QualityInfo> = {
    [QualityRating.EXCELLENT]: {
      label: 'Excelente',
      color: '#22C55E',
      backgroundColor: 'rgba(34,197,94,0.15)',
    },
    [QualityRating.GOOD]: {
      label: 'Buena',
      color: '#3B82F6',
      backgroundColor: 'rgba(59,130,246,0.15)',
    },
    [QualityRating.REGULAR]: {
      label: 'Regular',
      color: '#F59E0B',
      backgroundColor: 'rgba(245,158,11,0.15)',
    },
    [QualityRating.POOR]: {
      label: 'Pobre',
      color: '#EF4444',
      backgroundColor: 'rgba(239,68,68,0.15)',
    },
  };

  return info[quality];
}

function getNetIncomeColor(income: number): string {
  if (income > 0) return '#22C55E';
  if (income === 0) return 'rgba(255,255,255,0.7)';
  return '#EF4444';
}

function getRoiColor(roi: number): string {
  if (roi >= 30) return '#22C55E';
  if (roi >= 10) return '#3B82F6';
  if (roi >= 0) return '#F59E0B';
  return '#EF4444';
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.three,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  lotName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  date: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 2,
  },

  qualityBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 6,
  },

  qualityText: {
    fontSize: 11,
    fontWeight: '700',
  },

  section: {
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },

  incomeSection: {
    borderBottomWidth: 0,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },

  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  grossIncome: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22C55E',
  },

  expense: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  resultSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: Spacing.two,
    borderRadius: 8,
  },

  resultItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },

  resultLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  resultValue: {
    fontSize: 16,
    fontWeight: '800',
  },

  resultDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});
