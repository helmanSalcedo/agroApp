import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useAuth } from '@/context/auth-context';
import { useFarmContext } from '@/context/farm-context';
import { useLotContext } from '@/context/lot-context';
import { useNotificationContext } from '@/context/notification-context';
import { QuickActionCard } from '@/components/quick-action-card';
import { BottomTabInset } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { farms } = useFarmContext();
  const { lots } = useLotContext();
  const { unreadCount } = useNotificationContext();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Valores responsive
  const isSmallDevice = width < 380;
  const isMediumDevice = width >= 380 && width < 430;
  const isTablet = width > 768;

  const greeting = getGreeting();
  const userName = user?.name?.split(' ')[0] || 'Usuario';
  const userFullName = user?.name || 'Usuario';
  const activeLots = lots?.filter(lot => lot.status === 'active').length || 0;
  const totalFarms = farms?.length || 0;

  if (totalFarms === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#020403', '#08120D']}
          style={StyleSheet.absoluteFill}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateEmoji}>🌾</Text>
            <Text style={styles.emptyStateTitle}>¡Bienvenido a AgroApp!</Text>
            <Text style={styles.emptyStateText}>
              Comienza creando tu primera finca para gestionar cultivos, costos y producción.
            </Text>
            <Pressable
              style={styles.emptyStateButton}
              onPress={() => router.push('/farm-create')}
            >
              <Text style={styles.emptyStateButtonText}>Crear Primera Finca</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#020403', '#08120D', '#10261A']}
        style={StyleSheet.absoluteFill}
      />

      <View pointerEvents="none" style={styles.glowTop} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,
            paddingTop: Math.max(insets.top + 12, 20),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Mejorado */}
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={[
            styles.headerContainer,
            {
              marginBottom: isSmallDevice ? 20 : isMediumDevice ? 24 : 28,
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              {/* Información del Usuario */}
              <View style={styles.userInfo}>
                <View
                  style={[
                    styles.userAvatar,
                    {
                      width: isSmallDevice ? 48 : 56,
                      height: isSmallDevice ? 48 : 56,
                      borderRadius: isSmallDevice ? 24 : 28,
                    },
                  ]}
                >
                  <Text style={{ fontSize: isSmallDevice ? 22 : 28 }}>👨‍🌾</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text
                    style={[
                      styles.greeting,
                      { fontSize: isSmallDevice ? 11 : 12 },
                    ]}
                  >
                    {greeting}
                  </Text>
                  <Text
                    style={[
                      styles.userName,
                      { fontSize: isSmallDevice ? 14 : 16, marginTop: 2 },
                    ]}
                    numberOfLines={1}
                  >
                    {userFullName}
                  </Text>
                  {!isSmallDevice && (
                    <Text style={[styles.userRole, { fontSize: 10 }]}>
                      Agricultor
                    </Text>
                  )}
                </View>
              </View>

              {/* Notificación */}
              <Pressable
                style={styles.notificationButton}
                onPress={() => router.push('/notifications-center')}
              >
                <View style={styles.bellIconContainer}>
                  <Ionicons
                    name="notifications"
                    size={isSmallDevice ? 20 : 24}
                    color="#52FF94"
                  />
                  {unreadCount > 0 && (
                    <View style={styles.notificationBadge}>
                      <Text style={styles.badgeText}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            </View>

            {/* Quick Stats */}
            <View style={styles.headerStats}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🌾</Text>
                <View>
                  <Text style={styles.statValue}>{totalFarms}</Text>
                  <Text style={styles.statLabel}>Fincas</Text>
                </View>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🌱</Text>
                <View>
                  <Text style={styles.statValue}>{activeLots}</Text>
                  <Text style={styles.statLabel}>Activos</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Dashboard Profesional Banner */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Pressable
            onPress={() => router.push('/professional-dashboard')}
            style={styles.dashboardBanner}
          >
            <LinearGradient
              colors={['rgba(82,255,148,0.2)', 'rgba(82,255,148,0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.dashboardGradient}
            >
              <View style={styles.dashboardContent}>
                <View>
                  <Text style={styles.dashboardTitle}>Dashboard Profesional</Text>
                  <Text style={styles.dashboardSubtitle}>KPIs, gráficos y métricas</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#52FF94" />
              </View>
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Dashboard - Estado de Fincas */}
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: isSmallDevice ? 14 : isMediumDevice ? 15 : 16,
                marginBottom: isSmallDevice ? 10 : 14,
              },
            ]}
          >
            📊 Estado de tus fincas
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.farmsScroll}
          >
            {farms.map((farm, index) => {
              const farmLots = lots.filter(lot => lot.farmId === farm.id);
              const activeLotCount = farmLots.filter(l => l.status === 'active').length;

              return (
                <Pressable
                  key={farm.id}
                  onPress={() => router.push(`/farm-detail?id=${farm.id}`)}
                  style={[
                    styles.farmCard,
                    {
                      width: isSmallDevice ? 250 : isMediumDevice ? 270 : 280,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={['#0F766E', '#14B8A6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.farmCardGradient}
                  >
                    <View style={styles.farmCardHeader}>
                      <Text style={styles.farmIcon}>🌾</Text>
                      <Text style={styles.farmName} numberOfLines={2}>
                        {farm.name}
                      </Text>
                    </View>

                    <View style={styles.farmCardStats}>
                      <View style={styles.farmStat}>
                        <Text style={styles.farmStatValue}>{farmLots.length}</Text>
                        <Text style={styles.farmStatLabel}>Lotes</Text>
                      </View>
                      <View style={styles.farmStatDivider} />
                      <View style={styles.farmStat}>
                        <Text style={styles.farmStatValue}>{activeLotCount}</Text>
                        <Text style={styles.farmStatLabel}>Activos</Text>
                      </View>
                      <View style={styles.farmStatDivider} />
                      <View style={styles.farmStat}>
                        <Text style={styles.farmStatValue}>{farm.totalArea.toFixed(1)}</Text>
                        <Text style={styles.farmStatLabel}>Ha</Text>
                      </View>
                    </View>

                    <View style={styles.farmCardFooter}>
                      <Text style={styles.farmLocation}>📍 {farm.location}</Text>
                    </View>
                  </LinearGradient>
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Módulos Disponibles - Expandido */}
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Text style={styles.sectionTitle}>📱 Todos los Módulos</Text>

          {/* Gestión de Finca */}
          <Text style={styles.subsectionTitle}>🌾 GESTIÓN DE FINCA</Text>
          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Ver Lotes" icon="grid-outline" color="#F59E0B" onPress={() => router.push('/lots-list')} delay={300} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Inventario" icon="layers-outline" color="#06B6D4" onPress={() => router.push('/inventory')} delay={350} />
            </View>
          </View>

          {/* Registros */}
          <Text style={styles.subsectionTitle}>📝 REGISTROS</Text>
          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Registrar Gasto" icon="wallet-outline" color="#FF6B6B" onPress={() => router.push('/expense-select')} delay={400} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Registrar Actividad" icon="leaf-outline" color="#52FF94" onPress={() => router.push('/activity-select')} delay={450} />
            </View>
          </View>

          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Registrar Venta" icon="cash-outline" color="#10B981" onPress={() => router.push('/sale-register')} delay={500} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Producción" icon="stats-chart-outline" color="#3B82F6" onPress={() => router.push('/production-dashboard')} delay={550} />
            </View>
          </View>

          {/* Planificación */}
          <Text style={styles.subsectionTitle}>📅 PLANIFICACIÓN</Text>
          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Calendario" icon="calendar-outline" color="#F59E0B" onPress={() => router.push('/calendar-view')} delay={600} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Tareas" icon="checkmark-done-outline" color="#06B6D4" onPress={() => router.push('/tasks-list')} delay={650} />
            </View>
          </View>

          {/* Producción Animal */}
          <Text style={styles.subsectionTitle}>🐄 PRODUCCIÓN ANIMAL</Text>
          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Ganado" icon="git-compare" color="#EC4899" onPress={() => router.push('/livestock')} delay={700} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Acuicultura" icon="water" color="#06B6D4" onPress={() => router.push('/aquaculture')} delay={750} />
            </View>
          </View>

          {/* Análisis y Reportes */}
          <Text style={styles.subsectionTitle}>📊 ANÁLISIS Y REPORTES</Text>
          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Analytics" icon="bar-chart-outline" color="#F59E0B" onPress={() => router.push('/analytics')} delay={800} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Dashboard Pro" icon="stats-chart-outline" color="#8B5CF6" onPress={() => router.push('/professional-dashboard')} delay={850} />
            </View>
          </View>

          {/* Marketplace y Transacciones */}
          <Text style={styles.subsectionTitle}>🛍️ MARKETPLACE</Text>
          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Marketplace" icon="storefront-outline" color="#EC4899" onPress={() => router.push('/marketplace')} delay={900} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Avisos" icon="notifications-outline" color="#3B82F6" onPress={() => router.push('/notifications-center')} delay={950} />
            </View>
          </View>

          {/* Red Profesional */}
          <Text style={styles.subsectionTitle}>👥 RED PROFESIONAL</Text>
          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Red de Expertos" icon="people-outline" color="#52FF94" onPress={() => router.push('/professionals-network')} delay={1000} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Registrarse" icon="person-add-outline" color="#06B6D4" onPress={() => router.push('/professionals-register')} delay={1050} />
            </View>
          </View>

          {/* Inteligencia Artificial */}
          <Text style={styles.subsectionTitle}>🤖 IA Y CONSEJOS</Text>
          <View style={styles.quickGridRow}>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="TIPS IA" icon="chatbubbles-outline" color="#8B5CF6" onPress={() => router.push('/ai-tips')} delay={1100} />
            </View>
            <View style={styles.quickGridColumn}>
              <QuickActionCard title="Notificaciones" icon="bell-outline" color="#FF9F43" onPress={() => router.push('/notifications-center')} delay={1150} />
            </View>
          </View>

        </Animated.View>

        {/* Alertas */}
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: isSmallDevice ? 14 : isMediumDevice ? 15 : 16,
                marginBottom: isSmallDevice ? 10 : 14,
              },
            ]}
          >
            ⏰ Tareas Pendientes
          </Text>

          <View style={styles.alertsContainer}>
            <Pressable style={styles.alertBox} onPress={() => router.push('/activity-register')}>
              <View style={[styles.alertIndicator, styles.alertInfoIndicator]} />
              <View style={styles.alertBoxContent}>
                <Text style={styles.alertBoxTitle}>Fertilización en Lote Alto</Text>
                <Text style={styles.alertBoxTime}>Hoy a las 2:00 PM</Text>
              </View>
              <Text style={styles.alertBoxIcon}>🌱</Text>
            </Pressable>

            <Pressable style={styles.alertBox} onPress={() => router.push('/activity-register')}>
              <View style={[styles.alertIndicator, styles.alertWarningIndicator]} />
              <View style={styles.alertBoxContent}>
                <Text style={styles.alertBoxTitle}>Control de maleza</Text>
                <Text style={styles.alertBoxTime}>Mañana por la mañana</Text>
              </View>
              <Text style={styles.alertBoxIcon}>🌿</Text>
            </Pressable>

            <Pressable style={styles.alertBox} onPress={() => router.push('/lots-list')}>
              <View style={[styles.alertIndicator, styles.alertDangerIndicator]} />
              <View style={styles.alertBoxContent}>
                <Text style={styles.alertBoxTitle}>Cosecha próxima en 5 días</Text>
                <Text style={styles.alertBoxTime}>Lote "Parcela Norte"</Text>
              </View>
              <Text style={styles.alertBoxIcon}>🌾</Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Spacer */}
        <View style={{ height: BottomTabInset + 24 }} />
      </ScrollView>
    </View>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días 👋';
  if (hour < 18) return 'Buenas tardes 👋';
  return 'Buenas noches 👋';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020403',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 12,
  },

  glowTop: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  /* Header */
  headerContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
  },

  headerGradient: {
    padding: 18,
    gap: 14,
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(82,255,148,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(82,255,148,0.3)',
  },

  avatarText: {
    fontSize: 28,
  },

  userDetails: {
    flex: 1,
  },

  greeting: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    fontWeight: '500',
  },

  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },

  userRole: {
    color: '#52FF94',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },

  notificationButton: {
    padding: 8,
  },

  bellIconContainer: {
    position: 'relative',
  },

  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#020403',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(82,255,148,0.1)',
  },

  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  statIcon: {
    fontSize: 18,
  },

  statValue: {
    color: '#52FF94',
    fontSize: 14,
    fontWeight: '700',
  },

  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    marginTop: 1,
  },

  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  /* Farms Dashboard */
  farmsScroll: {
    gap: 12,
    paddingBottom: 4,
  },

  farmCard: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 8,
  },

  farmCardGradient: {
    padding: 16,
    gap: 12,
  },

  farmCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  farmIcon: {
    fontSize: 28,
    marginTop: 2,
  },

  farmName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    lineHeight: 20,
  },

  farmCardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  farmStat: {
    alignItems: 'center',
    flex: 1,
  },

  farmStatValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  farmStatLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },

  farmStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  farmCardFooter: {
    paddingTop: 4,
  },

  farmLocation: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    fontWeight: '500',
  },

  /* Sections */
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
    marginTop: 8,
  },

  subsectionTitle: {
    color: '#52FF94',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 14,
    opacity: 0.9,
  },

  /* Quick Actions Grid - 2 Columns */
  quickGridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },

  quickGridColumn: {
    flex: 1,
  },

  /* Alerts */
  alertsContainer: {
    gap: 12,
    marginBottom: 12,
  },

  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 12,
  },

  alertIndicator: {
    width: 5,
    height: '100%',
    borderRadius: 2.5,
    position: 'absolute',
    left: 0,
  },

  alertInfoIndicator: {
    backgroundColor: '#3B82F6',
  },

  alertWarningIndicator: {
    backgroundColor: '#F59E0B',
  },

  alertDangerIndicator: {
    backgroundColor: '#EF4444',
  },

  alertBoxContent: {
    flex: 1,
    marginLeft: 8,
  },

  alertBoxTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },

  alertBoxTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '500',
  },

  alertBoxIcon: {
    fontSize: 20,
  },

  /* Empty State */
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },

  emptyStateEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },

  emptyStateTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },

  emptyStateText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },

  emptyStateButton: {
    backgroundColor: '#52FF94',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },

  emptyStateButtonText: {
    color: '#041109',
    fontWeight: '700',
    fontSize: 14,
  },

  /* Dashboard Banner */
  dashboardBanner: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 8,
  },

  dashboardGradient: {
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    padding: 16,
    borderRadius: 14,
  },

  dashboardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dashboardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#52FF94',
    marginBottom: 4,
  },

  dashboardSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
  },
});
