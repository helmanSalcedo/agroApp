import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, KeyboardAvoidingView, Platform, ScrollView, Modal, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, SlideInUp } from 'react-native-reanimated';

import { SelectField, SelectOption } from '@/components/select-field';
import { DateQuickPicker } from '@/components/date-quick-picker';
import { useLotContext, useFarmContext } from '@/context';
import { analyzeProfitProjection } from '@/utils/price-analyzer';

export default function SaleRegisterScreen() {
  const { lots } = useLotContext();
  const { farms } = useFarmContext();
  const { width } = useWindowDimensions();

  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [form, setForm] = useState({
    lotId: lots.length > 0 ? lots[0].id : '',
    productName: '',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    buyerName: '',
    buyerPhone: '',
    date: new Date(),
    paymentMethod: 'cash',
    notes: '',
    marketPrice: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState(false);

  const lotOptions: SelectOption[] = lots.map((lot) => ({
    label: lot.name,
    value: lot.id,
  }));

  const unitOptions: SelectOption[] = [
    { label: 'Kg', value: 'kg' },
    { label: 'Litros', value: 'liters' },
    { label: 'Unidades', value: 'units' },
    { label: 'Toneladas', value: 'tons' },
  ];

  const paymentOptions: SelectOption[] = [
    { label: 'Efectivo', value: 'cash' },
    { label: 'Transferencia', value: 'transfer' },
    { label: 'Cheque', value: 'check' },
    { label: 'Crédito', value: 'credit' },
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.lotId) {
      newErrors.lotId = 'Selecciona un lote';
    }

    if (!form.productName.trim()) {
      newErrors.productName = 'Nombre del producto requerido';
    }

    if (!form.quantity || parseFloat(form.quantity) <= 0) {
      newErrors.quantity = 'Cantidad debe ser mayor a 0';
    }

    if (!form.pricePerUnit || parseFloat(form.pricePerUnit) < 0) {
      newErrors.pricePerUnit = 'Precio no puede ser negativo';
    }

    if (!form.buyerName.trim()) {
      newErrors.buyerName = 'Nombre del comprador requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep('confirmation');
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const totalAmount = parseFloat(form.quantity) * parseFloat(form.pricePerUnit);

      const marketPrice = parseFloat(form.marketPrice) || 0;
      const profitPerUnit = parseFloat(form.pricePerUnit) - marketPrice;
      const totalProfit = profitPerUnit * parseFloat(form.quantity);

      const saleData = {
        id: `sale_${Date.now()}`,
        lotId: form.lotId,
        productName: form.productName,
        quantity: parseFloat(form.quantity),
        unit: form.unit,
        pricePerUnit: parseFloat(form.pricePerUnit),
        marketPrice: marketPrice,
        profitPerUnit: profitPerUnit,
        totalProfit: totalProfit,
        totalAmount,
        buyerName: form.buyerName,
        buyerPhone: form.buyerPhone,
        date: form.date,
        paymentMethod: form.paymentMethod,
        notes: form.notes,
        createdAt: new Date(),
      };

      console.log('Venta registrada:', saleData);
      // TODO: Guardar en contexto o AsyncStorage

      router.back();
    } catch (error) {
      console.error('Error creating sale:', error);
      setErrors({ productName: 'Error al registrar la venta' });
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = (parseFloat(form.quantity) || 0) * (parseFloat(form.pricePerUnit) || 0);
  const selectedLot = lots.find(l => l.id === form.lotId);
  const selectedFarm = selectedLot ? farms.find(f => f.id === selectedLot.farmId) : null;

  const getPaymentMethodLabel = (method: string) => {
    const option = paymentOptions.find(o => o.value === method);
    return option?.label || method;
  };

  const getPaymentMethodIcon = (method: string) => {
    switch(method) {
      case 'cash': return '💵';
      case 'transfer': return '🏦';
      case 'check': return '📋';
      case 'credit': return '📊';
      default: return '💳';
    }
  };

  if (step === 'confirmation') {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={() => setStep('form')} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#52FF94" />
            </Pressable>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Confirmar Venta</Text>
              <Text style={styles.headerSubtitle}>Revisa los detalles antes de guardar</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
            <Animated.View entering={FadeInDown.duration(400)}>
              {/* Resumen de Ubicación */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="location" size={20} color="#52FF94" />
                  <Text style={styles.cardTitle}>Ubicación</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Finca</Text>
                  <Text style={styles.summaryValue}>{selectedFarm?.name || 'N/A'}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Lote</Text>
                  <Text style={styles.summaryValue}>{selectedLot?.name || 'N/A'}</Text>
                </View>
              </View>

              {/* Resumen de Producto */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardHeaderIcon}>🥬</Text>
                  <Text style={styles.cardTitle}>Producto</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Nombre</Text>
                  <Text style={styles.summaryValue}>{form.productName}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Cantidad</Text>
                  <Text style={styles.summaryValue}>{form.quantity} {form.unit}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Precio Unitario</Text>
                  <Text style={styles.summaryValue}>${parseFloat(form.pricePerUnit || '0').toLocaleString('es-CO', { maximumFractionDigits: 0 })}</Text>
                </View>
                {form.marketPrice && (
                  <>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Precio Mercado</Text>
                      <Text style={styles.summaryValue}>${parseFloat(form.marketPrice || '0').toLocaleString('es-CO', { maximumFractionDigits: 0 })}</Text>
                    </View>
                  </>
                )}
              </View>

              {/* Resumen de Comprador */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="person" size={20} color="#52FF94" />
                  <Text style={styles.cardTitle}>Comprador</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Nombre</Text>
                  <Text style={styles.summaryValue}>{form.buyerName}</Text>
                </View>
                {form.buyerPhone && (
                  <>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Teléfono</Text>
                      <Text style={styles.summaryValue}>{form.buyerPhone}</Text>
                    </View>
                  </>
                )}
              </View>

              {/* Resumen de Pago */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardHeaderIcon}>{getPaymentMethodIcon(form.paymentMethod)}</Text>
                  <Text style={styles.cardTitle}>Detalles de Pago</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Método</Text>
                  <Text style={styles.summaryValue}>{getPaymentMethodLabel(form.paymentMethod)}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Fecha</Text>
                  <Text style={styles.summaryValue}>{form.date.toLocaleDateString('es-CO')}</Text>
                </View>
              </View>

              {/* Total Grande y Destacado */}
              <Animated.View entering={FadeInDown.duration(500).delay(200)}>
                <LinearGradient
                  colors={['rgba(82,255,148,0.2)', 'rgba(34,197,94,0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.totalCard}
                >
                  <Text style={styles.totalLabel}>MONTO TOTAL A RECIBIR</Text>
                  <Text style={styles.totalAmountLarge}>${totalAmount.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</Text>
                  <Text style={styles.totalBreakdown}>
                    {form.quantity} {form.unit} × ${parseFloat(form.pricePerUnit || '0').toLocaleString('es-CO')}
                  </Text>
                </LinearGradient>
              </Animated.View>

              {form.marketPrice && (
                <Animated.View entering={FadeInDown.duration(400).delay(400)}>
                  {(() => {
                    const currentPrice = parseFloat(form.pricePerUnit) || 0;
                    const marketPrice = parseFloat(form.marketPrice) || 0;
                    const quantity = parseFloat(form.quantity) || 0;
                    const profitAnalysis = analyzeProfitProjection(currentPrice, quantity, marketPrice);

                    return (
                      <LinearGradient
                        colors={profitAnalysis.isProfit
                          ? ['rgba(34,197,94,0.15)', 'rgba(82,255,148,0.08)']
                          : ['rgba(255,107,107,0.15)', 'rgba(239,68,68,0.08)']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[
                          styles.analysisCard,
                          { borderColor: profitAnalysis.isProfit ? '#22C55E' : '#EF4444' }
                        ]}
                      >
                        <View style={styles.analysisHeader}>
                          <Text style={styles.analysisIcon}>
                            {profitAnalysis.isProfit ? '📈' : '📉'}
                          </Text>
                          <View style={styles.analysisHeaderText}>
                            <Text style={styles.analysisTitle}>Análisis de Rentabilidad</Text>
                            <Text style={styles.analysisSubtitle}>
                              {profitAnalysis.isProfit ? 'Venta Rentable' : 'Venta con Pérdida'}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.analysisDivider} />

                        <View style={styles.analysisRow}>
                          <View style={styles.analysisMetric}>
                            <Text style={styles.metricLabel}>Ganancia Total</Text>
                            <Text style={[
                              styles.metricValue,
                              { color: profitAnalysis.isProfit ? '#22C55E' : '#EF4444', fontSize: 20 }
                            ]}>
                              ${profitAnalysis.totalProfit.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                            </Text>
                          </View>
                          <View style={styles.analysisMetric}>
                            <Text style={styles.metricLabel}>Por Unidad</Text>
                            <Text style={[
                              styles.metricValue,
                              { color: profitAnalysis.isProfit ? '#22C55E' : '#EF4444' }
                            ]}>
                              ${profitAnalysis.profitPerUnit.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                            </Text>
                          </View>
                        </View>
                      </LinearGradient>
                    );
                  })()}
                </Animated.View>
              )}

              {form.notes && (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Notas</Text>
                  <Text style={styles.notesText}>{form.notes}</Text>
                </View>
              )}

              {/* Botones */}
              <View style={styles.buttonGroup}>
                <Pressable style={[styles.button, styles.cancelButton]} onPress={() => setStep('form')} disabled={loading}>
                  <Text style={styles.cancelButtonText}>Volver</Text>
                </Pressable>

                <Pressable style={[styles.button, styles.submitButton, loading && styles.submitButtonDisabled]} onPress={handleCreate} disabled={loading}>
                  <LinearGradient
                    colors={['#52FF94', '#22C55E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Ionicons name="checkmark" size={20} color="#041109" style={{ marginRight: 8 }} />
                    <Text style={styles.submitButtonText}>{loading ? 'Registrando...' : 'Confirmar Venta'}</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </Animated.View>

            <View style={{ height: 24 }} />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Realizar Venta</Text>
            <Text style={styles.headerSubtitle}>Completa la información de tu venta</Text>
          </View>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.progressCircle, styles.progressCircleActive]}>
              <Text style={styles.progressNumber}>1</Text>
            </View>
            <Text style={styles.progressLabel}>Detalles</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressNumber}>2</Text>
            </View>
            <Text style={styles.progressLabel}>Confirmar</Text>
          </View>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
            {/* Ubicación */}
            <Animated.View entering={FadeInDown.duration(400)}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="location" size={20} color="#52FF94" />
                  <Text style={styles.cardTitle}>Ubicación</Text>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Lote *</Text>
                  <SelectField
                    label=""
                    options={lotOptions}
                    value={form.lotId}
                    onChange={(value) => setForm({ ...form, lotId: value as string })}
                  />
                  {errors.lotId && <Text style={styles.errorText}>{errors.lotId}</Text>}
                </View>
              </View>
            </Animated.View>

            {/* Detalles del Producto */}
            <Animated.View entering={FadeInDown.duration(400).delay(100)}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardHeaderIcon}>🥬</Text>
                  <Text style={styles.cardTitle}>Detalles del Producto</Text>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Nombre del Producto *</Text>
                  <TextInput
                    style={[styles.input, errors.productName && styles.inputError]}
                    placeholder="Ej: Maíz, Tomate, Leche"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={form.productName}
                    onChangeText={(text) => setForm({ ...form, productName: text })}
                    editable={!loading}
                  />
                  {errors.productName && <Text style={styles.errorText}>{errors.productName}</Text>}
                </View>

                <View style={styles.rowContainer}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Cantidad *</Text>
                      <View style={styles.inputWithUnit}>
                        <TextInput
                          style={[styles.input, styles.quantityInput, errors.quantity && styles.inputError]}
                          placeholder="0.00"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          value={form.quantity}
                          onChangeText={(text) => setForm({ ...form, quantity: text })}
                          keyboardType="decimal-pad"
                          editable={!loading}
                        />
                      </View>
                      {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}
                    </View>
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Unidad</Text>
                      <SelectField
                        label=""
                        options={unitOptions}
                        value={form.unit}
                        onChange={(value) => setForm({ ...form, unit: value as string })}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Precio por Unidad *</Text>
                  <View style={styles.currencyInput}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                      style={[styles.input, styles.inputNoBorder, errors.pricePerUnit && styles.inputError]}
                      placeholder="0.00"
                      placeholderTextColor="rgba(255,255,255,0.4)"
                      value={form.pricePerUnit}
                      onChangeText={(text) => setForm({ ...form, pricePerUnit: text })}
                      keyboardType="decimal-pad"
                      editable={!loading}
                    />
                  </View>
                  {errors.pricePerUnit && <Text style={styles.errorText}>{errors.pricePerUnit}</Text>}
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Precio Promedio del Mercado (Referencia)</Text>
                  <View style={styles.currencyInput}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                      style={[styles.input, styles.inputNoBorder]}
                      placeholder="Precio promedio histórico"
                      placeholderTextColor="rgba(255,255,255,0.4)"
                      value={form.marketPrice}
                      onChangeText={(text) => setForm({ ...form, marketPrice: text })}
                      keyboardType="decimal-pad"
                      editable={!loading}
                    />
                  </View>
                  <Text style={styles.helperText}>Ingresa el precio promedio para comparar ganancias</Text>
                </View>
              </View>
            </Animated.View>

            {/* Análisis de Ganancias */}
            {form.pricePerUnit && form.quantity && form.marketPrice && (
              <Animated.View entering={FadeInDown.duration(400).delay(150)}>
                {(() => {
                  const currentPrice = parseFloat(form.pricePerUnit) || 0;
                  const marketPrice = parseFloat(form.marketPrice) || 0;
                  const quantity = parseFloat(form.quantity) || 0;
                  const profitAnalysis = analyzeProfitProjection(currentPrice, quantity, marketPrice);

                  return (
                    <LinearGradient
                      colors={profitAnalysis.isProfit
                        ? ['rgba(34,197,94,0.15)', 'rgba(82,255,148,0.08)']
                        : ['rgba(255,107,107,0.15)', 'rgba(239,68,68,0.08)']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[
                        styles.analysisCard,
                        { borderColor: profitAnalysis.isProfit ? '#22C55E' : '#EF4444' }
                      ]}
                    >
                      <View style={styles.analysisHeader}>
                        <Text style={styles.analysisIcon}>
                          {profitAnalysis.isProfit ? '📈' : '📉'}
                        </Text>
                        <View style={styles.analysisHeaderText}>
                          <Text style={styles.analysisTitle}>Proyección de Ganancias</Text>
                          <Text style={styles.analysisSubtitle}>
                            {profitAnalysis.isProfit ? 'Venta Rentable' : 'Venta con Pérdida'}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.analysisDivider} />

                      <View style={styles.analysisRow}>
                        <View style={styles.analysisMetric}>
                          <Text style={styles.metricLabel}>Precio Mercado</Text>
                          <Text style={styles.metricValue}>
                            ${marketPrice.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                          </Text>
                        </View>
                        <View style={styles.analysisMetric}>
                          <Text style={styles.metricLabel}>Tu Precio</Text>
                          <Text style={[styles.metricValue, { color: '#52FF94' }]}>
                            ${currentPrice.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.analysisDivider} />

                      <View style={styles.analysisRow}>
                        <View style={styles.analysisMetric}>
                          <Text style={styles.metricLabel}>Ganancia/Pérdida por Unidad</Text>
                          <Text style={[
                            styles.metricValue,
                            { color: profitAnalysis.isProfit ? '#22C55E' : '#EF4444' }
                          ]}>
                            ${profitAnalysis.profitPerUnit.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                            {' '}
                            <Text style={styles.metricPercent}>
                              ({profitAnalysis.profitPercentage > 0 ? '+' : ''}{profitAnalysis.profitPercentage.toFixed(1)}%)
                            </Text>
                          </Text>
                        </View>
                      </View>

                      <View style={styles.analysisDivider} />

                      <View style={styles.analysisBigNumber}>
                        <Text style={styles.metricLabel}>TOTAL ESTIMADO</Text>
                        <Text style={[
                          styles.totalProfitValue,
                          { color: profitAnalysis.isProfit ? '#22C55E' : '#EF4444' }
                        ]}>
                          ${profitAnalysis.totalProfit.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                        </Text>
                        <Text style={styles.profitCaption}>
                          de {quantity} {form.unit} vendidos
                        </Text>
                      </View>
                    </LinearGradient>
                  );
                })()}
              </Animated.View>
            )}

            {/* Información del Comprador */}
            <Animated.View entering={FadeInDown.duration(400).delay(200)}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="person" size={20} color="#52FF94" />
                  <Text style={styles.cardTitle}>Comprador</Text>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Nombre del Comprador *</Text>
                  <TextInput
                    style={[styles.input, errors.buyerName && styles.inputError]}
                    placeholder="Ej: Juan García"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={form.buyerName}
                    onChangeText={(text) => setForm({ ...form, buyerName: text })}
                    editable={!loading}
                  />
                  {errors.buyerName && <Text style={styles.errorText}>{errors.buyerName}</Text>}
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Teléfono (Opcional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: +57 312 1234567"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={form.buyerPhone}
                    onChangeText={(text) => setForm({ ...form, buyerPhone: text })}
                    keyboardType="phone-pad"
                    editable={!loading}
                  />
                </View>
              </View>
            </Animated.View>

            {/* Detalles de Pago */}
            <Animated.View entering={FadeInDown.duration(400).delay(300)}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="card" size={20} color="#52FF94" />
                  <Text style={styles.cardTitle}>Detalles de Pago</Text>
                </View>

                <View style={styles.rowContainer}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Fecha</Text>
                      <DateQuickPicker
                        label=""
                        value={form.date}
                        onChange={(date) => setForm({ ...form, date })}
                      />
                    </View>
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Método de Pago</Text>
                      <SelectField
                        label=""
                        options={paymentOptions}
                        value={form.paymentMethod}
                        onChange={(value) => setForm({ ...form, paymentMethod: value as string })}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Notas (Opcional)</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Ej: Acuerdo de pago en 2 cuotas, incluye descuento por volumen"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={form.notes}
                    onChangeText={(text) => setForm({ ...form, notes: text })}
                    multiline
                    numberOfLines={2}
                    editable={!loading}
                  />
                </View>
              </View>
            </Animated.View>

            {/* Resumen Total */}
            <Animated.View entering={FadeInDown.duration(500).delay(400)}>
              <LinearGradient
                colors={['rgba(82,255,148,0.2)', 'rgba(34,197,94,0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.totalCard}
              >
                <View style={styles.totalContent}>
                  <Text style={styles.totalLabel}>TOTAL A RECIBIR</Text>
                  <Text style={styles.totalAmount}>${totalAmount.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</Text>
                  <Text style={styles.totalSubtext}>
                    {form.quantity} {form.unit} × ${parseFloat(form.pricePerUnit || '0').toLocaleString('es-CO')}
                  </Text>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Botones */}
            <View style={styles.buttonGroup}>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={() => router.back()} disabled={loading}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable style={[styles.button, styles.submitButton, loading && styles.submitButtonDisabled]} onPress={handleNext} disabled={loading}>
                <LinearGradient
                  colors={['#52FF94', '#22C55E']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Ionicons name="chevron-forward" size={20} color="#041109" style={{ marginRight: 8 }} />
                  <Text style={styles.submitButtonText}>Continuar</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 12,
  },

  progressStep: {
    alignItems: 'center',
    gap: 8,
  },

  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(82,255,148,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressCircleActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  progressNumber: {
    color: '#52FF94',
    fontSize: 16,
    fontWeight: '700',
  },

  progressLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(82,255,148,0.2)',
    maxWidth: 60,
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
    gap: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },

  cardHeaderIcon: {
    fontSize: 20,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#52FF94',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  fieldGroup: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
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

  quantityInput: {
    paddingRight: 8,
  },

  inputNoBorder: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingLeft: 4,
  },

  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    paddingRight: 12,
  },

  currencyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    paddingLeft: 12,
  },

  currencySymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#52FF94',
    marginRight: 4,
  },

  textArea: {
    textAlignVertical: 'top',
    minHeight: 80,
    paddingVertical: 12,
  },

  rowContainer: {
    flexDirection: 'row',
    gap: 0,
  },

  errorText: {
    fontSize: 11,
    color: '#FF6B6B',
    marginTop: 4,
    fontWeight: '500',
  },

  totalCard: {
    paddingVertical: 20,
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
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  totalAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#52FF94',
  },

  totalAmountLarge: {
    fontSize: 36,
    fontWeight: '800',
    color: '#52FF94',
  },

  totalSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },

  totalBreakdown: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },

  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  summaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
    flex: 1,
    textAlign: 'right',
  },

  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  notesText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
  },

  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
    paddingBottom: 24,
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
    flexDirection: 'row',
  },

  submitButtonText: {
    color: '#041109',
    fontSize: 14,
    fontWeight: '800',
  },

  helperText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
    fontStyle: 'italic',
  },

  analysisCard: {
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
  },

  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  analysisIcon: {
    fontSize: 28,
  },

  analysisHeaderText: {
    flex: 1,
  },

  analysisTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  analysisSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  analysisDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  analysisRow: {
    flexDirection: 'row',
    gap: 12,
  },

  analysisMetric: {
    flex: 1,
  },

  metricLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },

  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  metricPercent: {
    fontSize: 13,
    fontWeight: '600',
  },

  analysisBigNumber: {
    alignItems: 'center',
    paddingVertical: 8,
  },

  totalProfitValue: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 6,
  },

  profitCaption: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    fontWeight: '500',
  },
});
