import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface NewsItem {
  id: string;
  title: string;
  category: 'precios' | 'clima' | 'tips' | 'normativa';
  content: string;
  icon: string;
  timestamp: string;
  color: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Precios de Maíz en Alza',
    category: 'precios',
    content: 'El precio del maíz ha aumentado un 12% en las últimas dos semanas debido a la menor oferta global.',
    icon: '📈',
    timestamp: 'Hace 2 horas',
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'Alerta de Plagas: Gusano Cogollero',
    category: 'tips',
    content: 'Se reportan casos en la región. Recomendamos revisar los cultivos y aplicar control preventivo.',
    icon: '🐛',
    timestamp: 'Hace 4 horas',
    color: '#FFA500',
  },
  {
    id: '3',
    title: 'Clima: Lluvia Esperada Esta Semana',
    category: 'clima',
    content: 'Se pronostican lluvias de 45-60 mm para el fin de semana. Ideal para riego de cultivos.',
    icon: '🌧️',
    timestamp: 'Hace 6 horas',
    color: '#3B82F6',
  },
  {
    id: '4',
    title: 'Nueva Resolución Agrícola 2024',
    category: 'normativa',
    content: 'El ministerio publicó nuevas disposiciones sobre certificación orgánica. Revisa los requisitos.',
    icon: '📋',
    timestamp: 'Hace 1 día',
    color: '#10B981',
  },
  {
    id: '5',
    title: 'Tomate: Demanda Alta en Mercados',
    category: 'precios',
    content: 'Exportaciones aumentaron. Buena oportunidad para productores de tomate en el país.',
    icon: '🍅',
    timestamp: 'Hace 1 día',
    color: '#EF4444',
  },
  {
    id: '6',
    title: 'Tips: Rotación de Cultivos',
    category: 'tips',
    content: 'Mejora la salud del suelo. Alterna leguminosas con cereales para optimizar nutrientes.',
    icon: '🌱',
    timestamp: 'Hace 2 días',
    color: '#52FF94',
  },
];

export default function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  const categories = [
    { id: 'all', label: 'Todas', icon: '📰' },
    { id: 'precios', label: 'Precios', icon: '💹' },
    { id: 'clima', label: 'Clima', icon: '🌦️' },
    { id: 'tips', label: 'Tips', icon: '💡' },
    { id: 'normativa', label: 'Normativa', icon: '📑' },
  ];

  const filteredNews = selectedCategory && selectedCategory !== 'all'
    ? MOCK_NEWS.filter(news => news.category === selectedCategory)
    : MOCK_NEWS;

  const renderNewsCard = ({ item, index }: { item: NewsItem; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable
        style={styles.newsCard}
        onPress={() => {
          // TODO: Navigate to detail
        }}
      >
        <LinearGradient
          colors={[`${item.color}15`, `${item.color}08`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>{item.icon}</Text>
            </View>
            <View style={styles.cardHeaderContent}>
              <View style={styles.categoryBadge}>
                <Text style={[styles.categoryBadgeText, { color: item.color }]}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </Text>
              </View>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>

          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsContent}>{item.content}</Text>

          <View style={styles.cardFooter}>
            <Text style={styles.readMore}>Leer más</Text>
            <Ionicons name="chevron-forward" size={16} color="#52FF94" />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Noticias Agrícolas</Text>
            <Text style={styles.headerSubtitle}>Mantente actualizado</Text>
          </View>
          <View style={styles.headerIcon}>
            <Text style={styles.largeIcon}>📰</Text>
          </View>
        </View>

        {/* Categories Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryButton,
                (selectedCategory === category.id || (!selectedCategory && category.id === 'all')) &&
                  styles.categoryButtonActive,
              ]}
              onPress={() =>
                setSelectedCategory(category.id === 'all' ? null : category.id)
              }
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryText,
                  (selectedCategory === category.id || (!selectedCategory && category.id === 'all')) &&
                    styles.categoryTextActive,
                ]}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* News List */}
        <FlatList
          data={filteredNews}
          renderItem={renderNewsCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.newsList}
          showsVerticalScrollIndicator={false}
          scrollEnabled
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    gap: 12,
  },

  backButton: {
    padding: 8,
    marginLeft: -8,
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  headerIcon: {
    fontSize: 28,
  },

  largeIcon: {
    fontSize: 28,
  },

  categoriesScroll: {
    maxHeight: 70,
  },

  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    gap: 6,
  },

  categoryButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  categoryIcon: {
    fontSize: 16,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  categoryTextActive: {
    color: '#52FF94',
    fontWeight: '700',
  },

  newsList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    paddingBottom: 24,
  },

  newsCard: {
    borderRadius: 14,
    overflow: 'hidden',
  },

  cardGradient: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 14,
    gap: 10,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardIcon: {
    fontSize: 20,
  },

  cardHeaderContent: {
    flex: 1,
    gap: 4,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  timestamp: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },

  newsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 20,
  },

  newsContent: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
    marginBottom: 4,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  readMore: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52FF94',
  },
});
