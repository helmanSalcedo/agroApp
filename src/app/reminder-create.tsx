import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppScreenHeader } from '@/components/app-screen-header';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { SelectField, SelectOption } from '@/components/select-field';
import { DateQuickPicker } from '@/components/date-quick-picker';
import { useNotificationContext } from '@/context/notification-context';
import { useActivityContext } from '@/context/activity-context';
import { useAuth } from '@/context/auth-context';
import { NotificationType } from '@/types/domain';
import { Spacing } from '@/constants/theme';

export default function ReminderCreateScreen() {
  const { addNotification } = useNotificationContext();
  const { activities } = useActivityContext();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: '',
    message: '',
    type: NotificationType.REMINDER as NotificationType,
    date: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const typeOptions: SelectOption[] = [
    { label: 'Recordatorio ⏰', value: NotificationType.REMINDER },
    { label: 'Alerta 🚨', value: NotificationType.ALERT },
    { label: 'Información ℹ️', value: NotificationType.INFO },
    { label: 'Éxito ✅', value: NotificationType.SUCCESS },
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!form.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      addNotification({
        title: form.title,
        message: form.message,
        type: form.type,
        read: false,
        userId: user ? user.id : 'unknown',
      });

      router.back();
    } catch (error) {
      console.error('Error creating reminder:', error);
      setErrors({ title: 'Error al crear el recordatorio' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AgroScreen>
      <AppScreenHeader
        title="Crear Recordatorio"
        subtitle="Añade alertas personalizadas"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={[AgroSurface.card, styles.formCard]}>
            {/* Tipo de Recordatorio */}
            <SelectField
              label="Tipo *"
              options={typeOptions}
              value={form.type}
              onChange={(value) => setForm({ ...form, type: value as NotificationType })}
              inline={true}
            />

            {/* Título */}
            <View style={styles.fieldGroup}>
              <Text style={AgroSurface.label}>Título *</Text>
              <TextInput
                style={[AgroSurface.input, errors.title && styles.inputError]}
                placeholder="Ej: Revisar invernadero"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={form.title}
                onChangeText={(text) => {
                  setForm({ ...form, title: text });
                  if (errors.title) setErrors({ ...errors, title: '' });
                }}
                editable={!loading}
              />
              {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            </View>

            {/* Mensaje */}
            <View style={styles.fieldGroup}>
              <Text style={AgroSurface.label}>Mensaje *</Text>
              <TextInput
                style={[AgroSurface.input, styles.textArea, errors.message && styles.inputError]}
                placeholder="Detalles del recordatorio..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                multiline
                numberOfLines={3}
                value={form.message}
                onChangeText={(text) => {
                  setForm({ ...form, message: text });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                editable={!loading}
              />
              {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
            </View>

            {/* Fecha */}
            <DateQuickPicker
              label="Fecha"
              value={form.date}
              onChange={(date) => setForm({ ...form, date })}
            />
          </View>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoEmoji}>💡</Text>
            <Text style={styles.infoText}>
              Recibirás una notificación en la fecha especificada
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[AgroSurface.primaryButton, loading && { opacity: 0.6 }]}
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={AgroSurface.primaryButtonText}>
            {loading ? 'Creando...' : 'Crear Recordatorio'}
          </Text>
        </Pressable>

        <Pressable
          style={AgroSurface.secondaryButton}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={AgroSurface.secondaryButtonText}>Cancelar</Text>
        </Pressable>
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },

  formCard: {
    padding: Spacing.four,
    gap: Spacing.three,
  },

  fieldGroup: {
    gap: Spacing.one,
  },

  textArea: {
    textAlignVertical: 'top',
    paddingTop: Spacing.two,
  },

  inputError: {
    borderColor: '#EF4444',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },

  infoBox: {
    flexDirection: 'row',
    gap: Spacing.two,
    backgroundColor: 'rgba(82,255,148,0.1)',
    borderRadius: 12,
    padding: Spacing.two,
    alignItems: 'flex-start',
  },

  infoEmoji: {
    fontSize: 18,
  },

  infoText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },

  buttonsContainer: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
  },
});
