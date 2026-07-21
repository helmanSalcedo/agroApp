import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { BottomTabInset } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useFarmContext } from '@/context/farm-context';
import { useLotContext } from '@/context/lot-context';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { farms } = useFarmContext();
  const { lots } = useLotContext();
  const { width } = useWindowDimensions();

  const isSmallDevice = width < 380;

  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'JP';

  const totalFarms = farms.length;
  const totalLots = lots.length;
  const activeLots = lots.filter(l => l.status === 'active').length;

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          onPress: async () => {
            await signOut();
            setTimeout(() => {
              router.replace('/welcome');
            }, 100);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: isSmallDevice ? 12 : 16 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* PROFILE HEADER */}
          <Animated.View entering={FadeInDown.duration(500)} style={styles.profileHeader}>
            <LinearGradient
              colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileGradient}
            >
              <View style={styles.profileTop}>
                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={['#52FF94', '#22C55E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.avatarGradient}
                  >
                    <Text style={styles.avatarText}>{initials}</Text>
                  </LinearGradient>
                </View>

                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{user?.name ?? 'Usuario AgroApp'}</Text>
                  <Text style={styles.profileEmail}>{user?.email ?? 'usuario@agroapp.com'}</Text>
                  <View style={styles.profileMeta}>
                    <Ionicons name="phone-portrait-outline" size={12} color="#52FF94" />
                    <Text style={styles.profilePhone}>{user?.phone ?? '300 123 4567'}</Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => router.push('/profile-edit')}
                  style={styles.editButton}
                >
                  <Ionicons name="pencil-outline" size={20} color="#52FF94" />
                </Pressable>
              </View>

              {/* STATS */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statIcon}>🏠</Text>
                  <View>
                    <Text style={styles.statValue}>{totalFarms}</Text>
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
                  <Text style={styles.statIcon}>✅</Text>
                  <View>
                    <Text style={styles.statValue}>{activeLots}</Text>
                    <Text style={styles.statLabel}>Activos</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* SETTINGS SECTION */}
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <Text style={styles.sectionTitle}>⚙️ Configuración</Text>

            <View style={styles.settingsContainer}>
              {/* EDIT PROFILE */}
              <Pressable
                style={styles.settingItem}
                onPress={() => router.push('/profile-edit')}
              >
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(82,255,148,0.15)' }]}>
                  <Ionicons name="pencil-outline" size={20} color="#52FF94" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Editar Perfil</Text>
                  <Text style={styles.settingDesc}>Actualiza tu información personal</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.3)" />
              </Pressable>

              {/* PASSWORD */}
              <Pressable style={[styles.settingItem, styles.settingDisabled]}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(59,182,246,0.15)' }]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#3B82F6" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, styles.disabledText]}>Cambiar Contraseña</Text>
                  <Text style={styles.settingDesc}>Próximamente disponible</Text>
                </View>
                <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.2)" />
              </Pressable>

              {/* UNITS */}
              <Pressable style={[styles.settingItem, styles.settingDisabled]}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(245,158,11,0.15)' }]}>
                  <Ionicons name="calculator-outline" size={20} color="#F59E0B" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, styles.disabledText]}>Unidades de Medida</Text>
                  <Text style={styles.settingDesc}>Próximamente disponible</Text>
                </View>
                <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.2)" />
              </Pressable>

              {/* BACKUP */}
              <Pressable style={[styles.settingItem, styles.settingDisabled]}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(139,92,246,0.15)' }]}>
                  <Ionicons name="cloud-download-outline" size={20} color="#8B5CF6" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, styles.disabledText]}>Copia de Seguridad</Text>
                  <Text style={styles.settingDesc}>Próximamente disponible</Text>
                </View>
                <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.2)" />
              </Pressable>

              {/* LOGOUT */}
              <Pressable style={[styles.settingItem, styles.settingDanger]} onPress={handleLogout}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(239,68,68,0.15)' }]}>
                  <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, { color: '#EF4444' }]}>Cerrar Sesión</Text>
                  <Text style={styles.settingDesc}>Salir de tu cuenta</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#EF4444" />
              </Pressable>
            </View>
          </Animated.View>

          {/* ADVANCED SETTINGS */}
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <Text style={styles.sectionTitle}>🔧 Configuraciones Avanzadas</Text>

            <View style={styles.settingsContainer}>
              {/* QR MANAGEMENT */}
              <Pressable
                style={styles.settingItem}
                onPress={() => router.push('/qr-management')}
              >
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(82,255,148,0.15)' }]}>
                  <Ionicons name="qr-code-outline" size={20} color="#52FF94" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Gestión de QR</Text>
                  <Text style={styles.settingDesc}>Crear y gestionar códigos QR para acceso a fincas</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.3)" />
              </Pressable>

              {/* PERMISSIONS */}
              <Pressable
                style={styles.settingItem}
                onPress={() => router.push('/permissions-management')}
              >
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(59,182,246,0.15)' }]}>
                  <Ionicons name="shield-outline" size={20} color="#3B82F6" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Permisos de Usuarios</Text>
                  <Text style={styles.settingDesc}>Gestiona roles y permisos en tus fincas</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.3)" />
              </Pressable>

              {/* NOTIFICATIONS */}
              <Pressable style={[styles.settingItem, styles.settingDisabled]}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(245,158,11,0.15)' }]}>
                  <Ionicons name="notifications-outline" size={20} color="#F59E0B" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, styles.disabledText]}>Notificaciones</Text>
                  <Text style={styles.settingDesc}>Próximamente disponible</Text>
                </View>
                <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.2)" />
              </Pressable>

              {/* DATA & PRIVACY */}
              <Pressable style={[styles.settingItem, styles.settingDisabled]}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(139,92,246,0.15)' }]}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#8B5CF6" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, styles.disabledText]}>Privacidad y Datos</Text>
                  <Text style={styles.settingDesc}>Próximamente disponible</Text>
                </View>
                <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.2)" />
              </Pressable>
            </View>
          </Animated.View>

          {/* APP INFO SECTION */}
          <Animated.View entering={FadeInDown.duration(500).delay(250)}>
            <Text style={styles.sectionTitle}>ℹ️ Información</Text>

            <LinearGradient
              colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.infoCard}
            >
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Versión de la App</Text>
                <Text style={styles.infoValue}>1.0.0</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Desarrollado por</Text>
                <Text style={styles.infoValue}>AgroApp Team</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Categoría</Text>
                <Text style={styles.infoValue}>Gestión Agrícola</Text>
              </View>

              <Text style={styles.motto}>
                Gestión inteligente para tu finca. Conecta con expertos, optimiza tus costos, maximiza tus ganancias.
              </Text>
            </LinearGradient>
          </Animated.View>

          <View style={{ height: BottomTabInset + 24 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
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

  /* PROFILE HEADER */
  profileHeader: { marginBottom: 24 },
  profileGradient: { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, gap: 14 },

  profileTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  avatarContainer: { marginTop: 4 },
  avatarGradient: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 24, fontWeight: '800', color: '#020403' },

  profileInfo: { flex: 1, gap: 4 },
  profileName: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  profileEmail: { fontSize: 12, color: '#52FF94', fontWeight: '600' },
  profileMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  profilePhone: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },

  editButton: { padding: 6 },

  /* STATS */
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  statBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: 13, fontWeight: '800', color: '#52FF94' },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 1 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(82,255,148,0.2)' },

  /* SECTION TITLE */
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, marginTop: 4 },

  /* SETTINGS */
  settingsContainer: { gap: 10 },
  settingItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(82,255,148,0.03)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)' },
  settingDisabled: { backgroundColor: 'rgba(82,255,148,0.02)', borderColor: 'rgba(82,255,148,0.05)' },
  settingDanger: { backgroundColor: 'rgba(239,68,68,0.03)', borderColor: 'rgba(239,68,68,0.1)' },

  settingIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  settingContent: { flex: 1, gap: 2 },
  settingTitle: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  disabledText: { color: 'rgba(255,255,255,0.5)' },
  settingDesc: { fontSize: 11, color: 'rgba(255,255,255,0.5)' },

  /* INFO */
  infoCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14, gap: 12 },
  infoItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  infoLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  infoValue: { fontSize: 13, fontWeight: '700', color: '#52FF94' },
  infoDivider: { height: 1, backgroundColor: 'rgba(82,255,148,0.1)' },
  motto: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, lineHeight: 16, textAlign: 'center' },

  /* QUICK ACTIONS */
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { width: '48%', borderRadius: 12, overflow: 'hidden', minHeight: 100 },
  actionCardGradient: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14, justifyContent: 'center', alignItems: 'center', gap: 8 },
  actionCardText: { fontSize: 11, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
});
