import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { BottomTabInset } from '@/constants/theme';

export default function HomeScreen() {
 return (
  <AgroScreen withBottomInset contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Buenos días 👋</Text>
            <Text style={styles.userName}>Sebastián</Text>
          </View>

          <Pressable style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </Pressable>
        </View>

        {/* HERO */}
        <LinearGradient
          colors={['#16A34A', '#22C55E']}
          style={styles.heroCard}
        >
          <Text style={styles.heroTitle}>
            Estado de tu finca hoy
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.heroItem}>
              <Text style={styles.heroNumber}>5</Text>
              <Text style={styles.heroLabel}>Lotes activos</Text>
            </View>

            <View style={styles.heroItem}>
              <Text style={styles.heroNumber}>87</Text>
              <Text style={styles.heroLabel}>Producción</Text>
            </View>

            <View style={styles.heroItem}>
              <Text style={styles.heroNumber}>92%</Text>
              <Text style={styles.heroLabel}>Salud</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ALERTAS */}
        <View style={styles.alertCard}>
          <Text style={styles.sectionTitle}>⚠️ Pendientes</Text>

          <View style={styles.alertItem}>
            <Text style={styles.alertDot}>•</Text>
            <Text style={styles.alertText}>
              Fertilización en Lote Alto
            </Text>
          </View>

          <View style={styles.alertItem}>
            <Text style={styles.alertDot}>•</Text>
            <Text style={styles.alertText}>
              Control de maleza mañana
            </Text>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>⚡ Acciones rápidas</Text>

        <View style={styles.quickGrid}>
          <QuickCard title="Gasto" />
          <QuickCard title="Actividad" />
          <QuickCard title="Producción" />
          <QuickCard title="Lote" />
        </View>

        {/* FINANZAS */}
          <View style={[AgroSurface.card, styles.sectionCard]}>
  <Text style={styles.sectionTitle}>💰 Finanzas</Text>

  <View style={styles.financeGrid}>
    <View style={styles.financeCard}>
      <Text style={styles.financeValue}>$3.800.000</Text>
      <Text style={styles.financeLabel}>Ingresos</Text>
    </View>

    <View style={styles.financeCard}>
      <Text style={styles.financeExpense}>$850.000</Text>
      <Text style={styles.financeLabel}>Gastos</Text>
    </View>
  </View>

  <View style={styles.financeFooter}>
    <Text style={styles.financeHintText}>+12% vs mes anterior</Text>
  </View>
</View>

        {/* PRODUCCIÓN */}
  <View style={[AgroSurface.card, styles.sectionCard]}>
          <Text style={styles.sectionTitle}>📊 Producción</Text>

          <View style={styles.barChartRow}>
            <Bar value={45} />
            <Bar value={70} />
            <Bar value={55} />
            <Bar value={88} />
            <Bar value={76} />
            <Bar value={95} />
          </View>
        </View>

        {/* ACTIVIDADES */}
        <View style={[AgroSurface.card, styles.sectionCard]}>
          <Text style={styles.sectionTitle}>📅 Próximas tareas</Text>

          <ActivityRow
            name="Fertilización"
            farm="Lote Alto"
            when="Mañana"
            onPress={() => {}}
          />

          <ActivityRow
            name="Poda"
            farm="Lote Bajo"
            when="3 días"
            onPress={() => {}}
          />
        </View>

        {/* LOTES */}
        <View style={[AgroSurface.card, styles.sectionCard]}>
          <Text style={styles.sectionTitle}>🌱 Estado de lotes</Text>

          <LotStatus name="Lote Alto" progress={92} />
          <LotStatus name="Lote Bajo" progress={78} />
          <LotStatus name="Lote Cafetal" progress={65} />
        </View>

  </AgroScreen>
);
}

type QuickCardProps = {
  title: string;
};

function QuickCard({ title }: QuickCardProps) {
  return (
    <Pressable style={[AgroSurface.card, styles.quickCard]}>
      <Text style={styles.quickCardText}>
        {title}
      </Text>
    </Pressable>
  );
}
function Bar({ value }: { value: number }) {
  return (
    <View
      style={[
        styles.bar,
        {
          height: `${value}%`,
        },
      ]}
    />
  );
}

type ActivityRowProps = {
  name: string;
  farm: string;
  when: string;
  onPress: () => void;
};

function ActivityRow({
  name,
  farm,
  when,
  onPress,
}: ActivityRowProps) {
  return (
    <Pressable
      style={styles.activityRow}
      onPress={onPress}
    >
      <View>
        <Text style={styles.activityName}>
          {name}
        </Text>

        <Text style={styles.activityFarm}>
          {farm}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: 'rgba(82,255,148,0.12)',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 999,
        }}
      >
        <Text style={styles.activityWhen}>
          {when}
        </Text>
      </View>
    </Pressable>
  );
}

type LotStatusProps = {
  name: string;
  progress: number;
};

function LotStatus({
  name,
  progress,
}: LotStatusProps) {
  return (
    <View
      style={{
        marginTop: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: '600',
          }}
        >
          {name}
        </Text>

        <Text
          style={{
            color: '#52FF94',
            fontWeight: '700',
          }}
        >
          {progress}%
        </Text>
      </View>

      <View
        style={{
          height: 10,
          borderRadius: 999,
          backgroundColor: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#52FF94',
            borderRadius: 999,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: BottomTabInset + 24,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  greeting: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },

  userName: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 2,
  },

  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  notificationText: {
    color: '#22C55E',
    fontWeight: '800',
  },

  /* HERO */
  heroCard: {
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
  },

  heroTitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginBottom: 16,
  },

  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  heroItem: {
    flex: 1,
    alignItems: 'center',
  },

  heroNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  heroLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },

  /* SECTIONS */
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
  },

  sectionCard: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  /* ALERTS */
  alertCard: {
    backgroundColor: 'rgba(34,197,94,0.06)',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.15)',
  },

  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  alertDot: {
    color: '#22C55E',
    marginRight: 8,
    fontSize: 18,
  },

  alertText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    flexShrink: 1,
  },

  /* QUICK ACTIONS */
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  quickCard: {
    width: '48%',
    height: 90,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  quickCardText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  /* FINANCE */
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 12,
  },

  financeBlock: {
    flex: 1,
    padding: 10,
  },

  financeValue: {
    color: '#22C55E',
    fontSize: 22,
    fontWeight: '800',
  },

  financeExpense: {
    color: '#FF6B6B',
    fontSize: 22,
    fontWeight: '800',
  },

  financeLabel: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    fontSize: 12,
  },

  financeHint: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },

  financeHintText: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '600',
  },

  /* CHART */
  barChartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    gap: 8,
    marginTop: 12,
  },

  bar: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#22C55E',
  },

  /* ACTIVITIES */
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },

  activityName: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  activityFarm: {
    color: 'rgba(255,255,255,0.55)',
    marginTop: 2,
  },

  activityWhen: {
    color: '#22C55E',
    fontWeight: '700',
  },

  linkText: {
    color: '#22C55E',
    fontWeight: '700',
  },
  financeGrid: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 12,
  marginTop: 12,
},

financeCard: {
  flex: 1,
  backgroundColor: 'rgba(255,255,255,0.03)',
  borderRadius: 16,
  padding: 14,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.06)',
},

financeFooter: {
  marginTop: 12,
  paddingTop: 10,
  borderTopWidth: 1,
  borderTopColor: 'rgba(255,255,255,0.06)',
},
});
