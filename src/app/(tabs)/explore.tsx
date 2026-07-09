import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Radius, Spacing } from '@/constants/theme';

const FARMS = [
  { name: 'Finca El Mirador', location: 'Huila', lots: 3, area: '5.2 ha', production: '120 arrobas' },
  { name: 'Finca La Esperanza', location: 'Huila', lots: 2, area: '4.1 ha', production: '80 arrobas' },
];

export default function FarmsScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Mis fincas</Text>
          <Text style={styles.subtitle}>Controla produccion, lotes y areas cultivadas.</Text>

          {FARMS.map((farm) => (
            <Pressable key={farm.name} style={styles.farmCard} onPress={() => router.push('/farm-detail')}>
              <LinearGradient colors={['#9CCC7F', '#5C9E52']} style={styles.imagePlaceholder}>
                <Text style={styles.imageEmoji}>🌄</Text>
              </LinearGradient>
              <View style={styles.farmContent}>
                <Text style={styles.farmName}>{farm.name}</Text>
                <Text style={styles.farmMeta}>{farm.location}</Text>
                <View style={styles.metricsRow}>
                  <Chip label={farm.area} />
                  <Chip label={`${farm.lots} lotes`} />
                  <Chip label={farm.production} />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={styles.fab} onPress={() => router.push('/farm-create')}>
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020403',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  title: {
    marginTop: Spacing.two,
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    lineHeight: 20,
  },
  farmCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  imagePlaceholder: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEmoji: {
    fontSize: 38,
  },
  farmContent: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  farmName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  farmMeta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.62)',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderRadius: 999,
    backgroundColor: 'rgba(82,255,148,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    color: '#52FF94',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: Spacing.four,
    bottom: BottomTabInset + Spacing.four,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#52FF94',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: '#041109',
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '400',
  },
});
