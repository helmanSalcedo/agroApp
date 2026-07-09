import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen } from '@/components/agro-screen';
import { PrimaryAction } from '@/components/primary-action';
import { Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

export default function OnboardingOneScreen() {
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
          <IllustrationFarm />
        </View>
        <Text style={styles.title}>Organiza tus fincas de manera facil</Text>
        <Text style={styles.body}>
          Lleva lotes, produccion y gastos en una vista clara y rapida.
        </Text>

        <View style={styles.featureRow}>
          <FeatureChip label="Lotes" />
          <FeatureChip label="Produccion" />
          <FeatureChip label="Gastos" />
        </View>

        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <PrimaryAction label="Siguiente" style={styles.nextButton} onPress={() => router.push('/onboarding-2')} />
    </AgroScreen>
  );
}

function FeatureChip({ label }: { label: string }) {
  return (
    <View style={styles.featureChip}>
      <Text style={styles.featureChipText}>{label}</Text>
    </View>
  );
}

function IllustrationFarm() {
  return (
    <View style={ill.wrap}>
      <View style={ill.sky} />
      <View style={ill.house} />
      <View style={ill.roof} />
      <View style={ill.door} />
      <View style={ill.treeTrunk} />
      <View style={ill.treeTop} />
      <View style={ill.hill} />
      <View style={ill.badge}>
        <Text style={ill.badgeText}>🌿</Text>
      </View>
    </View>
  );
}

const ill = StyleSheet.create({
  wrap: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(82,255,148,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.12)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sky: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 110,
    backgroundColor: '#C8E6BA',
  },
  hill: {
    position: 'absolute',
    bottom: 0, left: -20, right: -20,
    height: 80,
    borderRadius: 999,
    backgroundColor: '#7BC67A',
  },
  house: {
    position: 'absolute',
    bottom: 54,
    left: 70,
    width: 80,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 4,
  },
  roof: {
    position: 'absolute',
    bottom: 108,
    left: 62,
    width: 0,
    height: 0,
    borderLeftWidth: 48,
    borderRightWidth: 48,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4CAF50',
  },
  door: {
    position: 'absolute',
    bottom: 54,
    left: 100,
    width: 20,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#A5D6A7',
  },
  treeTrunk: {
    position: 'absolute',
    bottom: 54,
    left: 42,
    width: 10,
    height: 30,
    backgroundColor: '#8D6E63',
  },
  treeTop: {
    position: 'absolute',
    bottom: 80,
    left: 30,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2E7D32',
  },
  badge: {
    position: 'absolute',
    top: 14, right: 22,
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11,25,18,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 20 },
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
    borderRadius: 120,
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
  featureChip: {
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.18)',
    backgroundColor: 'rgba(82,255,148,0.12)',
  },
  featureChipText: {
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
