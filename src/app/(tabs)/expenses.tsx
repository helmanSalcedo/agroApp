import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { BottomTabInset } from '@/constants/theme';

const HEADER_BAR = true; // Enable professional header

const EXPENSE_CATEGORIES = [
  {
    id: 1,
    name: 'Fertilizantes',
    icon: '🌱',
    value: 450000,
    color: '#52FF94',
    bgColor: 'rgba(82,255,148,0.15)',
    description: '8 aplicaciones durante el mes',
  },
  {
    id: 2,
    name: 'Mano de Obra',
    icon: '👷',
    value: 320000,
    color: '#3B82F6',
    bgColor: 'rgba(59,182,246,0.15)',
    description: 'Jornaleros y operarios',
  },
  {
    id: 3,
    name: 'Transporte',
    icon: '🚚',
    value: 210000,
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.15)',
    description: 'Distribución de productos',
  },
  {
    id: 4,
    name: 'Riego y Agua',
    icon: '💧',
    value: 180000,
    color: '#06B6D4',
    bgColor: 'rgba(6,182,212,0.15)',
    description: 'Sistema de riego',
  },
  {
    id: 5,
    name: 'Herramientas',
    icon: '🔧',
    value: 95000,
    color: '#EC4899',
    bgColor: 'rgba(236,72,153,0.15)',
    description: 'Mantenimiento y equipos',
  },
  {
    id: 6,
    name: 'Pesticidas',
    icon: '🔬',
    value: 145000,
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.15)',
    description: 'Control de plagas',
  },
];

export default function ExpensesScreen() {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 380;

  const totalExpense = EXPENSE_CATEGORIES.reduce((sum, item) => sum + item.value, 0);
  const monthlyBudget = 2500000;
  const spent = (totalExpense / monthlyBudget) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SafeAreaView style={styles.safeArea}>
        {/* PROFESSIONAL HEADER BAR */}
        {HEADER_BAR && (
          <Animated.View entering={FadeInDown.duration(400)} style={styles.headerTopBar}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#52FF94" />
            </Pressable>
            <View style={styles.headerTitleBox}>
              <Text style={styles.headerTopTitle}>Gastos</Text>
              <Text style={styles.headerTopSubtitle}>Control de presupuesto</Text>
            </View>
            <Pressable onPress={() => router.push('/expense-select')} style={styles.actionButtonTop}>
              <Ionicons name="add-circle" size={24} color="#52FF94" />
            </Pressable>
          </Animated.View>
        )}

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: isSmallDevice ? 12 : 16 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <Animated.View entering={FadeInDown.duration(500).delay(50)} style={styles.headerSection}>
            <LinearGradient
              colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGradient}
            >
              <View style={styles.headerContent}>
                <View>
                  <Text style={styles.headerTitle}>Gastos del Mes</Text>
                  <Text style={styles.headerSubtitle}>Resumen por categoría</Text>
                </View>
                <Pressable onPress={() => router.push('/expense-create')} style={styles.addButton}>
                  <Ionicons name="add-circle" size={28} color="#52FF94" />
                </Pressable>
              </View>

              {/* KPI CARDS */}
              <View style={styles.kpiRow}>
                <LinearGradient
                  colors={['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.kpiCard}
                >
                  <View style={styles.kpiHeader}>
                    <Ionicons name="trending-up" size={18} color="#EF4444" />
                    <Text style={styles.kpiLabel}>Gastado</Text>
                  </View>
                  <Text style={[styles.kpiValue, { color: '#EF4444' }]}>
                    ${(totalExpense / 1000000).toFixed(2)}M
                  </Text>
                </LinearGradient>

                <LinearGradient
                  colors={['rgba(59,182,246,0.15)', 'rgba(59,182,246,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.kpiCard}
                >
                  <View style={styles.kpiHeader}>
                    <Ionicons name="wallet" size={18} color="#3B82F6" />
                    <Text style={styles.kpiLabel}>Presupuesto</Text>
                  </View>
                  <Text style={[styles.kpiValue, { color: '#3B82F6' }]}>
                    ${(monthlyBudget / 1000000).toFixed(1)}M
                  </Text>
                </LinearGradient>

                <LinearGradient
                  colors={[spent > 80 ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)', spent > 80 ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.kpiCard}
                >
                  <View style={styles.kpiHeader}>
                    <Ionicons name="percent" size={18} color={spent > 80 ? '#EF4444' : '#10B981'} />
                    <Text style={styles.kpiLabel}>% Usado</Text>
                  </View>
                  <Text style={[styles.kpiValue, { color: spent > 80 ? '#EF4444' : '#10B981' }]}>
                    {spent.toFixed(1)}%
                  </Text>
                </LinearGradient>
              </View>

              {/* PROGRESS BAR */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={spent > 80 ? ['#EF4444', '#DC2626'] : ['#52FF94', '#22C55E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${Math.min(spent, 100)}%` }]}
                  />
                </View>
                <Text style={styles.progressLabel}>
                  Disponible: ${((monthlyBudget - totalExpense) / 1000000).toFixed(2)}M
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* SECTION TITLE */}
          <Animated.View entering={FadeInDown.duration(500).delay(50)}>
            <Text style={styles.sectionTitle}>📊 Desglose por Categoría</Text>
          </Animated.View>

          {/* EXPENSE ITEMS */}
          <View style={styles.expensesList}>
            {EXPENSE_CATEGORIES.map((expense, index) => {
              const percentage = (expense.value / totalExpense) * 100;

              return (
                <Animated.View
                  key={expense.id}
                  entering={FadeInDown.duration(400).delay((index + 1) * 50)}
                >
                  <Pressable
                    style={styles.expenseCard}
                    onPress={() => router.push(`/expense-detail?id=${expense.id}`)}
                  >
                    {/* LEFT: ICON */}
                    <View style={[styles.expenseIcon, { backgroundColor: expense.bgColor }]}>
                      <Text style={styles.expenseEmoji}>{expense.icon}</Text>
                    </View>

                    {/* MIDDLE: CONTENT */}
                    <View style={styles.expenseContent}>
                      <View style={styles.expenseHeader}>
                        <Text style={styles.expenseName}>{expense.name}</Text>
                        <View style={[styles.percentBadge, { backgroundColor: expense.bgColor }]}>
                          <Text style={[styles.percentText, { color: expense.color }]}>
                            {percentage.toFixed(1)}%
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.expenseDescription}>{expense.description}</Text>

                      <View style={styles.expenseBar}>
                        <LinearGradient
                          colors={[expense.color + '40', expense.color + '20']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[styles.barFill, { width: `${percentage}%` }]}
                        />
                      </View>
                    </View>

                    {/* RIGHT: AMOUNT */}
                    <View style={styles.amountSection}>
                      <Text style={[styles.amountValue, { color: expense.color }]}>
                        ${(expense.value / 1000).toFixed(0)}k
                      </Text>
                      <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.3)" />
                    </View>
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>

          {/* MONTHLY SUMMARY */}
          <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.summarySection}>
            <Text style={styles.sectionTitle}>📈 Resumen Mensual</Text>

            <LinearGradient
              colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryCard}
            >
              <View style={styles.summaryRow}>
                <View>
                  <Text style={styles.summaryLabel}>Presupuesto Total</Text>
                  <Text style={styles.summaryValue}>${(monthlyBudget / 1000000).toFixed(1)}M</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View>
                  <Text style={styles.summaryLabel}>Gastado</Text>
                  <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
                    ${(totalExpense / 1000000).toFixed(2)}M
                  </Text>
                </View>
                <View style={styles.summaryDivider} />
                <View>
                  <Text style={styles.summaryLabel}>Disponible</Text>
                  <Text style={[styles.summaryValue, { color: '#10B981' }]}>
                    ${((monthlyBudget - totalExpense) / 1000000).toFixed(2)}M
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* QUICK ACTIONS */}
          <Animated.View entering={FadeInDown.duration(500).delay(250)} style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>⚡ Acciones Rápidas</Text>

            <View style={styles.actionsGrid}>
              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/expense-create')}
              >
                <LinearGradient
                  colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionCardGradient}
                >
                  <Ionicons name="add-outline" size={24} color="#52FF94" />
                  <Text style={styles.actionCardText}>Nuevo Gasto</Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/expense-history')}
              >
                <LinearGradient
                  colors={['rgba(59,182,246,0.15)', 'rgba(59,182,246,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionCardGradient}
                >
                  <Ionicons name="time-outline" size={24} color="#3B82F6" />
                  <Text style={styles.actionCardText}>Historial</Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/financial-summary')}
              >
                <LinearGradient
                  colors={['rgba(236,72,153,0.15)', 'rgba(236,72,153,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionCardGradient}
                >
                  <Ionicons name="bar-chart-outline" size={24} color="#EC4899" />
                  <Text style={styles.actionCardText}>Reporte</Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/(tabs)/index')}
              >
                <LinearGradient
                  colors={['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionCardGradient}
                >
                  <Ionicons name="home-outline" size={24} color="#F59E0B" />
                  <Text style={styles.actionCardText}>Ir a Home</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </Animated.View>

          <View style={{ height: BottomTabInset + 24 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020403' },
  safeArea: { flex: 1 },
  scrollContent: { paddingVertical: 16 },

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

  /* PROFESSIONAL HEADER BAR */
  headerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    gap: 12,
  },
  backButton: { padding: 4 },
  headerTitleBox: { flex: 1, gap: 2 },
  headerTopTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerTopSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  actionButtonTop: { padding: 4 },

  /* HEADER */
  headerSection: { marginBottom: 24 },
  headerGradient: { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, gap: 12 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  addButton: { padding: 4 },

  /* KPI CARDS */
  kpiRow: { flexDirection: 'row', gap: 8 },
  kpiCard: { flex: 1, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 10, gap: 6 },
  kpiHeader: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  kpiLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  kpiValue: { fontSize: 14, fontWeight: '800' },

  /* PROGRESS */
  progressContainer: { gap: 8 },
  progressBar: { width: '100%', height: 8, borderRadius: 4, backgroundColor: 'rgba(82,255,148,0.1)', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  progressLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },

  /* SECTION TITLE */
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, marginTop: 4 },

  /* EXPENSES LIST */
  expensesList: { gap: 12 },
  expenseCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(82,255,148,0.03)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)' },
  expenseIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  expenseEmoji: { fontSize: 18 },

  expenseContent: { flex: 1, gap: 6 },
  expenseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  expenseName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF', flex: 1 },
  percentBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  percentText: { fontSize: 10, fontWeight: '700' },
  expenseDescription: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  expenseBar: { width: '100%', height: 4, borderRadius: 2, backgroundColor: 'rgba(82,255,148,0.1)', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 2 },

  amountSection: { alignItems: 'flex-end', justifyContent: 'flex-start', gap: 4 },
  amountValue: { fontSize: 13, fontWeight: '800' },

  /* SUMMARY */
  summarySection: { marginTop: 24 },
  summaryCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  summaryLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  summaryValue: { fontSize: 14, fontWeight: '800', color: '#52FF94', marginTop: 4 },
  summaryDivider: { width: 1, height: 40, backgroundColor: 'rgba(82,255,148,0.2)' },

  /* QUICK ACTIONS */
  quickActionsSection: { marginTop: 24 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { width: '48%', borderRadius: 12, overflow: 'hidden', minHeight: 100 },
  actionCardGradient: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14, justifyContent: 'center', alignItems: 'center', gap: 8 },
  actionCardText: { fontSize: 11, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
});
