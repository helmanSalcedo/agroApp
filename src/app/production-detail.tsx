import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Svg, Rect, Line, Circle, Text as SvgText } from 'react-native-svg';

// Mock data
const LOT_DETAIL = {
  id: 'l1',
  name: 'Lote Alto',
  product: 'Maíz Amarillo',
  icon: '🌽',
  area: 5,
  status: 'crecimiento',
  startDate: new Date('2024-05-15'),
  expectedHarvestDate: new Date('2024-08-15'),
  expenses: {
    preparación: 500000,
    semilla: 300000,
    fertilizante: 800000,
    riego: 600000,
    labores: 200000,
    plagas: 100000,
  },
  estimatedYield: 12500,
  estimatedPrice: 480,
  activities: [
    { date: '2024-05-15', activity: 'Preparación del terreno', icon: '🚜' },
    { date: '2024-05-20', activity: 'Siembra', icon: '🌱' },
    { date: '2024-06-10', activity: 'Primera fertilización', icon: '💊' },
    { date: '2024-06-25', activity: 'Control de plagas', icon: '🐛' },
    { date: '2024-07-10', activity: 'Segunda fertilización', icon: '💊' },
  ],
  weather: {
    temperature: 24,
    humidity: 65,
    rainfall: 120,
  },
};

const chartWidth = Dimensions.get('window').width - 32;
const chartHeight = 200;

export default function ProductionDetailScreen() {
  const { id, farmId } = useLocalSearchParams();
  const lot = LOT_DETAIL;

  const totalExpenses = Object.values(lot.expenses).reduce((a, b) => a + b, 0);
  const estimatedRevenue = lot.estimatedYield * lot.estimatedPrice;
  const estimatedProfit = estimatedRevenue - totalExpenses;
  const roi = (estimatedProfit / totalExpenses * 100).toFixed(1);
  const profitMargin = (estimatedProfit / estimatedRevenue * 100).toFixed(1);

  const expenseEntries = Object.entries(lot.expenses).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    percentage: (value / totalExpenses * 100).toFixed(1),
  }));

  const maxExpense = Math.max(...Object.values(lot.expenses));

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{lot.name}</Text>
            <Text style={styles.headerSubtitle}>{lot.product}</Text>
          </View>
          <Text style={styles.headerIcon}>{lot.icon}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Key Metrics */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <View style={styles.metricsContainer}>
              <LinearGradient
                colors={['rgba(34,197,94,0.2)', 'rgba(82,255,148,0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricBox}
              >
                <Text style={styles.metricIcon}>💰</Text>
                <Text style={styles.metricLabel}>Ganancia Estimada</Text>
                <Text style={[styles.metricValue, { color: estimatedProfit > 0 ? '#22C55E' : '#EF4444' }]}>
                  ${(estimatedProfit / 1000000).toFixed(2)}M
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(59,130,246,0.2)', 'rgba(82,255,148,0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricBox}
              >
                <Text style={styles.metricIcon}>📈</Text>
                <Text style={styles.metricLabel}>ROI</Text>
                <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                  {roi > 0 ? '+' : ''}{roi}%
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(168,85,247,0.2)', 'rgba(82,255,148,0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.metricBox}
              >
                <Text style={styles.metricIcon}>📊</Text>
                <Text style={styles.metricLabel}>Margen</Text>
                <Text style={[styles.metricValue, { color: '#A855F7' }]}>
                  {profitMargin}%
                </Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Financial Summary */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Resumen Financiero</Text>

              <View style={styles.financialRow}>
                <View style={styles.financialItem}>
                  <Text style={styles.financialLabel}>Inversión Total</Text>
                  <Text style={styles.financialValueRed}>
                    -${(totalExpenses / 1000000).toFixed(2)}M
                  </Text>
                </View>
                <View style={styles.financialDivider} />
                <View style={styles.financialItem}>
                  <Text style={styles.financialLabel}>Producción</Text>
                  <Text style={styles.financialValue}>{lot.estimatedYield} kg</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.financialRow}>
                <View style={styles.financialItem}>
                  <Text style={styles.financialLabel}>Precio Estimado</Text>
                  <Text style={styles.financialValue}>
                    ${lot.estimatedPrice.toLocaleString('es-CO')}/kg
                  </Text>
                </View>
                <View style={styles.financialDivider} />
                <View style={styles.financialItem}>
                  <Text style={styles.financialLabel}>Ingresos</Text>
                  <Text style={[styles.financialValue, { color: '#22C55E' }]}>
                    +${(estimatedRevenue / 1000000).toFixed(2)}M
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Expense Breakdown */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Desglose de Costos</Text>

              {expenseEntries.map((item, index) => (
                <View key={index}>
                  <View style={styles.expenseRow}>
                    <View style={styles.expenseLabel}>
                      <Text style={styles.expenseName}>{item.label}</Text>
                      <Text style={styles.expensePercentage}>{item.percentage}%</Text>
                    </View>
                    <View style={styles.expenseBar}>
                      <View
                        style={[
                          styles.expenseFill,
                          {
                            width: `${(item.value / maxExpense) * 100}%`,
                            backgroundColor: `hsl(${index * 60}, 100%, 50%)`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.expenseAmount}>
                      ${(item.value / 1000000).toFixed(2)}M
                    </Text>
                  </View>
                  {index < expenseEntries.length - 1 && <View style={styles.divider} />}
                </View>
              ))}

              <View style={[styles.divider, { marginTop: 12 }]} />
              <View style={styles.expenseRow}>
                <Text style={styles.totalExpenseLabel}>Total de Costos</Text>
                <Text style={styles.totalExpenseAmount}>
                  ${(totalExpenses / 1000000).toFixed(2)}M
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Timeline */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Cronograma de Actividades</Text>

              {lot.activities.map((activity, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineDate}>
                    <Text style={styles.timelineIcon}>{activity.icon}</Text>
                    <Text style={styles.timelineText}>
                      {new Date(activity.date).toLocaleDateString('es-CO')}
                    </Text>
                  </View>
                  <Text style={styles.activityName}>{activity.activity}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Weather Info */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Condiciones Climáticas</Text>

              <View style={styles.weatherRow}>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherIcon}>🌡️</Text>
                  <Text style={styles.weatherLabel}>Temperatura</Text>
                  <Text style={styles.weatherValue}>{lot.weather.temperature}°C</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherIcon}>💧</Text>
                  <Text style={styles.weatherLabel}>Humedad</Text>
                  <Text style={styles.weatherValue}>{lot.weather.humidity}%</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherIcon}>🌧️</Text>
                  <Text style={styles.weatherLabel}>Lluvia</Text>
                  <Text style={styles.weatherValue}>{lot.weather.rainfall}mm</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View entering={FadeInDown.duration(400).delay(500)} style={styles.buttonGroup}>
            <Pressable style={styles.actionButton}>
              <LinearGradient
                colors={['#52FF94', '#22C55E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="document-text" size={16} color="#041109" />
                <Text style={styles.buttonText}>Generar Reporte</Text>
              </LinearGradient>
            </Pressable>

            <Pressable style={styles.actionButton}>
              <LinearGradient
                colors={['rgba(82,255,148,0.2)', 'rgba(82,255,148,0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.buttonGradient, { borderWidth: 1, borderColor: '#52FF94' }]}
              >
                <Ionicons name="add-circle" size={16} color="#52FF94" />
                <Text style={[styles.buttonText, { color: '#52FF94' }]}>Agregar Gasto</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    gap: 12,
  },

  backButton: {
    padding: 8,
    marginLeft: -8,
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  headerIcon: {
    fontSize: 24,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  metricsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  metricBox: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },

  metricIcon: {
    fontSize: 20,
  },

  metricLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  metricValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#52FF94',
  },

  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.03)',
    padding: 14,
    gap: 12,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
  },

  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  financialItem: {
    flex: 1,
  },

  financialLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 4,
  },

  financialValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  financialValueRed: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },

  financialDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(82,255,148,0.1)',
    marginHorizontal: 8,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },

  expenseLabel: {
    width: 90,
  },

  expenseName: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },

  expensePercentage: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  expenseBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },

  expenseFill: {
    height: '100%',
    borderRadius: 3,
  },

  expenseAmount: {
    width: 70,
    fontSize: 11,
    fontWeight: '700',
    color: '#52FF94',
    textAlign: 'right',
  },

  totalExpenseLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },

  totalExpenseAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },

  timelineItem: {
    paddingVertical: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#52FF94',
    paddingLeft: 12,
    gap: 4,
  },

  timelineDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  timelineIcon: {
    fontSize: 16,
  },

  timelineText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  activityName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 22,
  },

  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  weatherItem: {
    alignItems: 'center',
    gap: 6,
  },

  weatherIcon: {
    fontSize: 24,
  },

  weatherLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  weatherValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  buttonGroup: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },

  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },

  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#041109',
  },
});
