import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import React, { useState } from 'react';

const MOCK_QUESTION_DETAIL = {
  id: '1',
  question: '¿Cuál es el mejor momento para sembrar maíz en mi región?',
  clientName: 'Juan García',
  clientAvatar: 'JG',
  clientEmail: 'juan@agroapp.com',
  date: '2026-07-18',
  time: '10:45 AM',
  status: 'sin_responder',
  priority: 'normal',
  category: 'Sembríos',
  context: 'Tengo 50 hectáreas y quiero optimizar mi tiempo de siembra.',
  conversationThread: [
    {
      id: '1',
      sender: 'juan@agroapp.com',
      senderName: 'Juan García',
      message: '¿Cuál es el mejor momento para sembrar maíz en mi región?',
      timestamp: '2026-07-18 10:45 AM',
      isClient: true,
    },
  ],
};

export default function ProfessionalQuestionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [response, setResponse] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendResponse = () => {
    if (response.trim()) {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setResponse('');
        // Show success message
      }, 500);
    }
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
            <Text style={styles.headerTitle}>Detalle de Consulta</Text>
            <Text style={styles.headerSubtitle}>Responde al cliente</Text>
          </View>
          <View style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="rgba(255,255,255,0.5)" />
          </View>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* CLIENT INFO */}
          <Animated.View entering={FadeInDown.duration(400).delay(50)}>
            <LinearGradient
              colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.clientCard}
            >
              <View style={styles.clientHeader}>
                <View style={styles.clientAvatar}>
                  <Text style={styles.clientAvatarText}>{MOCK_QUESTION_DETAIL.clientAvatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.clientName}>{MOCK_QUESTION_DETAIL.clientName}</Text>
                  <Text style={styles.clientEmail}>{MOCK_QUESTION_DETAIL.clientEmail}</Text>
                </View>
                <Pressable style={styles.callButton}>
                  <Ionicons name="call" size={16} color="#52FF94" />
                </Pressable>
              </View>

              <View style={styles.clientMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={12} color="rgba(255,255,255,0.6)" />
                  <Text style={styles.metaText}>
                    {new Date(MOCK_QUESTION_DETAIL.date).toLocaleDateString('es-CO')}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.6)" />
                  <Text style={styles.metaText}>{MOCK_QUESTION_DETAIL.time}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="pricetag-outline" size={12} color="rgba(255,255,255,0.6)" />
                  <Text style={styles.metaText}>{MOCK_QUESTION_DETAIL.category}</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* QUESTION SECTION */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.questionSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="chatbubble-outline" size={16} color="#52FF94" />
                <Text style={styles.sectionTitle}>Pregunta</Text>
              </View>
              <LinearGradient
                colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.questionCard}
              >
                <Text style={styles.questionText}>{MOCK_QUESTION_DETAIL.question}</Text>
                {MOCK_QUESTION_DETAIL.context && (
                  <>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: 'rgba(82,255,148,0.1)',
                        marginVertical: 12,
                      }}
                    />
                    <Text style={styles.contextLabel}>Contexto adicional:</Text>
                    <Text style={styles.contextText}>{MOCK_QUESTION_DETAIL.context}</Text>
                  </>
                )}
              </LinearGradient>
            </View>
          </Animated.View>

          {/* STATUS BANNER */}
          <Animated.View entering={FadeInDown.duration(400).delay(150)}>
            <LinearGradient
              colors={['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statusBanner}
            >
              <Ionicons name="alert-circle" size={16} color="#EF4444" />
              <View style={{ flex: 1 }}>
                <Text style={styles.statusTitle}>Sin responder</Text>
                <Text style={styles.statusDesc}>
                  El cliente espera tu respuesta desde hace 8 horas
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* RESPONSE SECTION */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <View style={styles.responseSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="send-outline" size={16} color="#52FF94" />
                <Text style={styles.sectionTitle}>Tu Respuesta</Text>
              </View>

              {/* Response Input */}
              <LinearGradient
                colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.inputContainer}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder="Escribe tu respuesta aquí..."
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  multiline
                  numberOfLines={6}
                  value={response}
                  onChangeText={setResponse}
                  editable={!isSending}
                />
              </LinearGradient>

              {/* Helper Text */}
              <View style={styles.helperText}>
                <Ionicons name="bulb-outline" size={14} color="#F59E0B" />
                <Text style={styles.helperTextContent}>
                  Sé específico y práctico en tu respuesta. Incluye recomendaciones concretas.
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <Pressable
                  style={[
                    styles.actionButton,
                    styles.actionButtonSecondary,
                    !response.trim() && { opacity: 0.5 },
                  ]}
                  disabled={!response.trim()}
                >
                  <Ionicons name="save-outline" size={16} color="#52FF94" />
                  <Text style={styles.actionButtonText}>Guardar Borrador</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.actionButton,
                    styles.actionButtonPrimary,
                    !response.trim() && { opacity: 0.7 },
                  ]}
                  disabled={!response.trim()}
                  onPress={handleSendResponse}
                >
                  <Ionicons name="send" size={16} color="#020403" />
                  <Text style={styles.actionButtonTextPrimary}>
                    {isSending ? 'Enviando...' : 'Enviar Respuesta'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>

          {/* SUGGESTIONS */}
          <Animated.View entering={FadeInDown.duration(400).delay(250)}>
            <View style={styles.suggestionsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="sparkles-outline" size={16} color="#52FF94" />
                <Text style={styles.sectionTitle}>Sugerencias IA</Text>
              </View>

              <View style={styles.suggestionCard}>
                <Text style={styles.suggestionTitle}>💡 Respuesta sugerida</Text>
                <Text style={styles.suggestionText}>
                  Para maíz en tu región, el mejor momento es entre Mayo-Junio. Considera: 1) Lluvia
                  bien distribuida, 2) Suelo preparado, 3) Temperatura óptima 18-25°C. Recomendación:
                  Usar variedades adaptadas a tu clima y hacer pruebas de suelo.
                </Text>
                <Pressable
                  onPress={() =>
                    setResponse(
                      'Para maíz en tu región, el mejor momento es entre Mayo-Junio. Considera: 1) Lluvia bien distribuida, 2) Suelo preparado, 3) Temperatura óptima 18-25°C. Recomendación: Usar variedades adaptadas a tu clima y hacer pruebas de suelo.'
                    )
                  }
                  style={styles.useSuggestion}
                >
                  <Ionicons name="checkmark-circle-outline" size={14} color="#22C55E" />
                  <Text style={styles.useSuggestionText}>Usar esta</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
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
  moreButton: { padding: 4 },

  clientCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 12,
    gap: 12,
  },
  clientHeader: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientAvatarText: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  clientName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  clientEmail: { fontSize: 10, color: '#52FF94', fontWeight: '500', marginTop: 2 },
  callButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  clientMeta: { flexDirection: 'row', gap: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  metaItem: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  metaText: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },

  questionSection: { marginHorizontal: 16, marginVertical: 12, gap: 10 },
  sectionHeader: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#52FF94' },

  questionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 14,
  },
  questionText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', lineHeight: 20 },
  contextLabel: { fontSize: 11, fontWeight: '700', color: '#52FF94' },
  contextText: { fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 16, marginTop: 4 },

  statusBanner: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    flexDirection: 'row',
    gap: 10,
  },
  statusTitle: { fontSize: 12, fontWeight: '700', color: '#EF4444' },
  statusDesc: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2 },

  responseSection: { marginHorizontal: 16, marginVertical: 12, gap: 10 },

  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    padding: 14,
    minHeight: 120,
  },
  textInput: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlignVertical: 'top',
  },

  helperText: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(245,158,11,0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.15)',
  },
  helperTextContent: { fontSize: 10, color: 'rgba(255,255,255,0.7)', flex: 1 },

  actionButtons: { flexDirection: 'row', gap: 10 },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  },
  actionButtonSecondary: {
    backgroundColor: 'rgba(82,255,148,0.08)',
    borderColor: 'rgba(82,255,148,0.3)',
  },
  actionButtonPrimary: { backgroundColor: '#52FF94', borderColor: '#52FF94' },
  actionButtonText: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  actionButtonTextPrimary: { fontSize: 12, fontWeight: '700', color: '#020403' },

  suggestionsSection: { marginHorizontal: 16, marginVertical: 12, gap: 10 },

  suggestionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.05)',
    padding: 12,
    gap: 10,
  },
  suggestionTitle: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  suggestionText: { fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 16 },
  useSuggestion: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  useSuggestionText: { fontSize: 10, fontWeight: '700', color: '#22C55E' },
});
