import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen } from '@/components/agro-screen';
import { PrimaryAction } from '@/components/primary-action';
import { Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

export default function OnboardingTwoScreen() {
  const { completeOnboarding } = useAuth();

  const onSkip = async () => {
    await completeOnboarding();
    router.push('/login');
  };

  return (
    <AgroScreen scroll={false} contentContainerStyle={styles.safeArea}>
        <Pressable style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>Saltar</Text>
        </Pressable>

        <View style={styles.illustrationWrap}>
          <IllustrationClipboard />
        </View>
        <Text style={styles.title}>Registra tus actividades facilmente</Text>
        <Text style={styles.body}>
          Guarda fertilizacion, poda, limpieza y costos en segundos.
        </Text>

        <View style={styles.featureRow}>
          <FeaturePill label="Fertilizacion" />
          <FeaturePill label="Poda" />
          <FeaturePill label="Limpieza" />
          <FeaturePill label="Cosecha" />
        </View>

        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        <PrimaryAction label="Siguiente" style={styles.nextButton} onPress={() => router.push('/onboarding-3')} />
    </AgroScreen>
  );
}

function FeaturePill({ label }: { label: string }) {
  return (
    <View style={styles.featurePill}>
      <Text style={styles.featurePillText}>{label}</Text>
    </View>
  );
}

function IllustrationClipboard() {
  return (
    <View style={ill.wrap}>
      <View style={ill.card}>
        <View style={ill.clip} />
        <View style={[ill.line, { width: '80%', marginTop: 30 }]} />
        <View style={[ill.line, { width: '65%' }]} />
        <View style={[ill.line, { width: '75%' }]} />
        <View style={[ill.line, { width: '55%' }]} />
        <View style={ill.checkRow}>
          <View style={ill.checkDot} />
          <View style={[ill.line, { width: 60, marginTop: 0 }]} />
        </View>
        <View style={ill.checkRow}>
          <View style={[ill.checkDot, { backgroundColor: '#4CAF50' }]} />
          <View style={[ill.line, { width: 70, marginTop: 0, backgroundColor: '#4CAF50' }]} />
        </View>
      </View>
      <View style={ill.badge}>
        <Text style={ill.badgeText}>✓</Text>
      </View>
    </View>
  );
}

const ill = StyleSheet.create({
  wrap: {
    width: 220,
    height: 220,
    borderRadius: 28,
    backgroundColor: 'rgba(82,255,148,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 130,
    height: 160,
    backgroundColor: 'rgba(11,25,18,0.9)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 14,
    gap: 10,
    alignItems: 'flex-start',
  },
  clip: {
    alignSelf: 'center',
    width: 40,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#52FF94',
    marginBottom: 4,
  },
  line: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginTop: 6,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  checkDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(82,255,148,0.45)',
  },
  badge: {
    position: 'absolute',
    bottom: 22, right: 22,
    width: 42, height: 42,
    borderRadius: 21,
    backgroundColor: '#52FF94',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#041109', fontSize: 20, fontWeight: '700' },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: Spacing.four,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: Spacing.one,
  },
  skipText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    fontWeight: '600',
  },
  illustrationWrap: {
    width: 240,
    height: 240,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '800',
    textAlign: 'center',
  },
  body: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  featurePill: {
    backgroundColor: 'rgba(82,255,148,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.18)',
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  featurePillText: {
    color: '#52FF94',
    fontSize: 12,
    fontWeight: '700',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  dotActive: {
    width: 18,
    borderRadius: 5,
    backgroundColor: '#52FF94',
  },
  nextButton: { width: '100%', maxWidth: 320 },
});
