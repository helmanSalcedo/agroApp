import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface ExpenseSeedProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de semilla - Insumos (Semillas, fertilizantes)
 */
export function ExpenseSeedIcon({ size = 64, color = '#8B5CF6' }: ExpenseSeedProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Semilla principal */}
        <Path
          d="M 32 14 C 26 20 22 28 22 36 C 22 46 26.5 54 32 54 C 37.5 54 42 46 42 36 C 42 28 38 20 32 14 Z"
          stroke={color}
          strokeWidth="2"
          fill={color}
          opacity="0.85"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Brote */}
        <Path
          d="M 32 14 Q 28 8 28 4"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Pequeña hoja */}
        <Path
          d="M 28 8 Q 24 6 22 8"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Textura interior */}
        <Circle cx="32" cy="35" r="3" fill="rgba(255,255,255,0.4)" opacity="0.6" />
      </Svg>
    </View>
  );
}

export default ExpenseSeedIcon;
