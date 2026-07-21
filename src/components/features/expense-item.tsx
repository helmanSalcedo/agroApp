import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';

import { Expense, ExpenseCategory } from '@/types/domain';
import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';
import { formatDate } from '@/utils/date-utils';
import { formatCurrency } from '@/utils/calculation-utils';
import { ExpenseSeedIcon } from '@/assets/svg/icons/expense-seed';
import { ExpenseLaborIcon } from '@/assets/svg/icons/expense-labor';
import { ExpenseTransportIcon } from '@/assets/svg/icons/expense-transport';

interface ExpenseItemProps {
  expense: Expense;
  onPress?: (expense: Expense) => void;
  style?: ViewStyle;
}

/**
 * Componente que muestra un gasto individual
 * Incluye categoría, concepto, monto y fecha
 */
export function ExpenseItem({ expense, onPress, style }: ExpenseItemProps) {
  const categoryInfo = getExpenseCategoryInfo(expense.category);

  return (
    <Pressable
      onPress={() => onPress?.(expense)}
      style={[AgroSurface.card, styles.container, style]}
    >
      {/* Icono + Info */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>{categoryInfo.icon}</View>

        <View style={styles.textContainer}>
          <Text style={styles.categoryLabel}>{categoryInfo.label}</Text>
          <Text style={styles.concept} numberOfLines={1}>
            {expense.concept}
          </Text>
          <Text style={styles.dateText}>{formatDate(expense.date)}</Text>
        </View>
      </View>

      {/* Monto */}
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: categoryInfo.color }]}>
          {formatCurrency(expense.amount)}
        </Text>
      </View>
    </Pressable>
  );
}

interface ExpenseCategoryInfo {
  label: string;
  icon: React.ReactNode;
  color: string;
}

function getExpenseCategoryInfo(category: ExpenseCategory): ExpenseCategoryInfo {
  const info: Record<ExpenseCategory, ExpenseCategoryInfo> = {
    [ExpenseCategory.SEEDS]: {
      label: 'Semillas',
      icon: <Text style={{ fontSize: 24 }}>🌾</Text>,
      color: '#84CC16',
    },
    [ExpenseCategory.FERTILIZERS]: {
      label: 'Fertilizantes',
      icon: <Text style={{ fontSize: 24 }}>🥗</Text>,
      color: '#6B7280',
    },
    [ExpenseCategory.ANIMAL_FEED]: {
      label: 'Alimentos',
      icon: <Text style={{ fontSize: 24 }}>🐓</Text>,
      color: '#F59E0B',
    },
    [ExpenseCategory.LABOR]: {
      label: 'Jornales',
      icon: <ExpenseLaborIcon size={40} color="#F59E0B" />,
      color: '#EF4444',
    },
    [ExpenseCategory.IRRIGATION]: {
      label: 'Riego',
      icon: <Text style={{ fontSize: 24 }}>💧</Text>,
      color: '#3B82F6',
    },
    [ExpenseCategory.TRANSPORT]: {
      label: 'Transporte',
      icon: <ExpenseTransportIcon size={40} color="#06B6D4" />,
      color: '#06B6D4',
    },
    [ExpenseCategory.EQUIPMENT]: {
      label: 'Equipos',
      icon: <Text style={{ fontSize: 24 }}>🔧</Text>,
      color: '#8B5CF6',
    },
    [ExpenseCategory.RENTAL]: {
      label: 'Alquiler',
      icon: <Text style={{ fontSize: 24 }}>🏗️</Text>,
      color: '#EC4899',
    },
    [ExpenseCategory.UTILITIES]: {
      label: 'Servicios',
      icon: <Text style={{ fontSize: 24 }}>💡</Text>,
      color: '#FBBF24',
    },
    [ExpenseCategory.MAINTENANCE]: {
      label: 'Mantenimiento',
      icon: <Text style={{ fontSize: 24 }}>🔨</Text>,
      color: '#64748B',
    },
    [ExpenseCategory.VETERINARY]: {
      label: 'Veterinario',
      icon: <Text style={{ fontSize: 24 }}>🏥</Text>,
      color: '#06B6D4',
    },
    [ExpenseCategory.OTHER]: {
      label: 'Otro',
      icon: <Text style={{ fontSize: 24 }}>📝</Text>,
      color: '#94A3B8',
    },
  };

  return info[category];
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  textContainer: {
    flex: 1,
    gap: 2,
  },

  categoryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  concept: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
  },

  dateText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
  },

  amountContainer: {
    alignItems: 'flex-end',
  },

  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
});
