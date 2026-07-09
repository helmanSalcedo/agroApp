import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

const SETTINGS = [
  'Editar perfil',
  'Cambiar contrasena',
  'Unidades de medida',
  'Copia de seguridad',
  'Cerrar sesion',
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const onSettingPress = async (item: string) => {
    if (item === 'Editar perfil') {
      router.push('/profile-edit');
      return;
    }

    if (item === 'Cerrar sesion') {
      await signOut();
      router.replace('/login');
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'JP';

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.name}>{user?.name ?? 'Usuario AgroSaaS'}</Text>
            <Text style={styles.info}>{user?.phone ?? '300 123 4567'}</Text>
            <Text style={styles.info}>{user?.email ?? 'usuario@agrosaas.com'}</Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Configuracion</Text>
            {SETTINGS.map((item) => {
              const isEnabled = item === 'Editar perfil' || item === 'Cerrar sesion';

              return (
                <Pressable key={item} style={styles.settingRow} onPress={() => onSettingPress(item)} disabled={!isEnabled}>
                  <Text style={[styles.settingText, item === 'Cerrar sesion' && styles.logoutText]}>{item}</Text>
                  <Text style={[styles.settingArrow, item === 'Cerrar sesion' && styles.logoutText]}>›</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>Acerca de AgroSaaS</Text>
            <Text style={styles.aboutText}>
              Version 1.0.0 · Gestion simple e inteligente para fincas de cafe.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020403',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  headerCard: {
    marginTop: Spacing.two,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#DCE8D8',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: Spacing.four,
    alignItems: 'center',
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 'rgba(82,255,148,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#52FF94',
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    marginTop: 12,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  info: {
    marginTop: 2,
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
  },
  sectionCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#DCE8D8',
    backgroundColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  settingRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  settingArrow: {
    color: 'rgba(255,255,255,0.52)',
    fontSize: 16,
    fontWeight: '700',
  },
  logoutText: {
    color: '#B94949',
  },
  aboutCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#DCE8D8',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: Spacing.three,
  },
  aboutTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  aboutText: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
    lineHeight: 18,
  },
});
