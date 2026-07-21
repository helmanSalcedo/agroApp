import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useOrganization } from '@/context/organization-context';

export default function ProfessionalDashboardScreen() {
  const { currentOrganization } = useOrganization();
  const [timeRange, setTimeRange] = useState<'mes' | 'trimestre' | 'anio'>('mes');
  const { width } = useWindowDimensions();

  const kpis = [
    {
      id: 'ingresos',
      label: 'Ingresos',
      value: '$2,450,000',
      change: '+15%',
      icon: 'trending-up',
      color: '#22C55E',
    },
    {
      id: 'gastos',
      label: 'Gastos',
      value: '$890,000',
      change: '+8%',
      icon: 'trending-down',
      color: '#EF4444',
    },
    {
      id: 'utilidad',
      label: 'Utilidad',
      value: '$1,560,000',
      change: '+22%',
      icon: 'cash',
      color: '#52FF94',
    },
    {
      id: 'roi',
      label: 'ROI',
      value: '62.4%',
      change: '+5.2%',
      icon: 'bar-chart',
      color: '#3B82F6',
    },
  ];

  const activities = [
    { id: '1', type: 'cosecha', title: 'Cosecha completada', subtitle: 'Lote Alto - Maíz', time: 'Hace 2 horas', icon: '🚜' },
    { id: '2', type: 'venta', title: 'Venta registrada', subtitle: '$450,000 - Maíz', time: 'Hace 5 horas', icon: '💰' },
    { id: '3', type: 'gasto', title: 'Gasto registrado', subtitle: '$125,000 - Fertilizante', time: 'Hace 8 horas', icon: '🧂' },
    { id: '4', type: 'actividad', title: 'Actividad completada', subtitle: 'Riego - Lote Bajo', time: 'Hace 1 día', icon: '💧' },
  ];

  const renderKPICard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <LinearGradient
        colors={[`${item.color}15`, `${item.color}08`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.kpiCard}
      >
        <View style={styles.kpiHeader}>
          <View style={[styles.kpiIcon, { backgroundColor: `${item.color}20` }]}>
            <Ionicons name={item.icon as any} size={20} color={item.color} />
          </View>
          <Text style={[styles.kpiChange, { color: item.color }]}>
            {item.change}
          </Text>
        </View>

        <Text style={styles.kpiLabel}>{item.label}</Text>
        <Text style={styles.kpiValue}>{item.value}</Text>

        <View
          style={[
            styles.kpiBar,
            { backgroundColor: `${item.color}40` },
          ]}
        >
          <View
            style={[
              styles.kpiBarFill,
              {
                width: `${Math.random() * 40 + 60}%`,
                backgroundColor: item.color,
              },
            ]}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const renderActivityItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <View style={styles.activityItem}>
        <View style={styles.activityIcon}>
          <Text style={styles.activityIconText}>{item.icon}</Text>
        </View>

        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
        </View>

        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Dashboard</Text>
            <Text style={styles.orgName}>{currentOrganization?.name}</Text>
          </View>
          <Pressable style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color="#52FF94" />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Time Range Selector */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <View style={styles.timeRangeSelector}>
              {(['mes', 'trimestre', 'anio'] as const).map(range => (
                <Pressable
                  key={range}
                  style={[
                    styles.timeRangeButton,
                    timeRange === range && styles.timeRangeButtonActive,
                  ]}
                  onPress={() => setTimeRange(range)}
                >
                  <Text
                    style={[
                      styles.timeRangeText,
                      timeRange === range && styles.timeRangeTextActive,
                    ]}
                  >
                    {range === 'mes' ? 'Este Mes' : range === 'trimestre' ? 'Este Trimestre' : 'Este Año'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* KPIs */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.kpisGrid}>
              <FlatList
                data={kpis}
                renderItem={renderKPICard}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                numColumns={2}
                columnWrapperStyle={styles.kpiRow}
              />
            </View>
          </Animated.View>

          {/* Chart Card */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.chartCard}>
              <LinearGradient
                colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.chartGradient}
              >
                <View style={styles.chartHeader}>
                  <Text style={styles.chartTitle}>Ingresos vs Gastos</Text>
                  <Ionicons name="bar-chart" size={20} color="#52FF94" />
                </View>

                <View style={styles.chartPlaceholder}>
                  <View style={styles.barChart}>
                    <View style={[styles.bar, { height: '70%', backgroundColor: '#22C55E' }]} />
                    <View style={[styles.bar, { height: '40%', backgroundColor: '#EF4444' }]} />
                    <View style={[styles.bar, { height: '75%', backgroundColor: '#22C55E' }]} />
                    <View style={[styles.bar, { height: '45%', backgroundColor: '#EF4444' }]} />
                    <View style={[styles.bar, { height: '80%', backgroundColor: '#22C55E' }]} />
                  </View>
                </View>

                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#22C55E' }]} />
                    <Text style={styles.legendText}>Ingresos</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
                    <Text style={styles.legendText}>Gastos</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Alerts */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Alertas & Acciones</Text>

              <View style={styles.alertCard}>
                <LinearGradient
                  colors={['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.alertGradient}
                >
                  <View style={styles.alertContent}>
                    <View style={styles.alertIcon}>
                      <Ionicons name="alert-circle" size={20} color="#EF4444" />
                    </View>
                    <View style={styles.alertText}>
                      <Text style={styles.alertTitle}>Stock Bajo</Text>
                      <Text style={styles.alertDescription}>Fertilizante NPK en inventario bajo</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.alertCard}>
                <LinearGradient
                  colors={['rgba(34,197,94,0.15)', 'rgba(34,197,94,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.alertGradient}
                >
                  <View style={styles.alertContent}>
                    <View style={styles.alertIcon}>
                      <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                    </View>
                    <View style={styles.alertText}>
                      <Text style={styles.alertTitle}>Próxima Cosecha</Text>
                      <Text style={styles.alertDescription}>Lote Alto en 5 días</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </Animated.View>

          {/* Recent Activity */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Actividad Reciente</Text>
                <Pressable>
                  <Text style={styles.seeAllLink}>Ver todo</Text>
                </Pressable>
              </View>

              <FlatList
                data={activities}
                renderItem={renderActivityItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.activitiesList}
              />
            </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  headerContent: {
    flex: 1,
  },

  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  orgName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },

  profileButton: {
    padding: 8,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 20,
    paddingBottom: 24,
  },

  timeRangeSelector: {
    flexDirection: 'row',
    gap: 8,
  },

  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
  },

  timeRangeButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  timeRangeText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },

  timeRangeTextActive: {
    color: '#52FF94',
    fontWeight: '700',
  },

  kpisGrid: {
    gap: 12,
  },

  kpiRow: {
    gap: 12,
  },

  kpiCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 14,
    minHeight: 140,
  },

  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  kpiIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  kpiChange: {
    fontSize: 12,
    fontWeight: '700',
  },

  kpiLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 4,
  },

  kpiValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  kpiBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },

  kpiBarFill: {
    height: '100%',
    borderRadius: 2,
  },

  chartCard: {
    borderRadius: 14,
    overflow: 'hidden',
  },

  chartGradient: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 16,
  },

  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  chartTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
  },

  chartPlaceholder: {
    height: 180,
    justifyContent: 'flex-end',
    marginBottom: 12,
  },

  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    height: 160,
  },

  bar: {
    flex: 1,
    borderRadius: 4,
  },

  chartLegend: {
    flexDirection: 'row',
    gap: 16,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },

  legendText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52FF94',
  },

  alertCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  alertGradient: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 12,
  },

  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertText: {
    flex: 1,
  },

  alertTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  alertDescription: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  activitiesList: {
    gap: 12,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(82,255,148,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    gap: 10,
  },

  activityIcon: {
    fontSize: 20,
  },

  activityIconText: {
    fontSize: 18,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  activitySubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  activityTime: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },
});
