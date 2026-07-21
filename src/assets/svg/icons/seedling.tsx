import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Line, Ellipse } from 'react-native-svg';

interface SeedlingProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de semilla/brote
 * Representa crecimiento y siembra
 */
export function SeedlingIcon({ size = 64, color = '#16A34A' }: SeedlingProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Tierra/Suelo */}
        <Ellipse
          cx="32"
          cy="50"
          rx="20"
          ry="8"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />

        {/* Línea de tierra */}
        <Line
          x1="12"
          y1="50"
          x2="52"
          y2="50"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Raíces */}
        <Path
          d="M 32 50 Q 26 56 22 60"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <Path
          d="M 32 50 Q 38 56 42 60"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Tallo principal */}
        <Path
          d="M 32 50 Q 30 42 32 30"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Rama izquierda */}
        <Path
          d="M 32 38 Q 26 36 20 32"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Rama derecha */}
        <Path
          d="M 32 38 Q 38 36 44 32"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Hoja superior izquierda */}
        <Ellipse
          cx="18"
          cy="28"
          rx="6"
          ry="4"
          fill={color}
          opacity="0.8"
          transform="rotate(-35 18 28)"
        />

        {/* Hoja superior derecha */}
        <Ellipse
          cx="46"
          cy="28"
          rx="6"
          ry="4"
          fill={color}
          opacity="0.8"
          transform="rotate(35 46 28)"
        />

        {/* Hoja media izquierda */}
        <Ellipse
          cx="24"
          cy="38"
          rx="5"
          ry="3.5"
          fill={color}
          opacity="0.7"
          transform="rotate(-30 24 38)"
        />

        {/* Hoja media derecha */}
        <Ellipse
          cx="40"
          cy="38"
          rx="5"
          ry="3.5"
          fill={color}
          opacity="0.7"
          transform="rotate(30 40 38)"
        />

        {/* Hoja superior centro */}
        <Path
          d="M 32 26 Q 35 18 32 12"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Punto de crecimiento */}
        <Circle cx="32" cy="12" r="2.5" fill={color} />
      </Svg>
    </View>
  );
}

export default SeedlingIcon;
