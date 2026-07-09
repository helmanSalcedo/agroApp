import { StyleSheet, Text, View } from 'react-native';

import { RingChartSvg, WeeklyBarsSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Spacing } from '@/constants/theme';

export default function ProductionLotScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Produccion por lote" subtitle="Lote Alto · Finca El Mirador" />

      <View style={[AgroSurface.cardStrong, styles.mainCard]}>
        <View style={styles.mainTop}>
          <View>
            <Text style={styles.mainLabel}>Produccion estimada anual</Text>
            <Text style={styles.mainValue}>87 arrobas</Text>
          </View>
          <RingChartSvg pct={91} />
        </View>
        <Text style={styles.mainDate}>Ultimo calculo: 10 de junio de 2026</Text>
      </View>

      <View style={[AgroSurface.card, styles.barCard]}>
        <Text style={styles.barTitle}>Historico mensual</Text>
        <WeeklyBarsSvg height={106} />
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    padding: Spacing.three,
    gap: 6,
  },
  mainTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 12,
  },
  mainValue: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
  },
  mainDate: {
    color: '#52FF94',
    fontSize: 12,
    fontWeight: '600',
  },
  barCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  barTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
