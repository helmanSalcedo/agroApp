import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const MOCK_PONDS = [
  {
    id: 'pond-1',
    name: 'Estanque A',
    species: '🐟 Tilapia',
    area: 1200,
    waterTemp: 28,
    pH: 7.2,
    count: 2500,
    status: 'Óptimo',
    statusColor: '#10B981',
    color: '#3B82F6',
  },
  {
    id: 'pond-2',
    name: 'Estanque B',
    species: '🦐 Camarones',
    area: 800,
    waterTemp: 26,
    pH: 7.5,
    count: 5000,
    status: 'Bueno',
    statusColor: '#F59E0B',
    color: '#EC4899',
  },
  {
    id: 'pond-3',
    name: 'Estanque C',
    species: '🐟 Trucha',
    area: 600,
    waterTemp: 22,
    pH: 7.0,
    count: 1800,
    status: 'Óptimo',
    statusColor: '#10B981',
    color: '#06B6D4',
  },
];

const WATER_PARAMS = [
  { label: 'Temperatura', value: '26°C', ideal: '24-28°C', icon: '🌡️', status: 'ok' },
  { label: 'pH', value: '7.3', ideal: '7.0-7.5', icon: '⚗️', status: 'ok' },
  { label: 'Oxígeno', value: '5.2 mg/L', ideal: '5-8 mg/L', icon: '💨', status: 'ok' },
  { label: 'Amoniaco', value: '0.02 ppm', ideal: '< 0.05 ppm', icon: '⚠️', status: 'warning' },
];

export default function AquacultureScreen() {
  const router = useRouter();
  const [selectedPond, setSelectedPond] = useState(MOCK_PONDS[0]);

  const renderPondCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable
        style={[styles.pondCard, selectedPond.id === item.id && styles.pondCardActive]}
        onPress={() => setSelectedPond(item)}
      >
        <LinearGradient
          colors={[`${item.color}15`, `${item.color}08`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pondGradient}
        >
          <View style={styles.pondHeader}>
            <View style={{ gap: 4, flex: 1 }}>
              <Text style={styles.pondName}>{item.name}</Text>
              <Text style={styles.pondSpecies}>{item.species}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${item.statusColor}20` }]}>
              <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
              <Text style={[styles.statusText, { color: item.statusColor }]}>
                {item.status}
              </Text>
            </View>
          </View>

          <View style={styles.pondParams}>
            <View style={styles.paramItem}>
              <Ionicons name="water" size={16} color={item.color} />
              <Text style={styles.paramValue}>{item.area}m²</Text>
              <Text style={styles.paramLabel}>Área</Text>
            </View>
            <View style={styles.paramDivider} />
            <View style={styles.paramItem}>
              <Ionicons name="thermometer" size={16} color={item.color} />
              <Text style={styles.paramValue}>{item.waterTemp}°C</Text>
              <Text style={styles.paramLabel}>Temp.</Text>
            </View>
            <View style={styles.paramDivider} />
            <View style={styles.paramItem}>
              <Ionicons name="git-compare" size={16} color={item.color} />
              <Text style={styles.paramValue}>{item.count}</Text>
              <Text style={styles.paramLabel}>Peces</Text>
            </View>
          </View>

          <View style={styles.densityBar}>
            <LinearGradient
              colors={['#10B981', '#52FF94']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.densityBarFill,
                { width: `${(item.count / 5000) * 100}%` },
              ]}
            />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  const renderWaterParam = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <LinearGradient
        colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.paramCard}
      >
        <View style={styles.paramCardHeader}>
          <Text style={styles.paramCardIcon}>{item.icon}</Text>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={styles.paramCardLabel}>{item.label}</Text>
            <Text style={styles.paramCardIdeal}>Ideal: {item.ideal}</Text>
          </View>
          {item.status === 'ok' ? (
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          ) : (
            <Ionicons name="alert-circle" size={24} color="#F59E0B" />
          )}
        </View>
        <Text style={styles.paramCardValue}>{item.value}</Text>
      </LinearGradient>
    </Animated.View>
  );

  const totalPonds = MOCK_PONDS.length;
  const totalFish = MOCK_PONDS.reduce((sum, p) => sum + p.count, 0);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Acuicultura</Text>
          <Pressable style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stats */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.statsSection}>
            <View style={styles.statsRow}>
              <LinearGradient
                colors={['rgba(6,182,212,0.15)', 'rgba(6,182,212,0.08)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <Ionicons name="water" size={24} color="#06B6D4" />
                <View style={{ gap: 2 }}>
                  <Text style={styles.statLabel}>Estanques</Text>
                  <Text style={styles.statValue}>{totalPonds}</Text>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(59,130,246,0.15)', 'rgba(59,130,246,0.08)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <Ionicons name="fish" size={24} color="#3B82F6" />
                <View style={{ gap: 2 }}>
                  <Text style={styles.statLabel}>Total Peces</Text>
                  <Text style={styles.statValue}>{(totalFish / 1000).toFixed(1)}k</Text>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Ponds */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <Text style={styles.sectionTitle}>💧 Estanques</Text>
            <FlatList
              data={MOCK_PONDS}
              renderItem={renderPondCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.pondsList}
            />
          </Animated.View>

          {/* Water Parameters */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <Text style={styles.sectionTitle}>🧪 Parámetros de Agua - {selectedPond.name}</Text>
            <FlatList
              data={WATER_PARAMS}
              renderItem={renderWaterParam}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.paramsList}
            />
          </Animated.View>

          {/* Feeding Schedule */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)}>
            <Text style={styles.sectionTitle}>🍽️ Próximas Alimentaciones</Text>
            <View style={styles.feedingList}>
              {[
                { time: '06:00 AM', amount: '120 kg', pond: 'Estanque A' },
                { time: '12:00 PM', amount: '150 kg', pond: 'Estanque B' },
                { time: '06:00 PM', amount: '120 kg', pond: 'Estanque A' },
              ].map((item, index) => (
                <Animated.View key={index} entering={FadeInDown.duration(400).delay(index * 50)}>
                  <LinearGradient
                    colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.feedingItem}
                  >
                    <View style={styles.feedingIcon}>
                      <Ionicons name="time" size={20} color="#F59E0B" />
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text style={styles.feedingTime}>{item.time}</Text>
                      <Text style={styles.feedingPond}>{item.pond}</Text>
                    </View>
                    <Text style={styles.feedingAmount}>{item.amount}</Text>
                  </LinearGradient>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Actions */}
          <Animated.View entering={FadeInDown.duration(400).delay(500)} style={styles.actionsSection}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="document-text" size={20} color="#020403" />
              <Text style={styles.actionButtonText}>Registrar Análisis</Text>
            </Pressable>
            <Pressable style={[styles.actionButton, styles.actionButtonSecondary]}>
              <Ionicons name="leaf" size={20} color="#52FF94" />
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                Registro Cosecha
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
  statsSection: { paddingHorizontal: 16, paddingVertical: 16 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, gap: 8 },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#52FF94', paddingHorizontal: 16, marginVertical: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  pondsList: { paddingHorizontal: 16, gap: 12, marginBottom: 12 },
  pondCard: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)' },
  pondCardActive: { borderColor: '#52FF94', borderWidth: 2 },
  pondGradient: { padding: 16, gap: 12 },
  pondHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  pondName: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  pondSpecies: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontWeight: '600', fontSize: 11 },
  pondParams: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  paramItem: { flex: 1, alignItems: 'center', gap: 4 },
  paramValue: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  paramLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  paramDivider: { width: 1, height: 30, backgroundColor: 'rgba(82,255,148,0.2)' },
  densityBar: { height: 4, borderRadius: 2, backgroundColor: 'rgba(82,255,148,0.2)', overflow: 'hidden' },
  densityBarFill: { height: '100%', borderRadius: 2 },
  paramsList: { paddingHorizontal: 16, gap: 10, marginBottom: 12 },
  paramCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, gap: 8 },
  paramCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  paramCardIcon: { fontSize: 20 },
  paramCardLabel: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  paramCardIdeal: { fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: '500' },
  paramCardValue: { fontSize: 14, fontWeight: '800', color: '#52FF94' },
  feedingList: { paddingHorizontal: 16, gap: 10, marginBottom: 12 },
  feedingItem: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  feedingIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(245,158,11,0.15)', justifyContent: 'center', alignItems: 'center' },
  feedingTime: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  feedingPond: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  feedingAmount: { fontSize: 12, fontWeight: '700', color: '#F59E0B' },
  actionsSection: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 16 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#52FF94', paddingVertical: 12, borderRadius: 12 },
  actionButtonSecondary: { backgroundColor: 'rgba(82,255,148,0.1)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.3)' },
  actionButtonText: { color: '#020403', fontWeight: '700', fontSize: 12 },
  actionButtonTextSecondary: { color: '#52FF94' },
});
