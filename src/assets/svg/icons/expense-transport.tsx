import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface ExpenseTransportProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de transporte - Transporte y logística
 */
export function ExpenseTransportIcon({ size = 64, color = '#06B6D4' }: ExpenseTransportProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Camión - cabina */}
        <Path
          d="M 16 32 L 20 20 Q 20 18 22 18 L 30 18 Q 32 18 32 20 L 32 32"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Camión - caja de carga */}
        <Rect
          x="32"
          y="20"
          width="20"
          height="12"
          stroke={color}
          strokeWidth="2"
          fill="none"
          rx="2"
        />

        {/* Camión - fondo */}
        <Path
          d="M 16 32 L 52 32 L 52 38 Q 52 40 50 40 L 18 40 Q 16 40 16 38"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Ruedas */}
        <Circle cx="22" cy="44" r="4" stroke={color} strokeWidth="2" fill="none" />
        <Circle cx="46" cy="44" r="4" stroke={color} strokeWidth="2" fill="none" />

        {/* Detalles de ruedas */}
        <Circle cx="22" cy="44" r="2" fill={color} opacity="0.6" />
        <Circle cx="46" cy="44" r="2" fill={color} opacity="0.6" />
      </Svg>
    </View>
  );
}

export default ExpenseTransportIcon;
