import { ProductionType, ActivityType } from '@/types/domain';

export interface ActivityTypeConfig {
  type: ActivityType;
  label: string;
  description: string;
  emoji: string;
  color: string;
  icon?: React.ReactNode;
}

export const ACTIVITIES_BY_PRODUCTION: Record<ProductionType, ActivityTypeConfig[]> = {
  [ProductionType.CROPS]: [
    {
      type: ActivityType.IRRIGATION,
      label: 'Riego',
      description: 'Sistema de goteo o riego manual',
      emoji: '💧',
      color: '#3B82F6',
    },
    {
      type: ActivityType.FERTILIZATION,
      label: 'Fertilización',
      description: 'Aplicación de nutrientes',
      emoji: '🧪',
      color: '#EAB308',
    },
    {
      type: ActivityType.PEST_CONTROL,
      label: 'Control de Plagas',
      description: 'Fungicida o insecticida',
      emoji: '🐛',
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
      type: ActivityType.IRRIGATION_MAINTENANCE,
      label: 'Mantenimiento de Riego',
      description: 'Limpieza de tuberías',
      emoji: '🔧',
      color: '#0369A1',
    },
    {
      type: ActivityType.SALES,
      label: 'Venta de Cosecha',
      description: 'Registro de venta de cultivos',
      emoji: '💵',
      color: '#06B6D4',
    },
  ],

  [ProductionType.LIVESTOCK]: [
    {
      type: ActivityType.IRRIGATION,
      label: 'Alimentación',
      description: 'Alimentación del ganado',
      emoji: '🥕',
      color: '#3B82F6',
    },
    {
      type: ActivityType.FERTILIZATION,
      label: 'Vacunación',
      description: 'Aplicación de vacunas y medicinas',
      emoji: '💉',
      color: '#EAB308',
    },
    {
      type: ActivityType.PEST_CONTROL,
      label: 'Control Sanitario',
      description: 'Control de enfermedades y parásitos',
      emoji: '🔬',
      color: '#EF4444',
    },
    {
      type: ActivityType.WEEDING,
      label: 'Mantenimiento',
      description: 'Limpieza y mantenimiento de instalaciones',
      emoji: '🧹',
      color: '#10B981',
    },
    {
      type: ActivityType.HARVESTING,
      label: 'Ordeño',
      description: 'Extracción de leche',
      emoji: '🥛',
      color: '#F59E0B',
    },
    {
      type: ActivityType.PRUNING,
      label: 'Reproducción',
      description: 'Registro de reproducción',
      emoji: '👶',
      color: '#8B5CF6',
    },
    {
      type: ActivityType.DISINFECTION,
      label: 'Desinfección',
      description: 'Limpieza de instalaciones y herramientas',
      emoji: '🧼',
      color: '#0891B2',
    },
    {
      type: ActivityType.CROP_INSPECTION,
      label: 'Inspección de Ganado',
      description: 'Revisión general de salud',
      emoji: '👁️',
      color: '#4F46E5',
    },
    {
      type: ActivityType.SALES,
      label: 'Venta de Animales',
      description: 'Registro de venta de ganado',
      emoji: '💵',
      color: '#06B6D4',
    },
  ],

  [ProductionType.FISHING]: [
    {
      type: ActivityType.IRRIGATION,
      label: 'Alimentación',
      description: 'Alimentación de peces',
      emoji: '🥗',
      color: '#3B82F6',
    },
    {
      type: ActivityType.FERTILIZATION,
      label: 'Control Agua',
      description: 'Control de calidad del agua',
      emoji: '💧',
      color: '#EAB308',
    },
    {
      type: ActivityType.PEST_CONTROL,
      label: 'Control Sanitario',
      description: 'Control de enfermedades en peces',
      emoji: '🔬',
      color: '#EF4444',
    },
    {
      type: ActivityType.WEEDING,
      label: 'Mantenimiento',
      description: 'Limpieza de estanques',
      emoji: '🧹',
      color: '#10B981',
    },
    {
      type: ActivityType.HARVESTING,
      label: 'Cosecha',
      description: 'Recolección de peces',
      emoji: '🎣',
      color: '#F59E0B',
    },
    {
      type: ActivityType.SALES,
      label: 'Venta de Pescado',
      description: 'Registro de venta de peces',
      emoji: '💵',
      color: '#06B6D4',
    },
  ],

  [ProductionType.FORESTRY]: [
    {
      type: ActivityType.IRRIGATION,
      label: 'Riego',
      description: 'Sistema de riego forestal',
      emoji: '💧',
      color: '#3B82F6',
    },
    {
      type: ActivityType.FERTILIZATION,
      label: 'Fertilización',
      description: 'Aplicación de nutrientes',
      emoji: '🧪',
      color: '#EAB308',
    },
    {
      type: ActivityType.PEST_CONTROL,
      label: 'Control de Plagas',
      description: 'Control de plagas forestales',
      emoji: '🐛',
      color: '#EF4444',
    },
    {
      type: ActivityType.PRUNING,
      label: 'Poda',
      description: 'Manejo de árbol',
      emoji: '✂️',
      color: '#8B5CF6',
    },
    {
      type: ActivityType.HARVESTING,
      label: 'Cosecha',
      description: 'Tala y recolección',
      emoji: '🪓',
      color: '#F59E0B',
    },
    {
      type: ActivityType.SALES,
      label: 'Venta de Madera',
      description: 'Registro de venta forestal',
      emoji: '💵',
      color: '#06B6D4',
    },
  ],

  [ProductionType.OTHER]: [
    {
      type: ActivityType.HARVESTING,
      label: 'Cosecha',
      description: 'Recolección general',
      emoji: '🌾',
      color: '#F59E0B',
    },
    {
      type: ActivityType.SALES,
      label: 'Venta',
      description: 'Registro de venta',
      emoji: '💵',
      color: '#06B6D4',
    },
  ],
};

export function getActivitiesForProduction(type: ProductionType): ActivityTypeConfig[] {
  return ACTIVITIES_BY_PRODUCTION[type] || ACTIVITIES_BY_PRODUCTION[ProductionType.OTHER];
}
