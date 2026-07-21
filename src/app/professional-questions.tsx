import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const MOCK_QUESTIONS = [
  {
    id: '1',
    question: '¿Cuál es el mejor momento para sembrar maíz?',
    clientName: 'Juan García',
    clientAvatar: 'JG',
    date: '2026-07-18',
    status: 'sin_responder',
    priority: 'normal',
  },
  {
    id: '2',
    question: '¿Qué fertilizante recomiendan para el café?',
    clientName: 'María López',
    clientAvatar: 'ML',
    date: '2026-07-17',
    status: 'respondida',
    priority: 'normal',
  },
  {
    id: '3',
    question: 'Mi cultivo está amarillando, ¿qué puedo hacer?',
    clientName: 'Carlos Ruiz',
    clientAvatar: 'CR',
    date: '2026-07-15',
    status: 'sin_responder',
    priority: 'urgente',
  },
  {
    id: '4',
    question: '¿Cómo puedo mejorar el rendimiento de mi finca?',
    clientName: 'Ana Martínez',
    clientAvatar: 'AM',
    date: '2026-07-14',
    status: 'respondida',
    priority: 'normal',
  },
  {
    id: '5',
    question: '¿Cuáles son las plagas más comunes en la zona?',
    clientName: 'Roberto Mendez',
    clientAvatar: 'RM',
    date: '2026-07-13',
    status: 'sin_responder',
    priority: 'normal',
  },
];

type FilterType = 'todas' | 'sin_responder' | 'respondidas' | 'urgentes';

export default function ProfessionalQuestionsScreen() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<FilterType>('todas');

  const filteredQuestions = MOCK_QUESTIONS.filter(q => {
    if (filter === 'todas') return true;
    if (filter === 'sin_responder') return q.status === 'sin_responder';
    if (filter === 'respondidas') return q.status === 'respondida';
    if (filter === 'urgentes') return q.priority === 'urgente';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sin_responder':
        return '#EF4444';
      case 'respondida':
        return '#22C55E';
      default:
        return '#3B82F6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sin_responder':
        return 'alert-circle';
      case 'respondida':
        return 'checkmark-circle';
      default:
        return 'help-circle';
    }
  };

  const renderQuestionCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInDown.duration(400).delay(index * 50)}
      style={{ marginBottom: 12 }}
    >
      <Pressable onPress={() => router.push(`/professional-question-detail?id=${item.id}`)}>
        <LinearGradient
          colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.questionCard}
        >
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.clientAvatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.clientName}>{item.clientName}</Text>
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString('es-CO', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.priorityBadge,
                {
                  backgroundColor:
                    item.priority === 'urgente' ? 'rgba(239,68,68,0.15)' : 'rgba(82,255,148,0.15)',
                },
              ]}
            >
              <Ionicons
                name={item.priority === 'urgente' ? 'alert' : 'info'}
                size={12}
                color={item.priority === 'urgente' ? '#EF4444' : '#52FF94'}
              />
            </View>
          </View>

          {/* Question */}
          <Text style={styles.questionText} numberOfLines={2}>
            {item.question}
          </Text>

          {/* Footer */}
          <View style={styles.cardFooter}>
            <View style={styles.statusBadge}>
              <Ionicons
                name={getStatusIcon(item.status) as any}
                size={14}
                color={getStatusColor(item.status)}
              />
              <Text
                style={[styles.statusText, { color: getStatusColor(item.status) }]}
              >
                {item.status === 'sin_responder'
                  ? 'Sin responder'
                  : item.status === 'respondida'
                    ? 'Respondida'
                    : item.status}
              </Text>
            </View>
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
            <Text style={styles.headerTitle}>Centro de Consultas</Text>
            <Text style={styles.headerSubtitle}>Responde a tus clientes</Text>
          </View>
          <View style={styles.badgeCount}>
            <Text style={styles.badgeText}>
              {MOCK_QUESTIONS.filter(q => q.status === 'sin_responder').length}
            </Text>
          </View>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* STATS */}
          <Animated.View entering={FadeInDown.duration(400).delay(50)}>
            <View style={styles.statsGrid}>
              <LinearGradient
                colors={['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <Ionicons name="chatbox-ellipses" size={20} color="#52FF94" />
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Consultas</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(239,68,68,0.08)', 'rgba(239,68,68,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <Text style={styles.statValue}>1</Text>
                <Text style={styles.statLabel}>Urgentes</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(34,197,94,0.08)', 'rgba(34,197,94,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Respondidas</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statCard}
              >
                <Ionicons name="timer" size={20} color="#3B82F6" />
                <Text style={styles.statValue}>4h</Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* FILTERS */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <View style={styles.filterContainer}>
              {(['todas', 'sin_responder', 'respondidas', 'urgentes'] as const).map((f, idx) => (
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
                    {f === 'todas'
                      ? 'Todas'
                      : f === 'sin_responder'
                        ? 'Sin responder'
                        : f === 'respondidas'
                          ? 'Respondidas'
                          : 'Urgentes'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* QUESTIONS LIST */}
          <Animated.View entering={FadeInDown.duration(400).delay(150)}>
            <View style={styles.listSection}>
              <FlatList
                data={filteredQuestions}
                renderItem={renderQuestionCard}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
              {filteredQuestions.length === 0 && (
                <View style={styles.emptyState}>
                  <Ionicons name="checkmark-done-circle" size={48} color="#52FF94" />
                  <Text style={styles.emptyText}>¡Sin consultas!</Text>
                  <Text style={styles.emptySubtext}>
                    Has respondido todas las consultas de esta categoría
                  </Text>
                </View>
              )}
            </View>
          </Animated.View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

import React from 'react';

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
  badgeCount: {
    backgroundColor: '#EF4444',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '22%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statValue: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },

  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(82,255,148,0.05)',
  },
  filterButtonActive: {
    backgroundColor: '#52FF94',
    borderColor: '#52FF94',
  },
  filterText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  filterTextActive: { color: '#020403', fontWeight: '700' },

  listSection: { marginHorizontal: 16, marginVertical: 12 },

  questionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    padding: 12,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatarSection: { flexDirection: 'row', gap: 10, flex: 1 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  clientName: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  date: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  priorityBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  questionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 18,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(82,255,148,0.1)',
  },
  statusBadge: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },
  statusText: { fontSize: 10, fontWeight: '600' },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginTop: 12 },
  emptySubtext: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
});
