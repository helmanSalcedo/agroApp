import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Spacing } from '@/constants/theme';
import { ExpenseCategory } from '@/types/domain';

export default function ExpenseSelectScreen() {
  const EXPENSE_CATEGORIES = [
    {
      id: 'seeds',
      category: ExpenseCategory.SEEDS,
      label: 'Semillas',
      description: 'Semillas de cultivos',
      emoji: '🌾',
      color: '#84CC16',
    },
    {
      id: 'fertilizers',
      category: ExpenseCategory.FERTILIZERS,
      label: 'Fertilizantes',
      description: 'Abonos y fertilizantes',
      emoji: '🥗',
      color: '#6B7280',
    },
    {
      id: 'animal_feed',
      category: ExpenseCategory.ANIMAL_FEED,
      label: 'Alimentos',
      description: 'Concentrados para animales',
      emoji: '🐓',
      color: '#F59E0B',
    },
    {
      id: 'labor',
      category: ExpenseCategory.LABOR,
      label: 'Jornales',
      description: 'Pago de trabajadores',
      emoji: '👷',
      color: '#EF4444',
    },
    {
      id: 'irrigation',
      category: ExpenseCategory.IRRIGATION,
      label: 'Riego',
      description: 'Agua y sistemas de riego',
      emoji: '💧',
      color: '#3B82F6',
    },
    {
      id: 'transport',
      category: ExpenseCategory.TRANSPORT,
      label: 'Transporte',
      description: 'Traslado de productos',
      emoji: '🚛',
      color: '#06B6D4',
    },
    {
      id: 'equipment',
      category: ExpenseCategory.EQUIPMENT,
      label: 'Equipos',
      description: 'Herramientas y equipos',
      emoji: '🔧',
      color: '#8B5CF6',
    },
    {
      id: 'rental',
      category: ExpenseCategory.RENTAL,
      label: 'Alquiler',
      description: 'Maquinaria y alquileres',
      emoji: '🏗️',
      color: '#EC4899',
    },
    {
      id: 'utilities',
      category: ExpenseCategory.UTILITIES,
      label: 'Servicios',
      description: 'Energía, agua, servicios',
      emoji: '💡',
      color: '#FBBF24',
    },
    {
      id: 'maintenance',
      category: ExpenseCategory.MAINTENANCE,
      label: 'Mantenimiento',
      description: 'Reparaciones y mantenimiento',
      emoji: '🔨',
      color: '#64748B',
    },
    {
      id: 'veterinary',
      category: ExpenseCategory.VETERINARY,
      label: 'Veterinario',
      description: 'Servicios veterinarios',
      emoji: '🏥',
      color: '#06B6D4',
    },
    {
      id: 'other',
      category: ExpenseCategory.OTHER,
      label: 'Otros',
      description: 'Otros gastos',
      emoji: '📋',
      color: '#94A3B8',
    },
  ];

  const handleSelectCategory = (category: ExpenseCategory) => {
    router.push({
      pathname: '/expense-register',
      params: { category },
    });
  };

  return (
    <AgroScreen>
      <AppScreenHeader
        title="Nuevo Gasto"
        subtitle="Selecciona la categoría de gasto"
      />

      {/* Info Card */}
      <View style={[AgroSurface.card, styles.infoCard]}>
        <Text style={styles.infoEmoji}>💰</Text>
        <Text style={styles.infoText}>
          Registra todos tus gastos para calcular costos y rentabilidad
        </Text>
      </View>

      {/* Categories Grid */}
      <View style={styles.grid}>
        {EXPENSE_CATEGORIES.map((item) => (
          <Pressable
            key={item.id}
            style={[AgroSurface.card, styles.categoryCard]}
            onPress={() => handleSelectCategory(item.category)}
          >
            <View
              style={[
                styles.iconCircle,
                {
                  borderColor: item.color + '40',
                  backgroundColor: item.color + '15',
                },
              ]}
            >
              <Text style={{ fontSize: 30 }}>{item.emoji}</Text>
            </View>

            <Text style={styles.categoryLabel}>{item.label}</Text>
            <Text style={styles.categoryDescription}>{item.description}</Text>

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

  categoryCard: {
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

  categoryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  categoryDescription: {
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
