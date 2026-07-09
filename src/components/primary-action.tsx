import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { AgroSurface } from '@/components/agro-screen';

type PrimaryActionProps = PressableProps & {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function PrimaryAction({ label, style, textStyle, ...props }: PrimaryActionProps) {
  return (
    <Pressable style={[AgroSurface.primaryButton, style]} {...props}>
      <LinearGradient
        colors={['#52FF94', '#1CFF7A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={AgroSurface.primaryButtonInner}>
        <Text style={[AgroSurface.primaryButtonText, textStyle]}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
