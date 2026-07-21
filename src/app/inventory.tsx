import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, FlatList, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface InventoryItem {
  id: string;
  name: string;
  category: 'animales' | 'materiales' | 'abonos' | 'herramientas' | 'semillas' | 'medicinas' | 'equipos';
  quantity: number;
  unit: string;
  minStock: number;
  unitPrice: number;
  totalValue: number;
  icon: string;
  status: 'normal' | 'bajo' | 'critico';
  lastUpdated: Date;
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Vacas Lecheras',
    category: 'animales',
    quantity: 15,
    unit: 'cabezas',
    minStock: 10,
    unitPrice: 2000000,
    totalValue: 30000000,
    icon: '🐄',
    status: 'normal',
    lastUpdated: new Date('2024-07-19'),
  },
  {
    id: '2',
    name: 'Pollos de Engorde',
    category: 'animales',
    quantity: 120,
    unit: 'cabezas',
    minStock: 100,
    unitPrice: 25000,
    totalValue: 3000000,
    icon: '🐔',
    status: 'normal',
    lastUpdated: new Date('2024-07-15'),
  },
  {
    id: '3',
    name: 'Fertilizante NPK 15-15-15',
    category: 'abonos',
    quantity: 45,
    unit: 'sacos',
    minStock: 20,
    unitPrice: 35000,
    totalValue: 1575000,
    icon: '🧂',
    status: 'normal',
    lastUpdated: new Date('2024-07-18'),
  },
  {
    id: '4',
    name: 'Urea',
    category: 'abonos',
    quantity: 8,
    unit: 'sacos',
    minStock: 15,
    unitPrice: 40000,
    totalValue: 320000,
    icon: '🧪',
    status: 'critico',
    lastUpdated: new Date('2024-07-10'),
  },
  {
    id: '5',
    name: 'Semilla de Maíz Híbrido',
    category: 'semillas',
    quantity: 85,
    unit: 'kg',
    minStock: 50,
    unitPrice: 5000,
    totalValue: 425000,
    icon: '🌽',
    status: 'normal',
    lastUpdated: new Date('2024-07-19'),
  },
  {
    id: '6',
    name: 'Tractor Agrícola',
    category: 'equipos',
    quantity: 1,
    unit: 'unidad',
    minStock: 1,
    unitPrice: 25000000,
    totalValue: 25000000,
    icon: '🚜',
    status: 'normal',
    lastUpdated: new Date('2024-06-01'),
  },
  {
    id: '7',
    name: 'Pala',
    category: 'herramientas',
    quantity: 12,
    unit: 'unidades',
    minStock: 8,
    unitPrice: 45000,
    totalValue: 540000,
    icon: '🔨',
    status: 'normal',
    lastUpdated: new Date('2024-07-17'),
  },
  {
    id: '8',
    name: 'Manguera de Riego',
    category: 'materiales',
    quantity: 3,
    unit: 'rollos',
    minStock: 2,
    unitPrice: 250000,
    totalValue: 750000,
    icon: '🔌',
    status: 'bajo',
    lastUpdated: new Date('2024-07-16'),
  },
  {
    id: '9',
    name: 'Medicinas para Ganado',
    category: 'medicinas',
    quantity: 5,
    unit: 'cajas',
    minStock: 3,
    unitPrice: 150000,
    totalValue: 750000,
    icon: '💊',
    status: 'normal',
    lastUpdated: new Date('2024-07-14'),
  },
];

const CATEGORIES = [
  { id: 'animales', label: 'Animales', icon: '🐄' },
  { id: 'abonos', label: 'Abonos', icon: '🧂' },
  { id: 'semillas', label: 'Semillas', icon: '🌽' },
  { id: 'herramientas', label: 'Herramientas', icon: '🔨' },
  { id: 'materiales', label: 'Materiales', icon: '📦' },
  { id: 'medicinas', label: 'Medicinas', icon: '💊' },
  { id: 'equipos', label: 'Equipos', icon: '🚜' },
];

export default function InventoryScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const { width } = useWindowDimensions();

  let filteredItems = MOCK_INVENTORY;

  if (selectedCategory) {
    filteredItems = filteredItems.filter(item => item.category === selectedCategory);
  }

  if (searchText.trim()) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const criticalItems = MOCK_INVENTORY.filter(item => item.status === 'critico');
  const lowItems = MOCK_INVENTORY.filter(item => item.status === 'bajo');
  const totalValue = MOCK_INVENTORY.reduce((sum, item) => sum + item.totalValue, 0);

  const renderItemCard = ({ item, index }: { item: InventoryItem; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable
        style={styles.itemCard}
        onPress={() => router.push(`/inventory-detail?id=${item.id}`)}
      >
        <LinearGradient
          colors={[`rgba(82,255,148,0.1)`, `rgba(82,255,148,0.05)`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.itemHeader}>
            <View style={styles.itemIconContainer}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
            </View>

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemUpdated}>•</Text>
                <Text style={styles.itemUpdated}>
                  {item.lastUpdated.toLocaleDateString('es-CO')}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === 'critico'
                      ? 'rgba(239,68,68,0.2)'
                      : item.status === 'bajo'
                      ? 'rgba(245,158,11,0.2)'
                      : 'rgba(34,197,94,0.2)',
                },
              ]}
            >
              <Ionicons
                name={
                  item.status === 'critico'
                    ? 'alert-circle'
                    : item.status === 'bajo'
                    ? 'warning'
                    : 'checkmark-circle'
                }
                size={16}
                color={
                  item.status === 'critico'
                    ? '#EF4444'
                    : item.status === 'bajo'
                    ? '#F59E0B'
                    : '#22C55E'
                }
              />
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.itemStats}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Stock</Text>
              <Text style={styles.statValue}>
                {item.quantity} {item.unit}
              </Text>
              {item.quantity < item.minStock && (
                <Text style={styles.statWarning}>Min: {item.minStock}</Text>
              )}
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Precio Unit.</Text>
              <Text style={styles.statValue}>
                ${(item.unitPrice / 1000).toFixed(0)}K
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Valor Total</Text>
              <Text style={[styles.statValue, { color: '#52FF94' }]}>
                ${(item.totalValue / 1000000).toFixed(1)}M
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="arrow-up" size={14} color="#22C55E" />
              <Text style={styles.actionButtonText}>Entrada</Text>
            </Pressable>
            <Pressable style={[styles.actionButton, styles.actionButtonSecondary]}>
              <Ionicons name="arrow-down" size={14} color="#EF4444" />
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                Salida
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

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
            <Text style={styles.headerTitle}>Inventario</Text>
            <Text style={styles.headerSubtitle}>Gestiona tus recursos</Text>
          </View>
          <Text style={styles.headerIcon}>📦</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Total Value Card */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <LinearGradient
              colors={['rgba(82,255,148,0.2)', 'rgba(34,197,94,0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.totalCard}
            >
              <View style={styles.totalLeft}>
                <Text style={styles.totalLabel}>Valor Total del Inventario</Text>
                <Text style={styles.totalValue}>
                  ${(totalValue / 1000000).toFixed(2)}M
                </Text>
              </View>
              <View style={styles.totalRight}>
                <Text style={styles.itemCount}>{MOCK_INVENTORY.length}</Text>
                <Text style={styles.itemCountLabel}>Ítems</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Alerts */}
          {(criticalItems.length > 0 || lowItems.length > 0) && (
            <Animated.View entering={FadeInDown.duration(400).delay(100)}>
              <View style={styles.alertsSection}>
                <Pressable
                  style={styles.alertsHeader}
                  onPress={() => setShowAlerts(!showAlerts)}
                >
                  <View style={styles.alertsTitle}>
                    <Ionicons name="alert-circle" size={18} color="#EF4444" />
                    <Text style={styles.alertsTitleText}>
                      {criticalItems.length} Crítico{criticalItems.length !== 1 ? 's' : ''} • {lowItems.length} Bajo
                      {lowItems.length !== 1 ? 's' : ''}
                    </Text>
                  </View>
                  <Ionicons
                    name={showAlerts ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#52FF94"
                  />
                </Pressable>

                {showAlerts && (
                  <View style={styles.alertsList}>
                    {criticalItems.map(item => (
                      <View key={item.id} style={styles.alertItem}>
                        <View style={styles.alertIndicator} />
                        <View style={styles.alertContent}>
                          <Text style={styles.alertItemName}>{item.name}</Text>
                          <Text style={styles.alertItemText}>
                            Stock: {item.quantity} {item.unit} (Mín: {item.minStock})
                          </Text>
                        </View>
                      </View>
                    ))}
                    {lowItems.map(item => (
                      <View key={item.id} style={styles.alertItem}>
                        <View style={[styles.alertIndicator, styles.alertIndicatorWarning]} />
                        <View style={styles.alertContent}>
                          <Text style={styles.alertItemName}>{item.name}</Text>
                          <Text style={styles.alertItemText}>
                            Stock: {item.quantity} {item.unit} (Mín: {item.minStock})
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </Animated.View>
          )}

          {/* Search */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#52FF94" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar artículo..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          {/* Categories */}
          <View style={styles.categoriesSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              <Pressable
                style={[
                  styles.categoryButton,
                  !selectedCategory && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text style={styles.categoryIcon}>📦</Text>
                <Text
                  style={[
                    styles.categoryText,
                    !selectedCategory && styles.categoryTextActive,
                  ]}
                >
                  Todos
                </Text>
              </Pressable>

              {CATEGORIES.map(cat => (
                <Pressable
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat.id && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === cat.id && styles.categoryTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Items */}
          <View style={styles.itemsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Artículos ({filteredItems.length})
              </Text>
              <Pressable
                style={styles.addButton}
                onPress={() => router.push('/inventory-add')}
              >
                <Ionicons name="add" size={18} color="#52FF94" />
                <Text style={styles.addButtonText}>Agregar</Text>
              </Pressable>
            </View>

            {filteredItems.length > 0 ? (
              <FlatList
                data={filteredItems}
                renderItem={renderItemCard}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.itemsList}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>🔍</Text>
                <Text style={styles.emptyStateText}>No hay artículos</Text>
                <Text style={styles.emptyStateSubtext}>Intenta otro filtro o búsqueda</Text>
              </View>
            )}
          </View>
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

  scrollContent: {
    paddingBottom: 24,
  },

  totalCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLeft: {
    flex: 1,
  },

  totalLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 6,
  },

  totalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#52FF94',
  },

  totalRight: {
    alignItems: 'center',
    gap: 4,
  },

  itemCount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  itemCountLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  alertsSection: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
    backgroundColor: 'rgba(239,68,68,0.05)',
    overflow: 'hidden',
  },

  alertsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  alertsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  alertsTitleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },

  alertsList: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(239,68,68,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
  },

  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },

  alertIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },

  alertIndicatorWarning: {
    backgroundColor: '#F59E0B',
  },

  alertContent: {
    flex: 1,
  },

  alertItemName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  alertItemText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
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

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 11,
    fontSize: 14,
    fontWeight: '500',
  },

  categoriesSection: {
    paddingVertical: 12,
  },

  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },

  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    gap: 6,
  },

  categoryButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  categoryIcon: {
    fontSize: 14,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  categoryTextActive: {
    color: '#52FF94',
    fontWeight: '700',
  },

  itemsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  addButton: {
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

  addButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#52FF94',
  },

  itemsList: {
    gap: 12,
  },

  itemCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  cardGradient: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 12,
    gap: 10,
  },

  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(82,255,148,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemIcon: {
    fontSize: 20,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },

  itemCategory: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  itemUpdated: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
  },

  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  itemStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
  },

  statLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
    marginBottom: 4,
  },

  statValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  statWarning: {
    fontSize: 8,
    color: '#F59E0B',
    marginTop: 2,
    fontWeight: '600',
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },

  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(34,197,94,0.15)',
    gap: 4,
  },

  actionButtonSecondary: {
    backgroundColor: 'rgba(239,68,68,0.15)',
  },

  actionButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#22C55E',
  },

  actionButtonTextSecondary: {
    color: '#EF4444',
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
