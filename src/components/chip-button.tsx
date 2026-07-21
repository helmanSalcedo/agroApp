import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

import { Spacing } from '@/constants/theme';

interface ChipButtonProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
  disabled?: boolean;
}

/**
 * Chip Button - Small selectable button for quick selections
 * Used for: expense categories, activity types, status filters
 */
export function ChipButton({
  label,
  selected = false,
  onPress,
  icon,
  disabled = false,
}: ChipButtonProps) {
  return (
    <Pressable
      style={[styles.chip, selected && styles.chipActive, disabled && styles.chipDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.label, selected && styles.labelActive]}>{label}</Text>
      {selected && <Text style={styles.check}>✓</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.3)',
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  chipActive: {
    backgroundColor: '#52FF94',
    borderColor: '#52FF94',
  },

  chipDisabled: {
    opacity: 0.5,
  },

  icon: {
    fontSize: 14,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52FF94',
  },

  labelActive: {
    color: '#041109',
  },

  check: {
    fontSize: 12,
    fontWeight: '700',
    color: '#041109',
    marginLeft: 4,
  },
});
