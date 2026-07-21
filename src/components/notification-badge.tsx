import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NotificationBadgeProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Componente Badge que muestra el número de notificaciones no leídas
 */
export function NotificationBadge({ count, size = 'small' }: NotificationBadgeProps) {
  if (count === 0) {
    return null;
  }

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View style={[styles.badge, styles[`badge_${size}`]]}>
      <Text style={[styles.text, styles[`text_${size}`]]}>{displayCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badge_small: {
    width: 20,
    height: 20,
  },

  badge_medium: {
    width: 24,
    height: 24,
  },

  badge_large: {
    width: 32,
    height: 32,
  },

  text: {
    fontWeight: '700',
    color: '#FFFFFF',
  },

  text_small: {
    fontSize: 11,
  },

  text_medium: {
    fontSize: 12,
  },

  text_large: {
    fontSize: 14,
  },
});
