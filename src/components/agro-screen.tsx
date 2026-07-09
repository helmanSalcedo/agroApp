import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Radius, Spacing } from '@/constants/theme';

type AgroScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  safeAreaProps?: ViewProps;
  withBottomInset?: boolean;
};

export function AgroScreen({
  children,
  scroll = true,
  contentContainerStyle,
  safeAreaProps,
  withBottomInset = false,
}: AgroScreenProps) {
  const content = scroll ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        withBottomInset && styles.contentWithTabInset,
        contentContainerStyle,
      ]}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentContainerStyle]}>{children}</View>
  );

  return (
    <View style={styles.page}>
      <LinearGradient
        colors={['#020403', '#08120D', '#10261A']}
        style={StyleSheet.absoluteFill}
      />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SafeAreaView style={styles.safeArea} {...safeAreaProps}>
        {content}
      </SafeAreaView>
    </View>
  );
}

export const AgroSurface = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden',
  },
  cardStrong: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.14)',
    backgroundColor: 'rgba(11,25,18,0.82)',
    overflow: 'hidden',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  label: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: '#FFFFFF',
  },
  primaryButton: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  primaryButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: '#041109',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: '#52FF94',
    fontSize: 15,
    fontWeight: '700',
  },
  chip: {
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.18)',
    backgroundColor: 'rgba(82,255,148,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  chipText: {
    color: '#52FF94',
    fontSize: 12,
    fontWeight: '700',
  },
});

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#020403',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.three,
    paddingBottom: 120,
  },
  contentWithTabInset: {
    paddingBottom: BottomTabInset + 48,
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(82,255,148,0.18)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -150,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(0,210,106,0.12)',
  },
});
