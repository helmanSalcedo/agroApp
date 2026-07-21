import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { useTaskContext, TaskPriority } from '@/context/task-context';

export default function TaskCreateScreen() {
  const router = useRouter();
  const { createTask } = useTaskContext();
  const { width } = useWindowDimensions();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [category, setCategory] = useState('general');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const isTablet = width > 768;

  const priorities: { key: TaskPriority; label: string; color: string }[] = [
    { key: 'baja', label: 'Baja', color: '#10B981' },
    { key: 'media', label: 'Media', color: '#3B82F6' },
    { key: 'alta', label: 'Alta', color: '#F59E0B' },
    { key: 'urgente', label: 'Urgente', color: '#EF4444' },
  ];

  const categories = [
    { id: 'general', label: 'General', icon: '📋' },
    { id: 'cultivo', label: 'Cultivo', icon: '🌱' },
    { id: 'animal', label: 'Animal', icon: '🐄' },
    { id: 'inventario', label: 'Inventario', icon: '📦' },
    { id: 'mantenimiento', label: 'Mantenimiento', icon: '🔧' },
  ];

  const handleCreateTask = () => {
    if (!title.trim()) return;

    createTask({
      organizationId: 'org-1',
      title: title.trim(),
      description: description.trim() || 'Sin descripción',
      status: 'pendiente',
      priority,
      assignedTo: 'user-1',
      category,
      dueDate,
      reminders: [],
    });

    router.replace('/tasks-list');
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Nueva Tarea</Text>
          <View style={{ width: 28 }} />
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Título */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Título *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Fertilizar Lote Alto"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </Animated.View>

          {/* Descripción */}
          <Animated.View entering={FadeInDown.duration(400).delay(150)}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Detalles de la tarea..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </View>
          </Animated.View>

          {/* Categoría */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Categoría</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                {categories.map(cat => (
                  <Pressable
                    key={cat.id}
                    style={[
                      styles.categoryButton,
                      category === cat.id && styles.categoryButtonActive,
                    ]}
                    onPress={() => setCategory(cat.id)}
                  >
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    <Text style={[styles.categoryLabel, category === cat.id && styles.categoryLabelActive]}>
                      {cat.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </Animated.View>

          {/* Prioridad */}
          <Animated.View entering={FadeInDown.duration(400).delay(250)}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Prioridad</Text>
              <View style={styles.priorityGrid}>
                {priorities.map(p => (
                  <Pressable
                    key={p.key}
                    style={[
                      styles.priorityOption,
                      priority === p.key && styles.priorityOptionActive,
                      { borderColor: p.color },
                    ]}
                    onPress={() => setPriority(p.key)}
                  >
                    <View
                      style={[
                        styles.priorityDot,
                        { backgroundColor: p.color },
                        priority === p.key && styles.priorityDotActive,
                      ]}
                    />
                    <Text
                      style={[
                        styles.priorityText,
                        priority === p.key && styles.priorityTextActive,
                      ]}
                    >
                      {p.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Animated.View>

          {/* Fecha de Vencimiento */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Fecha de Vencimiento</Text>
              <Pressable style={styles.dateInput}>
                <Ionicons name="calendar" size={20} color="#52FF94" />
                <TextInput
                  style={styles.dateInputText}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={dueDate}
                  onChangeText={setDueDate}
                />
              </Pressable>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.duration(400).delay(400)} style={styles.actionButtons}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.createButton, !title.trim() && styles.createButtonDisabled]}
            onPress={handleCreateTask}
            disabled={!title.trim()}
          >
            <Ionicons name="add-circle" size={20} color="#020403" />
            <Text style={styles.createButtonText}>Crear Tarea</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, textAlign: 'center' },
  scrollContent: { paddingHorizontal: 16, paddingVertical: 16, gap: 20 },
  formGroup: { gap: 10 },
  label: { fontSize: 13, fontWeight: '700', color: '#52FF94' },
  input: { backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  textArea: { textAlignVertical: 'top', paddingTop: 12, minHeight: 100 },
  categoryScroll: { gap: 10, paddingRight: 16 },
  categoryButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', backgroundColor: 'rgba(82,255,148,0.05)', alignItems: 'center', gap: 4 },
  categoryButtonActive: { borderColor: '#52FF94', backgroundColor: 'rgba(82,255,148,0.15)' },
  categoryIcon: { fontSize: 18 },
  categoryLabel: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  categoryLabelActive: { color: '#52FF94' },
  priorityGrid: { flexDirection: 'row', gap: 10 },
  priorityOption: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, borderWidth: 2, borderColor: 'transparent', backgroundColor: 'rgba(82,255,148,0.05)', alignItems: 'center', gap: 6 },
  priorityOptionActive: { backgroundColor: 'rgba(82,255,148,0.15)' },
  priorityDot: { width: 10, height: 10, borderRadius: 5 },
  priorityDotActive: { width: 12, height: 12, borderRadius: 6 },
  priorityText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  priorityTextActive: { color: '#FFFFFF', fontWeight: '700' },
  dateInput: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', gap: 10 },
  dateInputText: { flex: 1, color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  actionButtons: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  button: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  cancelButton: { backgroundColor: 'rgba(82,255,148,0.1)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)' },
  cancelButtonText: { color: '#52FF94', fontWeight: '700', fontSize: 14 },
  createButton: { backgroundColor: '#52FF94' },
  createButtonDisabled: { opacity: 0.5 },
  createButtonText: { color: '#020403', fontWeight: '700', fontSize: 14 },
});
