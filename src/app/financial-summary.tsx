import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const GASTOS_CATEGORIAS = [
  { id: 1, categoria: 'Fertilizantes', monto: 2500, porcentaje: 25, color: '#52FF94', icon: '🌱' },
  { id: 2, categoria: 'Mano de Obra', monto: 3200, porcentaje: 32, color: '#3B82F6', icon: '👷' },
  { id: 3, categoria: 'Riego', monto: 1800, porcentaje: 18, color: '#06B6D4', icon: '💧' },
  { id: 4, categoria: 'Pesticidas', monto: 1500, porcentaje: 15, color: '#F59E0B', icon: '🔬' },
  { id: 5, categoria: 'Transporte', monto: 1000, porcentaje: 10, color: '#EC4899', icon: '🚚' },
];

const INGRESOS_CATEGORIAS = [
  { id: 1, categoria: 'Cultivos', monto: 8500, porcentaje: 60, color: '#52FF94', icon: '🌾' },
  { id: 2, categoria: 'Ganadería', monto: 4200, porcentaje: 30, color: '#EC4899', icon: '🐄' },
  { id: 3, categoria: 'Otros', monto: 1300, porcentaje: 10, color: '#F59E0B', icon: '📦' },
];

export default function FinancialSummaryScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const totalGastos = GASTOS_CATEGORIAS.reduce((sum, item) => sum + item.monto, 0);
  const totalIngresos = INGRESOS_CATEGORIAS.reduce((sum, item) => sum + item.monto, 0);
  const ganancia = totalIngresos - totalGastos;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Resumen Financiero</Text>
            <Text style={styles.headerSubtitle}>Mes actual</Text>
          </View>
          <View style={{ width: 28 }} />
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* KPI CARDS */}
          <Animated.View entering={FadeInDown.duration(400).delay(50)} style={styles.kpiContainer}>
            <View style={styles.kpiRow}>
              <LinearGradient
                colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.kpiCard}
              >
                <View style={styles.kpiHeader}>
                  <Ionicons name="trending-up" size={20} color="#52FF94" />
                  <Text style={styles.kpiLabel}>Ingresos</Text>
                </View>
                <Text style={styles.kpiValue}>${totalIngresos.toLocaleString()}</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.08)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.kpiCard}
              >
                <View style={styles.kpiHeader}>
                  <Ionicons name="trending-down" size={20} color="#EF4444" />
                  <Text style={styles.kpiLabel}>Gastos</Text>
                </View>
                <Text style={[styles.kpiValue, { color: '#EF4444' }]}>-${totalGastos.toLocaleString()}</Text>
              </LinearGradient>
            </View>

            <LinearGradient
              colors={ganancia > 0 ? ['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.08)'] : ['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.kpiCardFull}
            >
              <View style={styles.kpiHeader}>
                <Ionicons name="cash" size={20} color={ganancia > 0 ? '#10B981' : '#EF4444'} />
                <Text style={styles.kpiLabel}>Ganancia Neta</Text>
              </View>
              <Text style={[styles.kpiValue, { color: ganancia > 0 ? '#10B981' : '#EF4444' }]}>
                {ganancia > 0 ? '+' : '-'}${Math.abs(ganancia).toLocaleString()}
              </Text>
            </LinearGradient>
          </Animated.View>

          {/* GASTOS POR CATEGORÍA */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <Text style={styles.sectionTitle}>📊 Gastos por Categoría</Text>

            <View style={styles.categoriesContainer}>
              {GASTOS_CATEGORIAS.map((item, index) => (
                <Animated.View key={item.id} entering={FadeInDown.duration(300).delay(150 + index * 30)}>
                  <View style={styles.categoryCard}>
                    <View style={styles.categoryHeader}>
                      <View style={styles.categoryInfo}>
                        <Text style={styles.categoryIcon}>{item.icon}</Text>
                        <View>
                          <Text style={styles.categoryName}>{item.categoria}</Text>
                          <Text style={styles.categoryPercent}>{item.porcentaje}% del total</Text>
                        </View>
                      </View>
                      <Text style={styles.categoryAmount}>${item.monto.toLocaleString()}</Text>
                    </View>

                    <View style={styles.progressBar}>
                      <LinearGradient
                        colors={[item.color + '40', item.color + '20']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressFill, { width: `${item.porcentaje}%` }]}
                      />
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* INGRESOS POR CATEGORÍA */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <Text style={styles.sectionTitle}>💰 Ingresos por Categoría</Text>

            <View style={styles.categoriesContainer}>
              {INGRESOS_CATEGORIAS.map((item, index) => (
                <Animated.View key={item.id} entering={FadeInDown.duration(300).delay(250 + index * 30)}>
                  <View style={styles.categoryCard}>
                    <View style={styles.categoryHeader}>
                      <View style={styles.categoryInfo}>
                        <Text style={styles.categoryIcon}>{item.icon}</Text>
                        <View>
                          <Text style={styles.categoryName}>{item.categoria}</Text>
                          <Text style={styles.categoryPercent}>{item.porcentaje}% del total</Text>
                        </View>
                      </View>
                      <Text style={[styles.categoryAmount, { color: '#10B981' }]}>+${item.monto.toLocaleString()}</Text>
                    </View>

                    <View style={styles.progressBar}>
                      <LinearGradient
                        colors={[item.color + '40', item.color + '20']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressFill, { width: `${item.porcentaje}%` }]}
                      />
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* COMPARATIVA */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)} style={styles.comparativaSection}>
            <Text style={styles.sectionTitle}>📈 Comparativa</Text>

            <LinearGradient
              colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.comparativaCard}
            >
              <View style={styles.comparativaRow}>
                <View>
                  <Text style={styles.comparativaLabel}>Ingresos</Text>
                  <Text style={styles.comparativaValue}>${totalIngresos.toLocaleString()}</Text>
                </View>
                <View style={styles.comparativaDivider} />
                <View>
                  <Text style={styles.comparativaLabel}>Gastos</Text>
                  <Text style={styles.comparativaValue}>${totalGastos.toLocaleString()}</Text>
                </View>
              </View>

              <View style={styles.ratioBar}>
                <View
                  style={[
                    styles.ratioFill,
                    { width: `${(totalGastos / totalIngresos) * 100}%` }
                  ]}
                />
              </View>

              <Text style={styles.ratioLabel}>
                Gastos: {((totalGastos / totalIngresos) * 100).toFixed(1)}% de ingresos
              </Text>
            </LinearGradient>
          </Animated.View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollView: { flex: 1 },

  glowTop: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  glowBottom: {
    position: 'absolute',
    bottom: -200,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerContent: { flex: 1, alignItems: 'center', gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },

  /* KPI */
  kpiContainer: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  kpiRow: { flexDirection: 'row', gap: 12 },
  kpiCard: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14, gap: 8 },
  kpiCardFull: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(16,185,129,0.15)', padding: 14, gap: 8 },
  kpiHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  kpiLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  kpiValue: { fontSize: 18, fontWeight: '800', color: '#52FF94' },

  /* CATEGORIES */
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, marginTop: 20, marginLeft: 16 },
  categoriesContainer: { paddingHorizontal: 16, gap: 10 },
  categoryCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', backgroundColor: 'rgba(82,255,148,0.03)', padding: 12, gap: 8 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  categoryIcon: { fontSize: 20 },
  categoryName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  categoryPercent: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  categoryAmount: { fontSize: 13, fontWeight: '800', color: '#EF4444' },
  progressBar: { width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(82,255,148,0.1)', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },

  /* COMPARATIVA */
  comparativaSection: { paddingHorizontal: 16, marginTop: 24 },
  comparativaCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, gap: 12 },
  comparativaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  comparativaLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  comparativaValue: { fontSize: 16, fontWeight: '800', color: '#52FF94', marginTop: 4 },
  comparativaDivider: { width: 1, height: 40, backgroundColor: 'rgba(82,255,148,0.2)' },
  ratioBar: { width: '100%', height: 8, borderRadius: 4, backgroundColor: 'rgba(82,255,148,0.1)', overflow: 'hidden' },
  ratioFill: { height: '100%', borderRadius: 4, backgroundColor: '#EF4444' },
  ratioLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 4 },
});
