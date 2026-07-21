import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { BottomTabInset } from '@/constants/theme';

const HEADER_BAR = true; // Enable professional header

const ACTIVITIES = [
  {
    id: 1,
    date: '12 Jun 2026',
    title: 'Fertilización',
    type: 'fertilizacion',
    icon: '🌱',
    lot: 'Lote Alto',
    cost: 120000,
    status: 'completada',
    description: 'Aplicación de fertilizante orgánico',
  },
  {
    id: 2,
    date: '03 Jun 2026',
    title: 'Limpieza de Maleza',
    type: 'limpieza',
    icon: '🧹',
    lot: 'Lote Bajo',
    cost: 90000,
    status: 'completada',
    description: 'Control manual de maleza',
  },
  {
    id: 3,
    date: '29 May 2026',
    title: 'Poda',
    type: 'poda',
    icon: '✂️',
    lot: 'Lote Cafetal',
    cost: 45000,
    status: 'completada',
    description: 'Poda de mantenimiento',
  },
  {
    id: 4,
    date: '18 May 2026',
    title: 'Cosecha',
    type: 'cosecha',
    icon: '🌾',
    lot: 'Lote Alto',
    cost: 180000,
    status: 'completada',
    description: 'Cosecha de producto',
  },
  {
    id: 5,
    date: '10 May 2026',
    title: 'Riego',
    type: 'riego',
    icon: '💧',
    lot: 'Lote Bajo',
    cost: 35000,
    status: 'completada',
    description: 'Riego por goteo',
  },
];

const ACTIVITY_COLORS: Record<string, { color: string; bgColor: string }> = {
  fertilizacion: { color: '#52FF94', bgColor: 'rgba(82,255,148,0.15)' },
  limpieza: { color: '#3B82F6', bgColor: 'rgba(59,182,246,0.15)' },
  poda: { color: '#F59E0B', bgColor: 'rgba(245,158,11,0.15)' },
  cosecha: { color: '#10B981', bgColor: 'rgba(16,185,129,0.15)' },
  riego: { color: '#06B6D4', bgColor: 'rgba(6,182,212,0.15)' },
};

export default function ActivitiesScreen() {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 380;

  const totalCost = ACTIVITIES.reduce((sum, a) => sum + a.cost, 0);
  const totalActivities = ACTIVITIES.length;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SafeAreaView style={styles.safeArea}>
        {/* PROFESSIONAL HEADER BAR */}
        {HEADER_BAR && (
          <Animated.View entering={FadeInDown.duration(400)} style={styles.headerTopBar}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#52FF94" />
            </Pressable>
            <View style={styles.headerTitleBox}>
              <Text style={styles.headerTopTitle}>Actividades</Text>
              <Text style={styles.headerTopSubtitle}>Historial de labores</Text>
            </View>
            <Pressable onPress={() => router.push('/activity-select')} style={styles.actionButtonTop}>
              <Ionicons name="add-circle" size={24} color="#52FF94" />
            </Pressable>
          </Animated.View>
        )}

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: isSmallDevice ? 12 : 16 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <Animated.View entering={FadeInDown.duration(500).delay(50)} style={styles.headerSection}>
            <LinearGradient
              colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGradient}
            >
              <View style={styles.headerContent}>
                <View>
                  <Text style={styles.headerTitle}>Actividades</Text>
                  <Text style={styles.headerSubtitle}>Historial y registro de labores</Text>
                </View>
                <Pressable onPress={() => router.push('/activity-select')} style={styles.addButton}>
                  <Ionicons name="add-circle" size={28} color="#52FF94" />
                </Pressable>
              </View>

              {/* STATS */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>📊</Text>
                  <View>
                    <Text style={styles.statValue}>{totalActivities}</Text>
                    <Text style={styles.statLabel}>Actividades</Text>
                  </View>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>💰</Text>
                  <View>
                    <Text style={styles.statValue}>${(totalCost / 1000).toFixed(0)}k</Text>
                    <Text style={styles.statLabel}>Costo Total</Text>
                  </View>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>✅</Text>
                  <View>
                    <Text style={styles.statValue}>100%</Text>
                    <Text style={styles.statLabel}>Completadas</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* SECTION TITLE */}
          <Animated.View entering={FadeInDown.duration(500).delay(50)}>
            <Text style={styles.sectionTitle}>📋 Historial Reciente</Text>
          </Animated.View>

          {/* ACTIVITIES LIST */}
          <View style={styles.activitiesList}>
            {ACTIVITIES.map((activity, index) => {
              const activityColor = ACTIVITY_COLORS[activity.type] || ACTIVITY_COLORS.fertilizacion;

              return (
                <Animated.View
                  key={activity.id}
                  entering={FadeInDown.duration(400).delay((index + 1) * 50)}
                >
                  <Pressable
                    style={styles.activityCard}
                    onPress={() => router.push(`/activity-detail?id=${activity.id}`)}
                  >
                    {/* LEFT: TIMELINE */}
                    <View style={styles.timeline}>
                      <View
                        style={[
                          styles.timelineIcon,
                          { backgroundColor: activityColor.bgColor },
                        ]}
                      >
                        <Text style={styles.timelineEmoji}>{activity.icon}</Text>
                      </View>
                      {index !== ACTIVITIES.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>

                    {/* MIDDLE: CONTENT */}
                    <View style={styles.cardContent}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{activity.title}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: activityColor.bgColor }]}>
                          <Ionicons name="checkmark-circle" size={14} color={activityColor.color} />
                          <Text style={[styles.statusText, { color: activityColor.color }]}>
                            Completada
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.cardDescription}>{activity.description}</Text>

                      <View style={styles.cardMeta}>
                        <View style={styles.metaItem}>
                          <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.5)" />
                          <Text style={styles.metaText}>{activity.lot}</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.metaItem}>
                          <Ionicons name="calendar-outline" size={12} color="rgba(255,255,255,0.5)" />
                          <Text style={styles.metaText}>{activity.date}</Text>
                        </View>
                      </View>
                    </View>

                    {/* RIGHT: COST */}
                    <View style={styles.costSection}>
                      <Text style={[styles.costAmount, { color: activityColor.color }]}>
                        ${(activity.cost / 1000).toFixed(0)}k
                      </Text>
                      <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.3)" />
                    </View>
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>

          {/* QUICK ACTIONS */}
          <Animated.View entering={FadeInDown.duration(500).delay(350)} style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>⚡ Acciones Rápidas</Text>

            <View style={styles.actionsGrid}>
              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/activity-select')}
              >
                <LinearGradient
                  colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionCardGradient}
                >
                  <Ionicons name="add-outline" size={24} color="#52FF94" />
                  <Text style={styles.actionCardText}>Nueva Actividad</Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/lots-list')}
              >
                <LinearGradient
                  colors={['rgba(59,182,246,0.15)', 'rgba(59,182,246,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionCardGradient}
                >
                  <Ionicons name="grid-outline" size={24} color="#3B82F6" />
                  <Text style={styles.actionCardText}>Ver Lotes</Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/activity-register')}
              >
                <LinearGradient
                  colors={['rgba(236,72,153,0.15)', 'rgba(236,72,153,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionCardGradient}
                >
                  <Ionicons name="checkmark-done" size={24} color="#EC4899" />
                  <Text style={styles.actionCardText}>Registrar</Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/(tabs)/index')}
              >
                <LinearGradient
                  colors={['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionCardGradient}
                >
                  <Ionicons name="home-outline" size={24} color="#F59E0B" />
                  <Text style={styles.actionCardText}>Ir a Home</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </Animated.View>

          <View style={{ height: BottomTabInset + 24 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020403' },
  safeArea: { flex: 1 },
  scrollContent: { paddingVertical: 16 },

  glowTop: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  glowBottom: {
    position: 'absolute',
    bottom: -200,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  /* PROFESSIONAL HEADER BAR */
  headerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    gap: 12,
  },
  backButton: { padding: 4 },
  headerTitleBox: { flex: 1, gap: 2 },
  headerTopTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerTopSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  actionButtonTop: { padding: 4 },

  /* HEADER */
  headerSection: { marginBottom: 24 },
  headerGradient: { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, gap: 14 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  addButton: { padding: 4 },

  /* STATS */
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: 13, fontWeight: '800', color: '#52FF94' },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 1 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(82,255,148,0.2)' },

  /* SECTION TITLE */
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, marginTop: 4 },

  /* ACTIVITIES LIST */
  activitiesList: { gap: 12 },
  activityCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(82,255,148,0.03)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)' },

  timeline: { alignItems: 'center', width: 48 },
  timelineIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  timelineEmoji: { fontSize: 18 },
  timelineLine: { width: 2, height: 60, backgroundColor: 'rgba(82,255,148,0.2)', marginTop: 8 },

  cardContent: { flex: 1, gap: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#FFFFFF', flex: 1 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 9, fontWeight: '600' },
  cardDescription: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 10, color: 'rgba(255,255,255,0.5)' },
  metaDivider: { width: 1, height: 14, backgroundColor: 'rgba(255,255,255,0.1)' },

  costSection: { alignItems: 'flex-end', justifyContent: 'flex-start', gap: 4 },
  costAmount: { fontSize: 13, fontWeight: '800' },

  /* QUICK ACTIONS */
  quickActionsSection: { marginTop: 24 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { width: '48%', borderRadius: 12, overflow: 'hidden', minHeight: 100 },
  actionCardGradient: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14, justifyContent: 'center', alignItems: 'center', gap: 8 },
  actionCardText: { fontSize: 11, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
});
