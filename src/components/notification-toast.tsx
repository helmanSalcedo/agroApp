import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native';

import { Notification, NotificationType } from '@/types/domain';
import { Spacing } from '@/constants/theme';

interface NotificationToastProps {
  notification: Notification | null;
  onDismiss?: () => void;
  autoHideDuration?: number;
}

/**
 * Componente Toast que muestra notificaciones en tiempo real
 * Se muestra en la parte superior y desaparece automáticamente
 */
export function NotificationToast({
  notification,
  onDismiss,
  autoHideDuration = 4000,
}: NotificationToastProps) {
  const [visible, setVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (notification) {
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
          onDismiss?.();
        });
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [notification, autoHideDuration, slideAnim, onDismiss]);

  if (!visible || !notification) {
    return null;
  }

  const typeInfo = getToastTypeInfo(notification.type);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          borderLeftColor: typeInfo.color,
        },
      ]}
    >
      <View style={[styles.background, { backgroundColor: typeInfo.backgroundColor }]}>
        <View style={styles.content}>
          <Text style={styles.icon}>{typeInfo.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {notification.title}
            </Text>
            <Text style={styles.message} numberOfLines={1}>
              {notification.message}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => {
            setVisible(false);
            onDismiss?.();
          }}
          style={styles.closeButton}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

interface ToastTypeInfo {
  icon: string;
  color: string;
  backgroundColor: string;
}

function getToastTypeInfo(type: NotificationType): ToastTypeInfo {
  const info: Record<NotificationType, ToastTypeInfo> = {
    [NotificationType.REMINDER]: {
      icon: '🔔',
      color: '#3B82F6',
      backgroundColor: 'rgba(59,130,246,0.95)',
    },
    [NotificationType.ALERT]: {
      icon: '⚠️',
      color: '#F59E0B',
      backgroundColor: 'rgba(245,158,11,0.95)',
    },
    [NotificationType.INFO]: {
      icon: 'ℹ️',
      color: '#06B6D4',
      backgroundColor: 'rgba(6,182,212,0.95)',
    },
    [NotificationType.SUCCESS]: {
      icon: '✓',
      color: '#22C55E',
      backgroundColor: 'rgba(34,197,94,0.95)',
    },
  };

  return info[type];
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
    borderLeftWidth: 4,
  },

  background: {
    borderRadius: 12,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  icon: {
    fontSize: 24,
  },

  textContainer: {
    flex: 1,
    gap: 2,
  },

  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  message: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },

  closeButton: {
    padding: Spacing.one,
  },

  closeIcon: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
  },
});
