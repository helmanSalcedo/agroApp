import { View, Text, StyleSheet, ScrollView, Pressable, FlatList, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import React, { useState } from 'react';

const MOCK_APPOINTMENTS = [
  {
    id: '1',
    clientName: 'Juan García',
    clientAvatar: 'JG',
    service: 'Consultoría Agrícola',
    date: '2026-07-20',
    time: '10:00 AM',
    status: 'confirmada',
    location: 'Virtual - Zoom',
    notes: 'Revisar plan de fertilización',
  },
  {
    id: '2',
    clientName: 'María López',
    clientAvatar: 'ML',
    service: 'Diagnóstico de Plagas',
    date: '2026-07-21',
    time: '2:00 PM',
    status: 'pendiente',
    location: 'En sitio - Finca La Victoria',
    notes: '',
  },
  {
    id: '3',
    clientName: 'Carlos Ruiz',
    clientAvatar: 'CR',
    service: 'Asesoría de Riego',
    date: '2026-07-19',
    time: '3:30 PM',
    status: 'completada',
    location: 'Virtual - Zoom',
    notes: 'Completado exitosamente',
  },
  {
    id: '4',
    clientName: 'Ana Martínez',
    clientAvatar: 'AM',
    service: 'Capacitación en Sistemas',
    date: '2026-07-22',
    time: '11:00 AM',
    status: 'confirmada',
    location: 'Virtual - Meet',
    notes: 'Traer documentos',
  },
  {
    id: '5',
    clientName: 'Roberto Mendez',
    clientAvatar: 'RM',
    service: 'Revisión de Cultivos',
    date: '2026-07-23',
    time: '9:00 AM',
    status: 'confirmada',
    location: 'En sitio - Finca El Porvenir',
    notes: '',
  },
];

export default function ProfessionalAppointmentsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'proximas' | 'completadas' | 'todas'>('proximas');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return '#22C55E';
      case 'pendiente':
        return '#F59E0B';
      case 'completada':
        return '#3B82F6';
      default:
        return '#52FF94';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'checkmark-circle';
      case 'pendiente':
        return 'alert-circle';
      case 'completada':
        return 'checkmark-done-circle';
      default:
        return 'calendar';
    }
  };

  const filteredAppointments = MOCK_APPOINTMENTS.filter(a => {
    if (filter === 'todas') return true;
    if (filter === 'proximas') return a.status !== 'completada';
    if (filter === 'completadas') return a.status === 'completada';
    return true;
  });

  const openAppointmentDetail = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowDetail(true);
  };

  const renderAppointmentCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInDown.duration(400).delay(index * 50)}
      style={{ marginBottom: 12 }}
    >
      <Pressable onPress={() => openAppointmentDetail(item)}>
        <LinearGradient
          colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.appointmentCard}
        >
          {/* Top Section */}
          <View style={styles.cardHeader}>
            <View style={styles.dateSection}>
              <View style={styles.dateBox}>
                <Text style={styles.dateDay}>
                  {new Date(item.date).getDate()}
                </Text>
                <Text style={styles.dateMonth}>
                  {new Date(item.date).toLocaleDateString('es-CO', { month: 'short' })}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceName}>{item.service}</Text>
                <View style={styles.timeRow}>
                  <Ionicons name="time-outline" size={12} color="#52FF94" />
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.status) + '25' },
              ]}
            >
              <Ionicons
                name={getStatusIcon(item.status) as any}
                size={14}
                color={getStatusColor(item.status)}
              />
            </View>
          </View>

          {/* Client Info */}
          <View style={styles.clientSection}>
            <View style={styles.clientAvatar}>
              <Text style={styles.clientAvatarText}>{item.clientAvatar}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.clientName}>{item.clientName}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.6)" />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </View>

          {/* Status Footer */}
          <View style={styles.cardFooter}>
            <Text
              style={[
                styles.statusLabel,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status === 'confirmada'
                ? 'Confirmada'
                : item.status === 'pendiente'
                  ? 'Pendiente'
                  : 'Completada'}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.4)" />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

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
            <Text style={styles.headerTitle}>Mis Citas</Text>
            <Text style={styles.headerSubtitle}>Gestiona tus citas</Text>
          </View>
          <Pressable style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* STATS */}
          <Animated.View entering={FadeInDown.duration(400).delay(50)}>
            <View style={styles.statsRow}>
              <LinearGradient
                colors={['rgba(34,197,94,0.08)', 'rgba(34,197,94,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <View style={styles.statContent}>
                  <Ionicons name="calendar" size={18} color="#22C55E" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.statValue}>
                      {MOCK_APPOINTMENTS.filter(a => a.status !== 'completada').length}
                    </Text>
                    <Text style={styles.statLabel}>Próximas</Text>
                  </View>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <View style={styles.statContent}>
                  <Ionicons name="checkmark-done-circle" size={18} color="#3B82F6" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.statValue}>
                      {MOCK_APPOINTMENTS.filter(a => a.status === 'completada').length}
                    </Text>
                    <Text style={styles.statLabel}>Completadas</Text>
                  </View>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <View style={styles.statContent}>
                  <Ionicons name="people" size={18} color="#52FF94" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.statValue}>{MOCK_APPOINTMENTS.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* FILTERS */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.filterContainer}>
              {(['proximas', 'completadas', 'todas'] as const).map((f, idx) => (
                <Pressable
                  key={f}
                  style={[
                    styles.filterButton,
                    filter === f && styles.filterButtonActive,
                  ]}
                  onPress={() => setFilter(f)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === f && styles.filterTextActive,
                    ]}
                  >
                    {f === 'proximas' ? 'Próximas' : f === 'completadas' ? 'Completadas' : 'Todas'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* APPOINTMENTS LIST */}
          <Animated.View entering={FadeInDown.duration(400).delay(150)}>
            <View style={styles.listSection}>
              <FlatList
                data={filteredAppointments}
                renderItem={renderAppointmentCard}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          </Animated.View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>

      {/* DETAIL MODAL */}
      <Modal
        visible={showDetail}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetail(false)}
      >
        <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={{ flex: 1 }} />
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowDetail(false)}>
              <Ionicons name="close" size={28} color="#52FF94" />
            </Pressable>
            <Text style={styles.modalTitle}>Detalles de Cita</Text>
            <View style={{ width: 28 }} />
          </View>

          {selectedAppointment && (
            <ScrollView style={styles.modalContent}>
              {/* Service & Date */}
              <LinearGradient
                colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalCard}
              >
                <View style={styles.modalCardHeader}>
                  <View>
                    <Text style={styles.modalCardLabel}>Servicio</Text>
                    <Text style={styles.modalCardValue}>{selectedAppointment.service}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadgeLarge,
                      { backgroundColor: getStatusColor(selectedAppointment.status) + '25' },
                    ]}
                  >
                    <Ionicons
                      name={getStatusIcon(selectedAppointment.status) as any}
                      size={16}
                      color={getStatusColor(selectedAppointment.status)}
                    />
                    <Text
                      style={[
                        styles.statusTextLarge,
                        { color: getStatusColor(selectedAppointment.status) },
                      ]}
                    >
                      {selectedAppointment.status === 'confirmada'
                        ? 'Confirmada'
                        : selectedAppointment.status === 'pendiente'
                          ? 'Pendiente'
                          : 'Completada'}
                    </Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Date & Time */}
              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={20} color="#52FF94" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Fecha</Text>
                  <Text style={styles.infoValue}>
                    {new Date(selectedAppointment.date).toLocaleDateString('es-CO', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={20} color="#52FF94" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Hora</Text>
                  <Text style={styles.infoValue}>{selectedAppointment.time}</Text>
                </View>
              </View>

              {/* Location */}
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={20} color="#52FF94" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Ubicación</Text>
                  <Text style={styles.infoValue}>{selectedAppointment.location}</Text>
                </View>
              </View>

              {/* Client */}
              <LinearGradient
                colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.clientCard}
              >
                <View style={styles.clientCardHeader}>
                  <View style={styles.clientCardAvatar}>
                    <Text style={styles.clientCardAvatarText}>
                      {selectedAppointment.clientAvatar}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoLabel}>Cliente</Text>
                    <Text style={styles.infoValue}>{selectedAppointment.clientName}</Text>
                  </View>
                  <Pressable style={styles.callButton}>
                    <Ionicons name="call" size={18} color="#52FF94" />
                  </Pressable>
                </View>
              </LinearGradient>

              {/* Notes */}
              {selectedAppointment.notes && (
                <View style={styles.notesSection}>
                  <Text style={styles.notesLabel}>📝 Notas</Text>
                  <Text style={styles.notesText}>{selectedAppointment.notes}</Text>
                </View>
              )}

              {/* Actions */}
              <View style={styles.actionButtons}>
                <Pressable style={[styles.actionButton, styles.actionButtonPrimary]}>
                  <Ionicons name="checkmark-circle" size={18} color="#020403" />
                  <Text style={styles.actionButtonTextPrimary}>Marcar Completada</Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                  <Ionicons name="pencil-outline" size={18} color="#52FF94" />
                  <Text style={styles.actionButtonText}>Editar</Text>
                </Pressable>
              </View>

              <View style={{ height: 30 }} />
            </ScrollView>
          )}
        </SafeAreaView>
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    gap: 12,
  },
  headerContent: { flex: 1, gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  addButton: { padding: 4 },

  statsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 16, marginVertical: 12 },
  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 12,
  },
  statContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statValue: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: '500', marginTop: 2 },

  filterContainer: { flexDirection: 'row', gap: 8, marginHorizontal: 16, marginVertical: 12 },
  filterButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(82,255,148,0.05)',
  },
  filterButtonActive: { backgroundColor: '#52FF94', borderColor: '#52FF94' },
  filterText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
  filterTextActive: { color: '#020403', fontWeight: '700' },

  listSection: { marginHorizontal: 16, marginVertical: 12 },

  appointmentCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 12,
    gap: 12,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  dateSection: { flexDirection: 'row', gap: 10, flex: 1 },
  dateBox: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(82,255,148,0.15)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  dateDay: { fontSize: 14, fontWeight: '700', color: '#52FF94' },
  dateMonth: { fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  serviceName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  timeRow: { flexDirection: 'row', gap: 4, alignItems: 'center', marginTop: 4 },
  time: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  statusBadge: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },

  clientSection: { flexDirection: 'row', gap: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  clientAvatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientAvatarText: { fontSize: 11, fontWeight: '700', color: '#52FF94' },
  clientName: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  locationRow: { flexDirection: 'row', gap: 4, alignItems: 'center', marginTop: 2 },
  location: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  statusLabel: { fontSize: 11, fontWeight: '700' },

  // Modal
  modalContainer: { flex: 1, backgroundColor: 'transparent' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },

  modalContent: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
  modalCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', padding: 14, marginBottom: 16 },
  modalCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  modalCardLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  modalCardValue: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginTop: 4 },
  statusBadgeLarge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, flexDirection: 'row', gap: 6, alignItems: 'center' },
  statusTextLarge: { fontSize: 11, fontWeight: '600' },

  infoRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 16, paddingHorizontal: 12, paddingVertical: 12, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.05)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)' },
  infoLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  infoValue: { fontSize: 13, fontWeight: '700', color: '#FFFFFF', marginTop: 2 },

  clientCard: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', padding: 14, marginBottom: 16 },
  clientCardHeader: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  clientCardAvatar: { width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.2)', justifyContent: 'center', alignItems: 'center' },
  clientCardAvatarText: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  callButton: { padding: 8, backgroundColor: 'rgba(82,255,148,0.15)', borderRadius: 8 },

  notesSection: { marginBottom: 16, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: 'rgba(82,255,148,0.05)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)' },
  notesLabel: { fontSize: 12, fontWeight: '700', color: '#52FF94', marginBottom: 8 },
  notesText: { fontSize: 13, color: '#FFFFFF', lineHeight: 18 },

  actionButtons: { gap: 10 },
  actionButton: { paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(82,255,148,0.3)', backgroundColor: 'rgba(82,255,148,0.08)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  actionButtonPrimary: { backgroundColor: '#52FF94', borderColor: '#52FF94' },
  actionButtonText: { fontSize: 13, fontWeight: '700', color: '#52FF94' },
  actionButtonTextPrimary: { fontSize: 13, fontWeight: '700', color: '#020403' },
});
