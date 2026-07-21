import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, ScrollView, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useOrganization } from '@/context/organization-context';

export default function OrganizationsScreen() {
  const { organizations, currentOrganization, setCurrentOrganization } = useOrganization();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [orgDescription, setOrgDescription] = useState('');

  const renderOrgCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable
        style={[
          styles.orgCard,
          currentOrganization?.id === item.id && styles.orgCardActive,
        ]}
        onPress={() => {
          setCurrentOrganization(item);
          router.back();
        }}
      >
        <LinearGradient
          colors={
            currentOrganization?.id === item.id
              ? ['rgba(82,255,148,0.2)', 'rgba(82,255,148,0.1)']
              : ['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.orgHeader}>
            <View style={styles.orgLogo}>
              <Text style={styles.logoText}>{item.logo || '🏢'}</Text>
            </View>

            <View style={styles.orgInfo}>
              <View style={styles.orgTitleRow}>
                <Text style={styles.orgName}>{item.name}</Text>
                {currentOrganization?.id === item.id && (
                  <View style={styles.activeBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#52FF94" />
                  </View>
                )}
              </View>
              <Text style={styles.orgDescription}>{item.description}</Text>
              <Text style={styles.orgLocation}>📍 {item.location}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.orgStats}>
            <View style={styles.statItem}>
              <Ionicons name="people" size={16} color="#52FF94" />
              <Text style={styles.statText}>{item.members?.length || 0} miembros</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="map" size={16} color="#52FF94" />
              <Text style={styles.statText}>{item.fincas?.length || 0} fincas</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="expand" size={16} color="#52FF94" />
              <Text style={styles.statText}>{item.totalArea || 0} ha</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardActions}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="settings-outline" size={14} color="#52FF94" />
              <Text style={styles.actionButtonText}>Configurar</Text>
            </Pressable>

            <Pressable style={[styles.actionButton, styles.actionButtonSecondary]}>
              <Ionicons name="people-add-outline" size={14} color="#3B82F6" />
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                Invitar
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

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
            <Text style={styles.headerTitle}>Mis Organizaciones</Text>
            <Text style={styles.headerSubtitle}>Selecciona o crea una organización</Text>
          </View>
          <Pressable
            style={styles.addButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Ionicons name="add-circle" size={24} color="#52FF94" />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Current Organization Card */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <Text style={styles.sectionTitle}>Actual</Text>
            {currentOrganization && (
              <Pressable
                style={styles.currentOrgCard}
                onPress={() => router.push('/organization-detail')}
              >
                <LinearGradient
                  colors={['rgba(34,197,94,0.2)', 'rgba(34,197,94,0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.currentOrgGradient}
                >
                  <View style={styles.currentOrgContent}>
                    <View style={styles.currentOrgLogo}>
                      <Text style={styles.currentOrgLogoText}>
                        {currentOrganization.logo}
                      </Text>
                    </View>

                    <View style={styles.currentOrgInfo}>
                      <Text style={styles.currentOrgName}>
                        {currentOrganization.name}
                      </Text>
                      <Text style={styles.currentOrgSubtext}>
                        {currentOrganization.members.length} miembros • {currentOrganization.fincas.length} fincas
                      </Text>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color="#52FF94" />
                  </View>
                </LinearGradient>
              </Pressable>
            )}
          </Animated.View>

          {/* Other Organizations */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <Text style={styles.sectionTitle}>Otras Organizaciones</Text>
            {organizations.length > 1 ? (
              <FlatList
                data={organizations.filter(org => org.id !== currentOrganization?.id)}
                renderItem={renderOrgCard}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.orgsList}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>🏢</Text>
                <Text style={styles.emptyStateText}>No hay más organizaciones</Text>
                <Text style={styles.emptyStateSubtext}>
                  Crea una nueva o solicita acceso a otras
                </Text>
              </View>
            )}
          </Animated.View>

          {/* Create New Button */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <Pressable
              style={styles.createNewButton}
              onPress={() => setShowCreateModal(true)}
            >
              <LinearGradient
                colors={['#52FF94', '#22C55E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.createNewGradient}
              >
                <Ionicons name="add" size={20} color="#041109" />
                <Text style={styles.createNewText}>Crear Nueva Organización</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </ScrollView>

        {/* Create Modal */}
        <Modal
          visible={showCreateModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCreateModal(false)}
        >
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#020403', '#08120D', '#10261A']}
              style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setShowCreateModal(false)}>
                  <Ionicons name="close" size={24} color="#52FF94" />
                </Pressable>
                <Text style={styles.modalTitle}>Nueva Organización</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView contentContainerStyle={styles.modalBody}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nombre de la Organización *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Agropecuaria Los Campos"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={orgName}
                    onChangeText={setOrgName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Descripción</Text>
                  <TextInput
                    style={[styles.input, { minHeight: 100 }]}
                    placeholder="Describe tu organización..."
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={orgDescription}
                    onChangeText={setOrgDescription}
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
                    <Text style={styles.submitButtonText}>Crear Organización</Text>
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

  addButton: {
    padding: 8,
    marginRight: -8,
  },

  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 20,
    paddingBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  currentOrgCard: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
  },

  currentOrgGradient: {
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#52FF94',
    padding: 16,
  },

  currentOrgContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  currentOrgLogo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(82,255,148,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  currentOrgLogoText: {
    fontSize: 28,
  },

  currentOrgInfo: {
    flex: 1,
  },

  currentOrgName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  currentOrgSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  orgsList: {
    gap: 12,
  },

  orgCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 4,
  },

  orgCardActive: {
    borderWidth: 2,
    borderColor: '#52FF94',
  },

  cardGradient: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 12,
    gap: 10,
  },

  orgHeader: {
    flexDirection: 'row',
    gap: 12,
  },

  orgLogo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: 'rgba(82,255,148,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 24,
  },

  orgInfo: {
    flex: 1,
  },

  orgTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  orgName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  activeBadge: {
    padding: 2,
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

  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  orgStats: {
    flexDirection: 'row',
    gap: 12,
  },

  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },

  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },

  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.1)',
    gap: 4,
  },

  actionButtonSecondary: {
    backgroundColor: 'rgba(59,130,246,0.1)',
  },

  actionButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#52FF94',
  },

  actionButtonTextSecondary: {
    color: '#3B82F6',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },

  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  emptyStateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  emptyStateSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },

  createNewButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },

  createNewGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },

  createNewText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#041109',
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
