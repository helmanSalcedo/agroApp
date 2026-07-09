import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RingChartSvg, WeeklyBarsSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Radius, Spacing } from '@/constants/theme';

export default function LotDetailScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader
        title="Lote Alto"
        subtitle="Cafe Catio · 2.1 ha"
        rightLabel="Editar"
        onRightPress={() => router.push('./lot-edit')}
      />

      <View style={[AgroSurface.cardStrong, styles.summaryCard]}>
        <View style={styles.summaryTop}>
          <View>
            <Text style={styles.summaryTitle}>Produccion estimada anual</Text>
            <Text style={styles.summaryValue}>87 arrobas</Text>
          </View>
          <RingChartSvg pct={91} />
        </View>
        <WeeklyBarsSvg />
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressText}>91% de avance</Text>
      </View>

      <View style={[AgroSurface.card, styles.sectionCard]}>
        <Text style={styles.sectionTitle}>Acciones</Text>
        <Pressable style={styles.rowButton} onPress={() => router.push('/activity-register')}>
          <Text style={styles.rowButtonText}>Registrar actividad</Text>
        </Pressable>
        <Pressable style={styles.rowButton} onPress={() => router.push('/activity-detail')}>
          <Text style={styles.rowButtonText}>Ver ultima actividad</Text>
        </Pressable>
        <Pressable style={styles.rowButton} onPress={() => router.push('/calendar')}>
          <Text style={styles.rowButtonText}>Abrir calendario</Text>
        </Pressable>
        <PrimaryAction label="Produccion por lote" onPress={() => router.push('./production-lot')} style={styles.rowButtonPrimary} />
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  progressFill: {
    width: '91%',
    height: '100%',
    backgroundColor: '#52FF94',
  },
  progressText: {
    color: '#52FF94',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionCard: {
    overflow: 'hidden',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    padding: Spacing.three,
    paddingBottom: Spacing.two,
  },
  rowButton: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
  },
  rowButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  rowButtonPrimary: {
    marginTop: 1,
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.three,
    borderRadius: Radius.md,
  },
});
