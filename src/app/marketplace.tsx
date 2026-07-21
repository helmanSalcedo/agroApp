import { View, Text, StyleSheet, ScrollView, FlatList, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Fertilizante NPK 10-10-10',
    category: 'Fertilizantes',
    price: 45000,
    rating: 4.8,
    reviews: 124,
    image: '🌱',
    seller: 'AgroSupply Co',
    inStock: 250,
    discount: 15,
  },
  {
    id: 'prod-2',
    name: 'Semillas Maíz Amarillo',
    category: 'Semillas',
    price: 120000,
    rating: 4.9,
    reviews: 89,
    image: '🌾',
    seller: 'SeedMaster',
    inStock: 120,
    discount: 0,
  },
  {
    id: 'prod-3',
    name: 'Plaguicida Orgánico 500ml',
    category: 'Pesticidas',
    price: 35000,
    rating: 4.6,
    reviews: 56,
    image: '🧪',
    seller: 'BioProtect',
    inStock: 180,
    discount: 10,
  },
  {
    id: 'prod-4',
    name: 'Bomba de Agua Solar',
    category: 'Riego',
    price: 850000,
    rating: 4.7,
    reviews: 42,
    image: '💧',
    seller: 'TechAgro',
    inStock: 15,
    discount: 20,
  },
  {
    id: 'prod-5',
    name: 'Cal Agrícola 25kg',
    category: 'Insumos',
    price: 28000,
    rating: 4.5,
    reviews: 103,
    image: '⚪',
    seller: 'Minerales Plus',
    inStock: 500,
    discount: 5,
  },
  {
    id: 'prod-6',
    name: 'Compostador Automático',
    category: 'Equipos',
    price: 450000,
    rating: 4.9,
    reviews: 67,
    image: '♻️',
    seller: 'EcoFarm',
    inStock: 8,
    discount: 25,
  },
];

const CATEGORIES = [
  { id: 'todos', label: 'Todos', icon: '🛍️' },
  { id: 'fertilizantes', label: 'Fertilizantes', icon: '🌱' },
  { id: 'semillas', label: 'Semillas', icon: '🌾' },
  { id: 'pesticidas', label: 'Pesticidas', icon: '🧪' },
  { id: 'riego', label: 'Riego', icon: '💧' },
  { id: 'equipos', label: 'Equipos', icon: '⚙️' },
];

export default function MarketplaceScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchText, setSearchText] = useState('');

  const isTablet = width > 768;

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'todos' || p.category.toLowerCase() === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProductCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable style={styles.productCard}>
        <LinearGradient
          colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.productGradient}
        >
          {/* Badge Descuento */}
          {item.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
          )}

          {/* Imagen */}
          <View style={styles.productImage}>
            <Text style={styles.productImageEmoji}>{item.image}</Text>
          </View>

          {/* Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.productCategory}>{item.category}</Text>

            {/* Rating */}
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.ratingValue}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviews})</Text>
            </View>

            {/* Price */}
            <View style={styles.priceSection}>
              <Text style={styles.price}>
                ${(item.price / 1000).toFixed(0)}k
              </Text>
              {item.discount > 0 && (
                <Text style={styles.originalPrice}>
                  ${((item.price / (1 - item.discount / 100)) / 1000).toFixed(0)}k
                </Text>
              )}
            </View>

            {/* Stock */}
            <View
              style={[
                styles.stockBadge,
                item.inStock < 20 && styles.stockBadgeWarning,
              ]}
            >
              <Ionicons
                name={item.inStock > 0 ? 'checkmark-circle' : 'close-circle'}
                size={14}
                color={item.inStock > 0 ? '#10B981' : '#EF4444'}
              />
              <Text
                style={[
                  styles.stockText,
                  item.inStock > 0
                    ? styles.stockTextOk
                    : styles.stockTextNo,
                ]}
              >
                {item.inStock > 0
                  ? `${item.inStock} disponibles`
                  : 'Sin stock'}
              </Text>
            </View>

            {/* Seller */}
            <Text style={styles.sellerName}>Por: {item.seller}</Text>
          </View>

          {/* Button */}
          <Pressable style={styles.buyButton}>
            <Ionicons name="cart" size={18} color="#020403" />
            <Text style={styles.buyButtonText}>Agregar</Text>
          </Pressable>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <Pressable style={styles.cartButton}>
            <Ionicons name="cart" size={24} color="#52FF94" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </Pressable>
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInDown.duration(400).delay(50)} style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="rgba(255,255,255,0.5)" />
            <Pressable style={{ flex: 1 }}>
              <Text style={styles.searchPlaceholder}>Buscar productos...</Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Categories */}
        <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.categoriesSection}>
          <FlatList
            data={CATEGORIES}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.categoryChip,
                  selectedCategory === item.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <Text style={styles.categoryChipIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === item.id &&
                    styles.categoryChipTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          />
        </Animated.View>

        {/* Stats Banner */}
        <Animated.View entering={FadeInDown.duration(400).delay(150)}>
          <View style={styles.statsBanner}>
            <LinearGradient
              colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statsGradient}
            >
              <View style={styles.statItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <View style={{ gap: 2 }}>
                  <Text style={styles.statLabel}>Productos</Text>
                  <Text style={styles.statValue}>{filteredProducts.length}</Text>
                </View>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="star" size={20} color="#F59E0B" />
                <View style={{ gap: 2 }}>
                  <Text style={styles.statLabel}>Rating Prom.</Text>
                  <Text style={styles.statValue}>4.7★</Text>
                </View>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="flash" size={20} color="#EC4899" />
                <View style={{ gap: 2 }}>
                  <Text style={styles.statLabel}>Ofertas</Text>
                  <Text style={styles.statValue}>5</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Products Grid */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={item => item.id}
          numColumns={isTablet ? 2 : 1}
          columnWrapperStyle={isTablet ? styles.gridRow : undefined}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, textAlign: 'center' },
  cartButton: { position: 'relative', padding: 4 },
  cartBadge: { position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderRadius: 10, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center' },
  cartBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  searchSection: { paddingHorizontal: 16, paddingVertical: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', gap: 8 },
  searchPlaceholder: { color: 'rgba(255,255,255,0.4)', fontSize: 14 },
  categoriesSection: { borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  categoriesContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  categoryChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)', backgroundColor: 'rgba(82,255,148,0.05)', flexDirection: 'row', alignItems: 'center', gap: 6 },
  categoryChipActive: { borderColor: '#52FF94', backgroundColor: 'rgba(82,255,148,0.2)' },
  categoryChipIcon: { fontSize: 16 },
  categoryChipText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  categoryChipTextActive: { color: '#52FF94' },
  statsBanner: { paddingHorizontal: 16, paddingVertical: 12 },
  statsGradient: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  statValue: { fontSize: 13, fontWeight: '700', color: '#52FF94' },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(82,255,148,0.2)' },
  productsList: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  gridRow: { gap: 12 },
  productCard: { flex: 1, borderRadius: 12, overflow: 'hidden' },
  productGradient: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, gap: 10 },
  discountBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, zIndex: 10 },
  discountText: { color: '#FFFFFF', fontWeight: '700', fontSize: 11 },
  productImage: { width: '100%', height: 100, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.1)', justifyContent: 'center', alignItems: 'center' },
  productImageEmoji: { fontSize: 40 },
  productInfo: { gap: 8 },
  productName: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  productCategory: { fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: '500' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingValue: { fontSize: 11, fontWeight: '700', color: '#F59E0B' },
  reviewCount: { fontSize: 10, color: 'rgba(255,255,255,0.5)' },
  priceSection: { gap: 2 },
  price: { fontSize: 14, fontWeight: '800', color: '#52FF94' },
  originalPrice: { fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecorationLine: 'line-through' },
  stockBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: 'rgba(16,185,129,0.15)' },
  stockBadgeWarning: { backgroundColor: 'rgba(245,158,11,0.15)' },
  stockText: { fontSize: 10, fontWeight: '600' },
  stockTextOk: { color: '#10B981' },
  stockTextNo: { color: '#EF4444' },
  sellerName: { fontSize: 9, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' },
  buyButton: { backgroundColor: '#52FF94', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 8 },
  buyButtonText: { color: '#020403', fontWeight: '700', fontSize: 12 },
});
