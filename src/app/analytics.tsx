import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { useTaskContext } from '@/context/task-context';
import { useFarmContext } from '@/context/farm-context';

export default function AnalyticsScreen() {
  const router = useRouter();
  const { tasks } = useTaskContext();
  const { farms } = useFarmContext();

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completada').length,
    pending: tasks.filter(t => t.status === 'pendiente').length,
    inProgress: tasks.filter(t => t.status === 'en-progreso').length,
    overdue: tasks.filter(t => {
      if (t.status === 'completada' || t.status === 'cancelada') return false;
      const dueDate = new Date(t.dueDate);
      return dueDate < new Date();
    }).length,
  };

  const completionRate = Math.round((taskStats.completed / taskStats.total) * 100) || 0;

  const tasksByCategory = {
    cultivo: tasks.filter(t => t.category === 'cultivo').length,
    animal: tasks.filter(t => t.category === 'animal').length,
    inventario: tasks.filter(t => t.category === 'inventario').length,
    mantenimiento: tasks.filter(t => t.category === 'mantenimiento').length,
    general: tasks.filter(t => t.category === 'general').length,
  };

  const tasksByPriority = {
    baja: tasks.filter(t => t.priority === 'baja').length,
    media: tasks.filter(t => t.priority === 'media').length,
    alta: tasks.filter(t => t.priority === 'alta').length,
    urgente: tasks.filter(t => t.priority === 'urgente').length,
  };

  const stats = [
    { label: 'Total Tareas', value: taskStats.total.toString(), icon: '📋', color: '#3B82F6' },
    { label: 'Completadas', value: taskStats.completed.toString(), icon: '✅', color: '#10B981' },
    { label: 'Pendientes', value: taskStats.pending.toString(), icon: '⏳', color: '#F59E0B' },
    { label: 'Atrasadas', value: taskStats.overdue.toString(), icon: '⚠️', color: '#EF4444' },
  ];

  const categories = [
    { name: 'Cultivo', count: tasksByCategory.cultivo, icon: '🌱', color: '#10B981' },
    { name: 'Animal', count: tasksByCategory.animal, icon: '🐄', color: '#3B82F6' },
    { name: 'Inventario', count: tasksByCategory.inventario, icon: '📦', color: '#F59E0B' },
    { name: 'Mantenimiento', count: tasksByCategory.mantenimiento, icon: '🔧', color: '#06B6D4' },
    { name: 'General', count: tasksByCategory.general, icon: '📋', color: '#8B5CF6' },
  ];

  const priorities = [
    { name: 'Baja', count: tasksByPriority.baja, color: '#10B981' },
    { name: 'Media', count: tasksByPriority.media, color: '#3B82F6' },
    { name: 'Alta', count: tasksByPriority.alta, color: '#F59E0B' },
    { name: 'Urgente', count: tasksByPriority.urgente, color: '#EF4444' },
  ];

  const renderStatCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <LinearGradient
        colors={[`${item.color}15`, `${item.color}08`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statCard}
      >
        <View style={[styles.statIcon, { backgroundColor: `${item.color}20` }]}>
          <Text style={styles.statIconText}>{item.icon}</Text>
        </View>
        <View style={{ gap: 4 }}>
          <Text style={styles.statValue}>{item.value}</Text>
          <Text style={styles.statLabel}>{item.label}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const renderCategoryBar = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <View style={styles.categoryBar}>
        <View style={styles.categoryLabel}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
        <View style={styles.categoryBarContainer}>
          <LinearGradient
            colors={[item.color, `${item.color}80`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.categoryBarFill,
              { width: `${Math.max((item.count / Math.max(...categories.map(c => c.count), 1)) * 100, 5)}%` },
            ]}
          />
        </View>
        <Text style={styles.categoryCount}>{item.count}</Text>
      </View>
    </Animated.View>
  );

  const renderPriorityBar = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <View style={styles.priorityBar}>
        <Text style={[styles.priorityName, { color: item.color }]}>
          {item.name}
        </Text>
        <View style={styles.priorityBarContainer}>
          <LinearGradient
            colors={[item.color, `${item.color}80`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.priorityBarFill,
              { width: `${Math.max((item.count / Math.max(...priorities.map(p => p.count), 1)) * 100, 5)}%` },
            ]}
          />
        </View>
        <Text style={styles.priorityCount}>{item.count}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Analytics</Text>
          <View style={{ width: 28 }} />
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Completion Rate */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <LinearGradient
              colors={['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.completionCard}
            >
              <View style={styles.completionContent}>
                <View>
                  <Text style={styles.completionLabel}>Tasa de Completitud</Text>
                  <Text style={styles.completionValue}>{completionRate}%</Text>
                </View>
                <View style={styles.completionChart}>
                  <Text style={styles.completionChartText}>{taskStats.completed}/{taskStats.total}</Text>
                </View>
              </View>
              <View style={styles.completionBar}>
                <LinearGradient
                  colors={['#10B981', '#06B6D4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.completionBarFill, { width: `${completionRate}%` }]}
                />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Quick Stats */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <Text style={styles.sectionTitle}>📊 Estadísticas Rápidas</Text>
            <FlatList
              data={stats}
              renderItem={renderStatCard}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              numColumns={2}
              columnWrapperStyle={styles.statsGrid}
            />
          </Animated.View>

          {/* By Category */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <Text style={styles.sectionTitle}>📁 Por Categoría</Text>
            <FlatList
              data={categories}
              renderItem={renderCategoryBar}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </Animated.View>

          {/* By Priority */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)}>
            <Text style={styles.sectionTitle}>🎯 Por Prioridad</Text>
            <FlatList
              data={priorities}
              renderItem={renderPriorityBar}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </Animated.View>

          {/* Farm Stats */}
          <Animated.View entering={FadeInDown.duration(400).delay(500)}>
            <Text style={styles.sectionTitle}>🌾 Fincas</Text>
            <LinearGradient
              colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.farmStatsCard}
            >
              <View style={styles.farmStatRow}>
                <View>
                  <Text style={styles.farmStatLabel}>Total Fincas</Text>
                  <Text style={styles.farmStatValue}>{farms.length}</Text>
                </View>
                <View style={styles.farmStatDivider} />
                <View>
                  <Text style={styles.farmStatLabel}>Área Total</Text>
                  <Text style={styles.farmStatValue}>
                    {farms.reduce((sum, f) => sum + f.totalArea, 0).toFixed(1)} ha
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, textAlign: 'center' },
  content: { paddingHorizontal: 16, paddingVertical: 16, gap: 20 },
  completionCard: { borderRadius: 14, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, gap: 12 },
  completionContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  completionLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  completionValue: { fontSize: 28, fontWeight: '800', color: '#10B981', marginTop: 4 },
  completionChart: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(16,185,129,0.2)', justifyContent: 'center', alignItems: 'center' },
  completionChartText: { fontSize: 16, fontWeight: '700', color: '#10B981' },
  completionBar: { height: 8, borderRadius: 4, backgroundColor: 'rgba(82,255,148,0.2)', overflow: 'hidden' },
  completionBarFill: { height: '100%', borderRadius: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#52FF94', marginBottom: 12, letterSpacing: 0.5, textTransform: 'uppercase' },
  statsGrid: { gap: 12, marginBottom: 12 },
  statCard: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  statIcon: { width: 48, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  statIconText: { fontSize: 22 },
  statValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  categoryBar: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  categoryLabel: { flexDirection: 'row', alignItems: 'center', gap: 8, width: 100 },
  categoryIcon: { fontSize: 18 },
  categoryName: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  categoryBarContainer: { flex: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(82,255,148,0.1)', overflow: 'hidden' },
  categoryBarFill: { height: '100%', borderRadius: 3 },
  categoryCount: { fontSize: 12, fontWeight: '700', color: '#52FF94', width: 30, textAlign: 'right' },
  priorityBar: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  priorityName: { fontSize: 12, fontWeight: '600', width: 70 },
  priorityBarContainer: { flex: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(82,255,148,0.1)', overflow: 'hidden' },
  priorityBarFill: { height: '100%', borderRadius: 3 },
  priorityCount: { fontSize: 12, fontWeight: '700', color: '#52FF94', width: 30, textAlign: 'right' },
  farmStatsCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 14 },
  farmStatRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  farmStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  farmStatValue: { fontSize: 18, fontWeight: '800', color: '#52FF94', marginTop: 4 },
  farmStatDivider: { width: 1, height: 40, backgroundColor: 'rgba(82,255,148,0.2)' },
});
