/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#132718',
    background: '#F3F7F1',
    backgroundElement: '#E5F0E1',
    backgroundSelected: '#CFE5C8',
    textSecondary: '#58715D',
    card: '#FFFFFF',
    border: '#DAE8D5',
    primary: '#1E9E57',
    primaryDark: '#176A2E',
    accent: '#F9B132',
    success: '#3BAA54',
    warning: '#F08C2E',
    danger: '#E55B4F',
    chartBlue: '#4E86E8',
    chartMint: '#67C6A3',
    chartGold: '#E7B748',
  },
  dark: {
    text: '#132718',
    background: '#F3F7F1',
    backgroundElement: '#E5F0E1',
    backgroundSelected: '#CFE5C8',
    textSecondary: '#58715D',
    card: '#FFFFFF',
    border: '#DAE8D5',
    primary: '#1E9E57',
    primaryDark: '#176A2E',
    accent: '#F9B132',
    success: '#3BAA54',
    warning: '#F08C2E',
    danger: '#E55B4F',
    chartBlue: '#4E86E8',
    chartMint: '#67C6A3',
    chartGold: '#E7B748',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 999,
} as const;

export const Shadows = {
  soft: {
    shadowColor: '#15331D',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  card: {
    shadowColor: '#15331D',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
