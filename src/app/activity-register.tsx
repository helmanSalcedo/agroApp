import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { AppScreenHeader } from '@/components/app-screen-header';
import { SelectField, SelectOption } from '@/components/select-field';
import { DateQuickPicker } from '@/components/date-quick-picker';
import { useActivityContext, useLotContext, useFarmContext } from '@/context';
import { Activity, ActivityType, ProductionType, CreateActivityInput } from '@/types/domain';
import { getActivitiesForProduction } from '@/utils/activity-types';

interface ActivityForm extends CreateActivityInput {
  lotId: string;
  date: Date;
  description: string;
  notes?: string;
  [key: string]: any;
}

export default function ActivityRegisterScreen() {
  const params = useLocalSearchParams<{ type: string }>();
  const initialActivityType = params.type as ActivityType | undefined;

  const { createActivity } = useActivityContext();
  const { lots } = useLotContext();
  const { farms } = useFarmContext();

  const [selectedActivityType, setSelectedActivityType] = useState<ActivityType | undefined>(initialActivityType);

  const [form, setForm] = useState<ActivityForm>({
    lotId: lots.length > 0 ? lots[0].id : '',
    type: initialActivityType || ActivityType.OTHER,
    date: new Date(),
    description: '',
    notes: '',
    // Common fields for all activities
    workersAssigned: undefined,
    // IRRIGATION
    irrigationType: '',
    irrigationDuration: undefined,
    waterQuantity: undefined,
    // FERTILIZATION
    fertilizerType: '',
    fertilizerQuantity: undefined,
    fertilizerUnit: 'kg',
    applicationMethod: '',
    // PEST_CONTROL
    pestType: '',
    pestControlMethod: '',
    productUsed: '',
    quantityApplied: undefined,
    // WEEDING
    weedingMethod: '',
    areaWeeded: undefined,
    // HARVESTING
    quantityHarvested: undefined,
    harvestUnit: 'kg',
    quality: '',
    // PLANTING
    seedType: '',
    quantityPlanted: undefined,
    plantingUnit: 'kg',
    seedQuality: '',
    // PRUNING
    pruningType: '',
    areasAffected: '',
    // SALES
    quantity: undefined,
    pricePerUnit: undefined,
    buyerName: '',
    // SOIL_ANALYSIS
    analysisType: '',
    phLevel: undefined,
    nitrogen: undefined,
    phosphorus: undefined,
    potassium: undefined,
    // TRANSPLANTING
    quantityTransplanted: undefined,
    sourceLocation: '',
    destinationArea: '',
    // PEST_MONITORING
    pestsFound: '',
    pestQuantity: '',
    affectedArea: undefined,
    // CROP_INSPECTION
    inspectionFindings: '',
    cropHealth: '',
    // PACKING
    quantityPacked: undefined,
    packingType: '',
    // FUNGICIDE_APPLICATION
    fungicideType: '',
    fungicideQuantity: undefined,
    affectedPlants: '',
    // DISINFECTION
    disinfectantUsed: '',
    areaDisinfected: '',
    // IRRIGATION_MAINTENANCE
    maintenanceType: '',
    partsReplaced: '',
    maintenanceHours: undefined,
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState(false);

  const selectedLot = lots.find(l => l.id === form.lotId);
  const farmForLot = selectedLot ? farms.find(f => f.id === selectedLot.farmId) : null;
  const productionType = farmForLot?.productionType || ProductionType.OTHER;

  const lotOptions: SelectOption[] = lots.map((lot) => ({
    label: `${lot.name}`,
    value: lot.id,
  }));

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.lotId) {
      newErrors.lotId = 'Selecciona un lote';
    }

    if (!selectedActivityType) {
      newErrors.type = 'Selecciona un tipo de actividad';
      return false;
    }

    // Validación por tipo de actividad
    switch (selectedActivityType) {
      case ActivityType.IRRIGATION:
        if (!form.irrigationType?.trim()) newErrors.irrigationType = 'Requerido';
        if (!form.irrigationDuration) newErrors.irrigationDuration = 'Requerido';
        break;
      case ActivityType.FERTILIZATION:
        if (!form.fertilizerType?.trim()) newErrors.fertilizerType = 'Requerido';
        if (!form.fertilizerQuantity) newErrors.fertilizerQuantity = 'Requerido';
        if (!form.applicationMethod?.trim()) newErrors.applicationMethod = 'Requerido';
        break;
      case ActivityType.PEST_CONTROL:
        if (!form.pestType?.trim()) newErrors.pestType = 'Requerido';
        if (!form.productUsed?.trim()) newErrors.productUsed = 'Requerido';
        break;
      case ActivityType.WEEDING:
        if (!form.weedingMethod?.trim()) newErrors.weedingMethod = 'Requerido';
        break;
      case ActivityType.HARVESTING:
        if (!form.quantityHarvested) newErrors.quantityHarvested = 'Requerido';
        break;
      case ActivityType.PLANTING:
        if (!form.seedType?.trim()) newErrors.seedType = 'Requerido';
        if (!form.quantityPlanted) newErrors.quantityPlanted = 'Requerido';
        break;
      case ActivityType.PRUNING:
        if (!form.pruningType?.trim()) newErrors.pruningType = 'Requerido';
        break;
      case ActivityType.SALES:
        if (!form.quantity) newErrors.quantity = 'Requerido';
        if (!form.pricePerUnit) newErrors.pricePerUnit = 'Requerido';
        break;
      case ActivityType.SOIL_ANALYSIS:
        if (!form.analysisType?.trim()) newErrors.analysisType = 'Requerido';
        break;
      case ActivityType.TRANSPLANTING:
        if (!form.quantityTransplanted) newErrors.quantityTransplanted = 'Requerido';
        if (!form.destinationArea?.trim()) newErrors.destinationArea = 'Requerido';
        break;
      case ActivityType.PEST_MONITORING:
        if (!form.pestsFound?.trim()) newErrors.pestsFound = 'Requerido';
        break;
      case ActivityType.CROP_INSPECTION:
        if (!form.inspectionFindings?.trim()) newErrors.inspectionFindings = 'Requerido';
        break;
      case ActivityType.PACKING:
        if (!form.quantityPacked) newErrors.quantityPacked = 'Requerido';
        break;
      case ActivityType.FUNGICIDE_APPLICATION:
        if (!form.fungicideType?.trim()) newErrors.fungicideType = 'Requerido';
        if (!form.fungicideQuantity) newErrors.fungicideQuantity = 'Requerido';
        break;
      case ActivityType.DISINFECTION:
        if (!form.disinfectantUsed?.trim()) newErrors.disinfectantUsed = 'Requerido';
        break;
      case ActivityType.IRRIGATION_MAINTENANCE:
        if (!form.maintenanceType?.trim()) newErrors.maintenanceType = 'Requerido';
        break;
      default:
        if (!form.description?.trim()) newErrors.description = 'La descripción es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm() || !selectedActivityType) return;

    setLoading(true);
    try {
      const activityData: Activity = {
        id: `activity_${Date.now()}`,
        lotId: form.lotId,
        type: selectedActivityType,
        date: form.date,
        description: form.description || `Actividad: ${selectedActivityType}`,
        completed: false,
        notes: form.notes,
        workersAssigned: form.workersAssigned ? parseInt(form.workersAssigned.toString()) : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createActivity(activityData);
      router.back();
    } catch (error) {
      console.error('Error creating activity:', error);
      setErrors({ description: 'Error al crear la actividad' });
    } finally {
      setLoading(false);
    }
  };

  if (!selectedActivityType) {
    if (lots.length === 0) {
      return (
        <SafeAreaView style={styles.container}>
          <AppScreenHeader title="Nueva Actividad" subtitle="No hay lotes disponibles" />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 12 }}>📋 No hay lotes</Text>
            <Text style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>Crea un lote en una finca para registrar actividades</Text>
          </View>
        </SafeAreaView>
      );
    }

    const allActivities = new Map();
    Object.values(ProductionType).forEach(type => {
      getActivitiesForProduction(type).forEach(activity => {
        if (!allActivities.has(activity.type)) {
          allActivities.set(activity.type, activity);
        }
      });
    });
    const availableActivities = Array.from(allActivities.values());

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />
        <SafeAreaView style={styles.container}>
          <AppScreenHeader title="Nueva Actividad" subtitle="Selecciona el tipo de actividad a registrar" />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridContent}>
            <View style={styles.grid}>
              {availableActivities.map((item) => (
                <Pressable
                  key={item.type}
                  style={styles.typeCard}
                  onPress={() => setSelectedActivityType(item.type)}
                >
                  <View style={[styles.iconCircle, { borderColor: item.color + '40', backgroundColor: item.color + '15' }]}>
                    <Text style={{ fontSize: 30 }}>{item.emoji}</Text>
                  </View>
                  <Text style={styles.typeLabel}>{item.label}</Text>
                  <Text style={styles.typeDescription}>{item.description}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  const activityInfo = getActivitiesForProduction(productionType).find(a => a.type === selectedActivityType);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{activityInfo?.label}</Text>
            <Text style={styles.headerSubtitle}>Completa los detalles</Text>
          </View>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
            {/* Lot and Date */}
            <View style={styles.card}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Lote *</Text>
                <SelectField label="" options={lotOptions} value={form.lotId} onChange={(value) => setForm({ ...form, lotId: value as string })} inline={true} />
                {errors.lotId && <Text style={styles.errorText}>{errors.lotId}</Text>}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Fecha</Text>
                <DateQuickPicker label="" value={form.date} onChange={(date) => setForm({ ...form, date })} />
              </View>
            </View>

            {/* Activity-specific fields */}
            <View style={styles.card}>
              {/* IRRIGATION */}
              {selectedActivityType === ActivityType.IRRIGATION && (
                <>
                  <Field label="Tipo de riego" value={form.irrigationType?.toString() || ''} onChangeText={(text) => setForm({ ...form, irrigationType: text })} placeholder="Ej: Goteo, aspersión" required error={errors.irrigationType} />
                  <Field label="Duración (horas)" value={form.irrigationDuration?.toString() || ''} onChangeText={(text) => setForm({ ...form, irrigationDuration: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.irrigationDuration} />
                  <Field label="Cantidad de agua (litros)" value={form.waterQuantity?.toString() || ''} onChangeText={(text) => setForm({ ...form, waterQuantity: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" />
                </>
              )}

              {/* FERTILIZATION */}
              {selectedActivityType === ActivityType.FERTILIZATION && (
                <>
                  <Field label="Tipo de fertilizante" value={form.fertilizerType?.toString() || ''} onChangeText={(text) => setForm({ ...form, fertilizerType: text })} placeholder="Ej: NPK 10-20-10" required error={errors.fertilizerType} />
                  <Field label="Cantidad" value={form.fertilizerQuantity?.toString() || ''} onChangeText={(text) => setForm({ ...form, fertilizerQuantity: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.fertilizerQuantity} />
                  <Field label="Método de aplicación" value={form.applicationMethod?.toString() || ''} onChangeText={(text) => setForm({ ...form, applicationMethod: text })} placeholder="Ej: Foliar, al suelo" required error={errors.applicationMethod} />
                </>
              )}

              {/* PEST_CONTROL */}
              {selectedActivityType === ActivityType.PEST_CONTROL && (
                <>
                  <Field label="Tipo de plaga" value={form.pestType?.toString() || ''} onChangeText={(text) => setForm({ ...form, pestType: text })} placeholder="Ej: Mosca blanca, ácaros" required error={errors.pestType} />
                  <Field label="Producto usado" value={form.productUsed?.toString() || ''} onChangeText={(text) => setForm({ ...form, productUsed: text })} placeholder="Ej: Fungicida X" required error={errors.productUsed} />
                  <Field label="Cantidad aplicada" value={form.quantityApplied?.toString() || ''} onChangeText={(text) => setForm({ ...form, quantityApplied: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" />
                </>
              )}

              {/* WEEDING */}
              {selectedActivityType === ActivityType.WEEDING && (
                <>
                  <Field label="Método de deshierbe" value={form.weedingMethod?.toString() || ''} onChangeText={(text) => setForm({ ...form, weedingMethod: text })} placeholder="Ej: Manual, mecánico" required error={errors.weedingMethod} />
                  <Field label="Área deshierbada (m²)" value={form.areaWeeded?.toString() || ''} onChangeText={(text) => setForm({ ...form, areaWeeded: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" />
                </>
              )}

              {/* HARVESTING */}
              {selectedActivityType === ActivityType.HARVESTING && (
                <>
                  <Field label="Cantidad cosechada" value={form.quantityHarvested?.toString() || ''} onChangeText={(text) => setForm({ ...form, quantityHarvested: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.quantityHarvested} />
                  <Field label="Calidad" value={form.quality?.toString() || ''} onChangeText={(text) => setForm({ ...form, quality: text })} placeholder="Ej: Excelente, Buena" />
                </>
              )}

              {/* PLANTING */}
              {selectedActivityType === ActivityType.PLANTING && (
                <>
                  <Field label="Tipo de semilla" value={form.seedType?.toString() || ''} onChangeText={(text) => setForm({ ...form, seedType: text })} placeholder="Ej: Maíz amarillo" required error={errors.seedType} />
                  <Field label="Cantidad plantada" value={form.quantityPlanted?.toString() || ''} onChangeText={(text) => setForm({ ...form, quantityPlanted: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.quantityPlanted} />
                  <Field label="Calidad de semilla" value={form.seedQuality?.toString() || ''} onChangeText={(text) => setForm({ ...form, seedQuality: text })} placeholder="Ej: Premium, Estándar" />
                </>
              )}

              {/* PRUNING */}
              {selectedActivityType === ActivityType.PRUNING && (
                <>
                  <Field label="Tipo de poda" value={form.pruningType?.toString() || ''} onChangeText={(text) => setForm({ ...form, pruningType: text })} placeholder="Ej: Formativa, sanitaria" required error={errors.pruningType} />
                  <Field label="Áreas afectadas" value={form.areasAffected?.toString() || ''} onChangeText={(text) => setForm({ ...form, areasAffected: text })} placeholder="Describa las áreas" multiline numberOfLines={2} />
                </>
              )}

              {/* SALES */}
              {selectedActivityType === ActivityType.SALES && (
                <>
                  <Field label="Cantidad vendida" value={form.quantity?.toString() || ''} onChangeText={(text) => setForm({ ...form, quantity: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.quantity} />
                  <Field label="Precio por unidad" value={form.pricePerUnit?.toString() || ''} onChangeText={(text) => setForm({ ...form, pricePerUnit: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.pricePerUnit} />
                  <Field label="Nombre del comprador" value={form.buyerName?.toString() || ''} onChangeText={(text) => setForm({ ...form, buyerName: text })} placeholder="Ej: Juan García" />
                </>
              )}

              {/* SOIL_ANALYSIS */}
              {selectedActivityType === ActivityType.SOIL_ANALYSIS && (
                <>
                  <Field label="Tipo de análisis" value={form.analysisType?.toString() || ''} onChangeText={(text) => setForm({ ...form, analysisType: text })} placeholder="Ej: Fertilidad, pH" required error={errors.analysisType} />
                  <Field label="Nivel de pH" value={form.phLevel?.toString() || ''} onChangeText={(text) => setForm({ ...form, phLevel: parseFloat(text) })} placeholder="7.0" keyboardType="decimal-pad" />
                  <Field label="Nitrógeno (N) %" value={form.nitrogen?.toString() || ''} onChangeText={(text) => setForm({ ...form, nitrogen: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" />
                </>
              )}

              {/* TRANSPLANTING */}
              {selectedActivityType === ActivityType.TRANSPLANTING && (
                <>
                  <Field label="Cantidad trasplantada" value={form.quantityTransplanted?.toString() || ''} onChangeText={(text) => setForm({ ...form, quantityTransplanted: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.quantityTransplanted} />
                  <Field label="Ubicación origen" value={form.sourceLocation?.toString() || ''} onChangeText={(text) => setForm({ ...form, sourceLocation: text })} placeholder="Ej: Semillero A" />
                  <Field label="Área destino" value={form.destinationArea?.toString() || ''} onChangeText={(text) => setForm({ ...form, destinationArea: text })} placeholder="Ej: Lote 1" required error={errors.destinationArea} />
                </>
              )}

              {/* PEST_MONITORING */}
              {selectedActivityType === ActivityType.PEST_MONITORING && (
                <>
                  <Field label="Plagas encontradas" value={form.pestsFound?.toString() || ''} onChangeText={(text) => setForm({ ...form, pestsFound: text })} placeholder="Describa las plagas" multiline numberOfLines={2} required error={errors.pestsFound} />
                  <Field label="Cantidad de plagas" value={form.pestQuantity?.toString() || ''} onChangeText={(text) => setForm({ ...form, pestQuantity: text })} placeholder="Ej: 50 por planta" />
                </>
              )}

              {/* CROP_INSPECTION */}
              {selectedActivityType === ActivityType.CROP_INSPECTION && (
                <>
                  <Field label="Hallazgos" value={form.inspectionFindings?.toString() || ''} onChangeText={(text) => setForm({ ...form, inspectionFindings: text })} placeholder="Describa los hallazgos" multiline numberOfLines={3} required error={errors.inspectionFindings} />
                  <Field label="Salud del cultivo" value={form.cropHealth?.toString() || ''} onChangeText={(text) => setForm({ ...form, cropHealth: text })} placeholder="Ej: Excelente, Buena" />
                </>
              )}

              {/* PACKING */}
              {selectedActivityType === ActivityType.PACKING && (
                <>
                  <Field label="Cantidad empacada" value={form.quantityPacked?.toString() || ''} onChangeText={(text) => setForm({ ...form, quantityPacked: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.quantityPacked} />
                  <Field label="Tipo de empaque" value={form.packingType?.toString() || ''} onChangeText={(text) => setForm({ ...form, packingType: text })} placeholder="Ej: Cajas, bolsas" />
                </>
              )}

              {/* FUNGICIDE_APPLICATION */}
              {selectedActivityType === ActivityType.FUNGICIDE_APPLICATION && (
                <>
                  <Field label="Tipo de fungicida" value={form.fungicideType?.toString() || ''} onChangeText={(text) => setForm({ ...form, fungicideType: text })} placeholder="Ej: Azufre, Cobre" required error={errors.fungicideType} />
                  <Field label="Cantidad aplicada" value={form.fungicideQuantity?.toString() || ''} onChangeText={(text) => setForm({ ...form, fungicideQuantity: parseFloat(text) })} placeholder="0.00" keyboardType="decimal-pad" required error={errors.fungicideQuantity} />
                  <Field label="Plantas afectadas" value={form.affectedPlants?.toString() || ''} onChangeText={(text) => setForm({ ...form, affectedPlants: text })} placeholder="Describa qué plantas" />
                </>
              )}

              {/* DISINFECTION */}
              {selectedActivityType === ActivityType.DISINFECTION && (
                <>
                  <Field label="Desinfectante usado" value={form.disinfectantUsed?.toString() || ''} onChangeText={(text) => setForm({ ...form, disinfectantUsed: text })} placeholder="Ej: Cloro, Yodo" required error={errors.disinfectantUsed} />
                  <Field label="Área desinfectada" value={form.areaDisinfected?.toString() || ''} onChangeText={(text) => setForm({ ...form, areaDisinfected: text })} placeholder="Describa qué se desinfectó" />
                </>
              )}

              {/* IRRIGATION_MAINTENANCE */}
              {selectedActivityType === ActivityType.IRRIGATION_MAINTENANCE && (
                <>
                  <Field label="Tipo de mantenimiento" value={form.maintenanceType?.toString() || ''} onChangeText={(text) => setForm({ ...form, maintenanceType: text })} placeholder="Ej: Limpieza, Reparación" required error={errors.maintenanceType} />
                  <Field label="Piezas reemplazadas" value={form.partsReplaced?.toString() || ''} onChangeText={(text) => setForm({ ...form, partsReplaced: text })} placeholder="Describa las piezas" />
                  <Field label="Horas de trabajo" value={form.maintenanceHours?.toString() || ''} onChangeText={(text) => setForm({ ...form, maintenanceHours: parseFloat(text) })} placeholder="0.0" keyboardType="decimal-pad" />
                </>
              )}

              {/* Notes for all activities */}
              <Field label="Notas adicionales" value={form.notes?.toString() || ''} onChangeText={(text) => setForm({ ...form, notes: text })} placeholder="Notas opcionales" multiline numberOfLines={2} />

              {/* Buttons */}
              <View style={styles.buttonGroup}>
                <Pressable style={[styles.button, styles.cancelButton]} onPress={() => router.back()} disabled={loading}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>

                <Pressable style={[styles.button, styles.submitButton, loading && styles.submitButtonDisabled]} onPress={handleCreate} disabled={loading}>
                  <LinearGradient colors={['#52FF94', '#22C55E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.buttonGradient}>
                    <Text style={styles.submitButtonText}>{loading ? 'Guardando...' : 'Registrar'}</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function Field({ label, value, onChangeText, placeholder, keyboardType, error, required, multiline, numberOfLines }: {
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
        style={[styles.input, error && styles.inputError, multiline && styles.textArea]}
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
    marginLeft: 12,
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

  gridContent: {
    padding: 16,
    gap: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  typeCard: {
    flex: 1,
    minWidth: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(15,118,110,0.08)',
    alignItems: 'center',
    gap: 8,
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  typeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  typeDescription: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
  },

  formContent: {
    padding: 16,
    gap: 16,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.03)',
    padding: 16,
    gap: 12,
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

  errorText: {
    fontSize: 11,
    color: '#FF6B6B',
    marginTop: 4,
  },

  buttonGroup: {
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
});
