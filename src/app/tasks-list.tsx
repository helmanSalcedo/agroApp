import { View, Text, StyleSheet, FlatList, Pressable, useWindowDimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { useTaskContext, TaskStatus, TaskPriority } from '@/context/task-context';

export default function TasksListScreen() {
  const router = useRouter();
  const { tasks, upcomingTasks, overdueTasks } = useTaskContext();
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<'todas' | 'proximas' | 'atrasadas' | 'pendientes' | 'completadas'>('todas');
  const [searchText, setSearchText] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'todas'>('todas');

  const isTablet = width > 768;

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgente':
        return '#EF4444';
      case 'alta':
        return '#F59E0B';
      case 'media':
        return '#3B82F6';
      default:
        return '#10B981';
    }
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgente':
        return 'Urgente';
      case 'alta':
        return 'Alta';
      case 'media':
        return 'Media';
      default:
        return 'Baja';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'pendiente':
        return '#9CA3AF';
      case 'en-progreso':
        return '#3B82F6';
      case 'completada':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'pendiente':
        return 'Pendiente';
      case 'en-progreso':
        return 'En Progreso';
      case 'completada':
        return 'Completada';
      default:
        return 'Cancelada';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cultivo':
        return '🌱';
      case 'animal':
        return '🐄';
      case 'inventario':
        return '📦';
      case 'mantenimiento':
        return '🔧';
      default:
        return '📋';
    }
  };

  let filteredTasks = tasks;

  if (filter === 'proximas') {
    filteredTasks = upcomingTasks;
  } else if (filter === 'atrasadas') {
    filteredTasks = overdueTasks;
  } else if (filter === 'pendientes') {
    filteredTasks = tasks.filter(t => t.status === 'pendiente');
  } else if (filter === 'completadas') {
    filteredTasks = tasks.filter(t => t.status === 'completada');
  }

  if (priorityFilter !== 'todas') {
    filteredTasks = filteredTasks.filter(t => t.priority === priorityFilter);
  }

  if (searchText) {
    filteredTasks = filteredTasks.filter(t =>
      t.title.toLowerCase().includes(searchText.toLowerCase()) ||
      t.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const renderTaskCard = ({ item, index }: { item: any; index: number }) => {
    const daysUntilDue = Math.ceil(
      (new Date(item.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    const isOverdue = daysUntilDue < 0;

    return (
      <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
        <Pressable
          onPress={() => router.push(`/task-detail?id=${item.id}`)}
          style={[styles.taskCard, isOverdue && styles.taskCardOverdue]}
        >
          <LinearGradient
            colors={
              isOverdue
                ? ['rgba(239,68,68,0.1)', 'rgba(239,68,68,0.05)']
                : ['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.taskGradient}
          >
            {/* Indicador de prioridad */}
            <View
              style={[
                styles.priorityIndicator,
                { backgroundColor: getPriorityColor(item.priority) },
              ]}
            />

            {/* Contenido */}
            <View style={styles.taskContent}>
              <View style={styles.taskHeader}>
                <View style={styles.taskMeta}>
                  <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
                  <View style={styles.titleSection}>
                    <Text style={styles.taskTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.priorityBadge}>
                        {getPriorityLabel(item.priority)}
                      </Text>
                      <Text
                        style={[
                          styles.statusBadge,
                          { backgroundColor: `${getStatusColor(item.status)}20` },
                        ]}
                      >
                        {getStatusLabel(item.status)}
                      </Text>
                    </View>
                  </View>
                </View>

                <Pressable
                  onPress={() => router.push(`/task-detail?id=${item.id}`)}
                  style={styles.chevron}
                >
                  <Ionicons name="chevron-forward" size={20} color="#52FF94" />
                </Pressable>
              </View>

              {/* Descripción */}
              <Text style={styles.taskDescription} numberOfLines={2}>
                {item.description}
              </Text>

              {/* Footer */}
              <View style={styles.taskFooter}>
                <View style={styles.dueDateContainer}>
                  <Ionicons
                    name="calendar"
                    size={14}
                    color={isOverdue ? '#EF4444' : '#52FF94'}
                  />
                  <Text
                    style={[
                      styles.dueDate,
                      isOverdue && styles.dueDateOverdue,
                    ]}
                  >
                    {isOverdue ? `Vencida hace ${Math.abs(daysUntilDue)} días` : `En ${daysUntilDue} días`}
                  </Text>
                </View>

                {item.progress !== undefined && item.status !== 'completada' && (
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${item.progress}%` },
                      ]}
                    />
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    );
  };

  const emptyState = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>✅</Text>
      <Text style={styles.emptyTitle}>No hay tareas</Text>
      <Text style={styles.emptyText}>
        {filter === 'completadas'
          ? 'No tienes tareas completadas aún'
          : 'Crea una nueva tarea para empezar'}
      </Text>
      <Pressable
        style={styles.createButton}
        onPress={() => router.push('/task-create')}
      >
        <Text style={styles.createButtonText}>+ Nueva Tarea</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Tareas</Text>
            <Pressable
              style={styles.createIconButton}
              onPress={() => router.push('/task-create')}
            >
              <Ionicons name="add-circle" size={32} color="#52FF94" />
            </Pressable>
          </View>

          {/* Búsqueda */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="rgba(255,255,255,0.5)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar tareas..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </Animated.View>

        {/* Filtros */}
        <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.filtersContainer}>
          <FlatList
            data={[
              { id: 'todas', label: 'Todas' },
              { id: 'proximas', label: 'Próximas' },
              { id: 'atrasadas', label: 'Atrasadas' },
              { id: 'pendientes', label: 'Pendientes' },
              { id: 'completadas', label: 'Completadas' },
            ]}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setFilter(item.id as any)}
                style={[
                  styles.filterChip,
                  filter === item.id && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    filter === item.id && styles.filterChipTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContent}
          />
        </Animated.View>

        {/* Lista de Tareas */}
        {filteredTasks.length === 0 ? (
          emptyState
        ) : (
          <FlatList
            data={filteredTasks}
            renderItem={renderTaskCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            scrollIndicatorInsets={{ right: 1 }}
          />
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  createIconButton: {
    padding: 4,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(82,255,148,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    gap: 8,
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  filtersContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(82,255,148,0.05)',
  },

  filterChipActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.2)',
  },

  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  filterChipTextActive: {
    color: '#52FF94',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },

  taskCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
  },

  taskCardOverdue: {
    borderColor: 'rgba(239,68,68,0.2)',
  },

  taskGradient: {
    padding: 14,
    gap: 12,
  },

  priorityIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 2,
  },

  taskContent: {
    marginLeft: 8,
    gap: 10,
  },

  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  taskMeta: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },

  categoryIcon: {
    fontSize: 20,
    marginTop: 2,
  },

  titleSection: {
    flex: 1,
    gap: 6,
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  metaRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  priorityBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(239,68,68,0.15)',
  },

  statusBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },

  chevron: {
    padding: 4,
  },

  taskDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '400',
  },

  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },

  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  dueDate: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  dueDateOverdue: {
    color: '#EF4444',
    fontWeight: '600',
  },

  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(82,255,148,0.2)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#52FF94',
    borderRadius: 2,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 24,
  },

  createButton: {
    backgroundColor: '#52FF94',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  createButtonText: {
    color: '#020403',
    fontWeight: '700',
    fontSize: 14,
  },
});
