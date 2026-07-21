import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: number;
}

interface CalendarWidgetProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  eventDots?: { [key: string]: number };
}

export function CalendarWidget({ onDateSelect, selectedDate, eventDots = {} }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const days: CalendarDay[] = [];

    // Días del mes anterior
    const prevMonthDays = getDaysInMonth(new Date(year, month - 1, 1));
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
        events: 0,
      });
    }

    // Días del mes actual
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        day: i,
        isCurrentMonth: true,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
        events: eventDots[dateKey] || 0,
      });
    }

    // Días del próximo mes
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        day: i,
        isCurrentMonth: false,
        isToday: false,
        events: 0,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (day: CalendarDay) => {
    onDateSelect?.(day.date);
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });

  const renderDay = ({ item }: { item: CalendarDay }) => {
    const isSelected =
      selectedDate &&
      item.date.getDate() === selectedDate.getDate() &&
      item.date.getMonth() === selectedDate.getMonth() &&
      item.date.getFullYear() === selectedDate.getFullYear();

    return (
      <Pressable
        style={[
          styles.dayCell,
          !item.isCurrentMonth && styles.dayOtherMonth,
          item.isToday && styles.dayToday,
          isSelected && styles.daySelected,
        ]}
        onPress={() => handleDateSelect(item)}
      >
        <Text
          style={[
            styles.dayNumber,
            !item.isCurrentMonth && styles.dayNumberOther,
            item.isToday && styles.dayNumberToday,
            isSelected && styles.dayNumberSelected,
          ]}
        >
          {item.day}
        </Text>

        {item.events > 0 && (
          <View style={styles.eventIndicator}>
            <Text style={styles.eventCount}>{item.events}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(82,255,148,0.1)', 'rgba(82,255,148,0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Pressable onPress={handlePrevMonth} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="#52FF94" />
        </Pressable>

        <Text style={styles.monthTitle}>{monthName.toUpperCase()}</Text>

        <Pressable onPress={handleNextMonth} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="#52FF94" />
        </Pressable>
      </LinearGradient>

      {/* Day Headers */}
      <View style={styles.weekDayHeaders}>
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
          <Text key={index} style={styles.weekDayHeader}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <FlatList
        data={calendarDays}
        renderItem={renderDay}
        keyExtractor={(item, index) => `${index}-${item.date.toISOString()}`}
        numColumns={7}
        scrollEnabled={false}
        columnWrapperStyle={styles.weekRow}
      />

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: '#52FF94' }]} />
          <Text style={styles.legendText}>Hoy</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: 'rgba(82,255,148,0.2)', borderWidth: 1, borderColor: '#52FF94' }]} />
          <Text style={styles.legendText}>Con eventos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.03)',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  navButton: {
    padding: 8,
  },

  monthTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
    letterSpacing: 0.5,
  },

  weekDayHeaders: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
  },

  weekDayHeader: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
  },

  weekRow: {
    gap: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },

  dayCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(82,255,148,0.03)',
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
  },

  dayOtherMonth: {
    opacity: 0.3,
  },

  dayToday: {
    backgroundColor: '#52FF94',
    borderColor: '#52FF94',
  },

  daySelected: {
    borderColor: '#52FF94',
    backgroundColor: 'rgba(82,255,148,0.2)',
  },

  dayNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  dayNumberOther: {
    color: 'rgba(255,255,255,0.4)',
  },

  dayNumberToday: {
    color: '#020403',
    fontWeight: '700',
  },

  dayNumberSelected: {
    color: '#52FF94',
    fontWeight: '700',
  },

  eventIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },

  eventCount: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  legend: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(82,255,148,0.1)',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },

  legendText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
});
