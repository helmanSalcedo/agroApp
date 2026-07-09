import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { LandscapeHeroSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Spacing } from '@/constants/theme';

export default function FarmCreateScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Crear finca" subtitle="Registra los datos basicos de tu nueva finca." />

      <View style={[AgroSurface.cardStrong, styles.heroCard]}>
        <LandscapeHeroSvg height={132} />
        <View style={styles.heroMeta}>
          <Text style={styles.heroTitle}>Nueva finca</Text>
          <Text style={styles.heroText}>Agrega ubicacion, area total y datos base para iniciar.</Text>
        </View>
      </View>

      <View style={[AgroSurface.card, styles.formCard]}>
        <TextInput style={styles.input} placeholder="Nombre de la finca" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} placeholder="Departamento" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} placeholder="Municipio" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} placeholder="Vereda" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} placeholder="Area total (ha)" placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="decimal-pad" />

        <PrimaryAction label="Guardar finca" onPress={() => router.replace('/(tabs)/explore')} />
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    overflow: 'hidden',
  },
  heroMeta: {
    padding: Spacing.three,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  heroText: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.68)',
    fontSize: 13,
    lineHeight: 18,
  },
  formCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  input: AgroSurface.input,
});
