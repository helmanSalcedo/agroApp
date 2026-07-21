import React from 'react';
import { StyleSheet, Text, View, Pressable, Modal, FlatList } from 'react-native';

import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-surface';

export interface SyncQueueItem {
  id: string;
  type: 'activity' | 'expense' | 'production' | 'lot';
  label: string;
  timestamp: Date;
  status: 'pending' | 'syncing' | 'failed';
}

interface SyncQueueIndicatorProps {
  items: SyncQueueItem[];
  visible: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

/**
 * Sync Queue Indicator - Shows what's waiting to sync
 * Provides transparency for offline changes
 */
export function SyncQueueIndicator({
  items,
  visible,
  onClose,
  onRetry,
}: SyncQueueIndicatorProps) {
  if (!visible) return null;

  const pendingCount = items.filter((i) => i.status === 'pending').length;
  const syncingCount = items.filter((i) => i.status === 'syncing').length;
  const failedCount = items.filter((i) => i.status === 'failed').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'syncing':
        return '🔄';
      case 'failed':
        return '❌';
      default:
        return '📝';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      activity: '📋 Actividad',
      expense: '💰 Gasto',
      production: '🌾 Cosecha',
      lot: '🌱 Lote',
    };
    return labels[type] || type;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        <View style={[AgroSurface.card, styles.container]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>📤 Cola de Sincronización</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>

          {/* Stats */}
          {items.length > 0 && (
            <View style={styles.stats}>
              {pendingCount > 0 && (
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>⏳</Text>
                  <Text style={styles.statText}>{pendingCount} pendiente</Text>
                </View>
              )}
              {syncingCount > 0 && (
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>🔄</Text>
                  <Text style={styles.statText}>{syncingCount} sincronizando</Text>
                </View>
              )}
              {failedCount > 0 && (
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>❌</Text>
                  <Text style={styles.statText}>{failedCount} error</Text>
                </View>
              )}
            </View>
          )}

          {/* Queue List */}
          {items.length > 0 ? (
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              scrollEnabled={items.length > 5}
              style={styles.list}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.queueItem,
                    item.status === 'failed' && styles.queueItemFailed,
                  ]}
                >
                  <Text style={styles.queueItemStatus}>
                    {getStatusIcon(item.status)}
                  </Text>
                  <View style={styles.queueItemContent}>
                    <Text style={styles.queueItemType}>
                      {getTypeLabel(item.type)}
                    </Text>
                    <Text style={styles.queueItemLabel}>{item.label}</Text>
                    <Text style={styles.queueItemTime}>
                      {item.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>✓</Text>
              <Text style={styles.emptyText}>Nada esperando sincronizar</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actions}>
            {failedCount > 0 && onRetry && (
              <Pressable
                style={[AgroSurface.primaryButton, styles.retryButton]}
                onPress={onRetry}
              >
                <Text style={AgroSurface.primaryButtonText}>Reintentar</Text>
              </Pressable>
            )}
            <Pressable
              style={[AgroSurface.secondaryButton, styles.closeActionButton]}
              onPress={onClose}
            >
              <Text style={AgroSurface.secondaryButtonText}>Entendido</Text>
            </Pressable>
          </View>

          {/* Info */}
          <Text style={styles.infoText}>
            Los cambios se sincronizarán automáticamente cuando tengas conexión a internet.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
    maxHeight: '80%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  closeButton: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
  },

  stats: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingBottom: Spacing.two,
  },

  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  statEmoji: {
    fontSize: 16,
  },

  statText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },

  list: {
    maxHeight: 250,
    marginBottom: Spacing.two,
  },

  queueItem: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: Spacing.one,
  },

  queueItemFailed: {
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.2)',
  },

  queueItemStatus: {
    fontSize: 14,
    minWidth: 20,
  },

  queueItemContent: {
    flex: 1,
    gap: 2,
  },

  queueItemType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52FF94',
  },

  queueItemLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  queueItemTime: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },

  emptyState: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
  },

  emptyEmoji: {
    fontSize: 28,
    color: '#22C55E',
  },

  emptyText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },

  actions: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },

  retryButton: {
    width: '100%',
  },

  closeActionButton: {
    width: '100%',
  },

  infoText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: Spacing.one,
  },
});
