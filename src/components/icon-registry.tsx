import React from 'react';
import { Text } from 'react-native';
import { ActivityType, ExpenseCategory } from '@/types/domain';

/**
 * Icon Registry - Centralized icon management
 * Ensures consistent use of SVG or emoji across the app
 * Strategy: SVG where available, consistent emoji fallback
 */

interface IconProps {
  size?: number;
  color?: string;
}

// Activity Icons
export function ActivityIcon({ type, size = 24, color = '#FFFFFF' }: { type: ActivityType } & IconProps) {
  const sizeStyle = { fontSize: size * 1.5 };

  // SVG icons should be imported and used here
  // For now, using emoji as fallback with consistent styling
  const icons: Record<ActivityType, string> = {
    [ActivityType.IRRIGATION]: '💧',
    [ActivityType.FERTILIZATION]: '🌿',
    [ActivityType.PEST_CONTROL]: '🛡️',
    [ActivityType.WEEDING]: '🌱',
    [ActivityType.HARVESTING]: '🌾',
    [ActivityType.PLANTING]: '🌱',
    [ActivityType.PRUNING]: '✂️',
    [ActivityType.SALES]: '💵',
    [ActivityType.SOIL_ANALYSIS]: '🔬',
    [ActivityType.TRANSPLANTING]: '🪴',
    [ActivityType.PEST_MONITORING]: '🔍',
    [ActivityType.CROP_INSPECTION]: '👁️',
    [ActivityType.PACKING]: '📦',
    [ActivityType.FUNGICIDE_APPLICATION]: '💉',
    [ActivityType.DISINFECTION]: '🧼',
    [ActivityType.IRRIGATION_MAINTENANCE]: '🔧',
    [ActivityType.OTHER]: '📋',
  };

  return (
    <Text style={[sizeStyle, { color }]}>
      {icons[type] || '📋'}
    </Text>
  );
}

// Expense Category Icons
export function ExpenseCategoryIcon(
  { category, size = 24, color = '#FFFFFF' }: { category: ExpenseCategory } & IconProps
) {
  const sizeStyle = { fontSize: size * 1.5 };

  const icons: Record<ExpenseCategory, string> = {
    [ExpenseCategory.SEEDS]: '🌾',
    [ExpenseCategory.FERTILIZERS]: '🌿',
    [ExpenseCategory.ANIMAL_FEED]: '🐓',
    [ExpenseCategory.LABOR]: '👨‍🌾',
    [ExpenseCategory.IRRIGATION]: '💧',
    [ExpenseCategory.TRANSPORT]: '🚚',
    [ExpenseCategory.EQUIPMENT]: '🔧',
    [ExpenseCategory.RENTAL]: '🏗️',
    [ExpenseCategory.UTILITIES]: '💡',
    [ExpenseCategory.MAINTENANCE]: '🔨',
    [ExpenseCategory.VETERINARY]: '🏥',
    [ExpenseCategory.OTHER]: '📝',
  };

  return (
    <Text style={[sizeStyle, { color }]}>
      {icons[category] || '📝'}
    </Text>
  );
}

// Status Icons
export function StatusIcon({ type, size = 20 }: { type: 'active' | 'pending' | 'completed' | 'failed' } & IconProps) {
  const sizeStyle = { fontSize: size * 1.2 };

  const icons: Record<string, string> = {
    active: '🟢',
    pending: '🟡',
    completed: '✅',
    failed: '❌',
  };

  return (
    <Text style={sizeStyle}>
      {icons[type] || '⚪'}
    </Text>
  );
}

// Notification Icons
export function NotificationIcon({ type, size = 20 }: { type: 'alert' | 'info' | 'success' | 'warning' } & IconProps) {
  const sizeStyle = { fontSize: size * 1.2 };

  const icons: Record<string, string> = {
    alert: '🔴',
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
  };

  return (
    <Text style={sizeStyle}>
      {icons[type] || 'ℹ️'}
    </Text>
  );
}

// Farm/Lot Icons
export function EntityIcon({ type, size = 24 }: { type: 'farm' | 'lot' | 'harvest' } & IconProps) {
  const sizeStyle = { fontSize: size * 1.5 };

  const icons: Record<string, string> = {
    farm: '🏘️',
    lot: '🌾',
    harvest: '🌾',
  };

  return (
    <Text style={sizeStyle}>
      {icons[type] || '🌾'}
    </Text>
  );
}
