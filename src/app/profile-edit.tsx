import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Spacing } from '@/constants/theme';

export default function ProfileEditScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Editar perfil" subtitle="Actualiza tus datos personales y de contacto." />

      <View style={[AgroSurface.cardStrong, styles.formCard]}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>JP</Text>
          </View>
        </View>
        <TextInput style={styles.input} defaultValue="Juan Perez" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} defaultValue="300 123 4567" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} defaultValue="juan@gmail.com" placeholderTextColor="rgba(255,255,255,0.4)" />

        <PrimaryAction label="Guardar perfil" onPress={() => router.back()} />
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  formCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(82,255,148,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#52FF94',
    fontSize: 24,
    fontWeight: '800',
  },
  input: AgroSurface.input,
});
