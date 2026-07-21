import { View, Text, StyleSheet, Pressable, ScrollView, Modal, TextInput, Switch, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { useTaskContext, TaskStatus } from '@/context/task-context';

export default function TaskDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { tasks, updateTask, completeTask, deleteTask, addReminder } = useTaskContext();

  const taskId = params.id as string;
  const task = tasks.find(t => t.id === taskId);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title || '');
  const [editedDescription, setEditedDescription] = useState(task?.description || '');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderFrequency, setReminderFrequency] = useState<'una-vez' | 'diaria' | 'semanal' | 'mensual'>('una-vez');

  if (!task) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#020403', '#08120D']} style={StyleSheet.absoluteFill} />
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#52FF94', fontSize: 18 }}>Tarea no encontrada</Text>
        </SafeAreaView>
      </View>
    );
  }

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      urgente: '#EF4444',
      alta: '#F59E0B',
      media: '#3B82F6',
      baja: '#10B981',
    };
    return colors[priority] || '#10B981';
  };

  const getStatusColor = (status: TaskStatus) => {
    const colors: { [key: string]: string } = {
      pendiente: '#9CA3AF',
      'en-progreso': '#3B82F6',
      completada: '#10B981',
      cancelada: '#6B7280',
    };
    return colors[status] || '#6B7280';
  };

  const daysUntilDue = Math.ceil(
    (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleSaveChanges = () => {
    updateTask(task.id, { title: editedTitle, description: editedDescription });
    setShowEditModal(false);
  };

  const handleAddReminder = () => {
    addReminder(task.id, {
      type: 'notificacion',
      time: reminderTime,
      frequency: reminderFrequency,
      enabled: true,
    });
    setShowReminderModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Detalle de Tarea</Text>
          <Pressable onPress={() => setShowEditModal(true)}>
            <Ionicons name="pencil" size={24} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <LinearGradient
              colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
              style={styles.mainCard}
            >
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.description}>{task.description}</Text>

              <View style={styles.statusRow}>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(task.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(task.status) }]}>
                    {task.status === 'completada' ? 'Completada' : task.status}
                  </Text>
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(task.priority)}20` }]}>
                  <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.dueDateSection}>
                <Ionicons name="calendar" size={18} color="#52FF94" />
                <View>
                  <Text style={styles.dueDateLabel}>Vencimiento</Text>
                  <Text style={styles.dueDateValue}>{task.dueDate}</Text>
                  <Text style={[styles.daysUntil, daysUntilDue < 0 && styles.daysUntilOverdue]}>
                    {daysUntilDue < 0 ? `Atrasada hace ${Math.abs(daysUntilDue)} días` : `En ${daysUntilDue} días`}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⏰ Recordatorios</Text>
              {task.reminders.length === 0 ? (
                <Text style={styles.noReminders}>Sin recordatorios</Text>
              ) : (
                <FlatList
                  data={task.reminders}
                  renderItem={({ item }) => (
                    <View style={styles.reminderItem}>
                      <Text style={styles.reminderTime}>{item.time}</Text>
                      <Switch
                        value={item.enabled}
                        trackColor={{ false: '#6B7280', true: '#52FF94' }}
                        thumbColor={item.enabled ? '#52FF94' : '#9CA3AF'}
                      />
                    </View>
                  )}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              )}
              <Pressable onPress={() => setShowReminderModal(true)}>
                <Text style={styles.addReminderLink}>+ Agregar Recordatorio</Text>
              </Pressable>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(400).delay(300)} style={styles.actionsSection}>
            {task.status !== 'completada' && (
              <Pressable style={styles.completeButton} onPress={() => { completeTask(task.id); router.back(); }}>
                <Ionicons name="checkmark-circle" size={20} color="#020403" />
                <Text style={styles.completeButtonText}>Marcar Completada</Text>
              </Pressable>
            )}
            <Pressable style={styles.deleteButton} onPress={() => { deleteTask(task.id); router.back(); }}>
              <Ionicons name="trash" size={20} color="#EF4444" />
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>

      <Modal visible={showEditModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Tarea</Text>
              <Pressable onPress={() => setShowEditModal(false)}>
                <Ionicons name="close" size={28} color="#52FF94" />
              </Pressable>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Título</Text>
                <TextInput style={styles.textInput} value={editedTitle} onChangeText={setEditedTitle} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Descripción</Text>
                <TextInput style={[styles.textInput, styles.textArea]} value={editedDescription} onChangeText={setEditedDescription} multiline numberOfLines={5} />
              </View>
            </ScrollView>
            <Pressable style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      </Modal>

      <Modal visible={showReminderModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuevo Recordatorio</Text>
              <Pressable onPress={() => setShowReminderModal(false)}>
                <Ionicons name="close" size={28} color="#52FF94" />
              </Pressable>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Hora</Text>
                <TextInput style={styles.textInput} value={reminderTime} onChangeText={setReminderTime} placeholder="HH:mm" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Frecuencia</Text>
                <View style={styles.frequencyOptions}>
                  {['una-vez', 'diaria', 'semanal', 'mensual'].map(freq => (
                    <Pressable key={freq} style={[styles.frequencyOption, reminderFrequency === freq && styles.frequencyOptionActive]} onPress={() => setReminderFrequency(freq as any)}>
                      <Text style={[styles.frequencyText, reminderFrequency === freq && styles.frequencyTextActive]}>
                        {freq === 'una-vez' ? 'Una vez' : freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>
            <Pressable style={styles.saveButton} onPress={handleAddReminder}>
              <Text style={styles.saveButtonText}>Agregar</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, textAlign: 'center' },
  scrollContent: { paddingHorizontal: 16, paddingVertical: 16, gap: 16 },
  mainCard: { borderRadius: 14, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, gap: 14 },
  taskTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  description: { fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 18 },
  statusRow: { flexDirection: 'row', gap: 10 },
  statusBadge: { flex: 1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center' },
  statusText: { fontWeight: '600', fontSize: 12 },
  priorityBadge: { flex: 1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center' },
  priorityText: { fontWeight: '600', fontSize: 12 },
  dueDateSection: { flexDirection: 'row', gap: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  dueDateLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  dueDateValue: { fontSize: 14, color: '#FFFFFF', fontWeight: '700', marginTop: 4 },
  daysUntil: { fontSize: 11, color: '#52FF94', marginTop: 2 },
  daysUntilOverdue: { color: '#EF4444' },
  section: { gap: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#52FF94' },
  noReminders: { fontSize: 12, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' },
  reminderItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.05)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', marginBottom: 8 },
  reminderTime: { fontSize: 14, fontWeight: '700', color: '#52FF94' },
  addReminderLink: { fontSize: 12, fontWeight: '600', color: '#52FF94', marginTop: 8 },
  actionsSection: { gap: 12, marginBottom: 16 },
  completeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#52FF94', paddingVertical: 14, borderRadius: 12 },
  completeButtonText: { color: '#020403', fontWeight: '700', fontSize: 14 },
  deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)', paddingVertical: 14, borderRadius: 12 },
  deleteButtonText: { color: '#EF4444', fontWeight: '700', fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { flex: 1, backgroundColor: '#020403' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  modalContent: { flex: 1, paddingHorizontal: 16, paddingVertical: 16 },
  inputGroup: { marginBottom: 20, gap: 8 },
  inputLabel: { fontSize: 13, fontWeight: '700', color: '#52FF94' },
  textInput: { backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: '#FFFFFF', fontSize: 14 },
  textArea: { textAlignVertical: 'top', paddingTop: 12 },
  frequencyOptions: { flexDirection: 'row', gap: 10 },
  frequencyOption: { flex: 1, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', backgroundColor: 'rgba(82,255,148,0.05)' },
  frequencyOptionActive: { borderColor: '#52FF94', backgroundColor: 'rgba(82,255,148,0.15)' },
  frequencyText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
  frequencyTextActive: { color: '#52FF94' },
  saveButton: { backgroundColor: '#52FF94', marginHorizontal: 16, marginBottom: 16, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: '#020403', fontWeight: '700', fontSize: 14 },
});
