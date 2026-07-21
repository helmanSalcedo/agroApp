import React from 'react';
import { StyleSheet, Text, View, ViewStyle, FlatList } from 'react-native';

import { Lot, LotStatus } from '@/types/domain';
import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';

interface LotSummaryProps {
  lots: Lot[];
  style?: ViewStyle;
}

/**
 * Componente que muestra un resumen de lotes por estado
 */
export function LotSummary({ lots, style }: LotSummaryProps) {
  const statusBreakdown = getStatusBreakdown(lots);
  const activeLots = lots.filter((l) => l.status === LotStatus.ACTIVE).length;
  const areasActive = lots
    .filter((l) => l.status === LotStatus.ACTIVE)
    .reduce((sum, l) => sum + l.area, 0);

  if (lots.length === 0) {
    return (
      <View style={[AgroSurface.card, styles.container, style]}>
        <Text style={styles.title}>Estado de Lotes</Text>
        <Text style={styles.emptyText}>Sin lotes registrados aún</Text>
      </View>
    );
  }

  return (
    <View style={[AgroSurface.card, styles.container, style]}>
      <Text style={styles.title}>Estado de Lotes</Text>

      {/* Resumen rápido */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{lots.length}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#22C55E' }]}>{activeLots}</Text>
          <Text style={styles.summaryLabel}>Activos</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{areasActive.toFixed(1)}</Text>
          <Text style={styles.summaryLabel}>Ha</Text>
        </View>
      </View>

      {/* Desglose por estado */}
      <View style={styles.breakdown}>
        {statusBreakdown.map((status) => (
          <View key={status.status} style={styles.statusRow}>
            <View style={styles.statusInfo}>
              <View
                style={[styles.statusDot, { backgroundColor: status.color }]}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.statusLabel}>{status.label}</Text>
                <Text style={styles.statusCount}>
                  {status.count} lote{status.count !== 1 ? 's' : ''} • {status.area.toFixed(1)} ha
                </Text>
              </View>
            </View>
            <Text style={[styles.statusPercentage, { color: status.color }]}>
              {status.percentage.toFixed(0)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

interface StatusBreakdownItem {
  status: LotStatus;
  label: string;
  count: number;
  area: number;
  percentage: number;
  color: string;
}

function getStatusBreakdown(lots: Lot[]): StatusBreakdownItem[] {
  const statusMap: Record<LotStatus, { count: number; area: number }> = {
    [LotStatus.ACTIVE]: { count: 0, area: 0 },
    [LotStatus.PLANNING]: { count: 0, area: 0 },
    [LotStatus.HARVESTED]: { count: 0, area: 0 },
    [LotStatus.IDLE]: { count: 0, area: 0 },
  };

  lots.forEach((lot) => {
    statusMap[lot.status].count += 1;
    statusMap[lot.status].area += lot.area;
  });

  const totalArea = lots.reduce((sum, l) => sum + l.area, 0);

  return [
    {
      status: LotStatus.ACTIVE,
      label: 'Activos',
      ...statusMap[LotStatus.ACTIVE],
      percentage: totalArea > 0 ? (statusMap[LotStatus.ACTIVE].area / totalArea) * 100 : 0,
      color: '#22C55E',
    },
    {
      status: LotStatus.PLANNING,
      label: 'Planificación',
      ...statusMap[LotStatus.PLANNING],
      percentage: totalArea > 0 ? (statusMap[LotStatus.PLANNING].area / totalArea) * 100 : 0,
      color: '#3B82F6',
    },
    {
      status: LotStatus.HARVESTED,
      label: 'Cosechados',
      ...statusMap[LotStatus.HARVESTED],
      percentage: totalArea > 0 ? (statusMap[LotStatus.HARVESTED].area / totalArea) * 100 : 0,
      color: '#F59E0B',
    },
    {
      status: LotStatus.IDLE,
      label: 'Ociosos',
      ...statusMap[LotStatus.IDLE],
      percentage: totalArea > 0 ? (statusMap[LotStatus.IDLE].area / totalArea) * 100 : 0,
      color: '#6B7280',
    },
  ].filter((s) => s.count > 0);
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.three,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  emptyText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    fontStyle: 'italic',
  },

  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  summaryItem: {
    alignItems: 'center',
    gap: Spacing.one,
    flex: 1,
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#52FF94',
  },

  summaryLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  summaryDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  breakdown: {
    gap: Spacing.two,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  statusInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  statusCount: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 2,
  },

  statusPercentage: {
    fontSize: 14,
    fontWeight: '700',
  },
});
