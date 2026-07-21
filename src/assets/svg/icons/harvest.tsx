import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';

interface HarvestProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de cosecha/producción
 * Representa cultivo completado y listo para recopilar
 */
export function HarvestIcon({ size = 64, color = '#F59E0B' }: HarvestProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Canasta/Cesta */}
        <Path
          d="M 14 28 L 18 48 Q 18 50 20 50 L 44 50 Q 46 50 46 48 L 50 28 Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Asa de la canasta */}
        <Path
          d="M 20 28 Q 32 16 44 28"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Línea decorativa en canasta */}
        <Line
          x1="18"
          y1="35"
          x2="46"
          y2="35"
          stroke={color}
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Frutos/Productos en canasta */}
        {/* Fruto 1 */}
        <Circle cx="28" cy="40" r="4" fill={color} opacity="0.8" />

        {/* Fruto 2 */}
        <Circle cx="36" cy="42" r="4" fill={color} opacity="0.8" />

        {/* Fruto 3 */}
        <Circle cx="32" cy="45" r="3.5" fill={color} opacity="0.7" />

        {/* Fruto 4 */}
        <Circle cx="24" cy="44" r="3.5" fill={color} opacity="0.7" />

        {/* Fruto 5 */}
        <Circle cx="40" cy="38" r="3" fill={color} opacity="0.6" />

        {/* Hoja decorativa */}
        <Path
          d="M 10 20 Q 8 12 14 10 Q 16 15 12 22"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />

        {/* Rayo de producción */}
        <Circle cx="14" cy="22" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
        <Line x1="14" y1="14" x2="14" y2="8" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <Line x1="20" y1="16" x2="24" y2="12" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <Line x1="22" y1="22" x2="28" y2="22" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

export default HarvestIcon;
