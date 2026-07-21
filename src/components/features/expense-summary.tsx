import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { ExpenseCategory, Expense } from '@/types/domain';
import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';
import { formatCurrency } from '@/utils/calculation-utils';

interface ExpenseSummaryProps {
  expenses: Expense[];
  style?: ViewStyle;
}

/**
 * Componente que muestra un resumen de gastos por categoría
 */
export function ExpenseSummary({ expenses, style }: ExpenseSummaryProps) {
  const categoryBreakdown = getCategoryBreakdown(expenses);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (expenses.length === 0) {
    return (
      <View style={[AgroSurface.card, styles.container, style]}>
        <Text style={styles.title}>Resumen de Gastos</Text>
        <Text style={styles.emptyText}>Sin gastos registrados aún</Text>
      </View>
    );
  }

  return (
    <View style={[AgroSurface.card, styles.container, style]}>
      <Text style={styles.title}>Resumen de Gastos</Text>

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total de Gastos</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalExpenses)}</Text>
      </View>

      {/* Breakdown por categoría */}
      <View style={styles.breakdown}>
        {categoryBreakdown.map((cat) => {
          const percentage = totalExpenses > 0 ? (cat.amount / totalExpenses) * 100 : 0;
          return (
            <View key={cat.category} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
                <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${percentage}%`, backgroundColor: cat.color },
                    ]}
                  />
                </View>
              </View>
              <Text style={[styles.categoryAmount, { color: cat.color }]}>
                {formatCurrency(cat.amount)}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Leyenda de porcentajes */}
      <View style={styles.legend}>
        {categoryBreakdown.map((cat) => {
          const percentage = totalExpenses > 0 ? (cat.amount / totalExpenses) * 100 : 0;
          return (
            <View key={`pct-${cat.category}`} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: cat.color }]}
              />
              <Text style={styles.legendText}>
                {cat.label}: {percentage.toFixed(1)}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

interface CategoryBreakdownItem {
  category: ExpenseCategory;
  label: string;
  amount: number;
  count: number;
  color: string;
}

function getCategoryBreakdown(expenses: Expense[]): CategoryBreakdownItem[] {
  const categoryMap: Record<ExpenseCategory, CategoryBreakdownItem> = {
    [ExpenseCategory.SEEDS]: { category: ExpenseCategory.SEEDS, label: 'Semillas', amount: 0, count: 0, color: '#84CC16' },
    [ExpenseCategory.FERTILIZERS]: { category: ExpenseCategory.FERTILIZERS, label: 'Fertilizantes', amount: 0, count: 0, color: '#6B7280' },
    [ExpenseCategory.ANIMAL_FEED]: { category: ExpenseCategory.ANIMAL_FEED, label: 'Alimentos', amount: 0, count: 0, color: '#F59E0B' },
    [ExpenseCategory.LABOR]: { category: ExpenseCategory.LABOR, label: 'Jornales', amount: 0, count: 0, color: '#EF4444' },
    [ExpenseCategory.IRRIGATION]: { category: ExpenseCategory.IRRIGATION, label: 'Riego', amount: 0, count: 0, color: '#3B82F6' },
    [ExpenseCategory.TRANSPORT]: { category: ExpenseCategory.TRANSPORT, label: 'Transporte', amount: 0, count: 0, color: '#06B6D4' },
    [ExpenseCategory.EQUIPMENT]: { category: ExpenseCategory.EQUIPMENT, label: 'Equipos', amount: 0, count: 0, color: '#8B5CF6' },
    [ExpenseCategory.RENTAL]: { category: ExpenseCategory.RENTAL, label: 'Alquiler', amount: 0, count: 0, color: '#EC4899' },
    [ExpenseCategory.UTILITIES]: { category: ExpenseCategory.UTILITIES, label: 'Servicios', amount: 0, count: 0, color: '#FBBF24' },
    [ExpenseCategory.MAINTENANCE]: { category: ExpenseCategory.MAINTENANCE, label: 'Mantenimiento', amount: 0, count: 0, color: '#64748B' },
    [ExpenseCategory.VETERINARY]: { category: ExpenseCategory.VETERINARY, label: 'Veterinario', amount: 0, count: 0, color: '#06B6D4' },
    [ExpenseCategory.OTHER]: { category: ExpenseCategory.OTHER, label: 'Otro', amount: 0, count: 0, color: '#94A3B8' },
  };

  expenses.forEach((exp) => {
    if (categoryMap[exp.category]) {
      categoryMap[exp.category].amount += exp.amount;
      categoryMap[exp.category].count += 1;
    }
  });

  return Object.values(categoryMap)
    .filter((cat) => cat.amount > 0)
    .sort((a, b) => b.amount - a.amount);
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

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },

  totalLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#52FF94',
  },

  breakdown: {
    gap: Spacing.two,
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },

  categoryInfo: {
    flex: 1,
    gap: Spacing.one,
  },

  categoryLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },

  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  categoryAmount: {
    fontSize: 13,
    fontWeight: '700',
    minWidth: 80,
    textAlign: 'right',
  },

  legend: {
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    gap: Spacing.one,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  legendText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
});
