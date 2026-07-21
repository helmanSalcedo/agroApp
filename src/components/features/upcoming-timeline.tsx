import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';
import { AgroSurface } from '@/components/agro-screen';
import { formatDate } from '@/utils/date-utils';

interface TimelineEvent {
  id: string;
  type: 'activity' | 'production' | 'expense' | 'alert';
  title: string;
  description?: string;
  date: Date;
  icon: string;
  color: string;
}

interface UpcomingTimelineProps {
  events: TimelineEvent[];
  maxItems?: number;
  style?: ViewStyle;
}

/**
 * Componente de Timeline que muestra próximos eventos en orden cronológico
 */
export function UpcomingTimeline({ events, maxItems = 5, style }: UpcomingTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  const displayedEvents = sortedEvents.slice(0, maxItems);

  if (displayedEvents.length === 0) {
    return (
      <View style={[AgroSurface.card, styles.container, style]}>
        <Text style={styles.emptyText}>No hay eventos próximos</Text>
      </View>
    );
  }

  return (
    <View style={[AgroSurface.card, styles.container, style]}>
      <Text style={styles.title}>Próximos Eventos</Text>

      <View style={styles.timeline}>
        {displayedEvents.map((event, index) => (
          <View key={event.id} style={styles.timelineItem}>
            {/* Línea vertical */}
            {index < displayedEvents.length - 1 && (
              <View style={[styles.timelineLine, { backgroundColor: event.color }]} />
            )}

            {/* Punto */}
            <View style={[styles.timelineDot, { backgroundColor: event.color }]}>
              <Text style={styles.icon}>{event.icon}</Text>
            </View>

            {/* Contenido */}
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              {event.description && (
                <Text style={styles.eventDescription} numberOfLines={1}>
                  {event.description}
                </Text>
              )}
              <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.three,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  emptyText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    fontStyle: 'italic',
  },

  timeline: {
    gap: Spacing.three,
  },

  timelineItem: {
    flexDirection: 'row',
    gap: Spacing.two,
  },

  timelineLine: {
    position: 'absolute',
    left: 20,
    top: 40,
    bottom: -Spacing.three,
    width: 2,
  },

  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
  },

  icon: {
    fontSize: 18,
  },

  eventContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },

  eventTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  eventDescription: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
  },

  eventDate: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
});
