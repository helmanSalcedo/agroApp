import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polygon } from 'react-native-svg';

interface FarmHouseProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de granja/casa agrícola
 * Diseño minimalista con líneas limpias
 */
export function FarmHouseIcon({ size = 64, color = '#16A34A' }: FarmHouseProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Base/Terreno */}
        <Line
          x1="8"
          y1="52"
          x2="56"
          y2="52"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Cerca lateral izquierda */}
        <Line x1="12" y1="52" x2="12" y2="42" stroke={color} strokeWidth="1.5" />
        <Line x1="16" y1="52" x2="16" y2="42" stroke={color} strokeWidth="1.5" />

        {/* Casa principal */}
        {/* Paredes */}
        <Rect
          x="24"
          y="32"
          width="16"
          height="20"
          stroke={color}
          strokeWidth="2"
          fill="none"
          rx="1"
        />

        {/* Techo (triangular) */}
        <Polygon
          points="24,32 32,20 40,32"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />

        {/* Puerta */}
        <Rect
          x="30"
          y="42"
          width="4"
          height="10"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Ventana principal */}
        <Rect
          x="26"
          y="36"
          width="4"
          height="4"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <Line
          x1="28"
          y1="36"
          x2="28"
          y2="40"
          stroke={color}
          strokeWidth="1"
        />
        <Line
          x1="26"
          y1="38"
          x2="30"
          y2="38"
          stroke={color}
          strokeWidth="1"
        />

        {/* Ventana derecha */}
        <Rect
          x="34"
          y="36"
          width="4"
          height="4"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <Line
          x1="36"
          y1="36"
          x2="36"
          y2="40"
          stroke={color}
          strokeWidth="1"
        />
        <Line
          x1="34"
          y1="38"
          x2="38"
          y2="38"
          stroke={color}
          strokeWidth="1"
        />

        {/* Chimenea */}
        <Rect
          x="38"
          y="24"
          width="2"
          height="8"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <Circle cx="39" cy="23" r="1.5" fill={color} />

        {/* Árbol/Cultivo izquierdo */}
        <Line x1="14" y1="50" x2="14" y2="38" stroke={color} strokeWidth="2" />
        <Circle cx="14" cy="34" r="6" stroke={color} strokeWidth="2" fill="none" />

        {/* Árbol/Cultivo derecho */}
        <Line x1="50" y1="50" x2="50" y2="38" stroke={color} strokeWidth="2" />
        <Circle cx="50" cy="34" r="6" stroke={color} strokeWidth="2" fill="none" />

        {/* Terreno ondulado */}
        <Path
          d="M 10 52 Q 20 54 32 52 T 54 52"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </Svg>
    </View>
  );
}

export default FarmHouseIcon;
