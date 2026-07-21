import { View, Text, StyleSheet, ScrollView, FlatList, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useState } from 'react';

const MOCK_MESSAGES = [
  {
    id: 'msg-1',
    type: 'bot',
    text: '¡Hola! 👋 Soy tu asistente agrícola de IA. Puedo ayudarte con consejos sobre cultivos, ganado, plagas y mucho más. ¿En qué puedo ayudarte hoy?',
    timestamp: '10:30',
  },
  {
    id: 'msg-2',
    type: 'user',
    text: '¿Cuándo debo fertilizar el maíz?',
    timestamp: '10:31',
  },
  {
    id: 'msg-3',
    type: 'bot',
    text: 'Excelente pregunta. El maíz debe fertilizarse en dos momentos principales:\n\n1️⃣ **V6** (6 hojas visibles): Nitrógeno base\n2️⃣ **V12** (12 hojas visibles): Aplicación de mantenimiento\n\nRecomiendo fertilizante NPK 10-10-10 + micronutrientes. ¿Necesitas más detalles?',
    timestamp: '10:32',
  },
  {
    id: 'msg-4',
    type: 'user',
    text: 'Mi ganado se ve decaído',
    timestamp: '10:33',
  },
  {
    id: 'msg-5',
    type: 'bot',
    text: 'Eso requiere atención. Revisa estos puntos:\n\n✅ Agua disponible (mínimo 60-80L/día)\n✅ Calidad del pasto\n✅ Vacunaciones al día\n✅ Signos de parásitos\n✅ Temperatura ambiente\n\nSi persiste, consulta un veterinario. ¿Qué síntomas específicos ves?',
    timestamp: '10:34',
  },
];

const QUICK_QUESTIONS = [
  { icon: '🌱', text: 'Plagas comunes', color: '#10B981' },
  { icon: '💧', text: 'Riego óptimo', color: '#06B6D4' },
  { icon: '🐄', text: 'Salud animal', color: '#F59E0B' },
  { icon: '📊', text: 'Rendimiento', color: '#3B82F6' },
  { icon: '🌿', text: 'Composting', color: '#8B5CF6' },
  { icon: '🧪', text: 'Análisis suelo', color: '#EC4899' },
];

export default function AITipsScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = {
        id: `msg-${Date.now() + 1}`,
        type: 'bot',
        text: 'Gracias por tu pregunta. Basándome en tus datos de producción, te recomiendo revisar tus parámetros de riego y nutrientes. ¿Quieres un análisis más detallado?',
        timestamp: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const renderMessage = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={item.type === 'user' ? FadeInUp.duration(300).delay(index * 50) : FadeInDown.duration(300).delay(index * 50)}
      style={[
        styles.messageContainer,
        item.type === 'user' && styles.messageContainerUser,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.type === 'user'
            ? styles.messageBubbleUser
            : styles.messageBubbleBot,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.type === 'user' && styles.messageTextUser,
          ]}
        >
          {item.text}
        </Text>
        <Text style={styles.messageTime}>{item.timestamp}</Text>
      </View>
    </Animated.View>
  );

  const renderQuickQuestion = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 50)}>
      <Pressable
        style={styles.quickQuestionButton}
        onPress={() => setInput(item.text)}
      >
        <LinearGradient
          colors={[`${item.color}20`, `${item.color}10`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.quickQuestionGradient}
        >
          <Text style={styles.quickQuestionIcon}>{item.icon}</Text>
          <Text style={styles.quickQuestionText}>{item.text}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Consejos IA 🤖</Text>
            <Text style={styles.headerSubtitle}>Tu asistente agrícola</Text>
          </View>
          <Pressable style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#52FF94" />
          </Pressable>
        </Animated.View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        {/* Quick Questions */}
        {messages.length < 3 && (
          <Animated.View entering={FadeInDown.duration(400)} style={styles.quickQuestionsSection}>
            <Text style={styles.quickQuestionsTitle}>Preguntas frecuentes</Text>
            <FlatList
              data={QUICK_QUESTIONS}
              renderItem={renderQuickQuestion}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={styles.quickQuestionsRow}
              scrollEnabled={false}
            />
          </Animated.View>
        )}

        {/* Input */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu pregunta..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
            />
            <Pressable
              style={[
                styles.sendButton,
                !input.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={!input.trim()}
            >
              <Ionicons
                name="send"
                size={20}
                color={input.trim() ? '#020403' : 'rgba(0,0,0,0.3)'}
              />
            </Pressable>
          </View>
          <Text style={styles.disclaimer}>Powered by Agricultural AI • Beta</Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  infoButton: { padding: 4 },
  messagesList: { paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  messageContainer: { alignItems: 'flex-start' },
  messageContainerUser: { alignItems: 'flex-end' },
  messageBubble: { maxWidth: '80%', borderRadius: 12, padding: 12, gap: 4 },
  messageBubbleBot: { backgroundColor: 'rgba(82,255,148,0.1)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.2)' },
  messageBubbleUser: { backgroundColor: '#52FF94' },
  messageText: { fontSize: 13, color: '#FFFFFF', lineHeight: 18, fontWeight: '500' },
  messageTextUser: { color: '#020403' },
  messageTime: { fontSize: 9, color: 'rgba(255,255,255,0.4)' },
  quickQuestionsSection: { paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)' },
  quickQuestionsTitle: { fontSize: 12, fontWeight: '700', color: '#52FF94', marginBottom: 10 },
  quickQuestionsRow: { gap: 10 },
  quickQuestionButton: { flex: 1, borderRadius: 10, overflow: 'hidden' },
  quickQuestionGradient: { borderRadius: 10, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', paddingHorizontal: 10, paddingVertical: 12, alignItems: 'center', gap: 6 },
  quickQuestionIcon: { fontSize: 18 },
  quickQuestionText: { fontSize: 11, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
  inputSection: { paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(82,255,148,0.1)', gap: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  input: { flex: 1, backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: '#FFFFFF', fontSize: 13, maxHeight: 100 },
  sendButton: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#52FF94', justifyContent: 'center', alignItems: 'center' },
  sendButtonDisabled: { backgroundColor: 'rgba(82,255,148,0.3)' },
  disclaimer: { fontSize: 9, color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontWeight: '500' },
});
