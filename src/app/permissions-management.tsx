import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const FINCAS_WITH_MEMBERS = [
  {
    id: 1,
    name: 'Finca El Porvenir',
    members: [
      { id: 1, name: 'Juan Pérez', role: 'Administrador', email: 'juan@agroapp.com', joinDate: '01 Ene 2026' },
      { id: 2, name: 'María López', role: 'Editor', email: 'maria@agroapp.com', joinDate: '15 Feb 2026' },
      { id: 3, name: 'Carlos Ruiz', role: 'Visor', email: 'carlos@agroapp.com', joinDate: '20 Mar 2026' },
    ],
  },
  {
    id: 2,
    name: 'Finca La Victoria',
    members: [
      { id: 4, name: 'Juan Pérez', role: 'Administrador', email: 'juan@agroapp.com', joinDate: '01 Ene 2026' },
      { id: 5, name: 'Ana García', role: 'Editor', email: 'ana@agroapp.com', joinDate: '10 Apr 2026' },
    ],
  },
];

const ROLE_DESCRIPTIONS: Record<string, { icon: string; color: string; desc: string }> = {
  Administrador: { icon: 'shield-checkmark-outline', color: '#52FF94', desc: 'Control total' },
  Editor: { icon: 'pencil-outline', color: '#3B82F6', desc: 'Editar datos' },
  Visor: { icon: 'eye-outline', color: '#F59E0B', desc: 'Solo lectura' },
};

export default function PermissionsManagementScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />

      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Permisos de Usuarios</Text>
            <Text style={styles.headerSubtitle}>Gestiona roles y acceso</Text>
          </View>
          <Pressable>
            <Ionicons name="add-circle" size={28} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* ROLES INFO */}
          <Animated.View entering={FadeInDown.duration(400).delay(50)}>
            <Text style={styles.sectionTitle}>🔐 Tipos de Roles</Text>

            {Object.entries(ROLE_DESCRIPTIONS).map(([role, info], idx) => (
              <Animated.View
                key={role}
                entering={FadeInDown.duration(400).delay(100 + idx * 40)}
              >
                <View style={styles.roleCard}>
                  <LinearGradient
                    colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.roleGradient}
                  >
                    <View style={[styles.roleIcon, { backgroundColor: info.color + '20' }]}>
                      <Ionicons name={info.icon as any} size={20} color={info.color} />
                    </View>
                    <View style={styles.roleInfo}>
                      <Text style={styles.roleName}>{role}</Text>
                      <Text style={styles.roleDesc}>{info.desc}</Text>
                    </View>
                  </LinearGradient>
                </View>
              </Animated.View>
            ))}
          </Animated.View>

          {/* FINCAS Y MIEMBROS */}
          {FINCAS_WITH_MEMBERS.map((finca, fincaIdx) => (
            <Animated.View
              key={finca.id}
              entering={FadeInDown.duration(400).delay(300 + fincaIdx * 50)}
            >
              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>🏠 {finca.name}</Text>

              {finca.members.map((member, memberIdx) => {
                const roleInfo = ROLE_DESCRIPTIONS[member.role];
                return (
                  <Animated.View
                    key={member.id}
                    entering={FadeInDown.duration(400).delay(350 + memberIdx * 30)}
                  >
                    <View style={styles.memberCard}>
                      <LinearGradient
                        colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.memberGradient}
                      >
                        <View style={styles.memberInfo}>
                          <View style={styles.memberAvatar}>
                            <Text style={styles.avatarInitials}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.memberName}>{member.name}</Text>
                            <Text style={styles.memberEmail}>{member.email}</Text>
                            <Text style={styles.memberDate}>Unido: {member.joinDate}</Text>
                          </View>
                        </View>

                        <View style={styles.memberRole}>
                          <View style={[styles.roleBadge, { backgroundColor: roleInfo.color + '20' }]}>
                            <Ionicons name={roleInfo.icon as any} size={14} color={roleInfo.color} />
                            <Text style={[styles.roleBadgeText, { color: roleInfo.color }]}>
                              {member.role}
                            </Text>
                          </View>
                          <Pressable style={styles.moreButton}>
                            <Ionicons name="ellipsis-vertical" size={18} color="rgba(255,255,255,0.5)" />
                          </Pressable>
                        </View>
                      </LinearGradient>
                    </View>
                  </Animated.View>
                );
              })}
            </Animated.View>
          ))}

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollView: { flex: 1 },

  glowTop: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerContent: { flex: 1, alignItems: 'center', gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, marginLeft: 16, marginTop: 4 },

  roleCard: { marginHorizontal: 16, marginBottom: 10, borderRadius: 12, overflow: 'hidden' },
  roleGradient: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', padding: 12, flexDirection: 'row', gap: 12, alignItems: 'center' },
  roleIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  roleInfo: { flex: 1, gap: 2 },
  roleName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  roleDesc: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },

  memberCard: { marginHorizontal: 16, marginBottom: 10, borderRadius: 12, overflow: 'hidden' },
  memberGradient: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  memberInfo: { flexDirection: 'row', gap: 10, flex: 1 },
  memberAvatar: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.2)', justifyContent: 'center', alignItems: 'center' },
  avatarInitials: { fontSize: 13, fontWeight: '700', color: '#52FF94' },
  memberName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  memberEmail: { fontSize: 11, color: '#52FF94', fontWeight: '500', marginTop: 1 },
  memberDate: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 },

  memberRole: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, flexDirection: 'row', gap: 4, alignItems: 'center' },
  roleBadgeText: { fontSize: 10, fontWeight: '700' },
  moreButton: { padding: 6 },
});
