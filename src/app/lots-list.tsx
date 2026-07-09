import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LotTilePatternSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Radius, Spacing } from '@/constants/theme';

const LOTS = [
  { name: 'Lote Alto', age: '2.1 anos', area: '2.1 ha', trees: '85 arboles' },
  { name: 'Lote Bajo', age: '1.2 anos', area: '1.2 ha', trees: '66 arboles' },
  { name: 'Lote Cafetal', age: '4 anos', area: '1.9 ha', trees: '120 arboles' },
];

export default function LotsListScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Mis lotes" subtitle="Gestiona el detalle y produccion de cada lote." />

      <LinearGradient colors={['rgba(82,255,148,0.22)', 'rgba(11,25,18,0.92)']} style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total lotes activos</Text>
        <Text style={styles.summaryValue}>3</Text>
        <Text style={styles.summarySub}>Produccion total estimada: 271 arrobas</Text>
      </LinearGradient>

      {LOTS.map((lot) => (
        <Pressable key={lot.name} style={[AgroSurface.card, styles.card]} onPress={() => router.push('/lot-detail')}>
          <LotTilePatternSvg height={92} />
          <View style={styles.cardBody}>
            <Text style={styles.name}>{lot.name}</Text>
            <Text style={styles.meta}>{lot.age}</Text>
            <View style={styles.statsRow}>
              <Chip label={lot.area} />
              <Chip label={lot.trees} />
            </View>
          </View>
        </Pressable>
      ))}
    </AgroScreen>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    borderRadius: Radius.xl,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.14)',
  },
  summaryTitle: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    fontWeight: '600',
  },
  summaryValue: {
    marginTop: 2,
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
  },
  summarySub: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 12,
    fontWeight: '500',
  },
  card: {
    overflow: 'hidden',
  },
  cardBody: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  meta: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  chip: AgroSurface.chip,
  chipText: AgroSurface.chipText,
});
