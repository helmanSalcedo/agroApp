import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Line, Circle, Path } from 'react-native-svg';

interface FieldPlotProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de lote/parcela agrícola
 * Representación de una vista aérea
 */
export function FieldPlotIcon({ size = 64, color = '#16A34A' }: FieldPlotProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Marco del lote */}
        <Rect
          x="12"
          y="12"
          width="40"
          height="40"
          stroke={color}
          strokeWidth="2"
          fill="none"
          rx="2"
        />

        {/* Líneas de división (surcos) */}
        <Line x1="12" y1="24" x2="52" y2="24" stroke={color} strokeWidth="1" opacity="0.5" />
        <Line x1="12" y1="36" x2="52" y2="36" stroke={color} strokeWidth="1" opacity="0.5" />
        <Line x1="12" y1="48" x2="52" y2="48" stroke={color} strokeWidth="1" opacity="0.5" />

        <Line x1="24" y1="12" x2="24" y2="52" stroke={color} strokeWidth="1" opacity="0.5" />
        <Line x1="36" y1="12" x2="36" y2="52" stroke={color} strokeWidth="1" opacity="0.5" />

        {/* Plantas/Cultivos (círculos pequeños) */}
        {/* Fila 1 */}
        <Circle cx="18" cy="18" r="2" fill={color} opacity="0.7" />
        <Circle cx="30" cy="18" r="2" fill={color} opacity="0.7" />
        <Circle cx="42" cy="18" r="2" fill={color} opacity="0.7" />

        {/* Fila 2 */}
        <Circle cx="18" cy="30" r="2" fill={color} opacity="0.7" />
        <Circle cx="30" cy="30" r="2" fill={color} opacity="0.7" />
        <Circle cx="42" cy="30" r="2" fill={color} opacity="0.7" />

        {/* Fila 3 */}
        <Circle cx="18" cy="42" r="2" fill={color} opacity="0.7" />
        <Circle cx="30" cy="42" r="2" fill={color} opacity="0.7" />
        <Circle cx="42" cy="42" r="2" fill={color} opacity="0.7" />

        {/* Fila 4 */}
        <Circle cx="18" cy="50" r="1.5" fill={color} opacity="0.5" />
        <Circle cx="30" cy="50" r="1.5" fill={color} opacity="0.5" />
        <Circle cx="42" cy="50" r="1.5" fill={color} opacity="0.5" />

        {/* Marcador de área */}
        <Path
          d="M 14 14 L 50 14 L 50 50 L 14 50 Z"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="2,2"
          opacity="0.6"
        />
      </Svg>
    </View>
  );
}

export default FieldPlotIcon;
