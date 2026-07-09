import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Radius, Spacing } from '@/constants/theme';

const TYPES = [
  { label: 'Fertilizacion', color: '#1F8A3D', bg: '#EEF7EB' },
  { label: 'Poda', color: '#2B9152', bg: '#EAF6EE' },
  { label: 'Limpieza', color: '#237C3D', bg: '#E8F4EA' },
  { label: 'Fumigacion', color: '#2D8650', bg: '#EBF5EF' },
  { label: 'Cosecha', color: '#1E8D49', bg: '#EAF8EF' },
  { label: 'Otra actividad', color: '#4A7C61', bg: '#ECF5F1' },
];

export default function ActivitySelectScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Seleccionar actividad" subtitle="Elige el tipo para continuar con el registro." />

      <LinearGradient colors={['rgba(82,255,148,0.22)', 'rgba(11,25,18,0.92)']} style={styles.heroCard}>
        <Text style={styles.heroTitle}>Registro rapido</Text>
        <Text style={styles.heroText}>Selecciona el tipo de actividad para completar el formulario.</Text>
      </LinearGradient>

      <View style={styles.grid}>
        {TYPES.map((item) => (
          <Pressable
            key={item.label}
            style={[styles.optionCard, { borderColor: item.color + '55', backgroundColor: 'rgba(255,255,255,0.04)' }]}
            onPress={() => router.push('/activity-register')}>
            <View style={[styles.optionDot, { backgroundColor: item.color }]} />
            <Text style={styles.optionText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  heroCard: {
    borderRadius: Radius.xl,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.14)',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  heroText: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    lineHeight: 18,
  },
  optionCard: {
    width: '48%',
    minHeight: 100,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
    gap: Spacing.one,
  },
  optionDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
