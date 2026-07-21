import { router } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useFarmContext } from '@/context/farm-context';

// DEPARTAMENTOS COLOMBIANOS
const DEPARTMENTS = [
  { label: 'Amazonas', value: 'amazonas' },
  { label: 'Antioquia', value: 'antioquia' },
  { label: 'Arauca', value: 'arauca' },
  { label: 'Atlántico', value: 'atlantico' },
  { label: 'Bolívar', value: 'bolivar' },
  { label: 'Boyacá', value: 'boyaca' },
  { label: 'Caldas', value: 'caldas' },
  { label: 'Caquetá', value: 'caqueta' },
  { label: 'Cauca', value: 'cauca' },
  { label: 'Cesar', value: 'cesar' },
  { label: 'Córdoba', value: 'cordoba' },
  { label: 'Cundinamarca', value: 'cundinamarca' },
  { label: 'Chocó', value: 'choco' },
  { label: 'Guainía', value: 'guainia' },
  { label: 'Guaviare', value: 'guaviare' },
  { label: 'Huila', value: 'huila' },
  { label: 'La Guajira', value: 'guajira' },
  { label: 'Magdalena', value: 'magdalena' },
  { label: 'Meta', value: 'meta' },
  { label: 'Nariño', value: 'narino' },
  { label: 'Norte de Santander', value: 'norte_santander' },
  { label: 'Putumayo', value: 'putumayo' },
  { label: 'Quindío', value: 'quindio' },
  { label: 'Risaralda', value: 'risaralda' },
  { label: 'Santander', value: 'santander' },
  { label: 'Sucre', value: 'sucre' },
  { label: 'Tolima', value: 'tolima' },
  { label: 'Valle del Cauca', value: 'valle' },
  { label: 'Vaupés', value: 'vaupes' },
  { label: 'Vichada', value: 'vichada' },
];

// TIPOS DE PRODUCCIÓN COLOMBIANA - EXPANDIDO
const PRODUCTION_TYPES = [
  // CULTIVOS
  { label: '🌾 Cereales (Maíz, Arroz, Trigo)', value: 'cereals', category: 'Cultivos' },
  { label: '☕ Café', value: 'coffee', category: 'Cultivos' },
  { label: '🥒 Hortalizas y Vegetales', value: 'vegetables', category: 'Cultivos' },
  { label: '🥔 Papa y Tubérculos', value: 'tubers', category: 'Cultivos' },
  { label: '🍌 Plátano y Banano', value: 'banana', category: 'Cultivos' },
  { label: '🌳 Frutales (Mango, Aguacate, Limón)', value: 'fruits', category: 'Cultivos' },
  { label: '🥥 Coco', value: 'coconut', category: 'Cultivos' },
  { label: '🍂 Cacao', value: 'cacao', category: 'Cultivos' },
  { label: '🌻 Caña de Azúcar', value: 'sugarcane', category: 'Cultivos' },
  { label: '🫘 Frijol y Legumbres', value: 'beans', category: 'Cultivos' },
  { label: '🌰 Palma de Aceite', value: 'palm', category: 'Cultivos' },
  { label: '🧄 Aromáticas (Cilantro, Perejil)', value: 'aromatics', category: 'Cultivos' },
  { label: '🍅 Tomate', value: 'tomato', category: 'Cultivos' },
  { label: '🧅 Cebolla y Ajo', value: 'onion_garlic', category: 'Cultivos' },

  // GANADERÍA
  { label: '🐄 Ganadería Bovina (Carne)', value: 'beef_cattle', category: 'Ganadería' },
  { label: '🥛 Ganadería Lechera', value: 'dairy_cattle', category: 'Ganadería' },
  { label: '🐷 Porcicultura', value: 'pigs', category: 'Ganadería' },
  { label: '🐔 Avicultura (Pollo, Huevos)', value: 'poultry', category: 'Ganadería' },
  { label: '🐑 Ovinos y Caprinos', value: 'sheep_goats', category: 'Ganadería' },
  { label: '🦃 Otras Aves (Pato, Pavo)', value: 'other_poultry', category: 'Ganadería' },

  // PISCICULTURA Y ACUACULTURA
  { label: '🐟 Piscicultura (Tilapia, Trucha)', value: 'fish_farming', category: 'Acuacultura' },
  { label: '🦐 Camaronicultura', value: 'shrimp', category: 'Acuacultura' },

  // PRODUCCIÓN FORESTAL
  { label: '🌲 Silvicultura (Eucalipto, Pino)', value: 'forestry', category: 'Forestal' },
  { label: '🌳 Agroforestería', value: 'agroforestry', category: 'Forestal' },

  // PRODUCTOS ESPECIALES
  { label: '🍯 Apicultura (Miel)', value: 'beekeeping', category: 'Especiales' },
  { label: '🦗 Producción de Insectos', value: 'insects', category: 'Especiales' },
  { label: '🍄 Hongos y Setas', value: 'mushrooms', category: 'Especiales' },
  { label: '🌿 Plantas Medicinales', value: 'medicinal_plants', category: 'Especiales' },
  { label: '💐 Flores y Plantas Ornamentales', value: 'flowers', category: 'Especiales' },
];

export default function FarmCreateScreen() {
  const { createFarm } = useFarmContext();

  const [form, setForm] = useState({
    name: '',
    municipality: '',
    totalArea: '',
    productionType: '',
    department: '',
    description: '',
  });

  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showProductionModal, setShowProductionModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const selectedDepartment = DEPARTMENTS.find(d => d.value === form.department);
  const selectedProduction = PRODUCTION_TYPES.find(p => p.value === form.productionType);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!form.department) {
      newErrors.department = 'Selecciona un departamento';
    }
    if (!form.municipality.trim()) {
      newErrors.municipality = 'El municipio es requerido';
    }
    if (!form.productionType) {
      newErrors.productionType = 'Selecciona un tipo de producción';
    }
    if (!form.totalArea || isNaN(parseFloat(form.totalArea))) {
      newErrors.totalArea = 'Ingresa un área válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await createFarm({
        name: form.name,
        location: `${form.municipality}, ${selectedDepartment?.label}`,
        totalArea: parseFloat(form.totalArea),
        productionType: form.productionType,
        department: form.department,
        municipality: form.municipality,
        description: form.description,
      });
      router.replace('/(tabs)/explore');
    } catch (err) {
      setErrors({ submit: 'Error al crear la finca' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* HEADER */}
            <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
              <Pressable onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={28} color="#52FF94" />
              </Pressable>
              <View style={styles.headerContent}>
                <Text style={styles.headerTitle}>Nueva Finca</Text>
                <Text style={styles.headerSubtitle}>Registra tu propiedad agrícola</Text>
              </View>
              <View style={{ width: 28 }} />
            </Animated.View>

            <View style={styles.content}>
              {/* NOMBRE */}
              <Animated.View entering={FadeInDown.duration(400).delay(50)}>
                <Text style={styles.label}>Nombre de la Finca *</Text>
                <View style={[styles.inputContainer, errors.name && styles.inputError]}>
                  <Ionicons name="home-outline" size={20} color="#52FF94" />
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Finca El Porvenir"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={form.name}
                    onChangeText={(text) => setForm({ ...form, name: text })}
                    editable={!loading}
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </Animated.View>

              {/* DEPARTAMENTO DROPDOWN */}
              <Animated.View entering={FadeInDown.duration(400).delay(100)}>
                <Text style={styles.label}>Departamento *</Text>
                <Pressable
                  style={[styles.inputContainer, errors.department && styles.inputError]}
                  onPress={() => setShowDepartmentModal(true)}
                >
                  <Ionicons name="location-outline" size={20} color="#52FF94" />
                  <Text style={[styles.input, { color: selectedDepartment ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }]}>
                    {selectedDepartment?.label || 'Selecciona departamento'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="rgba(255,255,255,0.5)" />
                </Pressable>
                {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}
              </Animated.View>

              {/* MUNICIPIO */}
              <Animated.View entering={FadeInDown.duration(400).delay(150)}>
                <Text style={styles.label}>Municipio/Ciudad *</Text>
                <View style={[styles.inputContainer, errors.municipality && styles.inputError]}>
                  <Ionicons name="pin-outline" size={20} color="#52FF94" />
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Bogotá, Medellín"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={form.municipality}
                    onChangeText={(text) => setForm({ ...form, municipality: text })}
                    editable={!loading}
                  />
                </View>
                {errors.municipality && <Text style={styles.errorText}>{errors.municipality}</Text>}
              </Animated.View>

              {/* TIPO DE PRODUCCIÓN DROPDOWN */}
              <Animated.View entering={FadeInDown.duration(400).delay(200)}>
                <Text style={styles.label}>Tipo de Producción *</Text>
                <Pressable
                  style={[styles.inputContainer, errors.productionType && styles.inputError]}
                  onPress={() => setShowProductionModal(true)}
                >
                  <Ionicons name="leaf-outline" size={20} color="#52FF94" />
                  <Text style={[styles.input, { color: selectedProduction ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }]}>
                    {selectedProduction?.label || 'Selecciona producción'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="rgba(255,255,255,0.5)" />
                </Pressable>
                {errors.productionType && <Text style={styles.errorText}>{errors.productionType}</Text>}
              </Animated.View>

              {/* ÁREA */}
              <Animated.View entering={FadeInDown.duration(400).delay(250)}>
                <Text style={styles.label}>Área Total (Hectáreas) *</Text>
                <View style={[styles.inputContainer, errors.totalArea && styles.inputError]}>
                  <Ionicons name="resize-outline" size={20} color="#52FF94" />
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: 50"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={form.totalArea}
                    onChangeText={(text) => setForm({ ...form, totalArea: text })}
                    keyboardType="decimal-pad"
                    editable={!loading}
                  />
                  <Text style={styles.unit}>Ha</Text>
                </View>
                {errors.totalArea && <Text style={styles.errorText}>{errors.totalArea}</Text>}
              </Animated.View>

              {/* DESCRIPCIÓN */}
              <Animated.View entering={FadeInDown.duration(400).delay(300)}>
                <Text style={styles.label}>Descripción (Opcional)</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="document-text-outline" size={20} color="#52FF94" />
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="Información adicional sobre tu finca..."
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={form.description}
                    onChangeText={(text) => setForm({ ...form, description: text })}
                    multiline
                    numberOfLines={3}
                    editable={!loading}
                  />
                </View>
              </Animated.View>

              {errors.submit && <Text style={styles.errorText}>{errors.submit}</Text>}

              {/* BUTTON */}
              <Animated.View entering={FadeInDown.duration(400).delay(350)} style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleCreate}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#52FF94', '#22C55E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Ionicons name="checkmark-done" size={20} color="#020403" />
                    <Text style={styles.buttonText}>{loading ? 'Creando...' : 'Crear Finca'}</Text>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* DEPARTMENT MODAL */}
      <Modal visible={showDepartmentModal} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecciona Departamento</Text>
              <Pressable onPress={() => setShowDepartmentModal(false)}>
                <Ionicons name="close" size={24} color="#52FF94" />
              </Pressable>
            </View>
            <FlatList
              data={DEPARTMENTS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.modalItem, form.department === item.value && styles.modalItemSelected]}
                  onPress={() => {
                    setForm({ ...form, department: item.value });
                    setShowDepartmentModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, form.department === item.value && styles.modalItemTextSelected]}>
                    {item.label}
                  </Text>
                  {form.department === item.value && <Ionicons name="checkmark" size={20} color="#52FF94" />}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* PRODUCTION TYPE MODAL */}
      <Modal visible={showProductionModal} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tipo de Producción</Text>
              <Pressable onPress={() => setShowProductionModal(false)}>
                <Ionicons name="close" size={24} color="#52FF94" />
              </Pressable>
            </View>
            <FlatList
              data={PRODUCTION_TYPES}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.modalItem, form.productionType === item.value && styles.modalItemSelected]}
                  onPress={() => {
                    setForm({ ...form, productionType: item.value });
                    setShowProductionModal(false);
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.modalItemText, form.productionType === item.value && styles.modalItemTextSelected]}>
                      {item.label}
                    </Text>
                    <Text style={styles.modalItemCategory}>{item.category}</Text>
                  </View>
                  {form.productionType === item.value && <Ionicons name="checkmark" size={20} color="#52FF94" />}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  glowTop: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerContent: { flex: 1, alignItems: 'center', gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },

  content: { paddingHorizontal: 16, paddingVertical: 20, gap: 16 },

  label: { fontSize: 12, fontWeight: '700', color: '#52FF94', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', backgroundColor: 'rgba(82,255,148,0.03)', paddingHorizontal: 12, paddingVertical: 10, gap: 10 },
  inputError: { borderColor: 'rgba(255,107,107,0.3)', backgroundColor: 'rgba(255,107,107,0.05)' },
  input: { flex: 1, color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  textarea: { textAlignVertical: 'top', paddingTop: 8, minHeight: 80 },
  unit: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '600' },
  errorText: { color: '#FF7070', fontSize: 11, marginTop: 4 },

  buttonContainer: { marginTop: 20, marginBottom: 40 },
  button: { borderRadius: 12, overflow: 'hidden' },
  buttonDisabled: { opacity: 0.6 },
  buttonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 14 },
  buttonText: { color: '#020403', fontWeight: '800', fontSize: 14 },

  /* MODAL */
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#020403', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  modalItem: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.05)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalItemSelected: { backgroundColor: 'rgba(82,255,148,0.1)' },
  modalItemText: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  modalItemTextSelected: { color: '#52FF94', fontWeight: '700' },
  modalItemCategory: { fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 },
});
