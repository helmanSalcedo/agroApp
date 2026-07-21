import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

interface ExpenseLaborProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de trabajador - Jornales (Labor)
 */
export function ExpenseLaborIcon({ size = 64, color = '#F59E0B' }: ExpenseLaborProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Cabeza */}
        <Circle cx="32" cy="18" r="6" stroke={color} strokeWidth="2" fill="none" />

        {/* Cuerpo */}
        <Path
          d="M 32 24 L 32 38"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Brazos extendidos */}
        <Line x1="20" y1="30" x2="44" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />

        {/* Manos - puños */}
        <Circle cx="18" cy="30" r="2.5" fill={color} />
        <Circle cx="46" cy="30" r="2.5" fill={color} />

        {/* Piernas */}
        <Line x1="28" y1="38" x2="24" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="36" y1="38" x2="40" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" />

        {/* Herramienta - azadón */}
        <Path
          d="M 18 28 Q 12 22 10 18"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </Svg>
    </View>
  );
}

export default ExpenseLaborIcon;
