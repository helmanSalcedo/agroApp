import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { LotCard } from '@/components/features/lot-card';
import { Spacing } from '@/constants/theme';
import { useFarmContext, useLotContext } from '@/context';
import { Lot } from '@/types/domain';

/**
 * Pantalla de Lotes - Lista de lotes de una granja
 * Muestra todos los lotes con opción de crear nuevo
 */
export default function LotsListScreen() {
  const { selectedFarmId, getFarmById } = useFarmContext();
  const { getLotsByFarm } = useLotContext();

  const farm = selectedFarmId ? getFarmById(selectedFarmId) : null;
  const lots = farm ? getLotsByFarm(farm.id) : [];
  const activeLots = lots.filter((lot) => lot.status === 'active');

  const handleLotPress = (lot: Lot) => {
    router.push(`/lot-detail?id=${lot.id}`);
  };

  const handleCreateLot = () => {
    router.push('/lot-create');
  };

  if (!farm) {
    return (
      <AgroScreen>
        <AppScreenHeader title="Lotes" />
        <Text style={styles.errorText}>No se encontró la granja</Text>
      </AgroScreen>
    );
  }

  return (
    <AgroScreen scroll={false}>
      <AppScreenHeader
        title="Lotes"
        subtitle={farm.name}
        rightLabel="+"
        onRightPress={handleCreateLot}
      />

      {/* Resumen */}
      <View style={[AgroSurface.cardStrong, styles.summaryCard]}>
        <View style={styles.summaryContent}>
          <View>
            <Text style={styles.summaryLabel}>Total de Lotes</Text>
            <Text style={styles.summaryValue}>{lots.length}</Text>
          </View>

          <View style={styles.summarySeparator} />

          <View>
            <Text style={styles.summaryLabel}>Lotes Activos</Text>
            <Text style={styles.summaryActive}>{activeLots.length}</Text>
          </View>

          <View style={styles.summarySeparator} />

          <View>
            <Text style={styles.summaryLabel}>Área Total</Text>
            <Text style={styles.summaryValue}>
              {lots.reduce((sum, lot) => sum + lot.area, 0)} ha
            </Text>
          </View>
        </View>
      </View>

      {/* Lista de Lotes */}
      {lots.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🌱</Text>
          <Text style={styles.emptyTitle}>Sin Lotes Registrados</Text>
          <Text style={styles.emptySubtitle}>
            Crea tu primer lote para comenzar a registrar actividades
          </Text>

          <Pressable
            style={styles.emptyButton}
            onPress={handleCreateLot}
          >
            <Text style={styles.emptyButtonText}>Crear Primer Lote</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={lots}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LotCard
              lot={item}
              onPress={handleLotPress}
              style={styles.lotCardSpacing}
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },

  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#52FF94',
  },

  summaryActive: {
    fontSize: 20,
    fontWeight: '800',
    color: '#22C55E',
  },

  summarySeparator: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  listContainer: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },

  lotCardSpacing: {
    marginVertical: 0,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    minHeight: 400,
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
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    backgroundColor: '#52FF94',
    borderRadius: 12,
  },

  emptyButtonText: {
    color: '#041109',
    fontSize: 15,
    fontWeight: '700',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: Spacing.four,
  },
});
