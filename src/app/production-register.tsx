import { router, useLocalSearchParams } from 'expo-router';
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

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Spacing } from '@/constants/theme';
import {
  useProductionContext,
  useLotContext,
  useExpenseContext,
} from '@/context';
import { QualityRating, RecordProductionInput } from '@/types/domain';
import { formatCurrency } from '@/utils/calculation-utils';

/**
 * Pantalla de Registrar Producción/Cosecha
 * Captura cantidad, precio, calidad y calcula ingresos vs gastos
 */
export default function ProductionRegisterScreen() {
  const params = useLocalSearchParams<{ lotId: string }>();
  const lotId = params.lotId;

  const { recordProduction } = useProductionContext();
  const { lots } = useLotContext();
  const { getExpensesByLot } = useExpenseContext();

  const selectedLot = lots.find((l) => l.id === lotId);
  const lotExpenses = selectedLot ? getExpensesByLot(selectedLot.id) : [];
  const totalExpenses = lotExpenses.reduce((sum, e) => sum + e.amount, 0);

  const [form, setForm] = useState({
    quantity: '',
    pricePerUnit: '',
    quality: QualityRating.GOOD,
    harvestDate: new Date(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState(false);
  const [showQualityPicker, setShowQualityPicker] = useState(false);

  const qualityInfo = getQualityInfo(form.quality);
  const quantity = parseFloat(form.quantity) || 0;
  const pricePerUnit = parseFloat(form.pricePerUnit) || 0;
  const grossIncome = quantity * pricePerUnit;
  const netIncome = grossIncome - totalExpenses;
  const roi = totalExpenses > 0 ? ((netIncome / totalExpenses) * 100) : 0;

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.quantity || parseFloat(form.quantity) <= 0) {
      newErrors.quantity = 'La cantidad debe ser mayor a 0';
    }

    if (!form.pricePerUnit || parseFloat(form.pricePerUnit) < 0) {
      newErrors.pricePerUnit = 'El precio no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRecord = async () => {
    if (!validateForm() || !selectedLot) {
      return;
    }

    setLoading(true);
    try {
      const productionInput: RecordProductionInput = {
        lotId: selectedLot.id,
        harvestDate: form.harvestDate,
        quantity: parseFloat(form.quantity),
        quality: form.quality,
        pricePerUnit: parseFloat(form.pricePerUnit),
      };

      await recordProduction(productionInput, totalExpenses);
      router.replace(`/lot-detail?id=${selectedLot.id}`);
    } catch (error) {
      console.error('Error recording production:', error);
      setErrors({ quantity: 'Error al registrar la producción. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  if (!selectedLot) {
    return (
      <AgroScreen>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Lote No Encontrado</Text>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </Pressable>
        </View>
      </AgroScreen>
    );
  }

  return (
    <AgroScreen>
      <AppScreenHeader
        title="Registrar Cosecha"
        subtitle={`${selectedLot.name} • ${selectedLot.crop}`}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Resumen de Lote */}
          <View style={[AgroSurface.card, styles.lotSummary]}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Lote</Text>
              <Text style={styles.summaryValue}>{selectedLot.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Área</Text>
              <Text style={styles.summaryValue}>{selectedLot.area} ha</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Gastos Acumulados</Text>
              <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
                {formatCurrency(totalExpenses)}
              </Text>
            </View>
          </View>

          {/* Formulario */}
          <View style={[AgroSurface.card, styles.formCard]}>
            {/* Cantidad */}
            <View style={styles.fieldGroup}>
              <Text style={AgroSurface.label}>Cantidad Cosechada (kg) *</Text>
              <View style={[AgroSurface.input, styles.numberInput]}>
                <TextInput
                  style={styles.numberField}
                  placeholder="0"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="decimal-pad"
                  value={form.quantity}
                  onChangeText={(text) => {
                    setForm({ ...form, quantity: text });
                    if (errors.quantity) {
                      setErrors({ ...errors, quantity: undefined });
                    }
                  }}
                  editable={!loading}
                />
                <Text style={styles.unit}>kg</Text>
              </View>
              {errors.quantity && (
                <Text style={styles.errorText}>{errors.quantity}</Text>
              )}
            </View>

            {/* Precio Unitario */}
            <View style={styles.fieldGroup}>
              <Text style={AgroSurface.label}>Precio Unitario ($) *</Text>
              <View style={[AgroSurface.input, styles.numberInput]}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.numberField}
                  placeholder="0"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="decimal-pad"
                  value={form.pricePerUnit}
                  onChangeText={(text) => {
                    setForm({ ...form, pricePerUnit: text });
                    if (errors.pricePerUnit) {
                      setErrors({ ...errors, pricePerUnit: undefined });
                    }
                  }}
                  editable={!loading}
                />
                <Text style={styles.unit}>/kg</Text>
              </View>
              {errors.pricePerUnit && (
                <Text style={styles.errorText}>{errors.pricePerUnit}</Text>
              )}
            </View>

            {/* Calidad */}
            <View style={styles.fieldGroup}>
              <Text style={AgroSurface.label}>Calidad de Cosecha</Text>
              <Pressable
                style={[AgroSurface.input, styles.selectInput]}
                onPress={() => setShowQualityPicker(true)}
              >
                <View style={[styles.qualityIndicator, { backgroundColor: qualityInfo.backgroundColor }]}>
                  <Text style={[styles.qualityLabel, { color: qualityInfo.color }]}>
                    {qualityInfo.label}
                  </Text>
                </View>
                <Text style={styles.selectArrow}>›</Text>
              </Pressable>
            </View>
          </View>

          {/* Proyección Financiera */}
          <View style={[AgroSurface.card, styles.financialCard]}>
            <Text style={styles.financialTitle}>Proyección Financiera</Text>

            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Ingresos Brutos</Text>
              <Text style={styles.financialValue}>{formatCurrency(grossIncome)}</Text>
            </View>

            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Gastos Totales</Text>
              <Text style={[styles.financialValue, { color: '#EF4444' }]}>
                {formatCurrency(totalExpenses)}
              </Text>
            </View>

            <View style={styles.financialDivider} />

            <View style={styles.financialRow}>
              <Text style={[styles.financialLabel, { fontWeight: '700' }]}>Ganancia Neta</Text>
              <Text style={[styles.financialValue, { color: getNetIncomeColor(netIncome), fontWeight: '800' }]}>
                {formatCurrency(netIncome)}
              </Text>
            </View>

            <View style={styles.financialRow}>
              <Text style={[styles.financialLabel, { fontWeight: '700' }]}>ROI</Text>
              <Text style={[styles.financialValue, { color: getRoiColor(roi), fontWeight: '800' }]}>
                {roi.toFixed(1)}%
              </Text>
            </View>
          </View>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoEmoji}>💡</Text>
            <Text style={styles.infoText}>
              El lote se marcará como cosechado y los datos se guardarán en tu historial de producción
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Botones de Acción */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            AgroSurface.primaryButton,
            styles.button,
            loading && { opacity: 0.6 },
          ]}
          onPress={handleRecord}
          disabled={loading}
        >
          <Text style={AgroSurface.primaryButtonText}>
            {loading ? 'Registrando...' : 'Registrar Cosecha'}
          </Text>
        </Pressable>

        <Pressable
          style={[AgroSurface.secondaryButton, styles.button]}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={AgroSurface.secondaryButtonText}>Cancelar</Text>
        </Pressable>
      </View>

      {/* Modal: Seleccionar Calidad */}
      <Modal
        visible={showQualityPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQualityPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[AgroSurface.card, styles.modalContent]}>
            <Text style={styles.modalTitle}>Selecciona Calidad</Text>
            <FlatList
              data={Object.entries(QualityRating).map(([, value]) => ({
                value,
                ...getQualityInfo(value as QualityRating),
              }))}
              keyExtractor={(item) => item.value}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.modalItem,
                    form.quality === item.value && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setForm({ ...form, quality: item.value as QualityRating });
                    setShowQualityPicker(false);
                  }}
                >
                  <View
                    style={[
                      styles.modalItemDot,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.modalItemText}>{item.label}</Text>
                  {form.quality === item.value && (
                    <Text style={styles.modalItemCheck}>✓</Text>
                  )}
                </Pressable>
              )}
            />
            <Pressable
              style={[AgroSurface.secondaryButton, styles.modalButton]}
              onPress={() => setShowQualityPicker(false)}
            >
              <Text style={AgroSurface.secondaryButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AgroScreen>
  );
}

interface QualityInfo {
  label: string;
  color: string;
  backgroundColor: string;
}

function getQualityInfo(quality: QualityRating): QualityInfo {
  const info: Record<QualityRating, QualityInfo> = {
    [QualityRating.EXCELLENT]: {
      label: 'Excelente',
      color: '#22C55E',
      backgroundColor: 'rgba(34,197,94,0.15)',
    },
    [QualityRating.GOOD]: {
      label: 'Buena',
      color: '#3B82F6',
      backgroundColor: 'rgba(59,130,246,0.15)',
    },
    [QualityRating.REGULAR]: {
      label: 'Regular',
      color: '#F59E0B',
      backgroundColor: 'rgba(245,158,11,0.15)',
    },
    [QualityRating.POOR]: {
      label: 'Pobre',
      color: '#EF4444',
      backgroundColor: 'rgba(239,68,68,0.15)',
    },
  };

  return info[quality];
}

function getNetIncomeColor(income: number): string {
  if (income > 0) return '#22C55E';
  if (income === 0) return 'rgba(255,255,255,0.7)';
  return '#EF4444';
}

function getRoiColor(roi: number): string {
  if (roi >= 30) return '#22C55E';
  if (roi >= 10) return '#3B82F6';
  if (roi >= 0) return '#F59E0B';
  return '#EF4444';
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.three,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  backButton: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    backgroundColor: '#52FF94',
    borderRadius: 8,
  },

  backButtonText: {
    color: '#041109',
    fontWeight: '700',
  },

  lotSummary: {
    padding: Spacing.three,
    gap: Spacing.two,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  formCard: {
    padding: Spacing.four,
    gap: Spacing.three,
  },

  fieldGroup: {
    gap: Spacing.one,
  },

  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  numberField: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  currencySymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#52FF94',
  },

  unit: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
  },

  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Spacing.two,
  },

  qualityIndicator: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 6,
  },

  qualityLabel: {
    fontSize: 12,
    fontWeight: '700',
  },

  selectArrow: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },

  financialCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },

  financialTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: Spacing.one,
  },

  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.one,
  },

  financialLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },

  financialValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  financialDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: Spacing.one,
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
    marginTop: 2,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
  },

  buttonsContainer: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
  },

  button: {
    width: '100%',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: Spacing.one,
  },

  modalItem: {
    padding: Spacing.two,
    borderRadius: 12,
    marginBottom: Spacing.one,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#F9F9F9',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
  },

  modalItemSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#52FF94',
    borderWidth: 2,
  },

  modalItemDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  modalItemText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },

  modalItemCheck: {
    fontSize: 14,
    color: '#52FF94',
    fontWeight: '700',
  },

  modalButton: {
    width: '100%',
    marginTop: Spacing.two,
    marginBottom: Spacing.two,
  },
});
