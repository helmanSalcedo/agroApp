import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Spacing } from '@/constants/theme';
import { useFarmContext, useLotContext } from '@/context';
import { CreateLotInput, CropType } from '@/types/domain';

export default function LotCreateScreen() {
  const { selectedFarmId } = useFarmContext();
  const { createLot } = useLotContext();

  const [form, setForm] = useState<CreateLotInput>({
    farmId: selectedFarmId || '',
    name: '',
    crop: CropType.COFFEE,
    area: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Nombre requerido';
    if (form.area <= 0) newErrors.area = 'Área debe ser > 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await createLot(form);
      router.replace('/lots-list');
    } catch (error) {
      setErrors({ name: 'Error al crear lote' });
    } finally {
      setLoading(false);
    }
  };

  const CROPS = [
    { value: CropType.COFFEE, label: '☕ Café' },
    { value: CropType.MAIZE, label: '🌽 Maíz' },
    { value: CropType.SOYBEAN, label: '🌱 Soja' },
    { value: CropType.WHEAT, label: '🌾 Trigo' },
    { value: CropType.RICE, label: '🍚 Arroz' },
    { value: CropType.SUGARCANE, label: '🌿 Caña' },
    { value: CropType.BEANS, label: '🫘 Frijoles' },
  ];

  return (
    <AgroScreen>
      <AppScreenHeader title="Nuevo Lote" subtitle="Crea un nuevo lote de cultivo" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={[AgroSurface.card, styles.formCard]}>
            <View style={styles.iconContainer}>
              <Text style={styles.formEmoji}>🌱</Text>
            </View>

            {/* Nombre */}
            <View style={styles.fieldGroup}>
              <Text style={AgroSurface.label}>Nombre del Lote *</Text>
              <TextInput
                style={[AgroSurface.input, errors.name && styles.inputError]}
                placeholder="Ej: Sector Norte A"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={form.name}
                onChangeText={(text) => {
                  setForm({ ...form, name: text });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                editable={!loading}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Cultivo */}
            <View style={styles.fieldGroup}>
              <Text style={AgroSurface.label}>Cultivo *</Text>
              <View style={styles.cropGrid}>
                {CROPS.map((crop) => (
                  <Pressable
                    key={crop.value}
                    style={[
                      styles.cropButton,
                      form.crop === crop.value && styles.cropButtonActive,
                    ]}
                    onPress={() => setForm({ ...form, crop: crop.value })}
                  >
                    <Text style={styles.cropButtonText}>{crop.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Área */}
            <View style={styles.fieldGroup}>
              <Text style={AgroSurface.label}>Área (hectáreas) *</Text>
              <TextInput
                style={[AgroSurface.input, errors.area && styles.inputError]}
                placeholder="Ej: 12"
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="decimal-pad"
                value={form.area > 0 ? form.area.toString() : ''}
                onChangeText={(text) => {
                  const value = text ? parseFloat(text) : 0;
                  setForm({ ...form, area: value });
                  if (errors.area) setErrors({ ...errors, area: undefined });
                }}
                editable={!loading}
              />
              {errors.area && <Text style={styles.errorText}>{errors.area}</Text>}
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoEmoji}>ℹ️</Text>
              <Text style={styles.infoText}>Podrás registrar siembra, actividades y cosecha después</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={[AgroSurface.primaryButton, styles.button, loading && { opacity: 0.6 }]}
              onPress={handleCreate}
              disabled={loading}
            >
              <Text style={AgroSurface.primaryButtonText}>{loading ? 'Creando...' : 'Crear Lote'}</Text>
            </Pressable>

            <Pressable
              style={[AgroSurface.secondaryButton, styles.button]}
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text style={AgroSurface.secondaryButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { gap: Spacing.three, paddingBottom: Spacing.four },
  formCard: { padding: Spacing.four, gap: Spacing.three },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(82,255,148,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'rgba(82,255,148,0.25)',
  },
  formEmoji: { fontSize: 40 },
  fieldGroup: { gap: Spacing.one },
  inputError: { borderColor: '#EF4444' },
  errorText: { color: '#EF4444', fontSize: 12, fontWeight: '500', marginLeft: 2 },
  cropGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cropButton: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
  },
  cropButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },
  cropButtonText: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  infoBox: {
    flexDirection: 'row',
    gap: Spacing.two,
    backgroundColor: 'rgba(82,255,148,0.1)',
    borderRadius: 12,
    padding: Spacing.two,
    alignItems: 'flex-start',
  },
  infoEmoji: { fontSize: 18, marginTop: 2 },
  infoText: { flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 18 },
  buttonsContainer: { gap: Spacing.two },
  button: { width: '100%' },
});
