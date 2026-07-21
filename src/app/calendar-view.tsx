import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { CalendarWidget } from '@/components/calendar-widget';
import { useTaskContext } from '@/context/task-context';

export default function CalendarViewScreen() {
  const router = useRouter();
  const { tasks } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      urgente: '#EF4444',
      alta: '#F59E0B',
      media: '#3B82F6',
      baja: '#10B981',
    };
    return colors[priority] || '#10B981';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      cultivo: '🌱',
      animal: '🐄',
      inventario: '📦',
      mantenimiento: '🔧',
      general: '📋',
    };
    return icons[category] || '📋';
  };

  const eventDots: { [key: string]: number } = {};
  tasks.forEach(task => {
    if (task.status !== 'completada' && task.status !== 'cancelada') {
      const dateKey = task.dueDate;
      eventDots[dateKey] = (eventDots[dateKey] || 0) + 1;
    }
  });

  const selectedDateKey = selectedDate.toISOString().split('T')[0];
  const tasksForSelectedDate = tasks.filter(task => {
    if (task.status === 'completada' || task.status === 'cancelada') return false;
    return task.dueDate === selectedDateKey;
  });

  const upcomingTasks = tasks
    .filter(task => {
      if (task.status === 'completada' || task.status === 'cancelada') return false;
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate >= today && taskDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const renderTaskItem = ({ item, index }: { item: any; index: number }) => {
    const daysUntilDue = Math.ceil(
      (new Date(item.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
      <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
        <Pressable
          style={styles.taskItem}
          onPress={() => router.push(`/task-detail?id=${item.id}`)}
        >
          <LinearGradient
            colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.taskGradient}
          >
            <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />

            <View style={styles.taskContent}>
              <View style={{ gap: 4 }}>
                <Text style={styles.taskTitle}>{getCategoryIcon(item.category)} {item.title}</Text>
                <Text style={styles.taskDate}>
                  {new Date(item.dueDate).toLocaleDateString('es-MX', {
                    month: 'short',
                    day: 'numeric',
                  })}
                  {' • '}
                  {daysUntilDue === 0 ? 'Hoy' : `En ${daysUntilDue} días`}
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#52FF94" />
          </LinearGradient>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Calendario de Tareas</Text>
          <View style={{ width: 28 }} />
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Calendar */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.calendarContainer}>
            <CalendarWidget
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
              eventDots={eventDots}
            />
          </Animated.View>

          {/* Selected Date Tasks */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedDate.toLocaleDateString('es-MX', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Text style={styles.taskCount}>
                {tasksForSelectedDate.length} {tasksForSelectedDate.length === 1 ? 'tarea' : 'tareas'}
              </Text>
            </View>

            {tasksForSelectedDate.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📭</Text>
                <Text style={styles.emptyText}>Sin tareas en esta fecha</Text>
              </View>
            ) : (
              <FlatList
                data={tasksForSelectedDate}
                renderItem={renderTaskItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.tasksList}
              />
            )}
          </Animated.View>

          {/* Upcoming Tasks */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>⏰ Próximas 7 días</Text>
              <Pressable onPress={() => router.push('/tasks-list')}>
                <Text style={styles.seeAllLink}>Ver todas</Text>
              </Pressable>
            </View>

            {upcomingTasks.length === 0 ? (
              <Text style={styles.noUpcoming}>No hay tareas próximas</Text>
            ) : (
              <FlatList
                data={upcomingTasks.slice(0, 5)}
                renderItem={renderTaskItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.tasksList}
              />
            )}
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
  calendarContainer: { paddingHorizontal: 16, paddingVertical: 16 },
  section: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#52FF94', textTransform: 'capitalize' },
  taskCount: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  seeAllLink: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  tasksList: { gap: 10 },
  taskItem: { borderRadius: 12, overflow: 'hidden' },
  taskGradient: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, gap: 10 },
  priorityDot: { width: 6, height: 6, borderRadius: 3 },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  taskDate: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  emptyState: { alignItems: 'center', paddingVertical: 20 },
  emptyIcon: { fontSize: 40, marginBottom: 8 },
  emptyText: { fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  noUpcoming: { fontSize: 13, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' },
});
