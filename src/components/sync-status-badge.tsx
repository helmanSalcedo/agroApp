import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';

import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-surface';
import { SyncQueueIndicator, type SyncQueueItem } from '@/components/sync-queue-indicator';

interface SyncStatusBadgeProps {
  status: 'connected' | 'offline' | 'syncing';
  lastSyncTime?: string;
  pendingCount?: number;
  queueItems?: SyncQueueItem[];
  onPendingPress?: () => void;
  onRetry?: () => void;
}

/**
 * Sync Status Badge - Always visible indicator of data sync state
 * Shows connection status, last sync time, and pending items count
 */
export function SyncStatusBadge({
  status,
  lastSyncTime = '2m ago',
  pendingCount = 0,
  queueItems = [],
  onPendingPress,
  onRetry,
}: SyncStatusBadgeProps) {
  const [showQueue, setShowQueue] = useState(false);

  const getIcon = () => {
    switch (status) {
      case 'connected':
        return '🟢';
      case 'offline':
        return '🟡';
      case 'syncing':
        return '🔄';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'connected':
        return 'Sincronizado';
      case 'offline':
        return 'Offline';
      case 'syncing':
        return 'Sincronizando';
    }
  };

  return (
    <>
      <Pressable
        style={[styles.badge, styles[status]]}
        onPress={() => {
          if (pendingCount > 0 || status !== 'connected') {
            setShowQueue(true);
            onPendingPress?.();
          }
        }}
      >
        <Text style={styles.icon}>{getIcon()}</Text>
        <View style={styles.content}>
          <Text style={styles.label}>{getLabel()}</Text>
          {status === 'connected' && (
            <Text style={styles.time}>{lastSyncTime}</Text>
          )}
          {pendingCount > 0 && (
            <Text style={styles.pending}>{pendingCount} cambios</Text>
          )}
        </View>
      </Pressable>

      {/* Queue Modal - Shows pending items */}
      <SyncQueueIndicator
        items={queueItems}
        visible={showQueue}
        onClose={() => setShowQueue(false)}
        onRetry={onRetry}
      />
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 100,
  },

  connected: {
    backgroundColor: 'rgba(34,197,94,0.1)',
    borderColor: 'rgba(34,197,94,0.3)',
  },

  offline: {
    backgroundColor: 'rgba(245,158,11,0.1)',
    borderColor: 'rgba(245,158,11,0.3)',
  },

  syncing: {
    backgroundColor: 'rgba(59,130,246,0.1)',
    borderColor: 'rgba(59,130,246,0.3)',
  },

  icon: {
    fontSize: 14,
  },

  content: {
    gap: 1,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  time: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
  },

  pending: {
    fontSize: 9,
    color: '#F59E0B',
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.three,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },

  modalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  closeButton: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
  },

  emptyState: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.four,
  },

  emptyEmoji: {
    fontSize: 28,
    color: '#22C55E',
  },

  emptyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  queueList: {
    gap: Spacing.one,
  },

  queueInfo: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  queueHint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 16,
  },

  retryButton: {
    marginTop: Spacing.two,
  },
});
