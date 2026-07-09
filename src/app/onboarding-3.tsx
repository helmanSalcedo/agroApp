import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen } from '@/components/agro-screen';
import { PrimaryAction } from '@/components/primary-action';
import { Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

export default function OnboardingThreeScreen() {
  const { completeOnboarding } = useAuth();

  const onSkip = async () => {
    await completeOnboarding();
    router.push('/login');
  };

  const onStart = async () => {
    await completeOnboarding();
    router.push('/register');
  };

  return (
    <AgroScreen scroll={false} contentContainerStyle={styles.safeArea}>
        <Pressable style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>Saltar</Text>
        </Pressable>

        <View style={styles.illustrationWrap}>
          <IllustrationChart />
        </View>
        <Text style={styles.title}>Recomendaciones inteligentes</Text>
        <Text style={styles.body}>
          Alertas, produccion estimada y rentabilidad por lote en tiempo real.
        </Text>

        <View style={styles.kpiRow}>
          <KpiBadge value="+25%" label="Produccion" />
          <KpiBadge value="-12%" label="Gastos" />
          <KpiBadge value="91%" label="Precision" />
        </View>

        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        <PrimaryAction label="Comenzar" style={styles.nextButton} onPress={onStart} />
    </AgroScreen>
  );
}

function KpiBadge({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.kpiBadge}>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </View>
  );
}

function IllustrationChart() {
  const bars = [
    { height: 40, color: '#A5D6A7' },
    { height: 65, color: '#66BB6A' },
    { height: 55, color: '#A5D6A7' },
    { height: 90, color: '#2E7D32' },
    { height: 70, color: '#66BB6A' },
    { height: 80, color: '#4CAF50' },
  ];

  return (
    <View style={ill.wrap}>
      <View style={ill.card}>
        <Text style={ill.cardLabel}>Produccion</Text>
        <Text style={ill.cardValue}>120 arrobas</Text>
        <View style={ill.barsRow}>
          {bars.map((b, i) => (
            <View key={i} style={[ill.bar, { height: b.height, backgroundColor: b.color }]} />
          ))}
        </View>
        <View style={ill.progressRow}>
          <View style={ill.progressTrack}>
            <View style={ill.progressFill} />
          </View>
          <Text style={ill.pct}>91%</Text>
        </View>
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
    width: 160,
    height: 160,
    backgroundColor: 'rgba(11,25,18,0.9)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    gap: 6,
  },
  cardLabel: { color: 'rgba(255,255,255,0.62)', fontSize: 11, fontWeight: '600' },
  cardValue: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 60,
    marginTop: 4,
  },
  bar: {
    flex: 1,
    borderRadius: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    width: '91%',
    height: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 4,
  },
  pct: { color: '#52FF94', fontSize: 11, fontWeight: '700' },
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
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
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
  kpiRow: {
    flexDirection: 'row',
    gap: 8,
  },
  kpiBadge: {
    minWidth: 84,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Radius.md,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  kpiValue: {
    color: '#52FF94',
    fontSize: 15,
    fontWeight: '800',
  },
  kpiLabel: {
    marginTop: 2,
    color: 'rgba(255,255,255,0.62)',
    fontSize: 11,
    fontWeight: '600',
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
