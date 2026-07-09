import { StyleSheet, Text, View } from 'react-native';

import { WeeklyBarsSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Spacing } from '@/constants/theme';

const FARMS = [
  { name: 'Finca El Mirador', estimate: '120 arrobas', real: '104 arrobas' },
  { name: 'Finca La Esperanza', estimate: '95 arrobas', real: '88 arrobas' },
];

export default function ProductionGeneralScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Produccion general" subtitle="Resumen estimado y actual por finca." />

      <View style={[AgroSurface.cardStrong, styles.summaryCard]}>
        <Text style={styles.summaryTitle}>Rendimiento global</Text>
        <Text style={styles.summaryValue}>192 arrobas</Text>
        <WeeklyBarsSvg height={96} />
      </View>

      {FARMS.map((item) => (
        <View key={item.name} style={[AgroSurface.card, styles.card]}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Estimado</Text>
            <Text style={styles.metricValue}>{item.estimate}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Actual</Text>
            <Text style={styles.metricValue}>{item.real}</Text>
          </View>
        </View>
      ))}
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  summaryTitle: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
    fontWeight: '600',
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },
  card: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
  },
  metricValue: {
    color: '#52FF94',
    fontSize: 13,
    fontWeight: '700',
  },
});
