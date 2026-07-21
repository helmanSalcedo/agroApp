import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface WaterDropProps {
  size?: number;
  color?: string;
}

/**
 * Ícono elegante de gota de agua - Riego
 */
export function WaterDropIcon({ size = 64, color = '#3B82F6' }: WaterDropProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <Path
          d="M 32 10 C 32 10 22 24 22 34 C 22 43.6274 26.4772 52 32 52 C 37.5228 52 42 43.6274 42 34 C 42 24 32 10 32 10 Z"
          stroke={color}
          strokeWidth="2"
          fill={color}
          opacity="0.85"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <Path
          d="M 28 36 Q 30 40 32 42 Q 34 40 36 36"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export default WaterDropIcon;
