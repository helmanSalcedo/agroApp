import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';

import { Notification, NotificationType } from '@/types/domain';
import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';
import { formatDate } from '@/utils/date-utils';

interface NotificationItemProps {
  notification: Notification;
  onPress?: (notification: Notification) => void;
  onMarkRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  style?: ViewStyle;
}

/**
 * Componente que muestra una notificación individual
 * Incluye tipo, título, mensaje y fecha
 */
export function NotificationItem({
  notification,
  onPress,
  onMarkRead,
  onDelete,
  style,
}: NotificationItemProps) {
  const typeInfo = getNotificationTypeInfo(notification.type);

  return (
    <Pressable
      onPress={() => {
        onPress?.(notification);
        if (!notification.read) {
          onMarkRead?.(notification.id);
        }
      }}
      style={[
        AgroSurface.card,
        styles.container,
        !notification.read && styles.containerUnread,
        style,
      ]}
    >
      {/* Ícono y Contenido */}
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: typeInfo.backgroundColor }]}>
          <Text style={styles.icon}>{typeInfo.icon}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {notification.message}
          </Text>
          <Text style={styles.dateText}>{formatDate(notification.createdAt)}</Text>
        </View>
      </View>

      {/* Badge de no leída */}
      {!notification.read && <View style={[styles.unreadDot, { backgroundColor: typeInfo.color }]} />}

      {/* Botón de eliminar (al deslizar o presionar) */}
      {onDelete && (
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(notification.id)}
        >
          <Text style={styles.deleteIcon}>✕</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

interface NotificationTypeInfo {
  label: string;
  icon: string;
  color: string;
  backgroundColor: string;
}

function getNotificationTypeInfo(type: NotificationType): NotificationTypeInfo {
  const info: Record<NotificationType, NotificationTypeInfo> = {
    [NotificationType.REMINDER]: {
      label: 'Recordatorio',
      icon: '🔔',
      color: '#3B82F6',
      backgroundColor: 'rgba(59,130,246,0.15)',
    },
    [NotificationType.ALERT]: {
      label: 'Alerta',
      icon: '⚠️',
      color: '#F59E0B',
      backgroundColor: 'rgba(245,158,11,0.15)',
    },
    [NotificationType.INFO]: {
      label: 'Información',
      icon: 'ℹ️',
      color: '#06B6D4',
      backgroundColor: 'rgba(6,182,212,0.15)',
    },
    [NotificationType.SUCCESS]: {
      label: 'Éxito',
      icon: '✓',
      color: '#22C55E',
      backgroundColor: 'rgba(34,197,94,0.15)',
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

  containerUnread: {
    borderLeftWidth: 3,
    borderLeftColor: '#52FF94',
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  icon: {
    fontSize: 24,
  },

  textContainer: {
    flex: 1,
    gap: 2,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  message: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 16,
  },

  dateText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },

  deleteButton: {
    padding: Spacing.one,
    marginLeft: Spacing.one,
  },

  deleteIcon: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '700',
  },
});
