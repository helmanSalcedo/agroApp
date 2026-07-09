import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Radius, Spacing } from '@/constants/theme';

const ITEMS = [
  { date: '12 Jun 2026', category: 'Fertilizantes', amount: '$120.000' },
  { date: '08 Jun 2026', category: 'Mano de obra', amount: '$95.000' },
  { date: '03 Jun 2026', category: 'Transporte', amount: '$48.000' },
  { date: '01 Jun 2026', category: 'Otros', amount: '$35.000' },
];

export default function ExpenseHistoryScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Historial de gastos" subtitle="Consulta tus egresos recientes por categoria." />

      <LinearGradient colors={['rgba(82,255,148,0.22)', 'rgba(11,25,18,0.92)']} style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total del mes</Text>
        <Text style={styles.totalValue}>$298.000</Text>
      </LinearGradient>

      <View style={[AgroSurface.card, styles.card]}>
        {ITEMS.map((item) => (
          <Pressable
            key={`${item.date}-${item.category}`}
            style={styles.row}
            onPress={() => router.push('./expense-detail')}>
            <View>
              <Text style={styles.rowTitle}>{item.category}</Text>
              <Text style={styles.rowDate}>{item.date}</Text>
            </View>
            <Text style={styles.rowAmount}>{item.amount}</Text>
          </Pressable>
        ))}
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  totalCard: {
    borderRadius: Radius.xl,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.14)',
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    fontWeight: '600',
  },
  totalValue: {
    marginTop: 3,
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
  },
  rowTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  rowDate: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 12,
    marginTop: 2,
  },
  rowAmount: {
    color: '#52FF94',
    fontSize: 13,
    fontWeight: '700',
  },
});
