import { View, Text, StyleSheet, ScrollView, FlatList, Pressable, TextInput, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const PROFESSIONALS_BY_CATEGORY = {
  agronomist: [
    { id: 'prof-1', name: 'Dr. Carlos Mendez', category: 'Ingeniero Agrónomo', icon: '🌱', rating: 4.9, reviews: 127, verified: true, experience: '12 años', response: '< 2 horas', price: '$150/hora', location: 'Bogotá' },
    { id: 'prof-2', name: 'Ing. María López', category: 'Ingeniero Agrónomo', icon: '🌱', rating: 4.8, reviews: 95, verified: true, experience: '9 años', response: '< 3 horas', price: '$140/hora', location: 'Medellín' },
  ],
  veterinarian: [
    { id: 'prof-3', name: 'Dra. Ana García', category: 'Médico Veterinario', icon: '🐄', rating: 4.8, reviews: 89, verified: true, experience: '8 años', response: '< 1 hora', price: '$120/hora', location: 'Medellín' },
    { id: 'prof-4', name: 'Dr. Pedro Ruiz', category: 'Médico Veterinario', icon: '🐄', rating: 4.9, reviews: 112, verified: true, experience: '11 años', response: '< 2 horas', price: '$130/hora', location: 'Bogotá' },
  ],
  zootechnician: [
    { id: 'prof-5', name: 'Ing. Luis Gómez', category: 'Zootecnista', icon: '🐑', rating: 4.7, reviews: 78, verified: true, experience: '10 años', response: '< 3 horas', price: '$110/hora', location: 'Cali' },
  ],
  irrigation: [
    { id: 'prof-6', name: 'Ing. Roberto Silva', category: 'Especialista en Riego', icon: '💧', rating: 4.7, reviews: 64, verified: true, experience: '15 años', response: '< 3 horas', price: '$180/hora', location: 'Barranquilla' },
  ],
  forestry: [
    { id: 'prof-7', name: 'Ing. Diego Flores', category: 'Especialista Forestal', icon: '🌿', rating: 4.6, reviews: 45, verified: true, experience: '7 años', response: '< 4 horas', price: '$125/hora', location: 'Santa Marta' },
  ],
  aquaculture: [
    { id: 'prof-8', name: 'Dr. Juan Rodríguez', category: 'Especialista en Piscicultura', icon: '🐟', rating: 4.8, reviews: 52, verified: true, experience: '9 años', response: '< 3 horas', price: '$160/hora', location: 'Cartagena' },
  ],
  coffee: [
    { id: 'prof-9', name: 'Ing. Fernando Restrepo', category: 'Especialista en Café', icon: '☕', rating: 4.9, reviews: 134, verified: true, experience: '14 años', response: '< 2 horas', price: '$155/hora', location: 'Armenia' },
  ],
  crops: [
    { id: 'prof-10', name: 'Ing. Alejandro Vega', category: 'Especialista por Cultivo', icon: '🌾', rating: 4.7, reviews: 81, verified: true, experience: '8 años', response: '< 3 horas', price: '$135/hora', location: 'Ibagué' },
  ],
  accountant: [
    { id: 'prof-11', name: 'Cpt. Marcelo Pérez', category: 'Contador Agropecuario', icon: '💰', rating: 4.8, reviews: 98, verified: true, experience: '13 años', response: '< 4 horas', price: '$100/hora', location: 'Bogotá' },
  ],
  lawyer: [
    { id: 'prof-12', name: 'Abg. Laura Martínez', category: 'Asesor Jurídico', icon: '⚖️', rating: 4.9, reviews: 76, verified: true, experience: '10 años', response: '< 5 horas', price: '$200/hora', location: 'Bogotá' },
  ],
  finance: [
    { id: 'prof-13', name: 'Banco AgroCrédito', category: 'Entidad Financiera', icon: '🏦', rating: 4.7, reviews: 234, verified: true, experience: '20 años', response: '< 6 horas', price: 'Créditos', location: 'Varias ciudades' },
  ],
  supplier: [
    { id: 'prof-14', name: 'AgroInsumos Colombia', category: 'Proveedor', icon: '🛒', rating: 4.6, reviews: 156, verified: true, experience: 'Desde 2010', response: '24/7', price: 'Venta', location: 'Bogotá' },
  ],
  buyer: [
    { id: 'prof-15', name: 'CafexColombia S.A.', category: 'Comprador', icon: '🚚', rating: 4.8, reviews: 189, verified: true, experience: '18 años', response: '< 6 horas', price: 'Oferta', location: 'Medellín' },
  ],
  laboratory: [
    { id: 'prof-16', name: 'Laboratorio AgroTest', category: 'Laboratorio', icon: '🧪', rating: 4.9, reviews: 108, verified: true, experience: '12 años', response: '< 3 días', price: '$50-200', location: 'Bogotá' },
  ],
  trainer: [
    { id: 'prof-17', name: 'Instituto AgroCapacita', category: 'Capacitador', icon: '🎓', rating: 4.8, reviews: 142, verified: true, experience: '8 años', response: '24 horas', price: '$30-500', location: 'Online' },
  ],
};

const ALL_PROFESSIONALS = Object.values(PROFESSIONALS_BY_CATEGORY).flat();

const CATEGORIES = [
  { id: 'agronomist', label: 'Ingenieros Agrónomos', icon: '🌱', count: 124, type: 'professional' },
  { id: 'veterinarian', label: 'Médicos Veterinarios', icon: '🐄', count: 87, type: 'professional' },
  { id: 'zootechnician', label: 'Zootecnistas', icon: '🐑', count: 45, type: 'professional' },
  { id: 'irrigation', label: 'Especialistas en Riego', icon: '💧', count: 56, type: 'professional' },
  { id: 'forestry', label: 'Especialistas Forestales', icon: '🌿', count: 32, type: 'professional' },
  { id: 'aquaculture', label: 'Especialistas en Piscicultura', icon: '🐟', count: 34, type: 'professional' },
  { id: 'coffee', label: 'Especialistas en Café', icon: '☕', count: 89, type: 'professional' },
  { id: 'crops', label: 'Especialistas por Cultivo', icon: '🌾', count: 156, type: 'professional' },
  { id: 'accountant', label: 'Contadores Agropecuarios', icon: '💰', count: 78, type: 'professional' },
  { id: 'lawyer', label: 'Asesores Jurídicos', icon: '⚖️', count: 92, type: 'professional' },
  { id: 'finance', label: 'Entidades Financieras', icon: '🏦', count: 12, type: 'provider' },
  { id: 'supplier', label: 'Proveedores', icon: '🛒', count: 234, type: 'provider' },
  { id: 'buyer', label: 'Compradores', icon: '🚚', count: 145, type: 'provider' },
  { id: 'laboratory', label: 'Laboratorios', icon: '🧪', count: 28, type: 'provider' },
  { id: 'trainer', label: 'Capacitadores', icon: '🎓', count: 67, type: 'professional' },
];

export default function ProfessionalsNetworkScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const isTablet = width > 768;

  const filteredProfessionals = ALL_PROFESSIONALS.filter(p => {
    const matchesCategory = !selectedCategory ||
      (PROFESSIONALS_BY_CATEGORY[selectedCategory as keyof typeof PROFESSIONALS_BY_CATEGORY] || []).find(prof => prof.id === p.id);
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProfessionalCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable
        style={styles.professionalCard}
        onPress={() => router.push(`/professional-detail?id=${item.id}`)}
      >
        <LinearGradient
          colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.professionalGradient}
        >
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#52FF94" />
            </View>
          )}

          <View style={styles.professionalHeader}>
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.professionalName}>{item.name}</Text>
                </View>
                <Text style={styles.specialty}>{item.category}</Text>
                <Text style={styles.location}>
                  <Ionicons name="location" size={12} color="#52FF94" /> {item.location}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.statValue}>{item.rating}</Text>
              <Text style={styles.statLabel}>({item.reviews})</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="briefcase" size={14} color="#3B82F6" />
              <Text style={styles.statLabel}>{item.experience}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="time" size={14} color="#10B981" />
              <Text style={styles.statLabel}>{item.response}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View>
              <Text style={styles.priceLabel}>Tarifa</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <Pressable style={styles.contactButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#020403" />
              <Text style={styles.contactButtonText}>Contactar</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  const renderCategoryChip = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 30)}>
      <Pressable
        style={[
          styles.categoryChip,
          selectedCategory === item.id && styles.categoryChipActive,
        ]}
        onPress={() => setSelectedCategory(selectedCategory === item.id ? '' : item.id)}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <View>
          <Text
            style={[
              styles.categoryLabel,
              selectedCategory === item.id && styles.categoryLabelActive,
            ]}
            numberOfLines={1}
          >
            {item.label}
          </Text>
          <Text style={styles.categoryCount}>{item.count}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Red de Profesionales</Text>
            <Text style={styles.headerSubtitle}>1,234+ expertos verificados</Text>
          </View>
          <Pressable onPress={() => router.push('/professionals-register')}>
            <Ionicons name="add-circle-outline" size={24} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(400).delay(50)} style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="rgba(255,255,255,0.5)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar profesional..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.categoriesSection}>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryChip}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(400).delay(150)}>
          <View style={styles.statsBanner}>
            <LinearGradient
              colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statsGradient}
            >
              <View style={styles.bannerStat}>
                <Text style={styles.bannerStatValue}>{filteredProfessionals.length}</Text>
                <Text style={styles.bannerStatLabel}>Resultados</Text>
              </View>
              <View style={styles.bannerDivider} />
              <View style={styles.bannerStat}>
                <Text style={styles.bannerStatValue}>4.8★</Text>
                <Text style={styles.bannerStatLabel}>Rating Promedio</Text>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>

        <FlatList
          data={filteredProfessionals}
          renderItem={renderProfessionalCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.professionalsList}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerContent: { flex: 1, alignItems: 'center', gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  searchSection: { paddingHorizontal: 16, paddingVertical: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', gap: 8 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 13, fontWeight: '500' },
  categoriesSection: { borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  categoriesContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 6 },
  categoryChip: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)', backgroundColor: 'rgba(82,255,148,0.05)', gap: 4, alignItems: 'center', minWidth: 75 },
  categoryChipActive: { borderColor: '#52FF94', backgroundColor: 'rgba(82,255,148,0.2)' },
  categoryIcon: { fontSize: 16 },
  categoryLabel: { fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
  categoryLabelActive: { color: '#52FF94', fontWeight: '700' },
  categoryCount: { fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 },
  statsBanner: { paddingHorizontal: 16, paddingVertical: 12 },
  statsGradient: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerStat: { flex: 1, alignItems: 'center', gap: 2 },
  bannerStatValue: { fontSize: 14, fontWeight: '800', color: '#52FF94' },
  bannerStatLabel: { fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  bannerDivider: { width: 1, height: 30, backgroundColor: 'rgba(82,255,148,0.2)' },
  professionalsList: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  professionalCard: { borderRadius: 14, overflow: 'hidden' },
  professionalGradient: { borderRadius: 14, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14, gap: 12, position: 'relative' },
  verifiedBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(82,255,148,0.2)', borderRadius: 12, padding: 4 },
  professionalHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  avatarSection: { flexDirection: 'row', gap: 10, flex: 1 },
  avatar: { width: 50, height: 50, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.15)', justifyContent: 'center', alignItems: 'center' },
  avatarEmoji: { fontSize: 24 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  professionalName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  specialty: { fontSize: 11, color: '#52FF94', fontWeight: '600', marginTop: 2 },
  location: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.05)' },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 },
  statValue: { fontSize: 11, fontWeight: '700', color: '#52FF94' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  statDivider: { width: 1, height: 20, backgroundColor: 'rgba(82,255,148,0.2)' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  priceLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  price: { fontSize: 13, fontWeight: '800', color: '#52FF94', marginTop: 2 },
  contactButton: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#52FF94', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  contactButtonText: { color: '#020403', fontWeight: '700', fontSize: 12 },
});
