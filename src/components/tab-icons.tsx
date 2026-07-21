import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';

type IconProps = {
  size: number;
  color: string;
};

export function HomeIcon({ size, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12l9-9 9 9v8a2 2 0 0 1-2 2h-2v-4h-6v4H5a2 2 0 0 1-2-2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Rect x="9" y="15" width="6" height="4" fill={color} opacity="0.2" />
    </Svg>
  );
}

export function FarmIcon({ size, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L4 7v3h16V7l-8-5z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="8" y1="10" x2="8" y2="20" stroke={color} strokeWidth="1.5" />
      <Line x1="16" y1="10" x2="16" y2="20" stroke={color} strokeWidth="1.5" />
      <Path d="M4 20h16" stroke={color} strokeWidth="1.5" />
      <Circle cx="6" cy="15" r="1" fill={color} />
      <Circle cx="12" cy="15" r="1" fill={color} />
      <Circle cx="18" cy="15" r="1" fill={color} />
    </Svg>
  );
}

export function ActivityIcon({ size, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" />
      <Line x1="3" y1="9" x2="21" y2="9" stroke={color} strokeWidth="1.5" />
      <Line x1="7" y1="13" x2="17" y2="13" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <Line x1="7" y1="17" x2="17" y2="17" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <Circle cx="5" cy="5" r="0.5" fill={color} />
      <Circle cx="11" cy="5" r="0.5" fill={color} />
      <Circle cx="17" cy="5" r="0.5" fill={color} />
    </Svg>
  );
}

export function ExpenseIcon({ size, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <Path d="M12 7v10M9 10h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Path
        d="M9 14h4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </Svg>
  );
}

export function ProfileIcon({ size, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth="1.5" />
      <Path
        d="M5 20c0-4 3-6 7-6s7 2 7 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
