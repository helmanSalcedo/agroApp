import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';

import { Lot, CropType } from '@/types/domain';
import { Radius, Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';
import { calculateLotProgress, calculateDaysToHarvest } from '@/utils/date-utils';

interface LotCardProps {
  lot: Lot;
  onPress?: (lot: Lot) => void;
  style?: ViewStyle;
  compact?: boolean;
}

/**
 * Tarjeta elegante de lote
 * Muestra nombre, cultivo, progreso y días a cosecha
 */
export function LotCard({ lot, onPress, style, compact = false }: LotCardProps) {
  const progress = calculateLotProgress(lot.sowingDate, lot.expectedHarvestDate);
  const daysToHarvest = calculateDaysToHarvest(lot.expectedHarvestDate);
  const cropLabel = getCropLabel(lot.crop);
  const statusColor = getStatusColor(lot.status);

  if (compact) {
    return (
      <Pressable
        onPress={() => onPress?.(lot)}
        style={[AgroSurface.card, styles.compactContainer, style]}
      >
        <View style={styles.compactHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.compactName} numberOfLines={1}>
              {lot.name}
            </Text>
            <Text style={styles.compactCrop} numberOfLines={1}>
              {cropLabel} • {lot.area} ha
            </Text>
          </View>
          <View
            style={[
              styles.statusBadgeCompact,
              { backgroundColor: statusColor },
            ]}
          >
            <Text style={styles.statusTextSmall}>{lot.status}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => onPress?.(lot)}
      style={[AgroSurface.card, styles.container, style]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.lotName} numberOfLines={2}>
            {lot.name}
          </Text>
          <Text style={styles.lotCrop}>{cropLabel}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{lot.status}</Text>
        </View>
      </View>

      {/* Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Área</Text>
          <Text style={styles.infoValue}>{lot.area} ha</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Cosecha en</Text>
          <Text style={styles.infoValue}>
            {daysToHarvest !== null ? `${daysToHarvest}d` : 'N/A'}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      {lot.status === 'active' && (
        <>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Progreso</Text>
            <Text style={styles.progressPercent}>{progress}%</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>
          </View>
        </>
      )}

      {/* Footer Indicator */}
      <View style={styles.footer}>
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

function getCropLabel(crop: CropType): string {
  const labels: Record<CropType, string> = {
    [CropType.COFFEE]: '☕ Café',
    [CropType.MAIZE]: '🌽 Maíz',
    [CropType.SOYBEAN]: '🌱 Soja',
    [CropType.WHEAT]: '🌾 Trigo',
    [CropType.RICE]: '🍚 Arroz',
    [CropType.SUGARCANE]: '🌿 Caña de Azúcar',
    [CropType.BEANS]: '🫘 Frijoles',
    [CropType.OTHER]: '🌾 Otro',
  };
  return labels[crop] || 'Cultivo';
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'rgba(34, 197, 94, 0.2)';
    case 'planning':
      return 'rgba(59, 130, 246, 0.2)';
    case 'harvested':
      return 'rgba(245, 158, 11, 0.2)';
    default:
      return 'rgba(107, 114, 128, 0.2)';
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.two,
  },

  compactContainer: {
    padding: Spacing.two,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },

  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },

  lotName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
  },

  compactName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  lotCrop: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },

  compactCrop: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },

  statusBadgeCompact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },

  statusTextSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingTop: Spacing.one,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#52FF94',
  },

  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.one,
  },

  progressLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
  },

  progressPercent: {
    fontSize: 13,
    color: '#52FF94',
    fontWeight: '700',
  },

  progressBarContainer: {
    marginTop: 8,
  },

  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#52FF94',
    borderRadius: 3,
  },

  footer: {
    alignItems: 'flex-end',
    marginTop: Spacing.one,
  },

  chevron: {
    fontSize: 24,
    fontWeight: '700',
    color: '#52FF94',
    marginRight: -4,
  },
});
