import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Spacing } from '@/constants/theme';
import { ActivityType } from '@/types/domain';
import { WaterDropIcon } from '@/assets/svg/icons/water-drop';
import { FertilizerIcon } from '@/assets/svg/icons/fertilizer';
import { BugShieldIcon } from '@/assets/svg/icons/bug-shield';

/**
 * Pantalla de Seleccionar Tipo de Actividad
 * Usuario elige qué tipo de actividad registrar
 */
export default function ActivitySelectScreen() {
  const ACTIVITY_TYPES = [
    {
      type: ActivityType.IRRIGATION,
      label: 'Riego',
      description: 'Sistema de goteo o riego manual',
      icon: <WaterDropIcon size={48} color="#3B82F6" />,
      color: '#3B82F6',
    },
    {
      type: ActivityType.FERTILIZATION,
      label: 'Fertilización',
      description: 'Aplicación de nutrientes',
      icon: <FertilizerIcon size={48} color="#EAB308" />,
      color: '#EAB308',
    },
    {
      type: ActivityType.PEST_CONTROL,
      label: 'Control de Plagas',
      description: 'Fungicida o insecticida',
      icon: <BugShieldIcon size={48} color="#EF4444" />,
      color: '#EF4444',
    },
    {
      type: ActivityType.WEEDING,
      label: 'Deshierbe',
      description: 'Eliminación de malezas',
      emoji: '🌿',
      color: '#10B981',
    },
    {
      type: ActivityType.HARVESTING,
      label: 'Cosecha',
      description: 'Recolección de producto',
      emoji: '🌾',
      color: '#F59E0B',
    },
    {
      type: ActivityType.PRUNING,
      label: 'Poda',
      description: 'Corte de ramas y mantenimiento',
      emoji: '✂️',
      color: '#8B5CF6',
    },
    {
      type: ActivityType.SOIL_ANALYSIS,
      label: 'Análisis de Suelo',
      description: 'Pruebas de fertilidad y pH',
      emoji: '🔬',
      color: '#A16207',
    },
    {
      type: ActivityType.TRANSPLANTING,
      label: 'Trasplante',
      description: 'Movimiento de plántulas',
      emoji: '🪴',
      color: '#059669',
    },
    {
      type: ActivityType.PEST_MONITORING,
      label: 'Monitoreo de Plagas',
      description: 'Inspección sin aplicar pesticidas',
      emoji: '🔍',
      color: '#7C2D12',
    },
    {
      type: ActivityType.CROP_INSPECTION,
      label: 'Inspección de Cultivos',
      description: 'Revisión general de salud',
      emoji: '👁️',
      color: '#4F46E5',
    },
    {
      type: ActivityType.PACKING,
      label: 'Empacado',
      description: 'Preparación post-cosecha',
      emoji: '📦',
      color: '#DC2626',
    },
    {
      type: ActivityType.FUNGICIDE_APPLICATION,
      label: 'Aplicación Fungicida',
      description: 'Tratamiento antifúngico',
      emoji: '💉',
      color: '#E11D48',
    },
    {
      type: ActivityType.DISINFECTION,
      label: 'Desinfección',
      description: 'Limpieza de herramientas',
      emoji: '🧼',
      color: '#0891B2',
    },
    {
      type: ActivityType.IRRIGATION_MAINTENANCE,
      label: 'Mantenimiento de Riego',
      description: 'Limpieza de tuberías',
      emoji: '🔧',
      color: '#0369A1',
    },
  ];

  const handleSelectType = (type: ActivityType) => {
    router.push({
      pathname: '/activity-register',
      params: { type },
    });
  };

  return (
    <AgroScreen>
      <AppScreenHeader
        title="Nueva Actividad"
        subtitle="Selecciona el tipo de actividad a registrar"
      />

      {/* Info Card */}
      <View style={[AgroSurface.card, styles.infoCard]}>
        <Text style={styles.infoEmoji}>📋</Text>
        <Text style={styles.infoText}>
          Registra cada actividad en tus lotes para llevar un control completo
        </Text>
      </View>

      {/* Activity Types Grid */}
      <View style={styles.grid}>
        {ACTIVITY_TYPES.map((item) => (
          <Pressable
            key={item.type}
            style={[AgroSurface.card, styles.typeCard]}
            onPress={() => handleSelectType(item.type)}
          >
            <View
              style={[
                styles.iconCircle,
                { borderColor: item.color + '40', backgroundColor: item.color + '15' },
              ]}
            >
              {item.icon ? item.icon : <Text style={{ fontSize: 30 }}>{item.emoji}</Text>}
            </View>

            <Text style={styles.typeLabel}>{item.label}</Text>
            <Text style={styles.typeDescription}>{item.description}</Text>

            <View style={styles.chevronContainer}>
              <Text style={[styles.chevron, { color: item.color }]}>›</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },

  infoEmoji: {
    fontSize: 28,
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },

  typeCard: {
    width: '48%',
    padding: Spacing.three,
    gap: Spacing.two,
    alignItems: 'center',
    position: 'relative',
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },

  typeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  typeDescription: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    lineHeight: 15,
  },

  chevronContainer: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
  },

  chevron: {
    fontSize: 20,
    fontWeight: '800',
  },
});
