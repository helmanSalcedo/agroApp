import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Mock data - En realidad vendría de un API
const MOCK_PRODUCT = {
  id: '1',
  name: 'Maíz Amarillo Premium',
  category: 'cereales',
  price: 1200,
  unit: 'kg',
  quantity: 5000,
  image: '🌽',
  description: 'Maíz amarillo de alta calidad, cultivado sin pesticidas químicos. Ideal para alimentación animal y consumo humano.',
  granary: {
    id: 'g1',
    name: 'Granero Los Campos',
    location: 'Cundinamarca',
    rating: 4.8,
    reviews: 234,
    verified: true,
  },
  distance: 2.3,
  inStock: true,
  specifications: [
    { label: 'Humedad', value: '12%' },
    { label: 'Pureza', value: '98%' },
    { label: 'Germinación', value: '95%' },
  ],
  reviews: [
    { author: 'Juan García', rating: 5, text: 'Excelente calidad, entrega rápida' },
    { author: 'María López', rating: 4, text: 'Buen precio, llegó en buen estado' },
  ],
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Detalles del Producto</Text>
          <Pressable style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#52FF94" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Product Image */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <View style={styles.imageContainer}>
              <Text style={styles.productImage}>{MOCK_PRODUCT.image}</Text>
            </View>
          </Animated.View>

          {/* Product Info */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.infoSection}>
            <View style={styles.titleRow}>
              <View style={styles.titleContent}>
                <Text style={styles.productName}>{MOCK_PRODUCT.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>
                    {MOCK_PRODUCT.category.charAt(0).toUpperCase() + MOCK_PRODUCT.category.slice(1)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>${MOCK_PRODUCT.price.toLocaleString('es-CO')}</Text>
              <Text style={styles.unit}>por {MOCK_PRODUCT.unit}</Text>
            </View>

            <Text style={styles.description}>{MOCK_PRODUCT.description}</Text>
          </Animated.View>

          {/* Stock Info */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Disponibilidad</Text>
              <View style={styles.stockRow}>
                <View style={styles.stockInfo}>
                  <Ionicons name="cube" size={20} color="#52FF94" />
                  <View>
                    <Text style={styles.stockLabel}>En Stock</Text>
                    <Text style={styles.stockValue}>{MOCK_PRODUCT.quantity} {MOCK_PRODUCT.unit}</Text>
                  </View>
                </View>
                <View style={styles.distanceInfo}>
                  <Ionicons name="location" size={20} color="#3B82F6" />
                  <View>
                    <Text style={styles.distanceLabel}>Distancia</Text>
                    <Text style={styles.distanceValue}>{MOCK_PRODUCT.distance} km</Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Granary Info */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Información del Granero</Text>
              <View style={styles.granaryCard}>
                <View style={styles.granaryHeader}>
                  <View style={styles.granaryIcon}>
                    <Text style={styles.granaryIconText}>🏪</Text>
                  </View>
                  <View style={styles.granaryContent}>
                    <View style={styles.granaryNameRow}>
                      <Text style={styles.granaryName}>{MOCK_PRODUCT.granary.name}</Text>
                      {MOCK_PRODUCT.granary.verified && (
                        <View style={styles.verifiedBadge}>
                          <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                          <Text style={styles.verifiedText}>Verificado</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.locationRow}>
                      <Ionicons name="map" size={14} color="rgba(255,255,255,0.5)" />
                      <Text style={styles.locationText}>{MOCK_PRODUCT.granary.location}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.ratingContainer}>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingValue}>{MOCK_PRODUCT.granary.rating}</Text>
                  </View>
                  <Text style={styles.reviewsCount}>({MOCK_PRODUCT.granary.reviews} reseñas)</Text>
                </View>

                <Pressable style={styles.contactButton}>
                  <Ionicons name="call" size={16} color="#52FF94" />
                  <Text style={styles.contactButtonText}>Contactar Granero</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>

          {/* Specifications */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Especificaciones</Text>
              {MOCK_PRODUCT.specifications.map((spec, index) => (
                <View key={index} style={styles.specRow}>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Reviews */}
          <Animated.View entering={FadeInDown.duration(400).delay(500)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Reseñas</Text>
              {MOCK_PRODUCT.reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewAuthor}>{review.author}</Text>
                    <View style={styles.reviewRating}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < review.rating ? 'star' : 'star-outline'}
                          size={14}
                          color={i < review.rating ? '#FFD700' : 'rgba(255,215,0,0.3)'}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.text}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Buy Button */}
          <Animated.View entering={FadeInDown.duration(400).delay(600)} style={styles.buySection}>
            <Pressable style={styles.buynow}>
              <LinearGradient
                colors={['#52FF94', '#22C55E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buyGradient}
              >
                <Ionicons name="cart" size={20} color="#041109" />
                <Text style={styles.buyText}>Comprar Ahora</Text>
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
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  backButton: {
    padding: 8,
    marginLeft: -8,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  favoriteButton: {
    padding: 8,
    marginRight: -8,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  imageContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(82,255,148,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
  },

  productImage: {
    fontSize: 96,
  },

  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  titleContent: {
    flex: 1,
  },

  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#52FF94',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },

  price: {
    fontSize: 32,
    fontWeight: '800',
    color: '#52FF94',
  },

  unit: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  description: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 20,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.03)',
    padding: 14,
    gap: 10,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
  },

  stockRow: {
    flexDirection: 'row',
    gap: 12,
  },

  stockInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  stockLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  stockValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },

  distanceInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  distanceLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  distanceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },

  granaryCard: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(82,255,148,0.1)',
    paddingTop: 10,
    gap: 10,
  },

  granaryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  granaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(82,255,148,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  granaryIconText: {
    fontSize: 20,
  },

  granaryContent: {
    flex: 1,
    gap: 4,
  },

  granaryNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  granaryName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(34,197,94,0.15)',
  },

  verifiedText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#22C55E',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  locationText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(255,215,0,0.15)',
  },

  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
  },

  reviewsCount: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },

  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.1)',
    gap: 6,
  },

  contactButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52FF94',
  },

  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  specLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  specValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  reviewItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    gap: 6,
  },

  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reviewAuthor: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },

  reviewText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 16,
  },

  buySection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  buynow: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  buyGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 8,
  },

  buyText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#041109',
  },
});
