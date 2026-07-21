import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const MOCK_HERDS = [
  {
    id: 'herd-1',
    name: 'Rebaño Holstein',
    type: '🐄 Vacas Lecheras',
    count: 45,
    location: 'Potrero Norte',
    health: 95,
    productivity: 88,
    lastUpdate: '2026-07-19',
    color: '#3B82F6',
  },
  {
    id: 'herd-2',
    name: 'Rebaño Angus',
    type: '🐄 Carne',
    count: 32,
    location: 'Potrero Sur',
    health: 92,
    productivity: 85,
    lastUpdate: '2026-07-18',
    color: '#EC4899',
  },
  {
    id: 'herd-3',
    name: 'Cabras Lecheras',
    type: '🐐 Cabras',
    count: 24,
    location: 'Establo Central',
    health: 98,
    productivity: 92,
    lastUpdate: '2026-07-19',
    color: '#F59E0B',
  },
  {
    id: 'herd-4',
    name: 'Ovejas',
    type: '🐑 Ovejas',
    count: 18,
    location: 'Potrero Este',
    health: 96,
    productivity: 90,
    lastUpdate: '2026-07-17',
    color: '#10B981',
  },
];

const MOCK_ANIMALS = [
  { id: 'a-1', name: 'Bessie', type: 'Vaca', age: 5, weight: 580, health: 98, icon: '🐄' },
  { id: 'a-2', name: 'Ferdinand', type: 'Toro', age: 7, weight: 920, health: 95, icon: '🐄' },
  { id: 'a-3', name: 'Daisy', type: 'Ternera', age: 1, weight: 280, health: 100, icon: '🐄' },
  { id: 'a-4', name: 'Rosita', type: 'Vaca', age: 4, weight: 550, health: 92, icon: '🐄' },
  { id: 'a-5', name: 'Buttercup', type: 'Vaca', age: 6, weight: 600, health: 97, icon: '🐄' },
];

export default function LivestockScreen() {
  const router = useRouter();
  const [selectedHerd, setSelectedHerd] = useState(MOCK_HERDS[0]);
  const [filter, setFilter] = useState('todos');

  const renderHerdCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable
        style={[styles.herdCard, selectedHerd.id === item.id && styles.herdCardActive]}
        onPress={() => setSelectedHerd(item)}
      >
        <LinearGradient
          colors={[`${item.color}15`, `${item.color}08`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.herdGradient}
        >
          <View style={styles.herdHeader}>
            <View style={{ gap: 4 }}>
              <Text style={styles.herdName}>{item.name}</Text>
              <Text style={styles.herdType}>{item.type}</Text>
            </View>
            <View
              style={[
                styles.herdBadge,
                { backgroundColor: `${item.color}20`, borderColor: item.color },
              ]}
            >
              <Text style={[styles.herdCount, { color: item.color }]}>
                {item.count}
              </Text>
            </View>
          </View>

          <View style={styles.herdStats}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={14} color="#EF4444" />
              <Text style={styles.statValue}>{item.health}%</Text>
              <Text style={styles.statLabel}>Salud</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="trending-up" size={14} color="#10B981" />
              <Text style={styles.statValue}>{item.productivity}%</Text>
              <Text style={styles.statLabel}>Producción</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="location" size={14} color="#52FF94" />
              <Text style={styles.statLabel}>{item.location}</Text>
            </View>
          </View>

          <View style={styles.healthBar}>
            <LinearGradient
              colors={['#10B981', '#52FF94']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.healthBarFill, { width: `${item.health}%` }]}
            />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  const renderAnimalCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <LinearGradient
        colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.animalCard}
      >
        <View style={styles.animalHeader}>
          <View style={styles.animalIcon}>
            <Text style={styles.animalIconText}>{item.icon}</Text>
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={styles.animalName}>{item.name}</Text>
            <Text style={styles.animalType}>{item.type}</Text>
          </View>
          <View
            style={[
              styles.healthBadge,
              {
                backgroundColor: item.health >= 95 ? '#10B98120' : '#F5A50B20',
              },
            ]}
          >
            <Text
              style={[
                styles.healthBadgeText,
                { color: item.health >= 95 ? '#10B981' : '#F59E0B' },
              ]}
            >
              {item.health}%
            </Text>
          </View>
        </View>

        <View style={styles.animalStats}>
          <View style={styles.animalStat}>
            <Text style={styles.animalStatLabel}>Edad</Text>
            <Text style={styles.animalStatValue}>{item.age} años</Text>
          </View>
          <View style={styles.animalStat}>
            <Text style={styles.animalStatLabel}>Peso</Text>
            <Text style={styles.animalStatValue}>{item.weight} kg</Text>
          </View>
        </View>
      </LinearGradient>
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
          <Text style={styles.headerTitle}>Ganado</Text>
          <Pressable style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Summary Cards */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <LinearGradient
                colors={['rgba(59,130,246,0.15)', 'rgba(59,130,246,0.08)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.summaryCard}
              >
                <Ionicons name="git-compare" size={24} color="#3B82F6" />
                <View style={{ gap: 2 }}>
                  <Text style={styles.summaryLabel}>Total Animales</Text>
                  <Text style={styles.summaryValue}>
                    {MOCK_HERDS.reduce((sum, h) => sum + h.count, 0)}
                  </Text>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.08)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.summaryCard}
              >
                <Ionicons name="heart" size={24} color="#10B981" />
                <View style={{ gap: 2 }}>
                  <Text style={styles.summaryLabel}>Salud Promedio</Text>
                  <Text style={styles.summaryValue}>
                    {Math.round(
                      MOCK_HERDS.reduce((sum, h) => sum + h.health, 0) / MOCK_HERDS.length
                    )}
                    %
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Herds Section */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <Text style={styles.sectionTitle}>📋 Rebaños</Text>
            <FlatList
              data={MOCK_HERDS}
              renderItem={renderHerdCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.herdsList}
            />
          </Animated.View>

          {/* Animals Section */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <Text style={styles.sectionTitle}>🐄 Animales en {selectedHerd.name}</Text>

            <View style={styles.filterRow}>
              {['todos', 'vacas', 'toros', 'terneros'].map(f => (
                <Pressable
                  key={f}
                  style={[
                    styles.filterChip,
                    filter === f && styles.filterChipActive,
                  ]}
                  onPress={() => setFilter(f)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === f && styles.filterTextActive,
                    ]}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <FlatList
              data={MOCK_ANIMALS}
              renderItem={renderAnimalCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.animalsList}
            />
          </Animated.View>

          {/* Actions */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)} style={styles.actionsSection}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="medical" size={20} color="#020403" />
              <Text style={styles.actionButtonText}>Registrar Vacuna</Text>
            </Pressable>
            <Pressable style={[styles.actionButton, styles.actionButtonSecondary]}>
              <Ionicons name="nutrition" size={20} color="#52FF94" />
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                Registro de Alimento
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, textAlign: 'center' },
  addButton: { padding: 4 },
  summarySection: { paddingHorizontal: 16, paddingVertical: 16 },
  summaryRow: { gap: 12, flexDirection: 'row' },
  summaryCard: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, gap: 8 },
  summaryLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  summaryValue: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#52FF94', paddingHorizontal: 16, marginVertical: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  herdsList: { paddingHorizontal: 16, gap: 12, marginBottom: 12 },
  herdCard: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)' },
  herdCardActive: { borderColor: '#52FF94', borderWidth: 2 },
  herdGradient: { padding: 16, gap: 12 },
  herdHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  herdName: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  herdType: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  herdBadge: { borderRadius: 8, borderWidth: 2, paddingHorizontal: 10, paddingVertical: 6 },
  herdCount: { fontWeight: '700', fontSize: 12 },
  herdStats: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(82,255,148,0.2)' },
  healthBar: { height: 4, borderRadius: 2, backgroundColor: 'rgba(82,255,148,0.2)', overflow: 'hidden' },
  healthBarFill: { height: '100%', borderRadius: 2 },
  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 12 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)', backgroundColor: 'rgba(82,255,148,0.05)' },
  filterChipActive: { borderColor: '#52FF94', backgroundColor: 'rgba(82,255,148,0.2)' },
  filterText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  filterTextActive: { color: '#52FF94' },
  animalsList: { paddingHorizontal: 16, gap: 10, marginBottom: 12 },
  animalCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, gap: 10 },
  animalHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  animalIcon: { width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.1)', justifyContent: 'center', alignItems: 'center' },
  animalIconText: { fontSize: 20 },
  animalName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  animalType: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  healthBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  healthBadgeText: { fontSize: 11, fontWeight: '700' },
  animalStats: { flexDirection: 'row', gap: 16 },
  animalStat: { flex: 1, gap: 2 },
  animalStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  animalStatValue: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  actionsSection: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 16 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#52FF94', paddingVertical: 12, borderRadius: 12 },
  actionButtonSecondary: { backgroundColor: 'rgba(82,255,148,0.1)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.3)' },
  actionButtonText: { color: '#020403', fontWeight: '700', fontSize: 12 },
  actionButtonTextSecondary: { color: '#52FF94' },
});
