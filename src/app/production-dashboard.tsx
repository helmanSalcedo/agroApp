import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, ScrollView, useWindowDimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface LotProduction {
  id: string;
  name: string;
  product: string;
  status: 'siembra' | 'crecimiento' | 'cosecha' | 'completado';
  startDate: Date;
  expectedHarvestDate: Date;
  area: number;
  expenses: number;
  estimatedRevenue: number;
  harvestedQuantity?: number;
  actualRevenue?: number;
  icon: string;
}

interface FarmData {
  id: string;
  name: string;
  location: string;
  lots: LotProduction[];
}

const MOCK_FARMS: FarmData[] = [
  {
    id: 'f1',
    name: 'Finca Los Campos',
    location: 'Cundinamarca',
    lots: [
      {
        id: 'l1',
        name: 'Lote Alto',
        product: 'Maíz',
        status: 'crecimiento',
        startDate: new Date('2024-05-15'),
        expectedHarvestDate: new Date('2024-08-15'),
        area: 5,
        expenses: 2500000,
        estimatedRevenue: 6000000,
        icon: '🌽',
      },
      {
        id: 'l2',
        name: 'Lote Bajo',
        product: 'Frijol',
        status: 'siembra',
        startDate: new Date('2024-07-01'),
        expectedHarvestDate: new Date('2024-10-01'),
        area: 3,
        expenses: 1200000,
        estimatedRevenue: 4200000,
        icon: '🫘',
      },
      {
        id: 'l3',
        name: 'Lote Norte',
        product: 'Trigo',
        status: 'completado',
        startDate: new Date('2024-02-01'),
        expectedHarvestDate: new Date('2024-05-01'),
        area: 4,
        expenses: 1800000,
        estimatedRevenue: 5400000,
        harvestedQuantity: 3200,
        actualRevenue: 5120000,
        icon: '🌾',
      },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'siembra':
      return '#3B82F6';
    case 'crecimiento':
      return '#F59E0B';
    case 'cosecha':
      return '#EF4444';
    case 'completado':
      return '#22C55E';
    default:
      return '#52FF94';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'siembra':
      return 'Siembra';
    case 'crecimiento':
      return 'Crecimiento';
    case 'cosecha':
      return 'Cosecha';
    case 'completado':
      return 'Completado';
    default:
      return 'Desconocido';
  }
};

export default function ProductionDashboardScreen() {
  const { width } = useWindowDimensions();
  const [selectedFarm, setSelectedFarm] = useState<string | null>(MOCK_FARMS[0].id);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<'roi' | 'ganancia' | 'fecha'>('roi');
  const [showFilters, setShowFilters] = useState(false);

  const currentFarm = MOCK_FARMS.find(f => f.id === selectedFarm);

  if (!currentFarm) return null;

  // Filtrado y ordenamiento
  let filteredLots = currentFarm.lots;

  if (selectedStatus) {
    filteredLots = filteredLots.filter(l => l.status === selectedStatus);
  }

  if (searchText.trim()) {
    filteredLots = filteredLots.filter(l =>
      l.name.toLowerCase().includes(searchText.toLowerCase()) ||
      l.product.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  filteredLots = filteredLots.sort((a, b) => {
    if (sortBy === 'roi') {
      const roiA = (a.estimatedRevenue - a.expenses) / a.expenses;
      const roiB = (b.estimatedRevenue - b.expenses) / b.expenses;
      return roiB - roiA;
    } else if (sortBy === 'ganancia') {
      const ganananciaA = a.estimatedRevenue - a.expenses;
      const ganananciaB = b.estimatedRevenue - b.expenses;
      return ganananciaB - ganananciaA;
    } else {
      return a.expectedHarvestDate.getTime() - b.expectedHarvestDate.getTime();
    }
  });

  const stats = {
    totalLots: currentFarm.lots.length,
    activeLots: currentFarm.lots.filter(l => l.status !== 'completado').length,
    totalExpenses: currentFarm.lots.reduce((sum, lot) => sum + lot.expenses, 0),
    estimatedRevenue: currentFarm.lots.reduce((sum, lot) => sum + lot.estimatedRevenue, 0),
    completedLots: currentFarm.lots.filter(l => l.status === 'completado').length,
    actualRevenue: currentFarm.lots
      .filter(l => l.status === 'completado')
      .reduce((sum, lot) => sum + (lot.actualRevenue || 0), 0),
  };

  const renderLotCard = ({ item, index }: { item: LotProduction; index: number }) => {
    const statusColor = getStatusColor(item.status);
    const roi = item.actualRevenue
      ? ((item.actualRevenue - item.expenses) / item.expenses * 100).toFixed(1)
      : ((item.estimatedRevenue - item.expenses) / item.expenses * 100).toFixed(1);
    const profit = item.actualRevenue
      ? item.actualRevenue - item.expenses
      : item.estimatedRevenue - item.expenses;

    return (
      <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
        <Pressable
          style={styles.lotCard}
          onPress={() => router.push(`/production-detail?id=${item.id}&farmId=${currentFarm.id}`)}
        >
          <LinearGradient
            colors={[`${statusColor}15`, `${statusColor}08`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardHeader}>
              <View style={styles.lotHeaderLeft}>
                <Text style={styles.lotIcon}>{item.icon}</Text>
                <View>
                  <Text style={styles.lotName}>{item.name}</Text>
                  <Text style={styles.lotProduct}>{item.product}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { borderColor: statusColor, backgroundColor: `${statusColor}20` }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {getStatusLabel(item.status)}
                </Text>
              </View>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.metricsRow}>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Área</Text>
                <Text style={styles.metricValue}>{item.area} ha</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Inversión</Text>
                <Text style={styles.metricValue}>
                  ${(item.expenses / 1000000).toFixed(1)}M
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>ROI</Text>
                <Text style={[styles.metricValue, { color: roi > 0 ? '#22C55E' : '#EF4444' }]}>
                  {roi > 0 ? '+' : ''}{roi}%
                </Text>
              </View>
            </View>

            <View style={styles.profitRow}>
              <Text style={styles.profitLabel}>
                {item.status === 'completado' ? 'Ganancia Real' : 'Ganancia Estimada'}
              </Text>
              <Text style={[styles.profitValue, { color: profit > 0 ? '#22C55E' : '#EF4444' }]}>
                ${profit > 0 ? '+' : ''}${(profit / 1000000).toFixed(2)}M
              </Text>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(currentFarm.lots.findIndex(l => l.id === item.id) + 1) * 25}%`,
                      backgroundColor: statusColor,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {item.expectedHarvestDate.toLocaleDateString('es-CO')}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    );
  };

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
            <Text style={styles.headerTitle}>Producción</Text>
            <Text style={styles.headerSubtitle}>Análisis por finca y lote</Text>
          </View>
          <View style={styles.headerIcon}>
            <Text style={styles.largeIcon}>📊</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Farm Selector */}
          <View style={styles.farmSelector}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.farmsContainer}
            >
              {MOCK_FARMS.map((farm) => (
                <Pressable
                  key={farm.id}
                  style={[
                    styles.farmButton,
                    selectedFarm === farm.id && styles.farmButtonActive,
                  ]}
                  onPress={() => setSelectedFarm(farm.id)}
                >
                  <Text style={styles.farmIcon}>🌾</Text>
                  <View>
                    <Text
                      style={[
                        styles.farmButtonText,
                        selectedFarm === farm.id && styles.farmButtonTextActive,
                      ]}
                    >
                      {farm.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Search */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#52FF94" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar lote o producto..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          {/* Filters */}
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filtros</Text>
              <Pressable
                style={styles.filterToggle}
                onPress={() => setShowFilters(!showFilters)}
              >
                <Ionicons
                  name={showFilters ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#52FF94"
                />
              </Pressable>
            </View>

            {showFilters && (
              <Animated.View entering={FadeInDown.duration(300)}>
                <View style={styles.filterContent}>
                  {/* Status Filter */}
                  <View style={styles.filterGroup}>
                    <Text style={styles.filterGroupTitle}>Por Estado</Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.filterButtonsContainer}
                    >
                      <Pressable
                        style={[
                          styles.filterButton,
                          !selectedStatus && styles.filterButtonActive,
                        ]}
                        onPress={() => setSelectedStatus(null)}
                      >
                        <Text
                          style={[
                            styles.filterButtonText,
                            !selectedStatus && styles.filterButtonTextActive,
                          ]}
                        >
                          Todos
                        </Text>
                      </Pressable>

                      {['siembra', 'crecimiento', 'cosecha', 'completado'].map((status) => (
                        <Pressable
                          key={status}
                          style={[
                            styles.filterButton,
                            selectedStatus === status && styles.filterButtonActive,
                          ]}
                          onPress={() => setSelectedStatus(status)}
                        >
                          <Text
                            style={[
                              styles.filterButtonText,
                              selectedStatus === status && styles.filterButtonTextActive,
                            ]}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.filterDivider} />

                  {/* Sort Filter */}
                  <View style={styles.filterGroup}>
                    <Text style={styles.filterGroupTitle}>Ordenar Por</Text>
                    <View style={styles.sortButtonsContainer}>
                      <Pressable
                        style={[
                          styles.sortButton,
                          sortBy === 'roi' && styles.sortButtonActive,
                        ]}
                        onPress={() => setSortBy('roi')}
                      >
                        <Ionicons
                          name="trending-up"
                          size={14}
                          color={sortBy === 'roi' ? '#52FF94' : 'rgba(255,255,255,0.5)'}
                        />
                        <Text
                          style={[
                            styles.sortButtonText,
                            sortBy === 'roi' && styles.sortButtonTextActive,
                          ]}
                        >
                          Mayor ROI
                        </Text>
                      </Pressable>

                      <Pressable
                        style={[
                          styles.sortButton,
                          sortBy === 'ganancia' && styles.sortButtonActive,
                        ]}
                        onPress={() => setSortBy('ganancia')}
                      >
                        <Ionicons
                          name="cash"
                          size={14}
                          color={sortBy === 'ganancia' ? '#52FF94' : 'rgba(255,255,255,0.5)'}
                        />
                        <Text
                          style={[
                            styles.sortButtonText,
                            sortBy === 'ganancia' && styles.sortButtonTextActive,
                          ]}
                        >
                          Mayor Ganancia
                        </Text>
                      </Pressable>

                      <Pressable
                        style={[
                          styles.sortButton,
                          sortBy === 'fecha' && styles.sortButtonActive,
                        ]}
                        onPress={() => setSortBy('fecha')}
                      >
                        <Ionicons
                          name="calendar"
                          size={14}
                          color={sortBy === 'fecha' ? '#52FF94' : 'rgba(255,255,255,0.5)'}
                        />
                        <Text
                          style={[
                            styles.sortButtonText,
                            sortBy === 'fecha' && styles.sortButtonTextActive,
                          ]}
                        >
                          Próxima Cosecha
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Animated.View>
            )}
          </View>

          {/* Key Metrics */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricCardIcon}>📍</Text>
                <Text style={styles.metricCardLabel}>Lotes Totales</Text>
                <Text style={styles.metricCardValue}>{stats.totalLots}</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricCardIcon}>⏳</Text>
                <Text style={styles.metricCardLabel}>En Producción</Text>
                <Text style={styles.metricCardValue}>{stats.activeLots}</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricCardIcon}>✅</Text>
                <Text style={styles.metricCardLabel}>Completados</Text>
                <Text style={styles.metricCardValue}>{stats.completedLots}</Text>
              </View>
            </View>
          </Animated.View>

          {/* Financial Summary */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.financialCard}>
              <View style={styles.financialHeader}>
                <Text style={styles.financialTitle}>Resumen Financiero</Text>
                <Text style={styles.financialIcon}>💰</Text>
              </View>

              <View style={styles.financialRow}>
                <View style={styles.financialMetric}>
                  <Text style={styles.financialLabel}>Inversión Total</Text>
                  <Text style={styles.financialValue}>
                    ${(stats.totalExpenses / 1000000).toFixed(1)}M
                  </Text>
                </View>
                <View style={styles.financialDivider} />
                <View style={styles.financialMetric}>
                  <Text style={styles.financialLabel}>Ingresos Estimados</Text>
                  <Text style={[styles.financialValue, { color: '#52FF94' }]}>
                    ${(stats.estimatedRevenue / 1000000).toFixed(1)}M
                  </Text>
                </View>
              </View>

              <View style={styles.financialDivider2} />

              <View style={styles.financialRow}>
                <View style={styles.financialMetric}>
                  <Text style={styles.financialLabel}>Ganancia Estimada</Text>
                  <Text style={[styles.financialValue, { color: '#22C55E' }]}>
                    ${((stats.estimatedRevenue - stats.totalExpenses) / 1000000).toFixed(2)}M
                  </Text>
                </View>
                <View style={styles.financialDivider} />
                <View style={styles.financialMetric}>
                  <Text style={styles.financialLabel}>ROI General</Text>
                  <Text style={[styles.financialValue, { color: '#52FF94' }]}>
                    {((stats.estimatedRevenue - stats.totalExpenses) / stats.totalExpenses * 100).toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Lots Section */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.lotsSection}>
            <View style={styles.lotsHeader}>
              <View>
                <Text style={styles.lotsTitle}>Lotes de {currentFarm.name}</Text>
                <Text style={styles.lotsCount}>{filteredLots.length} resultado{filteredLots.length !== 1 ? 's' : ''}</Text>
              </View>
              <Pressable
                style={styles.newLotButton}
                onPress={() => router.push('/lot-create')}
              >
                <Ionicons name="add" size={16} color="#52FF94" />
                <Text style={styles.newLotButtonText}>Nuevo</Text>
              </Pressable>
            </View>

            {filteredLots.length > 0 ? (
              <FlatList
                data={filteredLots}
                renderItem={renderLotCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.lotsList}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>🔍</Text>
                <Text style={styles.emptyStateText}>No hay lotes que coincidan</Text>
                <Text style={styles.emptyStateSubtext}>Intenta cambiar los filtros</Text>
              </View>
            )}
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
    marginBottom: 8,
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
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  headerIcon: {
    fontSize: 28,
  },

  largeIcon: {
    fontSize: 28,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  farmSelector: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  farmsContainer: {
    gap: 8,
  },

  farmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    gap: 8,
  },

  farmButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  farmIcon: {
    fontSize: 18,
  },

  farmButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  farmButtonTextActive: {
    color: '#52FF94',
    fontWeight: '700',
  },

  metricsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  metricCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },

  metricCardIcon: {
    fontSize: 20,
  },

  metricCardLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  metricCardValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#52FF94',
  },

  financialCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(82,255,148,0.08)',
    padding: 14,
    gap: 12,
  },

  financialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  financialTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
  },

  financialIcon: {
    fontSize: 20,
  },

  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  financialMetric: {
    flex: 1,
  },

  financialLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 4,
  },

  financialValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  financialDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(82,255,148,0.1)',
    marginHorizontal: 8,
  },

  financialDivider2: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  lotsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  lotsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  lotsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  newLotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.1)',
    gap: 4,
  },

  newLotButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#52FF94',
  },

  lotsList: {
    gap: 12,
  },

  lotCard: {
    borderRadius: 14,
    overflow: 'hidden',
  },

  cardGradient: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 12,
    gap: 10,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  lotHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },

  lotIcon: {
    fontSize: 28,
  },

  lotName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  lotProduct: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },

  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },

  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  metric: {
    alignItems: 'center',
  },

  metricLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 4,
  },

  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  profitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(82,255,148,0.1)',
  },

  profitLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  profitValue: {
    fontSize: 15,
    fontWeight: '800',
  },

  progressContainer: {
    gap: 6,
  },

  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  progressText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'right',
  },

  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(82,255,148,0.08)',
    paddingHorizontal: 12,
    gap: 8,
  },

  searchIcon: {
    marginRight: 4,
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 11,
    fontSize: 14,
    fontWeight: '500',
  },

  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
  },

  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  filterTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#52FF94',
  },

  filterToggle: {
    padding: 6,
    marginRight: -6,
  },

  filterContent: {
    gap: 12,
    paddingBottom: 12,
  },

  filterGroup: {
    gap: 8,
  },

  filterGroupTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
  },

  filterButtonsContainer: {
    gap: 8,
  },

  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
  },

  filterButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  filterButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  filterButtonTextActive: {
    color: '#52FF94',
    fontWeight: '700',
  },

  filterDivider: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  sortButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  sortButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    gap: 4,
  },

  sortButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  sortButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  sortButtonTextActive: {
    color: '#52FF94',
    fontWeight: '700',
  },

  lotsCount: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
    fontWeight: '500',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },

  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  emptyStateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  emptyStateSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
});
