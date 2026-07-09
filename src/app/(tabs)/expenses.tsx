import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Radius, Spacing } from '@/constants/theme';

const CATEGORIES = [
  { name: 'Fertilizantes', value: 450000, color: '#2E7D32' },
  { name: 'Mano de obra', value: 320000, color: '#4CAF50' },
  { name: 'Transporte', value: 210000, color: '#FF9800' },
  { name: 'Otros', value: 270000, color: '#E53935' },
];

export default function ExpensesScreen() {
  const total = CATEGORIES.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Gastos del mes</Text>
          <Text style={styles.subtitle}>Resumen financiero por categoria.</Text>

          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total junio</Text>
            <Text style={styles.totalValue}>${total.toLocaleString('es-CO')}</Text>
            <View style={styles.miniRingWrap}>
              <View style={styles.miniRingOuter}>
                <View style={styles.miniRingInner} />
              </View>
              <Text style={styles.miniRingText}>100%</Text>
            </View>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Distribucion</Text>
            {CATEGORIES.map((item) => {
              const pct = Math.round((item.value / total) * 100);
              return (
                <View key={item.name} style={styles.categoryRow}>
                  <View style={styles.categoryLabelWrap}>
                    <View style={[styles.dot, { backgroundColor: item.color }]} />
                    <Text style={styles.categoryLabel}>{item.name}</Text>
                  </View>
                  <Text style={styles.categoryValue}>{pct}%</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.actionsRow}>
            <Pressable style={styles.secondaryButton} onPress={() => router.push('../expense-history')}>
              <Text style={styles.secondaryText}>Historial gastos</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={() => router.push('../expense-create')}>
              <Text style={styles.primaryText}>Nuevo gasto</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020403',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  title: {
    marginTop: Spacing.two,
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    lineHeight: 20,
  },
  totalCard: {
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: Spacing.four,
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
  },
  totalValue: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
  },
  miniRingWrap: {
    position: 'absolute',
    right: 16,
    top: 18,
    alignItems: 'center',
  },
  miniRingOuter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#52FF94',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniRingInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#020403',
  },
  miniRingText: {
    marginTop: 4,
    color: '#52FF94',
    fontSize: 11,
    fontWeight: '700',
  },
  chartCard: {
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: Spacing.three,
    gap: Spacing.two,
  },
  chartTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  categoryLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryLabel: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  categoryValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  secondaryText: {
    color: '#52FF94',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(82,255,148,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  primaryText: {
    color: '#52FF94',
    fontSize: 14,
    fontWeight: '700',
  },
});
