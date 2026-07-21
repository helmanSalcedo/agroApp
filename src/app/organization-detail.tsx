import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, ScrollView, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useOrganization } from '@/context/organization-context';

const ROLES = [
  { id: 'propietario', label: 'Propietario', description: 'Control total', color: '#8B5CF6' },
  { id: 'administrador', label: 'Administrador', description: 'Gestión completa', color: '#3B82F6' },
  { id: 'supervisor', label: 'Supervisor', description: 'Supervisión', color: '#10B981' },
  { id: 'ingeniero', label: 'Ingeniero Agrónomo', description: 'Técnico', color: '#F59E0B' },
  { id: 'contador', label: 'Contador', description: 'Financiero', color: '#06B6D4' },
  { id: 'trabajador', label: 'Trabajador', description: 'Operativo', color: '#6B7280' },
  { id: 'invitado', label: 'Invitado', description: 'Lectura', color: '#EF4444' },
];

export default function OrganizationDetailScreen() {
  const { currentOrganization, inviteUser } = useOrganization();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<string>('trabajador');

  if (!currentOrganization) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>No hay organización</Text>
        </SafeAreaView>
      </View>
    );
  }

  const renderMemberCard = ({ item, index }: { item: any; index: number }) => {
    const role = ROLES.find(r => r.id === item.role);

    return (
      <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
        <View style={styles.memberCard}>
          <LinearGradient
            colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.memberContent}>
              <View style={styles.memberAvatar}>
                <Text style={styles.avatarText}>{item.avatar || '👤'}</Text>
              </View>

              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberEmail}>{item.email}</Text>
              </View>

              <View
                style={[
                  styles.roleBadge,
                  { backgroundColor: (role?.color || '#6B7280') + '20' },
                ]}
              >
                <Text style={[styles.roleText, { color: role?.color || '#6B7280' }]}>
                  {role?.label}
                </Text>
              </View>

              <Pressable style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={18} color="rgba(255,255,255,0.5)" />
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </Animated.View>
    );
  };

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
            <Text style={styles.headerTitle}>Configuración</Text>
            <Text style={styles.headerSubtitle}>{currentOrganization.name}</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Organization Card */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <LinearGradient
              colors={['rgba(82,255,148,0.2)', 'rgba(82,255,148,0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.orgCard}
            >
              <View style={styles.orgCardContent}>
                <View style={styles.orgLogo}>
                  <Text style={styles.orgLogoText}>{currentOrganization.logo}</Text>
                </View>

                <View style={styles.orgCardInfo}>
                  <Text style={styles.orgName}>{currentOrganization.name}</Text>
                  <Text style={styles.orgDescription}>{currentOrganization.description}</Text>
                  <Text style={styles.orgLocation}>📍 {currentOrganization.location}</Text>
                </View>

                <Pressable style={styles.editButton}>
                  <Ionicons name="pencil" size={18} color="#52FF94" />
                </Pressable>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Stats */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{currentOrganization.members.length}</Text>
                <Text style={styles.statLabel}>Miembros</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statValue}>{currentOrganization.fincas.length}</Text>
                <Text style={styles.statLabel}>Fincas</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statValue}>{currentOrganization.totalArea}</Text>
                <Text style={styles.statLabel}>Hectáreas</Text>
              </View>
            </View>
          </Animated.View>

          {/* Members Section */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Miembros del Equipo</Text>
                <Pressable
                  style={styles.inviteButton}
                  onPress={() => setShowInviteModal(true)}
                >
                  <Ionicons name="person-add" size={16} color="#52FF94" />
                  <Text style={styles.inviteButtonText}>Invitar</Text>
                </Pressable>
              </View>

              <FlatList
                data={currentOrganization.members}
                renderItem={renderMemberCard}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.membersList}
              />
            </View>
          </Animated.View>

          {/* Roles & Permissions */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Roles Disponibles</Text>

              {ROLES.map(role => (
                <View key={role.id} style={styles.roleItem}>
                  <LinearGradient
                    colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.roleItemGradient}
                  >
                    <View
                      style={[
                        styles.roleIcon,
                        { backgroundColor: role.color + '20' },
                      ]}
                    >
                      <View
                        style={[
                          styles.roleIconDot,
                          { backgroundColor: role.color },
                        ]}
                      />
                    </View>

                    <View style={styles.roleInfo}>
                      <Text style={styles.roleName}>{role.label}</Text>
                      <Text style={styles.roleDescription}>{role.description}</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
                  </LinearGradient>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Danger Zone */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: '#EF4444' }]}>Zona de Peligro</Text>

              <Pressable style={styles.dangerButton}>
                <LinearGradient
                  colors={['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.dangerButtonGradient}
                >
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  <View style={styles.dangerButtonContent}>
                    <Text style={styles.dangerButtonTitle}>Eliminar Organización</Text>
                    <Text style={styles.dangerButtonSubtext}>Esta acción no se puede deshacer</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#EF4444" />
                </LinearGradient>
              </Pressable>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Invite Modal */}
        <Modal
          visible={showInviteModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowInviteModal(false)}
        >
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#020403', '#08120D', '#10261A']}
              style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setShowInviteModal(false)}>
                  <Ionicons name="close" size={24} color="#52FF94" />
                </Pressable>
                <Text style={styles.modalTitle}>Invitar Miembro</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView contentContainerStyle={styles.modalBody}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="usuario@example.com"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={inviteEmail}
                    onChangeText={setInviteEmail}
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Rol *</Text>
                  <View style={styles.roleSelector}>
                    {ROLES.slice(1).map(role => (
                      <Pressable
                        key={role.id}
                        style={[
                          styles.roleSelectorButton,
                          inviteRole === role.id && styles.roleSelectorButtonActive,
                        ]}
                        onPress={() => setInviteRole(role.id)}
                      >
                        <Text
                          style={[
                            styles.roleSelectorText,
                            inviteRole === role.id && styles.roleSelectorTextActive,
                          ]}
                        >
                          {role.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <Pressable style={styles.submitButton}>
                  <LinearGradient
                    colors={['#52FF94', '#22C55E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.submitButtonGradient}
                  >
                    <Text style={styles.submitButtonText}>Enviar Invitación</Text>
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
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 20,
    paddingBottom: 24,
  },

  orgCard: {
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#52FF94',
    padding: 16,
  },

  orgCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  orgLogo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: 'rgba(82,255,148,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  orgLogoText: {
    fontSize: 32,
  },

  orgCardInfo: {
    flex: 1,
  },

  orgName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  orgDescription: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  orgLocation: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  editButton: {
    padding: 8,
  },

  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 4,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#52FF94',
  },

  statLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },

  section: {
    gap: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.1)',
    gap: 4,
  },

  inviteButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#52FF94',
  },

  membersList: {
    gap: 12,
  },

  memberCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  cardGradient: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 12,
  },

  memberContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 18,
  },

  memberInfo: {
    flex: 1,
  },

  memberName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  memberEmail: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  roleText: {
    fontSize: 10,
    fontWeight: '700',
  },

  moreButton: {
    padding: 4,
  },

  roleItem: {
    marginBottom: 12,
  },

  roleItemGradient: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },

  roleIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  roleIconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  roleInfo: {
    flex: 1,
  },

  roleName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  roleDescription: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  dangerButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  dangerButtonGradient: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },

  dangerButtonContent: {
    flex: 1,
  },

  dangerButtonTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },

  dangerButtonSubtext: {
    fontSize: 10,
    color: 'rgba(239,68,68,0.7)',
    marginTop: 2,
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

  inputGroup: {
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

  roleSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  roleSelectorButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
  },

  roleSelectorButtonActive: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.15)',
  },

  roleSelectorText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },

  roleSelectorTextActive: {
    color: '#52FF94',
    fontWeight: '700',
  },

  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
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
