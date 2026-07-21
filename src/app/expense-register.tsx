import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, View, Pressable, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { SelectField, SelectOption } from '@/components/select-field';
import { DateQuickPicker } from '@/components/date-quick-picker';
import { useExpenseContext, useFarmContext, useLotContext } from '@/context';
import { ExpenseCategory, CreateExpenseInput } from '@/types/domain';

const PAYMENT_METHODS: SelectOption[] = [
  { label: 'Efectivo', value: 'cash' },
  { label: 'Transferencia', value: 'transfer' },
  { label: 'Cheque', value: 'check' },
  { label: 'Crédito', value: 'credit' },
  { label: 'Otro', value: 'other' },
];

const UNIT_OPTIONS: SelectOption[] = [
  { label: 'Kg', value: 'kg' },
  { label: 'Litros', value: 'liters' },
  { label: 'Unidades', value: 'units' },
  { label: 'Horas', value: 'hours' },
  { label: 'Jornales', value: 'days' },
  { label: 'Metros', value: 'meters' },
  { label: 'Hectáreas', value: 'hectares' },
];

const EXPENSE_CATEGORIES = [
  { label: 'Semillas', value: ExpenseCategory.SEEDS, icon: '🌾', color: '#84CC16' },
  { label: 'Fertilizantes', value: ExpenseCategory.FERTILIZERS, icon: '🥗', color: '#6B7280' },
  { label: 'Alimentos', value: ExpenseCategory.ANIMAL_FEED, icon: '🐓', color: '#F59E0B' },
  { label: 'Jornales', value: ExpenseCategory.LABOR, icon: '👷', color: '#EF4444' },
  { label: 'Riego', value: ExpenseCategory.IRRIGATION, icon: '💧', color: '#3B82F6' },
  { label: 'Transporte', value: ExpenseCategory.TRANSPORT, icon: '🚛', color: '#06B6D4' },
  { label: 'Equipos', value: ExpenseCategory.EQUIPMENT, icon: '🔧', color: '#8B5CF6' },
  { label: 'Alquiler', value: ExpenseCategory.RENTAL, icon: '🏗️', color: '#EC4899' },
  { label: 'Servicios', value: ExpenseCategory.UTILITIES, icon: '💡', color: '#FBBF24' },
  { label: 'Mantenimiento', value: ExpenseCategory.MAINTENANCE, icon: '🔧', color: '#64748B' },
  { label: 'Veterinario', value: ExpenseCategory.VETERINARY, icon: '🏥', color: '#06B6D4' },
  { label: 'Otros', value: ExpenseCategory.OTHER, icon: '📋', color: '#94A3B8' },
];

// Componente Picker Modal
function PickerModal({
  options,
  selectedValue,
  onSelect,
}: {
  options: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ScrollView style={styles.pickerContent} showsVerticalScrollIndicator={false}>
      {options.map((option) => (
        <Pressable
          key={option.value}
          style={[
            styles.pickerOption,
            selectedValue === option.value && styles.pickerOptionSelected,
          ]}
          onPress={() => onSelect(String(option.value))}
        >
          <Text
            style={[
              styles.pickerOptionText,
              selectedValue === option.value && styles.pickerOptionTextSelected,
            ]}
          >
            {option.label}
          </Text>
          {selectedValue === option.value && (
            <Ionicons name="checkmark" size={20} color="#52FF94" />
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}

// Componente Calendar Picker
function CalendarPicker({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days: (Date | null)[] = [];
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        <Pressable
          onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={20} color="#52FF94" />
        </Pressable>

        <Text style={styles.calendarHeaderText}>
          {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </Text>

        <Pressable
          onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          style={styles.navButton}
        >
          <Ionicons name="chevron-forward" size={20} color="#52FF94" />
        </Pressable>
      </View>

      <View style={styles.weekdaysRow}>
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <Text key={day} style={styles.weekdayLabel}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {days.map((date, index) => (
          <Pressable
            key={index}
            style={[
              styles.dayButton,
              isSelected(date) && styles.dayButtonSelected,
              isToday(date) && styles.dayButtonToday,
            ]}
            onPress={() => date && onSelectDate(date)}
            disabled={!date}
          >
            <Text
              style={[
                styles.dayText,
                isSelected(date) && styles.dayTextSelected,
                isToday(date) && !isSelected(date) && styles.dayTextToday,
              ]}
            >
              {date?.getDate()}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.quickDateButtons}>
        <Pressable
          style={styles.quickDateButton}
          onPress={() => {
            const today = new Date();
            onSelectDate(today);
          }}
        >
          <Text style={styles.quickDateButtonText}>Hoy</Text>
        </Pressable>

        <Pressable
          style={styles.quickDateButton}
          onPress={() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            onSelectDate(yesterday);
          }}
        >
          <Text style={styles.quickDateButtonText}>Ayer</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ExpenseRegisterScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const initialCategory = params.category ? (params.category as ExpenseCategory) : null;

  const { createExpense } = useExpenseContext();
  const { farms } = useFarmContext();
  const { lots } = useLotContext();

  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(initialCategory);
  const [form, setForm] = useState({
    farmId: farms.length > 0 ? farms[0].id : '',
    lotId: '',
    paymentMethod: 'cash',
    date: new Date(),
    concept: '',
    amount: '',
    voucherNumber: '',
    notes: '',
    provider: '',
    quantity: '',
    unit: 'kg',
    unitPrice: '',
    workers: '',
    dailyRate: '',
    days: '',
    workDescription: '',
    irrigationType: '',
    waterQuantity: '',
    duration: '',
    destination: '',
    distance: '',
    transportType: '',
    equipmentDescription: '',
    equipmentQuantity: '',
    equipmentUnitCost: '',
    equipmentName: '',
    dailyCost: '',
    rentalDays: '',
    rentalPeriod: '',
    serviceType: '',
    description: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [showUnitPicker, setShowUnitPicker] = useState(false);
  const [showPaymentPicker, setShowPaymentPicker] = useState(false);

  const farmLots = lots.filter((l) => l.farmId === form.farmId);
  const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.value === selectedCategory);

  const farmOptions: SelectOption[] = farms.map((f) => ({
    label: f.name,
    value: f.id,
  }));

  const lotOptions: SelectOption[] = farmLots.map((l) => ({
    label: l.name,
    value: l.id,
  }));

  const calculateTotal = (): string => {
    if (!selectedCategory) return '0';

    switch (selectedCategory) {
      case ExpenseCategory.SEEDS:
      case ExpenseCategory.FERTILIZERS:
      case ExpenseCategory.ANIMAL_FEED:
        if (form.quantity && form.unitPrice) {
          return (parseFloat(form.quantity) * parseFloat(form.unitPrice)).toString();
        }
        break;
      case ExpenseCategory.LABOR:
        if (form.workers && form.dailyRate && form.days) {
          return (parseFloat(form.workers) * parseFloat(form.dailyRate) * parseFloat(form.days)).toString();
        }
        break;
      case ExpenseCategory.EQUIPMENT:
        if (form.equipmentQuantity && form.equipmentUnitCost) {
          return (parseFloat(form.equipmentQuantity) * parseFloat(form.equipmentUnitCost)).toString();
        }
        break;
      case ExpenseCategory.RENTAL:
        if (form.dailyCost && form.rentalDays) {
          return (parseFloat(form.dailyCost) * parseFloat(form.rentalDays)).toString();
        }
        break;
    }
    return form.amount;
  };

  const finalAmount = calculateTotal();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.farmId) {
      newErrors.farmId = 'Requerido';
    }

    if (!selectedCategory) {
      newErrors.category = 'Selecciona una categoría';
      return false;
    }

    switch (selectedCategory) {
      case ExpenseCategory.SEEDS:
      case ExpenseCategory.FERTILIZERS:
      case ExpenseCategory.ANIMAL_FEED:
        if (!form.provider.trim()) newErrors.provider = 'Requerido';
        if (!form.concept.trim()) newErrors.concept = 'Requerido';
        if (!form.quantity || parseFloat(form.quantity) <= 0) newErrors.quantity = 'Requerido';
        if (!form.unitPrice || parseFloat(form.unitPrice) <= 0) newErrors.unitPrice = 'Requerido';
        break;

      case ExpenseCategory.LABOR:
        if (!form.workers || parseFloat(form.workers) <= 0) newErrors.workers = 'Requerido';
        if (!form.dailyRate || parseFloat(form.dailyRate) <= 0) newErrors.dailyRate = 'Requerido';
        if (!form.days || parseFloat(form.days) <= 0) newErrors.days = 'Requerido';
        if (!form.workDescription.trim()) newErrors.workDescription = 'Requerido';
        break;

      case ExpenseCategory.IRRIGATION:
        if (!form.irrigationType.trim()) newErrors.irrigationType = 'Requerido';
        if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Requerido';
        break;

      case ExpenseCategory.TRANSPORT:
        if (!form.destination.trim()) newErrors.destination = 'Requerido';
        if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Requerido';
        break;

      case ExpenseCategory.EQUIPMENT:
        if (!form.equipmentDescription.trim()) newErrors.equipmentDescription = 'Requerido';
        if (!form.equipmentQuantity || parseFloat(form.equipmentQuantity) <= 0) newErrors.equipmentQuantity = 'Requerido';
        if (!form.equipmentUnitCost || parseFloat(form.equipmentUnitCost) <= 0) newErrors.equipmentUnitCost = 'Requerido';
        break;

      case ExpenseCategory.RENTAL:
        if (!form.equipmentName.trim()) newErrors.equipmentName = 'Requerido';
        if (!form.dailyCost || parseFloat(form.dailyCost) <= 0) newErrors.dailyCost = 'Requerido';
        if (!form.rentalDays || parseFloat(form.rentalDays) <= 0) newErrors.rentalDays = 'Requerido';
        break;

      case ExpenseCategory.UTILITIES:
        if (!form.serviceType.trim()) newErrors.serviceType = 'Requerido';
        if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Requerido';
        break;

      case ExpenseCategory.MAINTENANCE:
        if (!form.description.trim()) newErrors.description = 'Requerido';
        if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Requerido';
        break;

      case ExpenseCategory.VETERINARY:
        if (!form.description.trim()) newErrors.description = 'Requerido';
        if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Requerido';
        break;

      case ExpenseCategory.OTHER:
        if (!form.concept.trim()) newErrors.concept = 'Requerido';
        if (!finalAmount || parseFloat(finalAmount) <= 0) newErrors.amount = 'Requerido';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm() || !selectedCategory) return;

    setLoading(true);
    try {
      let concept = '';

      switch (selectedCategory) {
        case ExpenseCategory.SEEDS:
        case ExpenseCategory.FERTILIZERS:
        case ExpenseCategory.ANIMAL_FEED:
          concept = `${form.concept} - ${form.quantity}${form.unit}`;
          break;
        case ExpenseCategory.LABOR:
          concept = form.workDescription;
          break;
        case ExpenseCategory.IRRIGATION:
          concept = `Riego: ${form.irrigationType}`;
          break;
        case ExpenseCategory.TRANSPORT:
          concept = `Transporte a ${form.destination}`;
          break;
        case ExpenseCategory.EQUIPMENT:
          concept = `${form.equipmentDescription} (${form.equipmentQuantity} unidades)`;
          break;
        case ExpenseCategory.RENTAL:
          concept = `Alquiler: ${form.equipmentName}`;
          break;
        default:
          concept = form.concept;
      }

      const expenseInput: CreateExpenseInput = {
        farmId: form.farmId,
        lotId: form.lotId || undefined,
        concept,
        category: selectedCategory,
        amount: parseFloat(finalAmount),
        date: form.date,
        receipt: form.voucherNumber || undefined,
        notes: form.notes || undefined,
        ...(selectedCategory === ExpenseCategory.SEEDS || selectedCategory === ExpenseCategory.FERTILIZERS || selectedCategory === ExpenseCategory.ANIMAL_FEED) && {
          provider: form.provider,
          quantity: parseFloat(form.quantity),
          unit: form.unit,
          unitPrice: parseFloat(form.unitPrice),
        },
        ...(selectedCategory === ExpenseCategory.LABOR && {
          workers: parseFloat(form.workers),
          dailyRate: parseFloat(form.dailyRate),
          days: parseFloat(form.days),
          workDescription: form.workDescription,
        }),
        ...(selectedCategory === ExpenseCategory.IRRIGATION && {
          irrigationType: form.irrigationType,
          waterQuantity: form.waterQuantity ? parseFloat(form.waterQuantity) : undefined,
          duration: form.duration ? parseFloat(form.duration) : undefined,
        }),
        ...(selectedCategory === ExpenseCategory.TRANSPORT && {
          destination: form.destination,
          distance: form.distance ? parseFloat(form.distance) : undefined,
          transportType: form.transportType,
        }),
        ...(selectedCategory === ExpenseCategory.EQUIPMENT && {
          equipmentDescription: form.equipmentDescription,
          quantity: parseFloat(form.equipmentQuantity),
          unitPrice: parseFloat(form.equipmentUnitCost),
        }),
        ...(selectedCategory === ExpenseCategory.RENTAL && {
          equipmentName: form.equipmentName,
          dailyCost: parseFloat(form.dailyCost),
          days: parseFloat(form.rentalDays),
          rentalPeriod: form.rentalPeriod,
        }),
        ...(selectedCategory === ExpenseCategory.UTILITIES && {
          serviceType: form.serviceType,
        }),
        ...(selectedCategory === ExpenseCategory.MAINTENANCE && {
          description: form.description,
        }),
        ...(selectedCategory === ExpenseCategory.VETERINARY && {
          description: form.description,
        }),
      };

      await createExpense(expenseInput);
      router.back();
    } catch (error) {
      console.error('Error creating expense:', error);
      setErrors({ concept: 'Error al crear el gasto' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Header con categoría */}
          <View style={styles.header}>
            {selectedCategory && (
              <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Ionicons name="chevron-back" size={24} color="#52FF94" />
              </Pressable>
            )}
            <View style={[styles.headerContent, selectedCategory && { marginLeft: 12 }]}>
              {selectedCategory ? (
                <>
                  <Text style={styles.categoryIcon}>{categoryInfo?.icon}</Text>
                  <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>{categoryInfo?.label}</Text>
                    <Text style={styles.headerSubtitle}>Nuevo gasto</Text>
                  </View>
                </>
              ) : (
                <Text style={styles.headerTitle}>Selecciona categoría</Text>
              )}
            </View>
          </View>

          {/* Category selector si no hay initial */}
          {!initialCategory && !selectedCategory && (
            <View style={styles.categoriesContainer}>
              <Text style={styles.sectionLabel}>Tipo de gasto</Text>
              <View style={styles.categoryGrid}>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat.value}
                    style={[
                      styles.categoryBadge,
                      selectedCategory === cat.value && styles.categoryBadgeActive,
                    ]}
                    onPress={() => {
                      setSelectedCategory(cat.value);
                      setErrors({});
                    }}
                  >
                    <Text style={styles.categoryBadgeIcon}>{cat.icon}</Text>
                    <Text style={styles.categoryBadgeLabel}>{cat.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Form */}
          {selectedCategory && (
            <>
              {/* Section: Ubicación */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Ubicación</Text>
                <View style={styles.card}>
                  <View style={styles.fieldGroup}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Finca</Text>
                      <Text style={styles.required}>*</Text>
                    </View>
                    <SelectField
                      label=""
                      options={farmOptions}
                      value={form.farmId}
                      onChange={(value) => setForm({ ...form, farmId: value as string })}
                      inline
                    />
                    {errors.farmId && <Text style={styles.errorText}>{errors.farmId}</Text>}
                  </View>

                  {farmLots.length > 0 && (
                    <View style={styles.fieldGroup}>
                      <View style={styles.labelRow}>
                        <Text style={styles.label}>Lote</Text>
                      </View>
                      <SelectField
                        label=""
                        options={lotOptions}
                        value={form.lotId}
                        onChange={(value) => setForm({ ...form, lotId: value as string })}
                        inline
                      />
                    </View>
                  )}
                </View>
              </View>

              {/* Section: Detalles */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Detalles del gasto</Text>
                <View style={styles.card}>
                  {/* SEEDS, FERTILIZERS, ANIMAL_FEED */}
                  {(selectedCategory === ExpenseCategory.SEEDS ||
                    selectedCategory === ExpenseCategory.FERTILIZERS ||
                    selectedCategory === ExpenseCategory.ANIMAL_FEED) && (
                    <>
                      <Field
                        label="Proveedor"
                        value={form.provider}
                        onChangeText={(text) => setForm({ ...form, provider: text })}
                        placeholder="Nombre del proveedor"
                        error={errors.provider}
                        required
                      />

                      <Field
                        label="Concepto"
                        value={form.concept}
                        onChangeText={(text) => setForm({ ...form, concept: text })}
                        placeholder="Ej: Fertilizante NPK"
                        error={errors.concept}
                        required
                      />

                      <View style={styles.row}>
                        <View style={{ flex: 2 }}>
                          <Field
                            label="Cantidad"
                            value={form.quantity}
                            onChangeText={(text) => setForm({ ...form, quantity: text })}
                            placeholder="0.00"
                            keyboardType="decimal-pad"
                            error={errors.quantity}
                            required
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Unidad</Text>
                            <Pressable
                              style={styles.selectButton}
                              onPress={() => setShowUnitPicker(true)}
                            >
                              <Text style={styles.selectButtonText}>{form.unit}</Text>
                              <Ionicons name="chevron-down" size={16} color="#52FF94" />
                            </Pressable>
                          </View>
                        </View>
                      </View>

                      <Field
                        label="Precio Unitario"
                        value={form.unitPrice}
                        onChangeText={(text) => setForm({ ...form, unitPrice: text })}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={errors.unitPrice}
                        required
                      />
                    </>
                  )}

                  {/* LABOR */}
                  {selectedCategory === ExpenseCategory.LABOR && (
                    <>
                      <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                          <Field
                            label="Trabajadores"
                            value={form.workers}
                            onChangeText={(text) => setForm({ ...form, workers: text })}
                            placeholder="0"
                            keyboardType="decimal-pad"
                            error={errors.workers}
                            required
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Field
                            label="Salario Diario"
                            value={form.dailyRate}
                            onChangeText={(text) => setForm({ ...form, dailyRate: text })}
                            placeholder="0.00"
                            keyboardType="decimal-pad"
                            error={errors.dailyRate}
                            required
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Field
                            label="Días"
                            value={form.days}
                            onChangeText={(text) => setForm({ ...form, days: text })}
                            placeholder="0"
                            keyboardType="decimal-pad"
                            error={errors.days}
                            required
                          />
                        </View>
                      </View>

                      <Field
                        label="Descripción del trabajo"
                        value={form.workDescription}
                        onChangeText={(text) => setForm({ ...form, workDescription: text })}
                        placeholder="Ej: Cosecha de maíz"
                        multiline
                        numberOfLines={2}
                        error={errors.workDescription}
                        required
                      />
                    </>
                  )}

                  {/* IRRIGATION */}
                  {selectedCategory === ExpenseCategory.IRRIGATION && (
                    <>
                      <Field
                        label="Tipo de riego"
                        value={form.irrigationType}
                        onChangeText={(text) => setForm({ ...form, irrigationType: text })}
                        placeholder="Ej: Goteo, aspersión"
                        error={errors.irrigationType}
                        required
                      />

                      <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                          <Field
                            label="Agua (litros)"
                            value={form.waterQuantity}
                            onChangeText={(text) => setForm({ ...form, waterQuantity: text })}
                            placeholder="0.00"
                            keyboardType="decimal-pad"
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Field
                            label="Duración (horas)"
                            value={form.duration}
                            onChangeText={(text) => setForm({ ...form, duration: text })}
                            placeholder="0.00"
                            keyboardType="decimal-pad"
                          />
                        </View>
                      </View>

                      <Field
                        label="Costo total"
                        value={form.amount}
                        onChangeText={(text) => setForm({ ...form, amount: text })}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={errors.amount}
                        required
                      />
                    </>
                  )}

                  {/* TRANSPORT */}
                  {selectedCategory === ExpenseCategory.TRANSPORT && (
                    <>
                      <Field
                        label="Destino"
                        value={form.destination}
                        onChangeText={(text) => setForm({ ...form, destination: text })}
                        placeholder="Ej: Bogotá"
                        error={errors.destination}
                        required
                      />

                      <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                          <Field
                            label="Distancia (km)"
                            value={form.distance}
                            onChangeText={(text) => setForm({ ...form, distance: text })}
                            placeholder="0.00"
                            keyboardType="decimal-pad"
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Field
                            label="Tipo"
                            value={form.transportType}
                            onChangeText={(text) => setForm({ ...form, transportType: text })}
                            placeholder="Ej: Camión"
                          />
                        </View>
                      </View>

                      <Field
                        label="Costo total"
                        value={form.amount}
                        onChangeText={(text) => setForm({ ...form, amount: text })}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={errors.amount}
                        required
                      />
                    </>
                  )}

                  {/* EQUIPMENT */}
                  {selectedCategory === ExpenseCategory.EQUIPMENT && (
                    <>
                      <Field
                        label="Descripción"
                        value={form.equipmentDescription}
                        onChangeText={(text) => setForm({ ...form, equipmentDescription: text })}
                        placeholder="Ej: Machete, pala"
                        error={errors.equipmentDescription}
                        required
                      />

                      <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                          <Field
                            label="Cantidad"
                            value={form.equipmentQuantity}
                            onChangeText={(text) => setForm({ ...form, equipmentQuantity: text })}
                            placeholder="0"
                            keyboardType="decimal-pad"
                            error={errors.equipmentQuantity}
                            required
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Field
                            label="Precio unitario"
                            value={form.equipmentUnitCost}
                            onChangeText={(text) => setForm({ ...form, equipmentUnitCost: text })}
                            placeholder="0.00"
                            keyboardType="decimal-pad"
                            error={errors.equipmentUnitCost}
                            required
                          />
                        </View>
                      </View>
                    </>
                  )}

                  {/* RENTAL */}
                  {selectedCategory === ExpenseCategory.RENTAL && (
                    <>
                      <Field
                        label="Equipo/Propiedad"
                        value={form.equipmentName}
                        onChangeText={(text) => setForm({ ...form, equipmentName: text })}
                        placeholder="Ej: Tractor"
                        error={errors.equipmentName}
                        required
                      />

                      <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                          <Field
                            label="Costo diario"
                            value={form.dailyCost}
                            onChangeText={(text) => setForm({ ...form, dailyCost: text })}
                            placeholder="0.00"
                            keyboardType="decimal-pad"
                            error={errors.dailyCost}
                            required
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Field
                            label="Días"
                            value={form.rentalDays}
                            onChangeText={(text) => setForm({ ...form, rentalDays: text })}
                            placeholder="0"
                            keyboardType="decimal-pad"
                            error={errors.rentalDays}
                            required
                          />
                        </View>
                      </View>

                      <Field
                        label="Período"
                        value={form.rentalPeriod}
                        onChangeText={(text) => setForm({ ...form, rentalPeriod: text })}
                        placeholder="Ej: 20-25 julio"
                      />
                    </>
                  )}

                  {/* UTILITIES */}
                  {selectedCategory === ExpenseCategory.UTILITIES && (
                    <>
                      <Field
                        label="Tipo de servicio"
                        value={form.serviceType}
                        onChangeText={(text) => setForm({ ...form, serviceType: text })}
                        placeholder="Ej: Energía, agua"
                        error={errors.serviceType}
                        required
                      />

                      <Field
                        label="Costo total"
                        value={form.amount}
                        onChangeText={(text) => setForm({ ...form, amount: text })}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={errors.amount}
                        required
                      />
                    </>
                  )}

                  {/* MAINTENANCE */}
                  {selectedCategory === ExpenseCategory.MAINTENANCE && (
                    <>
                      <Field
                        label="Descripción"
                        value={form.description}
                        onChangeText={(text) => setForm({ ...form, description: text })}
                        placeholder="Ej: Reparación de maquinaria"
                        multiline
                        numberOfLines={2}
                        error={errors.description}
                        required
                      />

                      <Field
                        label="Costo total"
                        value={form.amount}
                        onChangeText={(text) => setForm({ ...form, amount: text })}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={errors.amount}
                        required
                      />
                    </>
                  )}

                  {/* VETERINARY */}
                  {selectedCategory === ExpenseCategory.VETERINARY && (
                    <>
                      <Field
                        label="Descripción"
                        value={form.description}
                        onChangeText={(text) => setForm({ ...form, description: text })}
                        placeholder="Ej: Revisión médica"
                        multiline
                        numberOfLines={2}
                        error={errors.description}
                        required
                      />

                      <Field
                        label="Costo total"
                        value={form.amount}
                        onChangeText={(text) => setForm({ ...form, amount: text })}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={errors.amount}
                        required
                      />
                    </>
                  )}

                  {/* OTHER */}
                  {selectedCategory === ExpenseCategory.OTHER && (
                    <>
                      <Field
                        label="Descripción"
                        value={form.concept}
                        onChangeText={(text) => setForm({ ...form, concept: text })}
                        placeholder="Describe el gasto"
                        multiline
                        numberOfLines={2}
                        error={errors.concept}
                        required
                      />

                      <Field
                        label="Costo"
                        value={form.amount}
                        onChangeText={(text) => setForm({ ...form, amount: text })}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={errors.amount}
                        required
                      />
                    </>
                  )}
                </View>
              </View>

              {/* Section: Total */}
              {(selectedCategory === ExpenseCategory.SEEDS ||
                selectedCategory === ExpenseCategory.FERTILIZERS ||
                selectedCategory === ExpenseCategory.ANIMAL_FEED ||
                selectedCategory === ExpenseCategory.LABOR ||
                selectedCategory === ExpenseCategory.EQUIPMENT ||
                selectedCategory === ExpenseCategory.RENTAL) && (
                <View style={styles.totalSection}>
                  <View style={styles.totalContent}>
                    <Text style={styles.totalLabel}>Total a pagar</Text>
                    <Text style={styles.totalAmount}>$ {parseFloat(finalAmount || '0').toLocaleString('es-CO')}</Text>
                  </View>
                </View>
              )}

              {/* Section: Información adicional */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Información adicional</Text>
                <View style={styles.card}>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Fecha</Text>
                    <Pressable
                      style={styles.dateButton}
                      onPress={() => {
                        setPickerDate(form.date);
                        setShowDatePicker(true);
                      }}
                    >
                      <Ionicons name="calendar" size={18} color="#52FF94" />
                      <Text style={styles.dateButtonText}>
                        {new Date(form.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Text>
                    </Pressable>
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Método de pago</Text>
                    <Pressable
                      style={styles.selectButton}
                      onPress={() => setShowPaymentPicker(true)}
                    >
                      <Text style={styles.selectButtonText}>
                        {PAYMENT_METHODS.find((p) => p.value === form.paymentMethod)?.label}
                      </Text>
                      <Ionicons name="chevron-down" size={16} color="#52FF94" />
                    </Pressable>
                  </View>

                  <Field
                    label="Comprobante"
                    value={form.voucherNumber}
                    onChangeText={(text) => setForm({ ...form, voucherNumber: text })}
                    placeholder="Ej: FAC-2024-001234"
                  />

                  <Field
                    label="Notas"
                    value={form.notes}
                    onChangeText={(text) => setForm({ ...form, notes: text })}
                    placeholder="Información adicional"
                    multiline
                    numberOfLines={2}
                  />
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.buttonSection}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => router.back()}
                  disabled={loading}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.submitButton, loading && styles.submitButtonDisabled]}
                  onPress={handleCreate}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#52FF94', '#22C55E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.submitButtonText}>
                      {loading ? 'Guardando...' : 'Guardar gasto'}
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Calendar Picker Modal */}
      <Modal
        visible={showDatePicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDatePicker(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar fecha</Text>
              <Pressable
                onPress={() => setShowDatePicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            <CalendarPicker
              selectedDate={pickerDate}
              onSelectDate={(date) => {
                setForm({ ...form, date });
                setShowDatePicker(false);
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Unit Picker Modal */}
      <Modal
        visible={showUnitPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowUnitPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowUnitPicker(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar unidad</Text>
              <Pressable
                onPress={() => setShowUnitPicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            <PickerModal
              options={UNIT_OPTIONS}
              selectedValue={form.unit}
              onSelect={(value) => {
                setForm({ ...form, unit: value });
                setShowUnitPicker(false);
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Payment Method Picker Modal */}
      <Modal
        visible={showPaymentPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPaymentPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowPaymentPicker(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Método de pago</Text>
              <Pressable
                onPress={() => setShowPaymentPicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            <PickerModal
              options={PAYMENT_METHODS}
              selectedValue={form.paymentMethod}
              onSelect={(value) => {
                setForm({ ...form, paymentMethod: value });
                setShowPaymentPicker(false);
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

// Componente reutilizable para campos
function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  error,
  required,
  multiline,
  numberOfLines,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}) {
  return (
    <View style={styles.fieldGroup}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          multiline && styles.textArea,
        ]}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.4)"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType as any}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  backButton: {
    padding: 8,
    marginLeft: -8,
  },

  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  categoryIcon: {
    fontSize: 32,
  },

  headerText: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  categoriesContainer: {
    gap: 12,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52FF94',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  categoryBadge: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.03)',
    alignItems: 'center',
    gap: 4,
  },

  categoryBadgeActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.2)',
  },

  categoryBadgeIcon: {
    fontSize: 22,
  },

  categoryBadgeLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  section: {
    gap: 12,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.03)',
    padding: 16,
    gap: 16,
  },

  fieldGroup: {
    gap: 8,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
  },

  required: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '700',
  },

  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    fontWeight: '500',
  },

  inputError: {
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255,107,107,0.08)',
  },

  textArea: {
    textAlignVertical: 'top',
    minHeight: 80,
    paddingVertical: 12,
  },

  row: {
    flexDirection: 'row',
    gap: 0,
  },

  totalSection: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(82,255,148,0.1)',
    borderWidth: 2,
    borderColor: '#52FF94',
  },

  totalContent: {
    alignItems: 'center',
    gap: 8,
  },

  totalLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  totalAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#52FF94',
  },

  errorText: {
    fontSize: 11,
    color: '#FF6B6B',
    marginTop: 4,
  },

  buttonSection: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
  },

  button: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.3)',
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  cancelButtonText: {
    color: '#52FF94',
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 13,
    textAlign: 'center',
  },

  submitButton: {
    flex: 1,
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  buttonGradient: {
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#041109',
    fontSize: 14,
    fontWeight: '800',
  },

  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 10,
  },

  dateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
    textTransform: 'capitalize',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#020403',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 24,
  },

  modalDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(82,255,148,0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  closeButton: {
    padding: 8,
    marginRight: -8,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  calendarContainer: {
    padding: 16,
    gap: 16,
  },

  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  navButton: {
    padding: 8,
  },

  calendarHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },

  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },

  weekdayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    width: '14.28%',
    textAlign: 'center',
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dayButton: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4,
  },

  dayButtonSelected: {
    backgroundColor: '#52FF94',
  },

  dayButtonToday: {
    borderWidth: 1,
    borderColor: '#52FF94',
  },

  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
  },

  dayTextSelected: {
    color: '#041109',
    fontWeight: '700',
  },

  dayTextToday: {
    color: '#52FF94',
    fontWeight: '700',
  },

  quickDateButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  quickDateButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.1)',
    alignItems: 'center',
  },

  quickDateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
  },

  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 11,
  },

  selectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
  },

  pickerContent: {
    maxHeight: '70%',
    paddingHorizontal: 16,
  },

  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  pickerOptionSelected: {
    backgroundColor: 'rgba(82,255,148,0.1)',
    borderBottomColor: '#52FF94',
  },

  pickerOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
  },

  pickerOptionTextSelected: {
    color: '#52FF94',
    fontWeight: '700',
  },
});
