import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';

interface FertilizerProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de fertilizante - Bolsa de fertilizante
 */
export function FertilizerIcon({ size = 64, color = '#EAB308' }: FertilizerProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Bolsa */}
        <Path
          d="M 18 24 L 20 16 Q 20 14 22 14 L 42 14 Q 44 14 44 16 L 46 24 Q 46 26 44 26 L 20 26 Q 18 26 18 24 Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Cuerpo bolsa */}
        <Path
          d="M 20 26 Q 18 28 18 32 L 18 48 Q 18 50 20 50 L 44 50 Q 46 50 46 48 L 46 32 Q 46 28 44 26"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Cierre superior */}
        <Line x1="22" y1="16" x2="42" y2="16" stroke={color} strokeWidth="1.5" />

        {/* Textura de granulos */}
        <Circle cx="28" cy="36" r="2" fill={color} opacity="0.6" />
        <Circle cx="32" cy="32" r="1.5" fill={color} opacity="0.5" />
        <Circle cx="36" cy="38" r="1.5" fill={color} opacity="0.5" />
        <Circle cx="30" cy="42" r="2" fill={color} opacity="0.6" />
        <Circle cx="38" cy="42" r="1.5" fill={color} opacity="0.5" />
      </Svg>
    </View>
  );
}

export default FertilizerIcon;
