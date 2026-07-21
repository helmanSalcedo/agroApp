import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { BottomTabInset } from '@/constants/theme';
import { useFarmContext } from '@/context/farm-context';
import { useLotContext } from '@/context/lot-context';

export default function FarmsScreen() {
  const { farms } = useFarmContext();
  const { lots } = useLotContext();
  const { width } = useWindowDimensions();

  const isSmallDevice = width < 380;
  const isTablet = width > 768;

  const totalHectares = farms.reduce((sum, farm) => sum + farm.totalArea, 0);
  const totalLots = lots.length;
  const activeLots = lots.filter(lot => lot.status === 'active').length;

  const handleGoBack = () => {
    router.back();
  };

  const FARM_COLORS = [
    { gradient: ['#0F766E', '#14B8A6'] as const, icon: '🌾' },
    { gradient: ['#7C3AED', '#A78BFA'] as const, icon: '🌱' },
    { gradient: ['#DC2626', '#EF4444'] as const, icon: '🌻' },
    { gradient: ['#EA580C', '#F97316'] as const, icon: '🌿' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: isSmallDevice ? 12 : 16 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <Animated.View entering={FadeInDown.duration(500)} style={styles.headerTopBar}>
            <Pressable onPress={handleGoBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#52FF94" />
            </Pressable>
            <View style={styles.headerTitleBox}>
              <Text style={styles.headerTopTitle}>Mis Fincas</Text>
              <Text style={styles.headerTopSubtitle}>Tu producción</Text>
            </View>
            <Pressable onPress={() => router.push('/financial-summary')} style={styles.infoButton}>
              <Ionicons name="bar-chart-outline" size={24} color="#52FF94" />
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(50)} style={styles.headerSection}>
            <LinearGradient
              colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGradient}
            >
              <View style={styles.headerContent}>
                <View>
                  <Text style={styles.headerTitle}>Estado General</Text>
                  <Text style={styles.headerSubtitle}>Resumen de tu producción</Text>
                </View>
                <Pressable onPress={() => router.push('/farm-create')} style={styles.headerButton}>
                  <Ionicons name="add-circle" size={28} color="#52FF94" />
                </Pressable>
              </View>

              {/* STATS */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>🏠</Text>
                  <View>
                    <Text style={styles.statValue}>{farms.length}</Text>
                    <Text style={styles.statLabel}>Fincas</Text>
                  </View>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>📊</Text>
                  <View>
                    <Text style={styles.statValue}>{totalLots}</Text>
                    <Text style={styles.statLabel}>Lotes</Text>
                  </View>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>🌍</Text>
                  <View>
                    <Text style={styles.statValue}>{totalHectares.toFixed(1)}</Text>
                    <Text style={styles.statLabel}>Hectáreas</Text>
                  </View>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>✅</Text>
                  <View>
                    <Text style={styles.statValue}>{activeLots}</Text>
                    <Text style={styles.statLabel}>Activos</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* SECTION TITLE */}
          <Animated.View entering={FadeInDown.duration(500).delay(50)}>
            <Text style={styles.sectionTitle}>📋 Tus Fincas</Text>
          </Animated.View>

          {/* FARMS GRID */}
          {farms.length > 0 ? (
            <View style={styles.farmsGrid}>
              {farms.map((farm, index) => {
                const farmLots = lots.filter(lot => lot.farmId === farm.id);
                const activeFarmLots = farmLots.filter(lot => lot.status === 'active');
                const colors = FARM_COLORS[index % FARM_COLORS.length];

                return (
                  <Animated.View
                    key={farm.id}
                    entering={FadeInDown.duration(500).delay((index + 1) * 100)}
                    style={[styles.farmCardContainer, { marginBottom: isSmallDevice ? 12 : 16 }]}
                  >
                    <Pressable
                      style={styles.farmCard}
                      onPress={() => router.push(`/farm-detail?id=${farm.id}`)}
                    >
                      {/* FARM HEADER GRADIENT */}
                      <LinearGradient
                        colors={colors.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.farmHeaderGradient}
                      >
                        <View style={styles.farmHeaderContent}>
                          <View style={styles.farmIconContainer}>
                            <Text style={styles.farmIcon}>{colors.icon}</Text>
                          </View>
                          <View style={styles.farmHeaderText}>
                            <Text style={styles.farmName} numberOfLines={1}>
                              {farm.name}
                            </Text>
                            <Text style={styles.farmLocation}>📍 {farm.location}</Text>
                          </View>
                          <View style={styles.farmStatus}>
                            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                          </View>
                        </View>
                      </LinearGradient>

                      {/* FARM INFO - 3 COLUMNS */}
                      <View style={styles.farmInfoSection}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoIcon}>📊</Text>
                          <Text style={styles.infoValue}>{farmLots.length}</Text>
                          <Text style={styles.infoLabel}>Lotes</Text>
                        </View>
                        <View style={styles.infoDivider} />
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoIcon}>🌍</Text>
                          <Text style={styles.infoValue}>{farm.totalArea.toFixed(1)}</Text>
                          <Text style={styles.infoLabel}>Hectáreas</Text>
                        </View>
                        <View style={styles.infoDivider} />
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoIcon}>✅</Text>
                          <Text style={styles.infoValue}>{activeFarmLots.length}</Text>
                          <Text style={styles.infoLabel}>Activos</Text>
                        </View>
                      </View>

                      {/* PROGRESS BAR */}
                      <View style={styles.farmProgressSection}>
                        <View style={styles.progressHeader}>
                          <Text style={styles.progressLabel}>Lotes activos: {activeFarmLots.length}/{farmLots.length}</Text>
                          <Text style={styles.progressPercent}>
                            {farmLots.length > 0 ? `${Math.round((activeFarmLots.length / farmLots.length) * 100)}%` : '0%'}
                          </Text>
                        </View>
                        <View style={styles.progressBar}>
                          <View
                            style={[
                              styles.progressFill,
                              {
                                width: farmLots.length > 0 ? `${(activeFarmLots.length / farmLots.length) * 100}%` : '0%',
                                backgroundColor: colors.gradient[0],
                              },
                            ]}
                          />
                        </View>
                      </View>

                      {/* ACTION BUTTON */}
                      <Pressable style={styles.farmActionButton}>
                        <Text style={styles.farmActionText}>Ver detalles</Text>
                        <Ionicons name="arrow-forward" size={16} color="#52FF94" />
                      </Pressable>
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>
          ) : (
            /* EMPTY STATE */
            <Animated.View entering={FadeInDown.duration(500).delay(100)} style={styles.emptyState}>
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>🌾</Text>
                <Text style={styles.emptyTitle}>Sin fincas registradas</Text>
                <Text style={styles.emptyText}>Crea tu primera finca para comenzar a gestionar tu producción</Text>
                <Pressable
                  style={styles.emptyButton}
                  onPress={() => router.push('/farm-create')}
                >
                  <LinearGradient
                    colors={['#52FF94', '#22C55E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.emptyButtonGradient}
                  >
                    <Ionicons name="add-circle" size={20} color="#020403" />
                    <Text style={styles.emptyButtonText}>Crear Finca</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </Animated.View>
          )}

          {/* QUICK ACTIONS */}
          {farms.length > 0 && (
            <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.quickActionsSection}>
              <Text style={styles.sectionTitle}>⚡ Acciones Rápidas</Text>

              <View style={styles.actionsGrid}>
                <Pressable
                  style={styles.actionCard}
                  onPress={() => router.push('/lots-list')}
                >
                  <LinearGradient
                    colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionCardGradient}
                  >
                    <Ionicons name="grid-outline" size={24} color="#52FF94" />
                    <Text style={styles.actionCardText}>Ver Lotes</Text>
                  </LinearGradient>
                </Pressable>

                <Pressable
                  style={styles.actionCard}
                  onPress={() => router.push('/farm-create')}
                >
                  <LinearGradient
                    colors={['rgba(59,182,246,0.15)', 'rgba(59,182,246,0.08)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionCardGradient}
                  >
                    <Ionicons name="add-outline" size={24} color="#3B82F6" />
                    <Text style={styles.actionCardText}>Nueva Finca</Text>
                  </LinearGradient>
                </Pressable>

                <Pressable
                  style={styles.actionCard}
                  onPress={() => router.push('/activity-select')}
                >
                  <LinearGradient
                    colors={['rgba(236,72,153,0.15)', 'rgba(236,72,153,0.08)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionCardGradient}
                  >
                    <Ionicons name="leaf-outline" size={24} color="#EC4899" />
                    <Text style={styles.actionCardText}>Actividad</Text>
                  </LinearGradient>
                </Pressable>

                <Pressable
                  style={styles.actionCard}
                  onPress={() => router.push('/expense-select')}
                >
                  <LinearGradient
                    colors={['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.08)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionCardGradient}
                  >
                    <Ionicons name="wallet-outline" size={24} color="#F59E0B" />
                    <Text style={styles.actionCardText}>Gasto</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </Animated.View>
          )}

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

  /* TOP HEADER */
  headerTopBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)', marginBottom: 16 },
  backButton: { padding: 8 },
  headerTitleBox: { flex: 1, alignItems: 'center', gap: 2 },
  headerTopTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerTopSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  infoButton: { padding: 8 },

  /* HEADER */
  headerSection: { marginBottom: 24 },
  headerGradient: { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, gap: 14 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  headerButton: { padding: 4 },

  /* STATS */
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: 13, fontWeight: '800', color: '#52FF94' },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 1 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(82,255,148,0.2)' },

  /* SECTION TITLE */
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, marginTop: 4 },

  /* FARMS GRID */
  farmsGrid: { gap: 0 },
  farmCardContainer: {},
  farmCard: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' },

  /* FARM HEADER GRADIENT */
  farmHeaderGradient: { padding: 14, gap: 10 },
  farmHeaderContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  farmIconContainer: { width: 48, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)' },
  farmIcon: { fontSize: 24 },
  farmHeaderText: { flex: 1, gap: 3 },
  farmName: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', lineHeight: 16 },
  farmLocation: { fontSize: 11, color: 'rgba(255,255,255,0.85)' },
  farmStatus: { paddingTop: 2 },

  /* FARM INFO SECTION */
  farmInfoSection: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14, backgroundColor: 'rgba(0,0,0,0.2)', gap: 0 },
  infoColumn: { flex: 1, alignItems: 'center', gap: 3 },
  infoIcon: { fontSize: 18 },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#52FF94' },
  infoLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  infoDivider: { width: 1, height: 28, backgroundColor: 'rgba(82,255,148,0.2)' },

  /* FARM PROGRESS */
  farmProgressSection: { paddingVertical: 12, paddingHorizontal: 14, gap: 6, backgroundColor: 'rgba(82,255,148,0.04)' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.7)' },
  progressPercent: { fontSize: 10, fontWeight: '700', color: '#52FF94' },
  progressBar: { width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(82,255,148,0.15)', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },

  /* FARM ACTION */
  farmActionButton: { paddingVertical: 10, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: 'rgba(82,255,148,0.08)', borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  farmActionText: { fontSize: 12, fontWeight: '600', color: '#52FF94' },

  /* EMPTY STATE */
  emptyState: { justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
  emptyBox: { alignItems: 'center', gap: 12 },
  emptyIcon: { fontSize: 64, marginBottom: 8 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  emptyText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: 280, lineHeight: 18 },
  emptyButton: { borderRadius: 12, overflow: 'hidden', marginTop: 12 },
  emptyButtonGradient: { paddingVertical: 12, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 8 },
  emptyButtonText: { color: '#020403', fontWeight: '700', fontSize: 14 },

  /* QUICK ACTIONS */
  quickActionsSection: { marginTop: 24 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { width: '48%', borderRadius: 12, overflow: 'hidden', minHeight: 100 },
  actionCardGradient: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14, justifyContent: 'center', alignItems: 'center', gap: 8 },
  actionCardText: { fontSize: 11, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
});
