import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RingChartSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Radius, Spacing } from '@/constants/theme';

export default function ExpenseDetailScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader
        title="Detalle de gasto"
        subtitle="Informacion completa del egreso registrado."
        rightLabel="Editar"
        onRightPress={() => {}}
      />

      <View style={[AgroSurface.cardStrong, styles.mainCard]}>
        <View style={styles.amountRow}>
          <View>
            <Text style={styles.amountLabel}>Monto</Text>
            <Text style={styles.amountValue}>$120.000</Text>
          </View>
          <RingChartSvg pct={78} />
        </View>
        <View style={styles.badgesRow}>
          <Tag label="Fertilizantes" />
          <Tag label="Lote Alto" />
        </View>
      </View>

      <View style={[AgroSurface.card, styles.infoCard]}>
        <DetailRow label="Fecha" value="12 de junio de 2026" />
        <DetailRow label="Finca" value="Finca El Mirador" />
        <DetailRow label="Comprobante" value="Factura #A-1842" />
        <DetailRow label="Metodo de pago" value="Efectivo" />
        <DetailRow label="Responsable" value="Juan Perez" />
        <DetailRow label="Observaciones" value="Compra de urea para fertilizacion del lote alto." />
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Eliminar gasto</Text>
        </Pressable>
        <PrimaryAction label="Guardar cambios" style={styles.primaryButton} />
      </View>
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
  mainCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
  },
  amountValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  infoCard: {
    overflow: 'hidden',
  },
  detailRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: Spacing.three,
    paddingVertical: 13,
    gap: 4,
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 12,
    fontWeight: '600',
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.22)',
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(239,68,68,0.08)',
  },
  secondaryText: {
    color: '#FF9F9F',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    borderRadius: Radius.md,
  },
  tag: AgroSurface.chip,
  tagText: AgroSurface.chipText,
});
