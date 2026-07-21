import { StyleSheet } from 'react-native';
import { Radius } from '@/constants/theme';

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
