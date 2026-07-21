import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

interface BugShieldProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de escudo contra plagas - Control de plagas
 */
export function BugShieldIcon({ size = 64, color = '#EF4444' }: BugShieldProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Escudo */}
        <Path
          d="M 32 12 L 20 18 L 20 32 Q 20 46 32 52 Q 44 46 44 32 L 44 18 Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Cruz de protección */}
        <Line x1="32" y1="24" x2="32" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="24" y1="32" x2="40" y2="32" stroke={color} strokeWidth="2" strokeLinecap="round" />

        {/* Bicho pequeño (amenaza) */}
        <Circle cx="36" cy="20" r="2" fill={color} opacity="0.4" />
        <Line x1="34" y1="20" x2="32" y2="19" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <Line x1="38" y1="20" x2="40" y2="19" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

export default BugShieldIcon;
