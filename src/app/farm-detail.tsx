import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LandscapeHeroSvg, RingChartSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Radius, Spacing } from '@/constants/theme';

const LOTS = [
  { name: 'Lote Alto', crop: 'Cafe Catio', area: '2.1 ha' },
  { name: 'Lote Bajo', crop: 'Cafe Rojo', area: '1.2 ha' },
  { name: 'Lote Cafetal', crop: 'Cafe Catio', area: '1.9 ha' },
];

export default function FarmDetailScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader
        title="Finca El Mirador"
        subtitle="Pitalito, Huila"
        rightLabel="Editar"
        onRightPress={() => router.push('./farm-edit')}
      />

      <View style={[AgroSurface.cardStrong, styles.headerCard]}>
        <LandscapeHeroSvg />
        <View style={styles.headerContent}>
          <View style={styles.kpiRow}>
            <Chip label="5.2 ha" />
            <Chip label="3 lotes" />
            <Chip label="120 arrobas" />
          </View>
          <View style={styles.productionRow}>
            <View>
              <Text style={styles.productionLabel}>Productividad estimada</Text>
              <Text style={styles.productionValue}>85%</Text>
            </View>
            <RingChartSvg pct={85} />
          </View>
        </View>
      </View>

      <View style={[AgroSurface.card, styles.sectionCard]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis lotes</Text>
          <Pressable onPress={() => router.push('/lots-list')}>
            <Text style={styles.linkText}>Ver todos</Text>
          </Pressable>
        </View>

        {LOTS.map((lot) => (
          <Pressable key={lot.name} style={styles.row} onPress={() => router.push('/lot-detail')}>
            <View>
              <Text style={styles.rowTitle}>{lot.name}</Text>
              <Text style={styles.rowSub}>{lot.crop}</Text>
            </View>
            <Text style={styles.rowValue}>{lot.area}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.secondaryButton} onPress={() => router.push('/lot-create')}>
          <Text style={styles.secondaryButtonText}>Crear lote</Text>
        </Pressable>
        <PrimaryAction label="Calendario" onPress={() => router.push('/calendar')} style={styles.primaryButtonWrap} />
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.secondaryButton} onPress={() => router.push('./farm-edit')}>
          <Text style={styles.secondaryButtonText}>Editar finca</Text>
        </Pressable>
        <PrimaryAction label="Produccion general" onPress={() => router.push('./production-general')} style={styles.primaryButtonWrap} />
      </View>
    </AgroScreen>
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
  headerCard: {
    overflow: 'hidden',
  },
  headerContent: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  kpiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  productionRow: {
    marginTop: Spacing.one,
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productionLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
    fontWeight: '600',
  },
  productionValue: {
    marginTop: 2,
    color: '#52FF94',
    fontSize: 24,
    fontWeight: '800',
  },
  sectionCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  linkText: {
    color: '#52FF94',
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: Spacing.two,
  },
  rowTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  rowSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  rowValue: {
    color: '#52FF94',
    fontSize: 13,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  secondaryButtonText: {
    color: '#52FF94',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButtonWrap: {
    flex: 1,
  },
  chip: AgroSurface.chip,
  chipText: AgroSurface.chipText,
});
