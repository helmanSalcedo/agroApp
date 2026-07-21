import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { ProductionCard } from '@/components/features/production-card';
import { KPICard } from '@/components/features/kpi-card';
import { Spacing } from '@/constants/theme';
import { useProductionContext, useLotContext } from '@/context';
import { formatCurrency } from '@/utils/calculation-utils';

/**
 * Pantalla de Historial de Producciones/Cosechas
 * Muestra todas las cosechas registradas y estadísticas de producción
 */
export default function ProductionListScreen() {
  const { productions, getTotalYield, getAverageROI } = useProductionContext();
  const { lots } = useLotContext();

  const totalYield = getTotalYield();
  const averageRoi = getAverageROI();
  const totalIncome = productions.reduce((sum, p) => sum + p.grossIncome, 0);
  const totalProfit = productions.reduce((sum, p) => sum + p.netIncome, 0);

  const getLotName = (lotId: string): string => {
    return lots.find((l) => l.id === lotId)?.name || 'Lote Desconocido';
  };

  if (productions.length === 0) {
    return (
      <AgroScreen withBottomInset>
        <AppScreenHeader
          title="Historial de Cosechas"
          subtitle="Registra tus cosechas aquí"
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🌾</Text>
          <Text style={styles.emptyTitle}>Sin Cosechas Registradas</Text>
          <Text style={styles.emptySubtitle}>
            Cuando coseches un lote, aparecerá aquí con el análisis completo de ingresos y gastos
          </Text>
          <Pressable
            style={styles.emptyButton}
            onPress={() => router.back()}
          >
            <Text style={styles.emptyButtonText}>Volver</Text>
          </Pressable>
        </View>
      </AgroScreen>
    );
  }

  return (
    <AgroScreen withBottomInset scroll={false}>
      <AppScreenHeader
        title="Historial de Cosechas"
        subtitle={`${productions.length} registro${productions.length !== 1 ? 's' : ''}`}
      />

      <FlatList
        data={productions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductionCard
            production={item}
            lotName={getLotName(item.lotId)}
            onPress={() => {}}
            style={styles.cardSpacing}
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            {/* KPIs */}
            <View style={styles.kpiGrid}>
              <KPICard
                icon="🌾"
                label="Producción Total"
                value={totalYield.toFixed(0)}
                unit="kg"
                color="#22C55E"
                style={{ flex: 1 }}
              />
              <KPICard
                icon="📈"
                label="ROI Promedio"
                value={averageRoi.toFixed(1)}
                unit="%"
                color="#3B82F6"
                style={{ flex: 1 }}
              />
            </View>

            {/* Resumen Financiero */}
            <View style={[AgroSurface.card, styles.summaryCard]}>
              <Text style={styles.summaryTitle}>Resumen Financiero</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ingresos Totales</Text>
                <Text style={styles.incomValue}>
                  {formatCurrency(totalIncome)}
                </Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ganancia Neta Total</Text>
                <Text style={[styles.profitValue, { color: totalProfit > 0 ? '#22C55E' : '#EF4444' }]}>
                  {formatCurrency(totalProfit)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Promedio por Cosecha</Text>
                <Text style={[styles.profitValue, { color: totalProfit / productions.length > 0 ? '#22C55E' : '#EF4444' }]}>
                  {formatCurrency(totalProfit / productions.length)}
                </Text>
              </View>
            </View>
          </View>
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    gap: Spacing.three,
    marginBottom: Spacing.two,
  },

  kpiGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },

  summaryCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },

  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: Spacing.one,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
  },

  incomValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22C55E',
  },

  profitValue: {
    fontSize: 13,
    fontWeight: '700',
  },

  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  listContainer: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },

  cardSpacing: {
    marginVertical: 0,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
  },

  emptyEmoji: {
    fontSize: 64,
    marginBottom: Spacing.one,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },

  emptyButton: {
    marginTop: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    backgroundColor: '#52FF94',
    borderRadius: 12,
  },

  emptyButtonText: {
    color: '#041109',
    fontSize: 15,
    fontWeight: '700',
  },
});
