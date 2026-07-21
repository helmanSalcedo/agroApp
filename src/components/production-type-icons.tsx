import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const CultivosIcon: React.FC<IconProps> = ({ size = 40, color = '#52FF94' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Soil */}
      <Rect x="6" y="24" width="36" height="16" rx="2" fill={color} opacity="0.2" />
      <Path d="M6 24L8 20L12 24L16 18L20 24L24 20L28 24L32 18L36 24L40 20L42 24" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Plant stems */}
      <Line x1="14" y1="24" x2="14" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="24" y1="24" x2="24" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="34" y1="24" x2="34" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Leaves */}
      <Path d="M12 14 Q10 12 12 10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M16 14 Q18 12 16 10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M22 12 Q20 10 22 8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M26 12 Q28 10 26 8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M32 16 Q30 14 32 12" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M36 16 Q38 14 36 12" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </Svg>
  </View>
);

export const GanadoIcon: React.FC<IconProps> = ({ size = 40, color = '#52FF94' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Body */}
      <Rect x="10" y="18" width="28" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />

      {/* Head */}
      <Circle cx="12" cy="14" r="4" stroke={color} strokeWidth="2" fill="none" />

      {/* Horns */}
      <Path d="M10 10 Q8 6 9 4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M14 10 Q16 6 15 4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Legs */}
      <Line x1="16" y1="36" x2="16" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="26" y1="36" x2="26" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="18" y1="36" x2="18" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="28" y1="36" x2="28" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Tail */}
      <Path d="M38 24 Q42 22 42 26" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </Svg>
  </View>
);

export const PescaIcon: React.FC<IconProps> = ({ size = 40, color = '#52FF94' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Water waves */}
      <Path d="M6 28 Q10 26 14 28 T22 28 T30 28 T38 28 T46 28" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <Path d="M6 34 Q10 32 14 34 T22 34 T30 34 T38 34 T46 34" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Fish body */}
      <Path d="M12 16 Q12 12 20 10 Q28 12 28 16 Q28 20 20 22 Q12 20 12 16" stroke={color} strokeWidth="2" fill="none" />

      {/* Fish tail */}
      <Path d="M28 14 L36 10 L36 22 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />

      {/* Fish eye */}
      <Circle cx="16" cy="14" r="1.5" fill={color} />

      {/* Fishing rod */}
      <Line x1="8" y1="4" x2="32" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Fishing line */}
      <Line x1="32" y1="14" x2="20" y2="22" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />

      {/* Hook */}
      <Path d="M20 22 Q18 24 20 26 Q22 24 20 22" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </Svg>
  </View>
);

export const ForestalIcon: React.FC<IconProps> = ({ size = 40, color = '#52FF94' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Left tree - trunk */}
      <Rect x="8" y="26" width="3" height="16" fill={color} opacity="0.8" />

      {/* Left tree - crown */}
      <Path d="M9.5 26 L4 18 L6 12 L9.5 16 L13 12 L15 18 Z" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3" />

      {/* Center tree - taller trunk */}
      <Rect x="21" y="20" width="3" height="22" fill={color} opacity="0.8" />

      {/* Center tree - crown */}
      <Path d="M22.5 20 L16 8 L18 2 L22.5 10 L27 2 L29 8 Z" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3" />

      {/* Right tree - trunk */}
      <Rect x="36" y="26" width="3" height="16" fill={color} opacity="0.8" />

      {/* Right tree - crown */}
      <Path d="M37.5 26 L32 18 L34 12 L37.5 16 L41 12 L43 18 Z" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3" />

      {/* Ground */}
      <Path d="M4 42 Q24 40 44 42" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    </Svg>
  </View>
);
