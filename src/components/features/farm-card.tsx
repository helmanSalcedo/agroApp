import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';

import { Farm } from '@/types/domain';
import { Radius, Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';
import { FarmHouseIcon } from '@/assets/svg/icons/farm-house';

interface FarmCardProps {
  farm: Farm;
  onPress?: (farm: Farm) => void;
  style?: ViewStyle;
}

/**
 * Tarjeta elegante de granja
 * Muestra nombre, ubicación y área total
 */
export function FarmCard({ farm, onPress, style }: FarmCardProps) {
  return (
    <Pressable
      onPress={() => onPress?.(farm)}
      style={[AgroSurface.card, styles.container, style]}
    >
      {/* Header con ícono y nombre */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FarmHouseIcon size={48} color="#16A34A" />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.farmName} numberOfLines={2}>
            {farm.name}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            📍 {farm.location}
          </Text>
        </View>
      </View>

      {/* Área información */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Área Total</Text>
          <Text style={styles.infoValue}>{farm.totalArea} ha</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Activa desde</Text>
          <Text style={styles.infoValue}>
            {farm.createdAt.toLocaleDateString('es-CO', {
              month: 'short',
              year: '2-digit',
            })}
          </Text>
        </View>
      </View>

      {/* Indicador de interactividad */}
      <View style={styles.footer}>
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.two,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(82,255,148,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
  },

  titleContainer: {
    flex: 1,
    gap: 2,
  },

  farmName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 22,
  },

  location: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
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

  footer: {
    alignItems: 'flex-end',
    paddingTop: Spacing.one,
  },

  chevron: {
    fontSize: 24,
    fontWeight: '700',
    color: '#52FF94',
    marginRight: -4,
  },
});
