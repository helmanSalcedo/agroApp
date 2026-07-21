import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { Spacing } from '@/constants/theme';

interface DateQuickPickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
}

/**
 * Date Quick Picker - Fast date selection for field work
 * Buttons: Today | Yesterday (covers 95% of use cases in field)
 */
export function DateQuickPicker({
  value,
  onChange,
  label = 'Fecha',
}: DateQuickPickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  };

  const isYesterday = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === yesterday.getTime();
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {/* Quick Buttons Row */}
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.quickButton, isToday(value) && styles.quickButtonActive]}
          onPress={() => onChange(today)}
        >
          <Text
            style={[
              styles.quickButtonText,
              isToday(value) && styles.quickButtonTextActive,
            ]}
          >
            Hoy
          </Text>
        </Pressable>

        <Pressable
          style={[styles.quickButton, isYesterday(value) && styles.quickButtonActive]}
          onPress={() => onChange(yesterday)}
        >
          <Text
            style={[
              styles.quickButtonText,
              isYesterday(value) && styles.quickButtonTextActive,
            ]}
          >
            Ayer
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.quickButton,
            !isToday(value) && !isYesterday(value) && styles.quickButtonActive,
          ]}
          disabled
        >
          <Text
            style={[
              styles.quickButtonText,
              (!isToday(value) && !isYesterday(value)) && styles.quickButtonTextActive,
            ]}
          >
            📅 {formatDate(value)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },

  quickButton: {
    flex: 1,
    paddingHorizontal: Spacing.two,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
  },

  quickButtonActive: {
    backgroundColor: '#52FF94',
    borderColor: '#52FF94',
  },

  quickButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
  },

  quickButtonTextActive: {
    color: '#041109',
  },
});
