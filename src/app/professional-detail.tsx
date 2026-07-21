import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

export default function ProfessionalDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [message, setMessage] = useState('');

  // Mock professional detail
  const professional = {
    id: params.id || 'prof-1',
    name: 'Dr. Carlos Mendez',
    specialty: 'Agrónomo',
    icon: '🌱',
    rating: 4.9,
    reviews: 127,
    verified: true,
    experience: '12 años',
    response: '< 2 horas',
    price: '$150/hora',
    bio: 'Especialista en cultivos de granos con MBA en Gestión Agrícola.',
    location: 'Bogotá, Colombia',
    contact: 'carlos@agroapp.pro',
    about: 'Tengo más de 12 años de experiencia en la industria agrícola. Me especializo en cultivos de granos como maíz, soya y trigo. He trabajado con más de 500 fincas en Colombia y he ayudado a incrementar rendimientos hasta en un 35%.',
    expertise: [
      'Cultivos de granos',
      'Manejo de plagas',
      'Fertilización',
      'Rotación de cultivos',
      'Análisis de suelos',
      'Gestión de costos',
    ],
    languages: ['Español', 'Inglés'],
    reviews_list: [
      { id: '1', author: 'Juan Pérez', rating: 5, text: 'Excelente consultoría. Aumentó mi rendimiento en 25%', date: 'Hace 2 semanas' },
      { id: '2', author: 'María López', rating: 5, text: 'Muy profesional y atento. Súper recomendado', date: 'Hace 1 mes' },
      { id: '3', author: 'Roberto Silva', rating: 4, text: 'Buen profesional, responde rápido', date: 'Hace 1.5 meses' },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <Text style={styles.headerTitle}>Profesional</Text>
          <Pressable>
            <Ionicons name="share-social-outline" size={24} color="#52FF94" />
          </Pressable>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <LinearGradient
              colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileCard}
            >
              <View style={styles.avatarLarge}>
                <Text style={styles.avatarLargeEmoji}>{professional.icon}</Text>
                {professional.verified && (
                  <View style={styles.verifiedBadgeLarge}>
                    <Ionicons name="checkmark-circle" size={20} color="#52FF94" />
                  </View>
                )}
              </View>

              <Text style={styles.name}>{professional.name}</Text>
              <Text style={styles.specialty}>{professional.specialty}</Text>

              <View style={styles.ratingSection}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.rating}>{professional.rating}</Text>
                <Text style={styles.reviewCount}>({professional.reviews} reseñas)</Text>
              </View>

              <View style={styles.locationSection}>
                <Ionicons name="location" size={14} color="#52FF94" />
                <Text style={styles.location}>{professional.location}</Text>
              </View>

              <View style={styles.statsGrid}>
                <View style={styles.gridItem}>
                  <Text style={styles.gridValue}>{professional.experience}</Text>
                  <Text style={styles.gridLabel}>Experiencia</Text>
                </View>
                <View style={styles.gridDivider} />
                <View style={styles.gridItem}>
                  <Text style={styles.gridValue}>{professional.response}</Text>
                  <Text style={styles.gridLabel}>Respuesta</Text>
                </View>
                <View style={styles.gridDivider} />
                <View style={styles.gridItem}>
                  <Text style={styles.gridValue}>{professional.price}</Text>
                  <Text style={styles.gridLabel}>Consultoría</Text>
                </View>
              </View>

              <Pressable
                style={styles.consultButton}
                onPress={() => setShowConsultModal(true)}
              >
                <Ionicons name="chatbubble-outline" size={20} color="#020403" />
                <Text style={styles.consultButtonText}>Solicitar Consulta</Text>
              </Pressable>
            </LinearGradient>
          </Animated.View>

          {/* About */}
          <Animated.View entering={FadeInDown.duration(400).delay(150)}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Acerca de</Text>
              <Text style={styles.description}>{professional.about}</Text>
            </View>
          </Animated.View>

          {/* Expertise */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Áreas de Especialidad</Text>
              <View style={styles.tagsContainer}>
                {professional.expertise.map((skill, index) => (
                  <View key={index} style={styles.tag}>
                    <Ionicons name="checkmark-circle" size={12} color="#52FF94" />
                    <Text style={styles.tagText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>

          {/* Languages */}
          <Animated.View entering={FadeInDown.duration(400).delay(250)}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Idiomas</Text>
              <View style={styles.languagesContainer}>
                {professional.languages.map((lang, index) => (
                  <View key={index} style={styles.languageBadge}>
                    <Text style={styles.languageText}>{lang}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>

          {/* Reviews */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reseñas ({professional.reviews})</Text>
              {professional.reviews_list.map((review, index) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewAuthor}>{review.author}</Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={12} color="#F59E0B" />
                      <Text style={styles.ratingText}>{review.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.text}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Contact Info */}
          <Animated.View entering={FadeInDown.duration(400).delay(350)}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contacto</Text>
              <View style={styles.contactCard}>
                <Ionicons name="mail" size={18} color="#52FF94" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>{professional.contact}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Modal */}
        <Modal
          visible={showConsultModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowConsultModal(false)}
        >
          <View style={styles.modalOverlay}>
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Solicitar Consulta</Text>
                <Pressable onPress={() => setShowConsultModal(false)}>
                  <Ionicons name="close" size={28} color="#52FF94" />
                </Pressable>
              </View>

              <ScrollView style={styles.modalContent}>
                <Text style={styles.modalLabel}>Mensaje (opcional)</Text>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Cuéntale al profesional sobre tu necesidad..."
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={6}
                />

                <Text style={styles.modalLabel}>Información de Contacto</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Tu nombre"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Tu teléfono"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="phone-pad"
                />
              </ScrollView>

              <Pressable
                style={styles.sendButton}
                onPress={() => {
                  setShowConsultModal(false);
                  setMessage('');
                }}
              >
                <Ionicons name="send" size={18} color="#020403" />
                <Text style={styles.sendButtonText}>Enviar Solicitud</Text>
              </Pressable>
            </SafeAreaView>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, textAlign: 'center' },
  profileCard: { marginHorizontal: 16, marginVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 20, alignItems: 'center', gap: 12 },
  avatarLarge: { position: 'relative', marginBottom: 8 },
  avatarLargeEmoji: { fontSize: 60 },
  verifiedBadgeLarge: { position: 'absolute', bottom: -4, right: -4, backgroundColor: 'rgba(2,4,3,0.9)', borderRadius: 12, padding: 2 },
  name: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  specialty: { fontSize: 14, color: '#52FF94', fontWeight: '600' },
  ratingSection: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rating: { fontSize: 14, fontWeight: '800', color: '#F59E0B' },
  reviewCount: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  locationSection: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  location: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  statsGrid: { flexDirection: 'row', width: '100%', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)', borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)', gap: 12, alignItems: 'center' },
  gridItem: { flex: 1, alignItems: 'center', gap: 4 },
  gridValue: { fontSize: 13, fontWeight: '800', color: '#52FF94' },
  gridLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  gridDivider: { width: 1, height: 30, backgroundColor: 'rgba(82,255,148,0.2)' },
  consultButton: { width: '100%', backgroundColor: '#52FF94', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 10 },
  consultButtonText: { color: '#020403', fontWeight: '700', fontSize: 14 },
  section: { paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#52FF94', marginBottom: 12 },
  description: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, backgroundColor: 'rgba(82,255,148,0.1)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)' },
  tagText: { fontSize: 11, color: '#FFFFFF', fontWeight: '500' },
  languagesContainer: { flexDirection: 'row', gap: 8 },
  languageBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(82,255,148,0.15)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)' },
  languageText: { fontSize: 12, fontWeight: '600', color: '#52FF94' },
  reviewCard: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)', gap: 6 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewAuthor: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, backgroundColor: 'rgba(245,158,11,0.15)' },
  ratingText: { fontSize: 11, fontWeight: '700', color: '#F59E0B' },
  reviewText: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  reviewDate: { fontSize: 10, color: 'rgba(255,255,255,0.5)' },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.05)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)' },
  contactLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  contactValue: { fontSize: 12, fontWeight: '600', color: '#FFFFFF', marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { flex: 1, backgroundColor: '#020403' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  modalContent: { flex: 1, paddingHorizontal: 16, paddingVertical: 16 },
  modalLabel: { fontSize: 12, fontWeight: '700', color: '#52FF94', marginBottom: 8 },
  messageInput: { backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', borderRadius: 10, padding: 12, color: '#FFFFFF', fontSize: 13, textAlignVertical: 'top', marginBottom: 16 },
  inputField: { backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', borderRadius: 10, padding: 12, color: '#FFFFFF', fontSize: 13, marginBottom: 12 },
  sendButton: { backgroundColor: '#52FF94', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, marginHorizontal: 16, marginBottom: 16, borderRadius: 12 },
  sendButtonText: { color: '#020403', fontWeight: '700', fontSize: 14 },
});
