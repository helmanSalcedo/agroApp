import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Spacing } from '@/constants/theme';
import { SyncStatusBadge } from '@/components/sync-status-badge';
export { AgroSurface } from '@/components/agro-surface';

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
        <SyncStatusBadge status="connected" lastSyncTime="2m ago" pendingCount={0} />
        {content}
      </SafeAreaView>
    </View>
  );
}

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
