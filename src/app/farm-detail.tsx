import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Spacing } from '@/constants/theme';
import { useFarmContext, useLotContext } from '@/context';

/**
 * Pantalla de Detalle de Granja
 * Muestra información completa de una granja y sus lotes
 */
export default function FarmDetailScreen() {
  const { selectedFarmId, getFarmById } = useFarmContext();
  const { getLotsByFarm } = useLotContext();

  const farm = selectedFarmId ? getFarmById(selectedFarmId) : null;
  const lots = farm ? getLotsByFarm(farm.id) : [];
  const activeLots = lots.filter((lot) => lot.status === 'active');

  if (!farm) {
    return (
      <AgroScreen>
        <AppScreenHeader title="Granja" />
        <Text style={styles.errorText}>No se encontró la granja</Text>
      </AgroScreen>
    );
  }

  return (
    <AgroScreen>
      <AppScreenHeader
        title={farm.name}
        subtitle={farm.location}
        rightLabel="Editar"
        onRightPress={() => router.push('/farm-edit')}
      />

      {/* Card Principal */}
      <View style={[AgroSurface.cardStrong, styles.heroCard]}>
        <View style={styles.headerTop}>
          <View style={styles.iconCircle}>
            <Text style={styles.headerEmoji}>🌾</Text>
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.headerLabel}>Área Total</Text>
            <Text style={styles.headerValue}>{farm.totalArea} hectáreas</Text>
          </View>
        </View>

        {/* Estadísticas rápidas */}
        <View style={styles.statsRow}>
          <StatCard
            label="Lotes Activos"
            value={activeLots.length.toString()}
            color="#22C55E"
          />
          <StatCard
            label="Total de Lotes"
            value={lots.length.toString()}
            color="#3B82F6"
          />
          <StatCard
            label="Desde"
            value={
              farm.createdAt
                ? new Date(farm.createdAt instanceof Date ? farm.createdAt : farm.createdAt as any).getFullYear().toString()
                : 'N/A'
            }
            color="#F59E0B"
          />
        </View>
      </View>

      {/* Lotes */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={AgroSurface.sectionTitle}>Lotes ({lots.length})</Text>
          <Pressable onPress={() => router.push('/lots-list')}>
            <Text style={styles.linkText}>Ver todos</Text>
          </Pressable>
        </View>

        {lots.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🌱</Text>
            <Text style={styles.emptyText}>Sin lotes registrados</Text>
            <Pressable
              style={styles.createButton}
              onPress={() => router.push('/lot-create')}
            >
              <Text style={styles.createButtonText}>Crear Lote</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.lotsScroll}
            scrollEnabled={lots.length > 2}
          >
            {lots.map((lot) => (
              <Pressable
                key={lot.id}
                style={[AgroSurface.card, styles.lotCard]}
                onPress={() => router.push(`/lot-detail?id=${lot.id}`)}
              >
                <Text style={styles.lotName}>{lot.name}</Text>
                <Text style={styles.lotCrop}>{lot.crop}</Text>
                <View style={styles.lotFooter}>
                  <Text style={styles.lotArea}>{lot.area} ha</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(lot.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>{lot.status}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Acciones rápidas */}
      <View style={styles.actionsContainer}>
        <Pressable
          style={[AgroSurface.primaryButton, styles.actionButton]}
          onPress={() => router.push('/lot-create')}
        >
          <Text style={AgroSurface.primaryButtonText}>Nuevo Lote</Text>
        </Pressable>

        <Pressable
          style={[AgroSurface.secondaryButton, styles.actionButton]}
          onPress={() => router.push('/farm-edit')}
        >
          <Text style={AgroSurface.secondaryButtonText}>Editar Granja</Text>
        </Pressable>
      </View>
    </AgroScreen>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'rgba(34, 197, 94, 0.2)';
    case 'planning':
      return 'rgba(59, 130, 246, 0.2)';
    case 'harvested':
      return 'rgba(245, 158, 11, 0.2)';
    default:
      return 'rgba(107, 114, 128, 0.2)';
  }
}

const styles = StyleSheet.create({
  heroCard: {
    padding: Spacing.four,
    gap: Spacing.three,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(82,255,148,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(82,255,148,0.25)',
  },

  headerEmoji: {
    fontSize: 32,
  },

  headerInfo: {
    flex: 1,
    gap: 4,
  },

  headerLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  headerValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#52FF94',
  },

  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },

  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: Spacing.two,
    alignItems: 'center',
    gap: 4,
  },

  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },

  sectionContainer: {
    gap: Spacing.two,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  linkText: {
    color: '#52FF94',
    fontWeight: '600',
    fontSize: 13,
  },

  lotsScroll: {
    gap: Spacing.two,
    paddingRight: Spacing.three,
  },

  lotCard: {
    width: 160,
    padding: Spacing.two,
    gap: Spacing.one,
  },

  lotName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  lotCrop: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
  },

  lotFooter: {
    marginTop: Spacing.one,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lotArea: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52FF94',
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },

  emptyState: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
  },

  emptyEmoji: {
    fontSize: 48,
  },

  emptyText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
  },

  createButton: {
    marginTop: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    backgroundColor: 'rgba(82,255,148,0.15)',
    borderRadius: 8,
  },

  createButtonText: {
    color: '#52FF94',
    fontWeight: '600',
    fontSize: 13,
  },

  actionsContainer: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },

  actionButton: {
    width: '100%',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: Spacing.four,
  },
});
