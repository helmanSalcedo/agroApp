import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';

interface KPICardProps {
  icon?: string;
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down';
  };
  style?: ViewStyle;
}

/**
 * Componente de Tarjeta KPI para mostrar métricas clave
 * Puede mostrar valor, unidad, ícono y tendencia
 */
export function KPICard({
  icon,
  label,
  value,
  unit,
  color = '#52FF94',
  trend,
  style,
}: KPICardProps) {
  return (
    <View style={[AgroSurface.card, styles.container, style]}>
      {/* Encabezado con ícono y label */}
      <View style={styles.header}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Valor principal */}
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color }]}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>

      {/* Tendencia (opcional) */}
      {trend && (
        <View style={styles.trendContainer}>
          <Text style={[styles.trendArrow, { color: trend.direction === 'up' ? '#EF4444' : '#22C55E' }]}>
            {trend.direction === 'up' ? '↑' : '↓'}
          </Text>
          <Text style={styles.trendText}>
            {trend.value}% {trend.label}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.two,
    minHeight: 120,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  icon: {
    fontSize: 20,
  },

  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
    flex: 1,
  },

  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.one,
  },

  value: {
    fontSize: 28,
    fontWeight: '800',
  },

  unit: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
  },

  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingTop: Spacing.one,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },

  trendArrow: {
    fontSize: 16,
    fontWeight: '700',
  },

  trendText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
  },
});
