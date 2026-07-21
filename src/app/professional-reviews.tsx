import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import React, { useState } from 'react';

const MOCK_REVIEWS = [
  {
    id: '1',
    clientName: 'Juan García',
    clientAvatar: 'JG',
    rating: 5,
    review: 'Excelente profesional, muy atento y dedicado. Las recomendaciones fueron muy útiles.',
    date: '2026-07-10',
    service: 'Consultoría Agrícola',
    verified: true,
  },
  {
    id: '2',
    clientName: 'María López',
    clientAvatar: 'ML',
    rating: 4,
    review: 'Buena asesoría, aunque hubiera preferido más seguimiento posterior.',
    date: '2026-06-28',
    service: 'Diagnóstico de Plagas',
    verified: true,
  },
  {
    id: '3',
    clientName: 'Carlos Ruiz',
    clientAvatar: 'CR',
    rating: 5,
    review: 'Increíble! Resolvió el problema de mi cultivo en poco tiempo. Lo recomiendo ampliamente.',
    date: '2026-06-15',
    service: 'Asesoría de Riego',
    verified: true,
  },
  {
    id: '4',
    clientName: 'Ana Martínez',
    clientAvatar: 'AM',
    rating: 4,
    review: 'Profesional con buenos conocimientos. La sesión fue muy productiva.',
    date: '2026-06-01',
    service: 'Capacitación en Sistemas',
    verified: true,
  },
  {
    id: '5',
    clientName: 'Roberto Mendez',
    clientAvatar: 'RM',
    rating: 5,
    review: 'Excelente trabajo en el diagnostico. Muy recomendado para cualquier agricultor.',
    date: '2026-05-20',
    service: 'Revisión de Cultivos',
    verified: true,
  },
];

const RATING_STATS = {
  average: 4.6,
  total: 5,
  distribution: {
    5: 3,
    4: 2,
    3: 0,
    2: 0,
    1: 0,
  },
};

export default function ProfessionalReviewsScreen() {
  const router = useRouter();
  const [filterRating, setFilterRating] = useState<number | 'all'>(0);

  const filteredReviews = filterRating === 'all'
    ? MOCK_REVIEWS
    : MOCK_REVIEWS.filter(r => r.rating === filterRating);

  const renderStars = (rating: number, size: number = 14) => (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? 'star' : 'star-outline'}
          size={size}
          color={star <= rating ? '#FCD34D' : 'rgba(255,255,255,0.3)'}
        />
      ))}
    </View>
  );

  const renderReviewCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInDown.duration(400).delay(index * 50)}
      style={{ marginBottom: 12 }}
    >
      <LinearGradient
        colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.reviewCard}
      >
        {/* Header */}
        <View style={styles.reviewHeader}>
          <View style={styles.reviewClientInfo}>
            <View style={styles.reviewAvatar}>
              <Text style={styles.reviewAvatarText}>{item.clientAvatar}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.reviewClientName}>
                <Text style={styles.clientName}>{item.clientName}</Text>
                {item.verified && (
                  <Ionicons name="checkmark-circle" size={12} color="#52FF94" />
                )}
              </View>
              <Text style={styles.reviewDate}>
                {new Date(item.date).toLocaleDateString('es-CO', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>
          {renderStars(item.rating, 16)}
        </View>

        {/* Service Tag */}
        <View style={styles.serviceTag}>
          <Ionicons name="briefcase-outline" size={12} color="#52FF94" />
          <Text style={styles.serviceTagText}>{item.service}</Text>
        </View>

        {/* Review Text */}
        <Text style={styles.reviewText}>{item.review}</Text>

        {/* Action Buttons */}
        <View style={styles.reviewActions}>
          <Pressable style={styles.actionIcon}>
            <Ionicons name="heart-outline" size={16} color="rgba(255,255,255,0.5)" />
            <Text style={styles.actionText}>Útil</Text>
          </Pressable>
          <Pressable style={styles.actionIcon}>
            <Ionicons name="share-social-outline" size={16} color="rgba(255,255,255,0.5)" />
            <Text style={styles.actionText}>Compartir</Text>
          </Pressable>
          <Pressable style={styles.actionIcon}>
            <Ionicons name="more-vertical-outline" size={16} color="rgba(255,255,255,0.5)" />
          </Pressable>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />

      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Mis Reseñas</Text>
            <Text style={styles.headerSubtitle}>Comentarios de clientes</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="star" size={24} color="#FCD34D" />
          </View>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* RATING SUMMARY */}
          <Animated.View entering={FadeInDown.duration(400).delay(50)}>
            <LinearGradient
              colors={['rgba(82,255,148,0.12)', 'rgba(82,255,148,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ratingCard}
            >
              <View style={styles.ratingMain}>
                <View style={styles.ratingBig}>
                  <Text style={styles.ratingValue}>{RATING_STATS.average}</Text>
                  <Text style={styles.ratingOutOf}>/ {RATING_STATS.total}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  {renderStars(Math.round(RATING_STATS.average), 18)}
                  <Text style={styles.ratingCount}>
                    Basado en {MOCK_REVIEWS.length} reseñas
                  </Text>
                </View>
              </View>

              {/* Rating Distribution */}
              <View style={styles.distributionSection}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <View key={star} style={styles.distributionRow}>
                    <View style={styles.starLabel}>
                      <Text style={styles.starLabelText}>{star}</Text>
                      <Ionicons name="star" size={12} color="#FCD34D" />
                    </View>
                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          {
                            width: `${(RATING_STATS.distribution[star as keyof typeof RATING_STATS.distribution] / MOCK_REVIEWS.length) * 100}%`,
                            backgroundColor:
                              star === 5
                                ? '#22C55E'
                                : star === 4
                                  ? '#3B82F6'
                                  : star === 3
                                    ? '#F59E0B'
                                    : '#EF4444',
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.barCount}>
                      {RATING_STATS.distribution[star as keyof typeof RATING_STATS.distribution]}
                    </Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </Animated.View>

          {/* FILTERS */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.filterContainer}>
              <Pressable
                style={[
                  styles.filterButton,
                  filterRating === 'all' && styles.filterButtonActive,
                ]}
                onPress={() => setFilterRating('all')}
              >
                <Text
                  style={[
                    styles.filterText,
                    filterRating === 'all' && styles.filterTextActive,
                  ]}
                >
                  Todas
                </Text>
              </Pressable>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Pressable
                  key={rating}
                  style={[
                    styles.filterButton,
                    filterRating === rating && styles.filterButtonActive,
                  ]}
                  onPress={() => setFilterRating(rating)}
                >
                  <Ionicons name="star" size={12} color={filterRating === rating ? '#020403' : '#FCD34D'} />
                  <Text
                    style={[
                      styles.filterText,
                      filterRating === rating && styles.filterTextActive,
                    ]}
                  >
                    {rating}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* REVIEWS LIST */}
          <Animated.View entering={FadeInDown.duration(400).delay(150)}>
            <View style={styles.listSection}>
              <Text style={styles.reviewsTitle}>
                {filterRating === 'all'
                  ? 'Todas las reseñas'
                  : `Reseñas de ${filterRating} ${filterRating === 1 ? 'estrella' : 'estrellas'}`}
              </Text>
              <FlatList
                data={filteredReviews}
                renderItem={renderReviewCard}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    gap: 12,
  },
  headerContent: { flex: 1, gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  headerIcon: { padding: 4 },

  ratingCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  ratingMain: { flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 20 },
  ratingBig: { alignItems: 'center' },
  ratingValue: { fontSize: 32, fontWeight: '800', color: '#FCD34D' },
  ratingOutOf: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: -4 },
  ratingCount: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 8 },

  distributionSection: { gap: 10 },
  distributionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  starLabel: { flexDirection: 'row', alignItems: 'center', gap: 4, width: 24 },
  starLabelText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  barContainer: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 3 },
  barCount: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.7)', width: 24, textAlign: 'right' },

  filterContainer: { flexDirection: 'row', gap: 8, marginHorizontal: 16, marginVertical: 12, flexWrap: 'wrap' },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  filterButtonActive: { backgroundColor: '#52FF94', borderColor: '#52FF94' },
  filterText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  filterTextActive: { color: '#020403', fontWeight: '700' },

  listSection: { marginHorizontal: 16, marginVertical: 12 },
  reviewsTitle: { fontSize: 13, fontWeight: '700', color: '#52FF94', marginBottom: 12 },

  reviewCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 14,
    gap: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reviewClientInfo: { flexDirection: 'row', gap: 10, flex: 1 },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  reviewClientName: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  clientName: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  reviewDate: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 },

  serviceTag: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(82,255,148,0.1)',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  serviceTagText: { fontSize: 10, fontWeight: '600', color: '#52FF94' },

  reviewText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 16,
  },

  reviewActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(82,255,148,0.1)',
  },
  actionIcon: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionText: { fontSize: 10, color: 'rgba(255,255,255,0.5)' },
});
