import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { Spacing } from '@/constants/theme';

interface CalendarDayCellProps {
  day: number | null;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  hasActivity?: boolean;
  hasExpense?: boolean;
  hasProduction?: boolean;
  onPress?: (day: number) => void;
}

/**
 * Componente de celda del calendario
 * Muestra el día y los indicadores de eventos
 */
export function CalendarDayCell({
  day,
  isToday,
  isCurrentMonth,
  hasActivity,
  hasExpense,
  hasProduction,
  onPress,
}: CalendarDayCellProps) {
  const hasEvents = hasActivity || hasExpense || hasProduction;

  if (!day) {
    return <View style={styles.emptyCell} />;
  }

  return (
    <Pressable
      style={[
        styles.cell,
        isToday && styles.todayCell,
        isCurrentMonth && styles.currentMonthCell,
      ]}
      onPress={() => onPress?.(day)}
    >
      <Text
        style={[
          styles.dayText,
          isToday && styles.todayText,
          !isCurrentMonth && styles.otherMonthText,
        ]}
      >
        {day}
      </Text>

      {hasEvents && (
        <View style={styles.indicatorsContainer}>
          {hasActivity && <View style={[styles.indicator, styles.activityIndicator]} />}
          {hasExpense && <View style={[styles.indicator, styles.expenseIndicator]} />}
          {hasProduction && <View style={[styles.indicator, styles.productionIndicator]} />}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  emptyCell: {
    width: '14.28%',
    aspectRatio: 1,
  },

  cell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: Spacing.one,
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  todayCell: {
    backgroundColor: 'rgba(82,255,148,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.3)',
  },

  currentMonthCell: {
    backgroundColor: 'rgba(255,255,255,0.02)',
  },

  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
  },

  todayText: {
    color: '#52FF94',
    fontWeight: '700',
  },

  otherMonthText: {
    color: 'rgba(255,255,255,0.25)',
  },

  indicatorsContainer: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2,
  },

  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  activityIndicator: {
    backgroundColor: '#3B82F6',
  },

  expenseIndicator: {
    backgroundColor: '#F59E0B',
  },

  productionIndicator: {
    backgroundColor: '#22C55E',
  },
});
