import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ITEM_DETAIL = {
  id: '1',
  name: 'Fertilizante NPK 15-15-15',
  category: 'abonos',
  quantity: 45,
  unit: 'sacos',
  minStock: 20,
  unitPrice: 35000,
  totalValue: 1575000,
  icon: '🧂',
  status: 'normal',
  location: 'Bodega A - Estante 3',
  provider: 'Agroquímicos ABC',
  lastUpdated: new Date('2024-07-18'),
  movements: [
    { id: '1', type: 'entrada', quantity: 20, date: '2024-07-15', note: 'Compra proveedor' },
    { id: '2', type: 'salida', quantity: 5, date: '2024-07-18', note: 'Uso en cultivo' },
    { id: '3', type: 'entrada', quantity: 30, date: '2024-07-10', note: 'Compra emergencia' },
  ],
};

export default function InventoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const [showMovement, setShowMovement] = useState(false);
  const [movementType, setMovementType] = useState<'entrada' | 'salida'>('entrada');
  const [movementQuantity, setMovementQuantity] = useState('');
  const [movementNote, setMovementNote] = useState('');

  const item = ITEM_DETAIL;
  const stockPercentage = (item.quantity / (item.minStock * 2)) * 100;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{item.name}</Text>
            <Text style={styles.headerSubtitle}>{item.category}</Text>
          </View>
          <Text style={styles.headerIcon}>{item.icon}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Stock Overview */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <LinearGradient
              colors={['rgba(82,255,148,0.2)', 'rgba(34,197,94,0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.stockCard}
            >
              <View style={styles.stockHeader}>
                <Text style={styles.stockLabel}>Stock Actual</Text>
                <Text style={styles.stockValue}>{item.quantity}</Text>
              </View>
              <Text style={styles.stockUnit}>{item.unit}</Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(stockPercentage, 100)}%`,
                        backgroundColor: item.quantity < item.minStock ? '#EF4444' : '#22C55E',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  Mínimo: {item.minStock} {item.unit}
                </Text>
              </View>

              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor:
                      item.quantity < item.minStock
                        ? 'rgba(239,68,68,0.15)'
                        : 'rgba(34,197,94,0.15)',
                  },
                ]}
              >
                <Ionicons
                  name={item.quantity < item.minStock ? 'alert-circle' : 'checkmark-circle'}
                  size={16}
                  color={item.quantity < item.minStock ? '#EF4444' : '#22C55E'}
                />
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: item.quantity < item.minStock ? '#EF4444' : '#22C55E',
                    },
                  ]}
                >
                  {item.quantity < item.minStock ? 'Stock Bajo' : 'Stock Normal'}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Financial Info */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Información Financiera</Text>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Precio Unitario</Text>
                  <Text style={styles.infoValue}>${item.unitPrice.toLocaleString('es-CO')}</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Valor Total</Text>
                  <Text style={[styles.infoValue, { color: '#52FF94' }]}>
                    ${item.totalValue.toLocaleString('es-CO')}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Details */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Detalles</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Categoría</Text>
                <Text style={styles.detailValue}>{item.category}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Ubicación</Text>
                <Text style={styles.detailValue}>{item.location}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Proveedor</Text>
                <Text style={styles.detailValue}>{item.provider}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Última Actualización</Text>
                <Text style={styles.detailValue}>
                  {item.lastUpdated.toLocaleDateString('es-CO')}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Movements */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <View style={styles.card}>
              <View style={styles.movementsHeader}>
                <Text style={styles.cardTitle}>Historial de Movimientos</Text>
                <Pressable
                  style={styles.addMovementButton}
                  onPress={() => setShowMovement(true)}
                >
                  <Ionicons name="add-circle" size={18} color="#52FF94" />
                </Pressable>
              </View>

              {item.movements.map((movement, index) => (
                <View key={movement.id}>
                  <View style={styles.movementItem}>
                    <View
                      style={[
                        styles.movementIcon,
                        {
                          backgroundColor:
                            movement.type === 'entrada'
                              ? 'rgba(34,197,94,0.15)'
                              : 'rgba(239,68,68,0.15)',
                        },
                      ]}
                    >
                      <Ionicons
                        name={movement.type === 'entrada' ? 'arrow-up' : 'arrow-down'}
                        size={16}
                        color={movement.type === 'entrada' ? '#22C55E' : '#EF4444'}
                      />
                    </View>

                    <View style={styles.movementInfo}>
                      <Text style={styles.movementType}>
                        {movement.type === 'entrada' ? 'Entrada' : 'Salida'}
                      </Text>
                      <Text style={styles.movementNote}>{movement.note}</Text>
                      <Text style={styles.movementDate}>{movement.date}</Text>
                    </View>

                    <Text
                      style={[
                        styles.movementQuantity,
                        {
                          color: movement.type === 'entrada' ? '#22C55E' : '#EF4444',
                        },
                      ]}
                    >
                      {movement.type === 'entrada' ? '+' : '-'}{movement.quantity}
                    </Text>
                  </View>
                  {index < item.movements.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)} style={styles.buttonGroup}>
            <Pressable style={styles.actionButton}>
              <LinearGradient
                colors={['#22C55E', '#16A34A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="arrow-up" size={18} color="#FFFFFF" />
                <Text style={styles.buttonText}>Entrada</Text>
              </LinearGradient>
            </Pressable>

            <Pressable style={styles.actionButton}>
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="arrow-down" size={18} color="#FFFFFF" />
                <Text style={styles.buttonText}>Salida</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </ScrollView>

        {/* Movement Modal */}
        <Modal
          visible={showMovement}
          transparent
          animationType="slide"
          onRequestClose={() => setShowMovement(false)}
        >
          <View style={styles.modalContainer}>
            <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

            <SafeAreaView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setShowMovement(false)}>
                  <Ionicons name="close" size={24} color="#52FF94" />
                </Pressable>
                <Text style={styles.modalTitle}>Registrar Movimiento</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView contentContainerStyle={styles.modalBody}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Tipo de Movimiento</Text>
                  <View style={styles.typeButtons}>
                    <Pressable
                      style={[
                        styles.typeButton,
                        movementType === 'entrada' && styles.typeButtonActive,
                      ]}
                      onPress={() => setMovementType('entrada')}
                    >
                      <Ionicons
                        name="arrow-up"
                        size={18}
                        color={movementType === 'entrada' ? '#22C55E' : 'rgba(255,255,255,0.5)'}
                      />
                      <Text
                        style={[
                          styles.typeButtonText,
                          movementType === 'entrada' && styles.typeButtonTextActive,
                        ]}
                      >
                        Entrada
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.typeButton,
                        movementType === 'salida' && styles.typeButtonActive,
                      ]}
                      onPress={() => setMovementType('salida')}
                    >
                      <Ionicons
                        name="arrow-down"
                        size={18}
                        color={movementType === 'salida' ? '#EF4444' : 'rgba(255,255,255,0.5)'}
                      />
                      <Text
                        style={[
                          styles.typeButtonText,
                          movementType === 'salida' && styles.typeButtonTextActive,
                        ]}
                      >
                        Salida
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Cantidad</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Cantidad..."
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={movementQuantity}
                    onChangeText={setMovementQuantity}
                    keyboardType="decimal-pad"
                  />
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Notas</Text>
                  <TextInput
                    style={[styles.input, { minHeight: 80 }]}
                    placeholder="Motivo del movimiento..."
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={movementNote}
                    onChangeText={setMovementNote}
                    multiline
                  />
                </View>

                <Pressable style={styles.submitButton}>
                  <LinearGradient
                    colors={['#52FF94', '#22C55E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.submitButtonGradient}
                  >
                    <Text style={styles.submitButtonText}>Guardar Movimiento</Text>
                  </LinearGradient>
                </Pressable>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    gap: 12,
  },

  backButton: {
    padding: 8,
    marginLeft: -8,
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  headerIcon: {
    fontSize: 24,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    paddingBottom: 24,
  },

  stockCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },

  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  stockLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  stockValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#52FF94',
  },

  stockUnit: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },

  progressContainer: {
    gap: 6,
  },

  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  progressText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },

  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.03)',
    padding: 14,
    gap: 12,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  infoDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(82,255,148,0.1)',
    marginHorizontal: 8,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  detailLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  movementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addMovementButton: {
    padding: 4,
  },

  movementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },

  movementIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  movementInfo: {
    flex: 1,
  },

  movementType: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  movementNote: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  movementDate: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 1,
  },

  movementQuantity: {
    fontSize: 14,
    fontWeight: '800',
  },

  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
  },

  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },

  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },

  buttonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  modalContainer: {
    flex: 1,
  },

  modalContent: {
    flex: 1,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    paddingBottom: 24,
  },

  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    gap: 6,
  },

  typeButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  typeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  typeButtonTextActive: {
    color: '#52FF94',
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

  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  submitButtonGradient: {
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
