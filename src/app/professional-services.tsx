import { View, Text, StyleSheet, ScrollView, Pressable, FlatList, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import React, { useState } from 'react';

const MOCK_SERVICES = [
  {
    id: '1',
    name: 'Consultoría Agrícola',
    description: 'Asesoría completa sobre manejo de finca y optimización de cultivos',
    price: 150000,
    duration: '60 min',
    sold: 24,
    rating: 4.9,
    category: 'Asesoría',
    icon: '🌾',
  },
  {
    id: '2',
    name: 'Diagnóstico de Plagas',
    description: 'Identificación y manejo integrado de plagas en cultivos',
    price: 120000,
    duration: '45 min',
    sold: 18,
    rating: 4.8,
    category: 'Diagnóstico',
    icon: '🔍',
  },
  {
    id: '3',
    name: 'Asesoría de Riego',
    description: 'Diseño y optimización de sistemas de riego eficientes',
    price: 180000,
    duration: '90 min',
    sold: 12,
    rating: 4.9,
    category: 'Técnica',
    icon: '💧',
  },
  {
    id: '4',
    name: 'Capacitación en Sistemas',
    description: 'Entrenamiento en uso de plataformas digitales agrícolas',
    price: 200000,
    duration: '120 min',
    sold: 8,
    rating: 4.7,
    category: 'Capacitación',
    icon: '📚',
  },
];

export default function ProfessionalServicesScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  const openServiceDetail = (service: any) => {
    setSelectedService(service);
    setShowDetail(true);
  };

  const renderStars = (rating: number, size: number = 14) => (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color={star <= Math.round(rating) ? '#FCD34D' : 'rgba(255,255,255,0.3)'}
        />
      ))}
    </View>
  );

  const renderServiceCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInDown.duration(400).delay(index * 50)}
      style={{ marginBottom: 12 }}
    >
      <Pressable onPress={() => openServiceDetail(item)}>
        <LinearGradient
          colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.serviceCard}
        >
          {/* Icon and Header */}
          <View style={styles.cardHeader}>
            <View style={styles.serviceIcon}>
              <Text style={{ fontSize: 24 }}>{item.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            </View>
            <Pressable style={styles.moreButton}>
              <Ionicons name="ellipsis-vertical" size={18} color="rgba(255,255,255,0.5)" />
            </Pressable>
          </View>

          {/* Description */}
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="cash-outline" size={14} color="#52FF94" />
              <Text style={styles.statValue}>${item.price.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={14} color="#3B82F6" />
              <Text style={styles.statValue}>{item.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
              <Text style={styles.statValue}>{item.sold}</Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            {renderStars(item.rating, 12)}
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  const totalRevenue = MOCK_SERVICES.reduce((sum, s) => sum + s.price * s.sold, 0);
  const totalSold = MOCK_SERVICES.reduce((sum, s) => sum + s.sold, 0);
  const avgRating = (
    MOCK_SERVICES.reduce((sum, s) => sum + s.rating, 0) / MOCK_SERVICES.length
  ).toFixed(1);

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
            <Text style={styles.headerTitle}>Mis Servicios</Text>
            <Text style={styles.headerSubtitle}>Gestiona tus ofertas</Text>
          </View>
          <Pressable style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* KPIs */}
          <Animated.View entering={FadeInDown.duration(400).delay(50)}>
            <View style={styles.kpisGrid}>
              <LinearGradient
                colors={['rgba(34,197,94,0.08)', 'rgba(34,197,94,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.kpiCard}
              >
                <Ionicons name="cash" size={18} color="#22C55E" />
                <Text style={styles.kpiValue}>
                  ${(totalRevenue / 1000000).toFixed(1)}M
                </Text>
                <Text style={styles.kpiLabel}>Ingresos Totales</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.kpiCard}
              >
                <Ionicons name="checkmark-done-circle" size={18} color="#3B82F6" />
                <Text style={styles.kpiValue}>{totalSold}</Text>
                <Text style={styles.kpiLabel}>Vendidos</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.kpiCard}
              >
                <Ionicons name="star" size={18} color="#FCD34D" />
                <Text style={styles.kpiValue}>{avgRating}</Text>
                <Text style={styles.kpiLabel}>Rating Promedio</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(245,158,11,0.08)', 'rgba(245,158,11,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.kpiCard}
              >
                <Ionicons name="layers" size={18} color="#F59E0B" />
                <Text style={styles.kpiValue}>{MOCK_SERVICES.length}</Text>
                <Text style={styles.kpiLabel}>Servicios</Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* SERVICES LIST */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.listSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tus Servicios</Text>
                <Text style={styles.sectionSubtitle}>{MOCK_SERVICES.length} activos</Text>
              </View>
              <FlatList
                data={MOCK_SERVICES}
                renderItem={renderServiceCard}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          </Animated.View>

          {/* INFO SECTION */}
          <Animated.View entering={FadeInDown.duration(400).delay(150)}>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>💡 Consejos para mejorar</Text>
              <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>📈</Text>
                <Text style={styles.tipText}>
                  Aumenta tus ventas agregando más servicios complementarios
                </Text>
              </View>
              <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>⭐</Text>
                <Text style={styles.tipText}>
                  Mantén tu rating alto brindando excelente atención
                </Text>
              </View>
              <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>🎯</Text>
                <Text style={styles.tipText}>
                  Ofrece descuentos por paquetes de servicios
                </Text>
              </View>
            </View>
          </Animated.View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>

      {/* DETAIL MODAL */}
      <Modal
        visible={showDetail}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetail(false)}
      >
        <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={{ flex: 1 }} />
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowDetail(false)}>
              <Ionicons name="close" size={28} color="#52FF94" />
            </Pressable>
            <Text style={styles.modalTitle}>Detalles del Servicio</Text>
            <Pressable>
              <Ionicons name="pencil-outline" size={24} color="#52FF94" />
            </Pressable>
          </View>

          {selectedService && (
            <ScrollView style={styles.modalContent}>
              {/* Icon and Title */}
              <View style={styles.modalIconSection}>
                <View style={styles.modalIconBig}>
                  <Text style={{ fontSize: 48 }}>{selectedService.icon}</Text>
                </View>
                <Text style={styles.modalServiceName}>{selectedService.name}</Text>
                <View style={styles.modalCategoryBadge}>
                  <Text style={styles.modalCategoryText}>{selectedService.category}</Text>
                </View>
              </View>

              {/* Description */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Descripción</Text>
                <Text style={styles.modalDescription}>{selectedService.description}</Text>
              </View>

              {/* Pricing & Duration */}
              <LinearGradient
                colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalCard}
              >
                <View style={styles.modalCardRow}>
                  <View>
                    <Text style={styles.modalLabel}>Precio</Text>
                    <Text style={styles.modalValue}>${selectedService.price.toLocaleString()}</Text>
                  </View>
                  <View style={styles.modalDivider} />
                  <View>
                    <Text style={styles.modalLabel}>Duración</Text>
                    <Text style={styles.modalValue}>{selectedService.duration}</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Performance Stats */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Desempeño</Text>
                <View style={styles.statsCardRow}>
                  <LinearGradient
                    colors={['rgba(34,197,94,0.08)', 'rgba(34,197,94,0.03)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.statCard2}
                  >
                    <Ionicons name="checkmark-done-circle" size={18} color="#22C55E" />
                    <Text style={styles.statValue2}>{selectedService.sold}</Text>
                    <Text style={styles.statLabel2}>Vendidos</Text>
                  </LinearGradient>

                  <LinearGradient
                    colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.statCard2}
                  >
                    <Ionicons name="star" size={18} color="#FCD34D" />
                    <Text style={styles.statValue2}>{selectedService.rating}</Text>
                    <Text style={styles.statLabel2}>Rating</Text>
                  </LinearGradient>

                  <LinearGradient
                    colors={['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.03)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.statCard2}
                  >
                    <Ionicons name="cash" size={18} color="#3B82F6" />
                    <Text style={styles.statValue2}>
                      ${((selectedService.price * selectedService.sold) / 1000).toFixed(0)}K
                    </Text>
                    <Text style={styles.statLabel2}>Ingresos</Text>
                  </LinearGradient>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <Pressable style={[styles.modalButton, styles.modalButtonPrimary]}>
                  <Ionicons name="pencil-outline" size={18} color="#020403" />
                  <Text style={styles.modalButtonTextPrimary}>Editar Servicio</Text>
                </Pressable>
                <Pressable style={styles.modalButton}>
                  <Ionicons name="eye-outline" size={18} color="#52FF94" />
                  <Text style={styles.modalButtonText}>Ver en Catálogo</Text>
                </Pressable>
                <Pressable style={styles.modalButton}>
                  <Ionicons name="analytics-outline" size={18} color="#52FF94" />
                  <Text style={styles.modalButtonText}>Estadísticas</Text>
                </Pressable>
              </View>

              <View style={{ height: 30 }} />
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
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
  addButton: { padding: 4 },

  kpisGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginHorizontal: 16, marginVertical: 12 },
  kpiCard: {
    flex: 1,
    minWidth: '22%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  kpiValue: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  kpiLabel: { fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },

  listSection: { marginHorizontal: 16, marginVertical: 12 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#52FF94' },
  sectionSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },

  serviceCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 12,
    gap: 12,
  },
  cardHeader: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  serviceIcon: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(82,255,148,0.1)' },
  serviceName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  categoryBadge: { marginTop: 4, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(82,255,148,0.15)', borderRadius: 4 },
  categoryText: { fontSize: 9, color: '#52FF94', fontWeight: '600' },
  moreButton: { padding: 6 },

  description: { fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 14 },

  statsRow: { flexDirection: 'row', gap: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  statValue: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },

  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingText: { fontSize: 11, fontWeight: '700', color: '#FCD34D' },

  infoSection: { marginHorizontal: 16, marginVertical: 12, gap: 10 },
  infoTitle: { fontSize: 13, fontWeight: '700', color: '#52FF94', marginBottom: 4 },
  tipCard: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(82,255,148,0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
  },
  tipIcon: { fontSize: 18 },
  tipText: { fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 14, flex: 1 },

  // Modal
  modalContainer: { flex: 1, backgroundColor: 'transparent' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },

  modalContent: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },

  modalIconSection: { alignItems: 'center', marginVertical: 20 },
  modalIconBig: { width: 80, height: 80, borderRadius: 16, backgroundColor: 'rgba(82,255,148,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  modalServiceName: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  modalCategoryBadge: { paddingHorizontal: 12, paddingVertical: 4, backgroundColor: 'rgba(82,255,148,0.2)', borderRadius: 6 },
  modalCategoryText: { fontSize: 10, color: '#52FF94', fontWeight: '700' },

  modalSection: { marginVertical: 16 },
  modalSectionTitle: { fontSize: 13, fontWeight: '700', color: '#52FF94', marginBottom: 10 },
  modalDescription: { fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 16 },

  modalCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', padding: 16, marginVertical: 12 },
  modalCardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  modalLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  modalValue: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginTop: 4 },
  modalDivider: { width: 1, height: 40, backgroundColor: 'rgba(82,255,148,0.1)' },

  statsCardRow: { flexDirection: 'row', gap: 10 },
  statCard2: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', padding: 12, alignItems: 'center', justifyContent: 'center', gap: 4 },
  statValue2: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  statLabel2: { fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },

  modalActions: { gap: 10, marginVertical: 16 },
  modalButton: { paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(82,255,148,0.3)', backgroundColor: 'rgba(82,255,148,0.08)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  modalButtonPrimary: { backgroundColor: '#52FF94', borderColor: '#52FF94' },
  modalButtonText: { fontSize: 13, fontWeight: '700', color: '#52FF94' },
  modalButtonTextPrimary: { fontSize: 13, fontWeight: '700', color: '#020403' },
});
