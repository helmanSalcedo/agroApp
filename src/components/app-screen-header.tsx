import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';

type AppScreenHeaderProps = {
  title: string;
  subtitle?: string;
  rightLabel?: string;
  onRightPress?: () => void;
};

export function AppScreenHeader({ title, subtitle, rightLabel, onRightPress }: AppScreenHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        {rightLabel && onRightPress ? (
          <Pressable style={styles.rightButton} onPress={onRightPress}>
            <Text style={styles.rightText}>{rightLabel}</Text>
          </Pressable>
        ) : (
          <View style={styles.rightPlaceholder} />
        )}
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.one,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  backText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -1,
    color: '#52FF94',
  },
  rightButton: {
    minWidth: 60,
    alignItems: 'flex-end',
  },
  rightText: {
    color: '#52FF94',
    fontSize: 13,
    fontWeight: '700',
  },
  rightPlaceholder: {
    width: 34,
    height: 34,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    lineHeight: 20,
  },
});
