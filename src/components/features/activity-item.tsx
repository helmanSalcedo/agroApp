import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';

import { Activity, ActivityType } from '@/types/domain';
import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';
import { formatDate } from '@/utils/date-utils';
import { WaterDropIcon } from '@/assets/svg/icons/water-drop';
import { FertilizerIcon } from '@/assets/svg/icons/fertilizer';
import { BugShieldIcon } from '@/assets/svg/icons/bug-shield';

interface ActivityItemProps {
  activity: Activity;
  onPress?: (activity: Activity) => void;
  style?: ViewStyle;
}

/**
 * Componente que muestra una actividad individual
 * Incluye tipo, fecha, descripción y estado
 */
export function ActivityItem({ activity, onPress, style }: ActivityItemProps) {
  const typeInfo = getActivityTypeInfo(activity.type);

  return (
    <Pressable
      onPress={() => onPress?.(activity)}
      style={[AgroSurface.card, styles.container, style]}
    >
      {/* Icono + Info */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>{typeInfo.icon}</View>

        <View style={styles.textContainer}>
          <Text style={styles.typeLabel}>{typeInfo.label}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {activity.description}
          </Text>
          <Text style={styles.dateText}>{formatDate(activity.date)}</Text>
        </View>
      </View>

      {/* Estado */}
      <View style={styles.statusContainer}>
        {activity.completed ? (
          <View style={styles.completedBadge}>
            <Text style={styles.completedEmoji}>✓</Text>
          </View>
        ) : (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>Pendiente</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

interface ActivityTypeInfo {
  label: string;
  icon: React.ReactNode;
  color: string;
}

function getActivityTypeInfo(type: ActivityType): ActivityTypeInfo {
  const info: Record<ActivityType, ActivityTypeInfo> = {
    [ActivityType.IRRIGATION]: {
      label: 'Riego',
      icon: <WaterDropIcon size={40} color="#3B82F6" />,
      color: '#3B82F6',
    },
    [ActivityType.FERTILIZATION]: {
      label: 'Fertilización',
      icon: <FertilizerIcon size={40} color="#EAB308" />,
      color: '#EAB308',
    },
    [ActivityType.PEST_CONTROL]: {
      label: 'Control de Plagas',
      icon: <BugShieldIcon size={40} color="#EF4444" />,
      color: '#EF4444',
    },
    [ActivityType.WEEDING]: {
      label: 'Deshierbe',
      icon: <Text style={{ fontSize: 24 }}>🌿</Text>,
      color: '#10B981',
    },
    [ActivityType.HARVESTING]: {
      label: 'Cosecha',
      icon: <Text style={{ fontSize: 24 }}>🌾</Text>,
      color: '#F59E0B',
    },
    [ActivityType.PLANTING]: {
      label: 'Siembra',
      icon: <Text style={{ fontSize: 24 }}>🌱</Text>,
      color: '#06B6D4',
    },
    [ActivityType.PRUNING]: {
      label: 'Poda',
      icon: <Text style={{ fontSize: 24 }}>✂️</Text>,
      color: '#8B5CF6',
    },
    [ActivityType.SALES]: {
      label: 'Ventas',
      icon: <Text style={{ fontSize: 24 }}>💵</Text>,
      color: '#06B6D4',
    },
    [ActivityType.SOIL_ANALYSIS]: {
      label: 'Análisis de Suelo',
      icon: <Text style={{ fontSize: 24 }}>🔬</Text>,
      color: '#A16207',
    },
    [ActivityType.TRANSPLANTING]: {
      label: 'Trasplante',
      icon: <Text style={{ fontSize: 24 }}>🪴</Text>,
      color: '#059669',
    },
    [ActivityType.PEST_MONITORING]: {
      label: 'Monitoreo de Plagas',
      icon: <Text style={{ fontSize: 24 }}>🔍</Text>,
      color: '#7C2D12',
    },
    [ActivityType.CROP_INSPECTION]: {
      label: 'Inspección',
      icon: <Text style={{ fontSize: 24 }}>👁️</Text>,
      color: '#4F46E5',
    },
    [ActivityType.PACKING]: {
      label: 'Empacado',
      icon: <Text style={{ fontSize: 24 }}>📦</Text>,
      color: '#DC2626',
    },
    [ActivityType.FUNGICIDE_APPLICATION]: {
      label: 'Fungicida',
      icon: <Text style={{ fontSize: 24 }}>💉</Text>,
      color: '#E11D48',
    },
    [ActivityType.DISINFECTION]: {
      label: 'Desinfección',
      icon: <Text style={{ fontSize: 24 }}>🧼</Text>,
      color: '#0891B2',
    },
    [ActivityType.IRRIGATION_MAINTENANCE]: {
      label: 'Mantenimiento',
      icon: <Text style={{ fontSize: 24 }}>🔧</Text>,
      color: '#0369A1',
    },
    [ActivityType.OTHER]: {
      label: 'Otra',
      icon: <Text style={{ fontSize: 24 }}>📋</Text>,
      color: '#6B7280',
    },
  };

  return info[type];
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

  typeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  description: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
  },

  dateText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
  },

  statusContainer: {
    alignItems: 'center',
  },

  completedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(34,197,94,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.25)',
  },

  completedEmoji: {
    fontSize: 18,
    color: '#22C55E',
    fontWeight: '700',
  },

  pendingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(245,158,11,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.25)',
  },

  pendingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F59E0B',
    textAlign: 'center',
  },
});
