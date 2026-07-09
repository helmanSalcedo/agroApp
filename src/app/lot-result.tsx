import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SuccessSproutSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { PrimaryAction } from '@/components/primary-action';
import { Radius, Spacing } from '@/constants/theme';

export default function LotResultScreen() {
  return (
    <AgroScreen scroll={false} contentContainerStyle={styles.safeArea}>
      <View style={[AgroSurface.cardStrong, styles.card]}>
          <View style={styles.checkBadge}>
            <SuccessSproutSvg />
          </View>
          <Text style={styles.title}>Excelente</Text>
          <Text style={styles.subtitle}>Los datos del lote fueron registrados correctamente.</Text>

          <View style={styles.kpiRow}>
            <View style={styles.statsCard}>
              <Text style={styles.statLabel}>Produccion anual</Text>
              <Text style={styles.statValue}>85 arrobas</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statLabel}>Nivel estimado</Text>
              <Text style={styles.statValue}>92%</Text>
            </View>
          </View>

          <PrimaryAction label="Guardar lote" style={styles.primaryButtonWrap} onPress={() => router.replace('/lots-list')} />

          <Pressable style={styles.secondaryButton} onPress={() => router.replace('/lot-detail')}>
            <Text style={styles.secondaryText}>Ver detalle del lote</Text>
          </Pressable>
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: Spacing.three,
    justifyContent: 'center',
  },
  card: {
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  checkBadge: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(82,255,148,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.16)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 14,
    textAlign: 'center',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statsCard: {
    flex: 1,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: Spacing.two,
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 12,
  },
  statValue: {
    color: '#52FF94',
    fontSize: 22,
    fontWeight: '800',
  },
  primaryButtonWrap: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryText: {
    color: '#52FF94',
    fontSize: 14,
    fontWeight: '700',
  },
});
