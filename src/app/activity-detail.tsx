import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Radius, Spacing } from '@/constants/theme';

export default function ActivityDetailScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Detalle actividad" subtitle="Fertilizacion" rightLabel="Editar" onRightPress={() => {}} />

      <View style={[AgroSurface.card, styles.card]}>
        <View style={styles.pillRow}>
          <Tag label="Fertilizacion" />
          <Tag label="Lote Alto" />
        </View>
        <DetailRow label="Fecha" value="12 de junio de 2026" />
        <DetailRow label="Lote" value="Lote Alto" />
        <DetailRow label="Producto" value="Urea" />
        <DetailRow label="Cantidad" value="5 kg" />
        <DetailRow label="Costo" value="$120.000" />
        <DetailRow label="Aplicacion" value="En la manana" />
      </View>

      <Pressable style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>Editar actividad</Text>
      </Pressable>
    </AgroScreen>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  detailRow: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 12,
    marginBottom: 2,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    paddingVertical: 13,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  secondaryText: {
    color: '#52FF94',
    fontSize: 14,
    fontWeight: '700',
  },
  tag: AgroSurface.chip,
  tagText: AgroSurface.chipText,
});
