import { StyleSheet, Text, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';

const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export default function CalendarScreen() {
  const cells = Array.from({ length: 35 }, (_, index) => index + 1);

return (
  <AgroScreen>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Programación agrícola
          </Text>

          <Text style={styles.userName}>
            Junio 2026
          </Text>
        </View>
      </View>

      {/* Resumen */}
      <View style={[AgroSurface.cardStrong, styles.legendCard]}>
        <Text style={styles.sectionTitle}>
          Resumen del mes
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}
        >
          <View>
            <Text style={styles.heroNumber}>12</Text>
            <Text style={styles.heroLabel}>Actividades</Text>
          </View>

          <View>
            <Text style={styles.heroNumber}>3</Text>
            <Text style={styles.heroLabel}>Cosechas</Text>
          </View>

          <View>
            <Text style={styles.heroNumber}>2</Text>
            <Text style={styles.heroLabel}>Alertas</Text>
          </View>
        </View>
      </View>

      {/* Calendario */}
      <View style={[AgroSurface.card, styles.calendarCard]}>
        <View style={styles.daysRow}>
          {DAYS.map((day, index) => (
            <Text
              key={`${day}-${index}`}
              style={styles.dayLabel}
            >
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {cells.map((day) => (
            <View
              key={day}
              style={[
                styles.cell,
                day === 18 && styles.activeCell,
              ]}
            >
              <Text
                style={[
                  styles.cellText,
                  day === 18 &&
                    styles.activeCellText,
                ]}
              >
                {day <= 30 ? day : ''}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Próxima actividad */}
      <View style={[AgroSurface.card, styles.legendCard]}>
        <Text style={styles.sectionTitle}>
          Próxima actividad
        </Text>

        <View
          style={{
            marginTop: 12,
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            Fertilización
          </Text>

          <Text
            style={{
              color: 'rgba(255,255,255,0.6)',
              marginTop: 4,
            }}
          >
            Lote Alto
          </Text>

          <Text
            style={{
              color: '#22C55E',
              marginTop: 8,
              fontWeight: '600',
            }}
          >
            18 Junio • 08:00 AM
          </Text>
        </View>
      </View>

      {/* Leyenda */}
      <View style={[AgroSurface.card, styles.legendCard]}>
        <Text style={styles.sectionTitle}>
          Tipos de actividad
        </Text>

        <LegendDot
          label="Fertilización"
          color="#22C55E"
        />

        <LegendDot
          label="Poda"
          color="#F59E0B"
        />

        <LegendDot
          label="Limpieza"
          color="#3B82F6"
        />

        <LegendDot
          label="Cosecha"
          color="#EF4444"
        />
      </View>
  </AgroScreen>
);
}

function LegendDot({ label, color }: { label: string; color: string }) {
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 4,
  },

  legendCard: {
    padding: 20,
  },

  greeting: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },

  userName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },

  /* TITLES */

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  /* SUMMARY CARD */

  heroNumber: {
    color: '#22C55E',
    fontSize: 26,
    fontWeight: '800',
  },

  heroLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 4,
  },

  /* CALENDAR */

  calendarCard: {
    borderRadius: 24,
    padding: 20,
  },

  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  dayLabel: {
    width: '14%',
    textAlign: 'center',

    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    fontWeight: '700',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },

  cell: {
    width: '13%',
    aspectRatio: 1,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  activeCell: {
    backgroundColor: '#22C55E',
  },

  cellText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  activeCellText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* GENERIC CARDS */

  legendCard: {
    borderRadius: 24,
    padding: 20,
  },

  /* LEGEND */

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },

  legendText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
