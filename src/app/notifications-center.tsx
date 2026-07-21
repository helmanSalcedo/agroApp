import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'task',
    title: 'Tarea Completada',
    message: 'Fertilización Lote Alto ha sido marcada como completada',
    time: 'Hace 2 horas',
    icon: '✅',
    color: '#10B981',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'alert',
    title: 'Alerta: Stock Bajo',
    message: 'El fertilizante NPK está agotándose. Quedan 50 sacos.',
    time: 'Hace 4 horas',
    icon: '⚠️',
    color: '#F59E0B',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'sale',
    title: 'Nueva Venta',
    message: 'Se registró venta de 500kg de maíz por $450,000',
    time: 'Hace 6 horas',
    icon: '💰',
    color: '#10B981',
    read: false,
  },
  {
    id: 'notif-4',
    type: 'member',
    title: 'Nuevo Miembro',
    message: 'Juan Pérez ha sido agregado a la organización',
    time: 'Hace 1 día',
    icon: '👤',
    color: '#3B82F6',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'Actualización del Sistema',
    message: 'Nueva versión disponible con mejoras de performance',
    time: 'Hace 2 días',
    icon: '🔄',
    color: '#8B5CF6',
    read: true,
  },
  {
    id: 'notif-6',
    type: 'task',
    title: 'Recordatorio de Tarea',
    message: 'Revisión de riego automático vence hoy',
    time: 'Hace 3 días',
    icon: '🔔',
    color: '#EC4899',
    read: true,
  },
  {
    id: 'notif-7',
    type: 'health',
    title: 'Alerta de Salud - Ganado',
    message: 'Bessie necesita vacunación. Registra: 2026-07-15',
    time: 'Hace 4 días',
    icon: '🐄',
    color: '#F59E0B',
    read: true,
  },
  {
    id: 'notif-8',
    type: 'production',
    title: 'Cosecha Registrada',
    message: 'Lote Alto: 250 sacos de maíz recolectados',
    time: 'Hace 5 días',
    icon: '🌾',
    color: '#52FF94',
    read: true,
  },
];

export default function NotificationsCenterScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'todas' | 'no-leidas' | 'alertas'>('todas');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;
  const alertCount = notifications.filter(n => n.type === 'alert').length;

  const filteredNotifications =
    filter === 'no-leidas'
      ? notifications.filter(n => !n.read)
      : filter === 'alertas'
      ? notifications.filter(n => n.type === 'alert')
      : notifications;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const renderNotification = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable
        style={[
          styles.notificationItem,
          !item.read && styles.notificationItemUnread,
        ]}
        onPress={() => handleMarkAsRead(item.id)}
      >
        <LinearGradient
          colors={
            !item.read
              ? ['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']
              : ['rgba(82,255,148,0.05)', 'rgba(82,255,148,0.02)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.notificationGradient}
        >
          <View style={styles.notificationIcon}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${item.color}20` },
              ]}
            >
              <Text style={styles.iconEmoji}>{item.icon}</Text>
            </View>
          </View>

          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text
                style={[
                  styles.notificationTitle,
                  !item.read && styles.notificationTitleUnread,
                ]}
              >
                {item.title}
              </Text>
              {!item.read && (
                <View style={styles.unreadDot} />
              )}
            </View>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>

          {!item.read && (
            <Pressable style={styles.markButton}>
              <Ionicons name="checkmark" size={16} color="#52FF94" />
            </Pressable>
          )}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Notificaciones</Text>
          {unreadCount > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.duration(400).delay(50)} style={styles.statsSection}>
          <View style={styles.statsRow}>
            <LinearGradient
              colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <Ionicons name="notifications" size={20} color="#52FF94" />
              <View style={{ gap: 2 }}>
                <Text style={styles.statLabel}>Total</Text>
                <Text style={styles.statValue}>{notifications.length}</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
              <View style={{ gap: 2 }}>
                <Text style={styles.statLabel}>No Leídas</Text>
                <Text style={styles.statValue}>{unreadCount}</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <Ionicons name="warning" size={20} color="#F59E0B" />
              <View style={{ gap: 2 }}>
                <Text style={styles.statLabel}>Alertas</Text>
                <Text style={styles.statValue}>{alertCount}</Text>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Filters */}
        <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.filtersSection}>
          {['todas', 'no-leidas', 'alertas'].map(f => (
            <Pressable
              key={f}
              style={[
                styles.filterChip,
                filter === f && styles.filterChipActive,
              ]}
              onPress={() => setFilter(f as any)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f === 'todas'
                  ? 'Todas'
                  : f === 'no-leidas'
                  ? 'No Leídas'
                  : 'Alertas'}
              </Text>
            </Pressable>
          ))}

          {unreadCount > 0 && (
            <Pressable
              style={styles.markAllButton}
              onPress={handleMarkAllAsRead}
            >
              <Text style={styles.markAllText}>Marcar todas</Text>
            </Pressable>
          )}
        </Animated.View>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>
              {filter === 'no-leidas'
                ? 'Sin notificaciones no leídas'
                : filter === 'alertas'
                ? 'Sin alertas'
                : 'Sin notificaciones'}
            </Text>
            <Text style={styles.emptyText}>
              {filter === 'no-leidas'
                ? 'Estás al día con todas las notificaciones'
                : '¡Todo en orden!'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredNotifications}
            renderItem={renderNotification}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.notificationsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, textAlign: 'center' },
  headerBadge: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center' },
  headerBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  statsSection: { paddingHorizontal: 16, paddingVertical: 12 },
  statsRow: { gap: 10, flexDirection: 'row' },
  statCard: { flex: 1, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 10, gap: 6 },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  statValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  filtersSection: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)', backgroundColor: 'rgba(82,255,148,0.05)' },
  filterChipActive: { borderColor: '#52FF94', backgroundColor: 'rgba(82,255,148,0.2)' },
  filterText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  filterTextActive: { color: '#52FF94' },
  markAllButton: { marginLeft: 'auto', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.1)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)' },
  markAllText: { fontSize: 11, fontWeight: '600', color: '#52FF94' },
  notificationsList: { paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  notificationItem: { borderRadius: 12, overflow: 'hidden' },
  notificationItemUnread: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.3)' },
  notificationGradient: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  notificationIcon: { paddingTop: 2 },
  iconContainer: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  iconEmoji: { fontSize: 20 },
  notificationContent: { flex: 1, gap: 4 },
  notificationHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notificationTitle: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.8)' },
  notificationTitleUnread: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#52FF94' },
  notificationMessage: { fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 14 },
  notificationTime: { fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: '500' },
  markButton: { width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.1)', justifyContent: 'center', alignItems: 'center' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' },
  emptyText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
});
