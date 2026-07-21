import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';

interface OperationStat {
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
  color: string;
}

interface OperationStatsProps {
  stats: OperationStat[];
  title?: string;
  style?: ViewStyle;
}

/**
 * Componente que muestra estadísticas de operaciones en formato grid
 */
export function OperationStats({ stats, title, style }: OperationStatsProps) {
  if (stats.length === 0) {
    return null;
  }

  return (
    <View style={[AgroSurface.card, styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
              {stat.unit && <Text style={styles.statUnit}>{stat.unit}</Text>}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.three,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },

  statItem: {
    width: '48%',
    padding: Spacing.two,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    gap: Spacing.one,
  },

  statIcon: {
    fontSize: 24,
  },

  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
    textAlign: 'center',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },

  statUnit: {
    fontSize: 11,
    fontWeight: '600',
  },
});
