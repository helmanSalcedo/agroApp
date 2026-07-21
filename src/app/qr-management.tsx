import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const QR_CODES = [
  {
    id: 1,
    farm: 'Finca El Porvenir',
    type: 'finca',
    qrCode: 'QR-FINCA-2026-001',
    createdDate: '15 Jun 2026',
    expiryDate: '15 Sep 2026',
    permissions: ['Ver actividades', 'Registrar gastos', 'Ver producción'],
    scans: 3,
    status: 'activo',
    createdBy: 'Administrador',
  },
  {
    id: 2,
    farm: 'Lote Alto - Finca El Porvenir',
    type: 'lote',
    qrCode: 'QR-LOTE-2026-001',
    createdDate: '10 Jun 2026',
    expiryDate: '10 Dic 2026',
    permissions: ['Ver lote', 'Registrar actividades', 'Ver costos'],
    scans: 7,
    status: 'activo',
    createdBy: 'Administrador',
  },
  {
    id: 3,
    farm: 'Finca La Victoria',
    type: 'finca',
    qrCode: 'QR-FINCA-2026-002',
    createdDate: '01 Jun 2026',
    expiryDate: '01 Sep 2026',
    permissions: ['Ver todo', 'Editar', 'Invitar usuarios'],
    scans: 12,
    status: 'activo',
    createdBy: 'Administrador',
  },
];

const PERMISSION_OPTIONS = [
  { id: 'view', label: 'Ver información', icon: 'eye-outline', color: '#3B82F6' },
  { id: 'edit', label: 'Editar datos', icon: 'pencil-outline', color: '#52FF94' },
  { id: 'activity', label: 'Registrar actividades', icon: 'leaf-outline', color: '#10B981' },
  { id: 'expense', label: 'Registrar gastos', icon: 'wallet-outline', color: '#F59E0B' },
  { id: 'production', label: 'Ver producción', icon: 'stats-chart-outline', color: '#EC4899' },
  { id: 'invite', label: 'Invitar usuarios', icon: 'person-add-outline', color: '#8B5CF6' },
];

export default function QRManagementScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 380;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['view']);

  const togglePermission = (id: string) => {
    setSelectedPermissions(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />

      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Gestión de QR</Text>
            <Text style={styles.headerSubtitle}>Controla acceso a tus fincas</Text>
          </View>
          <Pressable onPress={() => setShowCreateModal(true)}>
            <Ionicons name="add-circle" size={28} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* INFO BANNER */}
          <Animated.View entering={FadeInDown.duration(400).delay(50)}>
            <LinearGradient
              colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.infoBanner}
            >
              <View style={styles.bannerContent}>
                <Ionicons name="qr-code" size={24} color="#52FF94" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.bannerTitle}>¿Cómo funciona?</Text>
                  <Text style={styles.bannerDesc}>
                    Crea códigos QR para que otras personas accedan a tus fincas o lotes con permisos específicos
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* QR LIST */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <Text style={styles.sectionTitle}>📋 Tus Códigos QR</Text>

            {QR_CODES.map((qr, index) => (
              <Animated.View
                key={qr.id}
                entering={FadeInDown.duration(400).delay(150 + index * 50)}
              >
                <Pressable style={styles.qrCard}>
                  <LinearGradient
                    colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.qrGradient}
                  >
                    {/* TOP */}
                    <View style={styles.qrTop}>
                      <View style={styles.qrInfo}>
                        <View style={[styles.typeIcon, { backgroundColor: qr.type === 'finca' ? 'rgba(52,211,153,0.15)' : 'rgba(99,102,241,0.15)' }]}>
                          <Ionicons
                            name={qr.type === 'finca' ? 'home-outline' : 'grid-outline'}
                            size={18}
                            color={qr.type === 'finca' ? '#10B981' : '#6366F1'}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.qrFarmName}>{qr.farm}</Text>
                          <Text style={styles.qrCode}>{qr.qrCode}</Text>
                        </View>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: qr.status === 'activo' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)' }]}>
                        <Ionicons name="checkmark-circle" size={14} color={qr.status === 'activo' ? '#10B981' : '#EF4444'} />
                        <Text style={[styles.statusText, { color: qr.status === 'activo' ? '#10B981' : '#EF4444' }]}>
                          Activo
                        </Text>
                      </View>
                    </View>

                    {/* STATS */}
                    <View style={styles.qrStats}>
                      <View style={styles.statItem}>
                        <Ionicons name="scan-outline" size={14} color="#52FF94" />
                        <Text style={styles.statValue}>{qr.scans}</Text>
                        <Text style={styles.statLabel}>Escaneos</Text>
                      </View>
                      <View style={styles.statDivider} />
                      <View style={styles.statItem}>
                        <Ionicons name="calendar-outline" size={14} color="#F59E0B" />
                        <Text style={styles.statLabel}>Hasta {qr.expiryDate}</Text>
                      </View>
                    </View>

                    {/* PERMISSIONS */}
                    <View style={styles.permissionsSection}>
                      <Text style={styles.permissionsLabel}>Permisos:</Text>
                      <View style={styles.permissionsList}>
                        {qr.permissions.map((perm, idx) => (
                          <View key={idx} style={styles.permissionItem}>
                            <Ionicons name="checkmark-circle" size={12} color="#52FF94" />
                            <Text style={styles.permissionText}>{perm}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* ACTIONS */}
                    <View style={styles.qrActions}>
                      <Pressable style={styles.actionBtn}>
                        <Ionicons name="qr-code-outline" size={16} color="#52FF94" />
                        <Text style={styles.actionBtnText}>Ver QR</Text>
                      </Pressable>
                      <Pressable style={[styles.actionBtn, styles.actionBtnSecondary]}>
                        <Ionicons name="copy-outline" size={16} color="#3B82F6" />
                        <Text style={[styles.actionBtnText, styles.actionBtnSecondaryText]}>Copiar Código</Text>
                      </Pressable>
                      <Pressable style={[styles.actionBtn, styles.actionBtnDanger]}>
                        <Ionicons name="trash-outline" size={16} color="#EF4444" />
                      </Pressable>
                    </View>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            ))}
          </Animated.View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>

      {/* CREATE QR MODAL */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            {/* MODAL HEADER */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Crear Nuevo QR</Text>
              <Pressable onPress={() => setShowCreateModal(false)}>
                <Ionicons name="close" size={24} color="#52FF94" />
              </Pressable>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* SELECT FINCA */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Selecciona Finca o Lote *</Text>
                <Pressable style={styles.selectField}>
                  <Ionicons name="home-outline" size={18} color="#52FF94" />
                  <Text style={styles.selectPlaceholder}>Finca El Porvenir</Text>
                  <Ionicons name="chevron-down" size={18} color="rgba(255,255,255,0.5)" />
                </Pressable>
              </View>

              {/* PERMISSIONS */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Permisos que deseas asignar</Text>
                <View style={styles.permissionsGrid}>
                  {PERMISSION_OPTIONS.map((perm) => (
                    <Pressable
                      key={perm.id}
                      style={[
                        styles.permissionCard,
                        selectedPermissions.includes(perm.id) && styles.permissionCardSelected,
                      ]}
                      onPress={() => togglePermission(perm.id)}
                    >
                      <View style={[styles.permissionCardIcon, { backgroundColor: perm.color + '20' }]}>
                        <Ionicons name={perm.icon as any} size={18} color={perm.color} />
                      </View>
                      <Text style={styles.permissionCardText}>{perm.label}</Text>
                      {selectedPermissions.includes(perm.id) && (
                        <View style={styles.permissionCardCheck}>
                          <Ionicons name="checkmark" size={12} color="#52FF94" />
                        </View>
                      )}
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* EXPIRY */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Vigencia del Código</Text>
                <Pressable style={styles.selectField}>
                  <Ionicons name="calendar-outline" size={18} color="#52FF94" />
                  <Text style={styles.selectPlaceholder}>3 meses</Text>
                  <Ionicons name="chevron-down" size={18} color="rgba(255,255,255,0.5)" />
                </Pressable>
              </View>
            </ScrollView>

            {/* MODAL ACTIONS */}
            <View style={styles.modalFooter}>
              <Pressable
                style={styles.modalCancelBtn}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.modalCancelBtnText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.modalCreateBtn}>
                <LinearGradient
                  colors={['#52FF94', '#22C55E']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.modalCreateBtnGradient}
                >
                  <Ionicons name="qr-code-outline" size={18} color="#020403" />
                  <Text style={styles.modalCreateBtnText}>Generar QR</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollView: { flex: 1 },

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

  infoBanner: { marginHorizontal: 16, marginVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, flexDirection: 'row', gap: 10 },
  bannerContent: { flex: 1, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  bannerTitle: { fontSize: 12, fontWeight: '700', color: '#52FF94', marginBottom: 2 },
  bannerDesc: { fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 15 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, marginTop: 4, marginLeft: 16 },

  qrCard: { marginHorizontal: 16, marginBottom: 12, borderRadius: 12, overflow: 'hidden' },
  qrGradient: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', padding: 14, gap: 12 },
  qrTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  qrInfo: { flexDirection: 'row', gap: 10, flex: 1 },
  typeIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  qrFarmName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  qrCode: { fontSize: 11, color: '#52FF94', fontWeight: '600', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, flexDirection: 'row', gap: 4, alignItems: 'center' },
  statusText: { fontSize: 10, fontWeight: '700' },

  qrStats: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.05)' },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 },
  statValue: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)' },
  statDivider: { width: 1, height: 20, backgroundColor: 'rgba(82,255,148,0.2)' },

  permissionsSection: { gap: 8 },
  permissionsLabel: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.7)' },
  permissionsList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  permissionItem: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: 'rgba(82,255,148,0.1)' },
  permissionText: { fontSize: 10, color: '#52FF94', fontWeight: '600' },

  qrActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.15)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)' },
  actionBtnText: { fontSize: 11, fontWeight: '700', color: '#52FF94' },
  actionBtnSecondary: { backgroundColor: 'rgba(59,182,246,0.15)', borderColor: 'rgba(59,182,246,0.2)' },
  actionBtnSecondaryText: { color: '#3B82F6' },
  actionBtnDanger: { flex: 0.8, backgroundColor: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.2)' },

  /* MODAL */
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#020403', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  modalBody: { paddingHorizontal: 16, paddingVertical: 16 },
  formGroup: { marginBottom: 20, gap: 8 },
  formLabel: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  selectField: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', gap: 10 },
  selectPlaceholder: { flex: 1, color: '#FFFFFF', fontSize: 13, fontWeight: '500' },

  permissionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  permissionCard: { width: '48%', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.05)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', alignItems: 'center', gap: 6 },
  permissionCardSelected: { backgroundColor: 'rgba(82,255,148,0.15)', borderColor: '#52FF94' },
  permissionCardIcon: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  permissionCardText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
  permissionCardCheck: { position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: 9, backgroundColor: '#52FF94', justifyContent: 'center', alignItems: 'center' },

  modalFooter: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  modalCancelBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)' },
  modalCancelBtnText: { textAlign: 'center', color: '#52FF94', fontWeight: '700', fontSize: 13 },
  modalCreateBtn: { flex: 1.2, borderRadius: 10, overflow: 'hidden' },
  modalCreateBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12 },
  modalCreateBtnText: { color: '#020403', fontWeight: '700', fontSize: 13 },
});
