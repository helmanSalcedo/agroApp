import { StyleSheet, Text, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { Radius, Spacing } from '@/constants/theme';

const ITEMS = [
  { title: 'Actividad pendiente', text: 'Manana tienes fertilizacion programada en Lote Alto.', type: 'warn' },
  { title: 'Produccion registrada', text: 'Se actualizo el historial de cosecha de junio.', type: 'ok' },
  { title: 'Gasto registrado', text: 'Nuevo gasto por $120.000 en fertilizantes.', type: 'info' },
  { title: 'Cosecha proxima', text: 'Recuerda programar mano de obra para este viernes.', type: 'warn' },
];

export default function NotificationsScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Notificaciones" subtitle="Alertas y recordatorios de tu operacion." />

      {ITEMS.map((item) => (
        <View key={`${item.title}-${item.text}`} style={[AgroSurface.card, styles.card]}>
          <View style={[styles.badge, badgeStyle(item.type)]} />
          <View style={styles.body}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={[styles.levelPill, levelStyle(item.type)]}>{levelLabel(item.type)}</Text>
            </View>
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        </View>
      ))}
    </AgroScreen>
  );
}

function badgeStyle(type: string) {
  if (type === 'warn') {
    return { backgroundColor: '#FF9800' };
  }
  if (type === 'ok') {
    return { backgroundColor: '#4CAF50' };
  }
  return { backgroundColor: '#2E7D32' };
}

function levelStyle(type: string) {
  if (type === 'warn') {
    return { backgroundColor: 'rgba(245,158,11,0.18)', color: '#FBCF6B' };
  }
  if (type === 'ok') {
    return { backgroundColor: 'rgba(34,197,94,0.18)', color: '#7CF7A7' };
  }
  return { backgroundColor: 'rgba(59,130,246,0.18)', color: '#93C5FD' };
}

function levelLabel(type: string) {
  if (type === 'warn') return 'Prioridad alta';
  if (type === 'ok') return 'Completado';
  return 'Informativo';
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'flex-start',
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  body: {
    flex: 1,
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  levelPill: {
    borderRadius: Radius.full,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  cardText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    lineHeight: 18,
  },
});
