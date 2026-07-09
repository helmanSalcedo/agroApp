import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Radius, Spacing } from '@/constants/theme';

const ACTIVITIES = [
  { date: '12 Jun 2026', title: 'Fertilizacion', lot: 'Lote Alto', amount: '$120.000' },
  { date: '03 Jun 2026', title: 'Limpieza', lot: 'Lote Bajo', amount: '$90.000' },
  { date: '29 May 2026', title: 'Poda', lot: 'Lote Cafetal', amount: '$45.000' },
  { date: '18 May 2026', title: 'Cosecha', lot: 'Lote Alto', amount: '$180.000' },
];

export default function ActivitiesScreen() {
  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.glowTop} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Actividades</Text>
          <Text style={styles.subtitle}>Historial y registro de labores por lote.</Text>

          {ACTIVITIES.map((item) => (
            <Pressable
              key={`${item.date}-${item.title}`}
              style={styles.itemCard}
              onPress={() => router.push('/activity-detail')}>
              <View style={styles.timelineDot} />
              <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemMeta}>{item.lot}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
              <Text style={styles.itemAmount}>{item.amount}</Text>
            </Pressable>
          ))}

          <Pressable style={styles.ctaButton} onPress={() => router.push('/activity-select')}>
            <Text style={styles.ctaText}>Registrar actividad</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
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
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: Radius.lg,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E9A43',
    borderWidth: 2,
    borderColor: 'rgba(82,255,148,0.18)',
  },
  itemBody: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  itemMeta: {
    marginTop: 2,
    color: 'rgba(255,255,255,0.62)',
    fontSize: 12,
  },
  itemDate: {
    marginTop: 3,
    color: 'rgba(255,255,255,0.42)',
    fontSize: 11,
  },
  itemAmount: {
    color: '#52FF94',
    fontSize: 13,
    fontWeight: '700',
  },
  ctaButton: {
    marginTop: Spacing.two,
    backgroundColor: 'rgba(82,255,148,0.18)',
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  ctaText: {
    color: '#52FF94',
    fontSize: 15,
    fontWeight: '700',
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(82,255,148,0.12)',
  },
});
