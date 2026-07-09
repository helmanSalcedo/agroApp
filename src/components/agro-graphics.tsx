import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

type LandscapeHeroSvgProps = {
  height?: number;
};

export function LandscapeHeroSvg({ height = 156 }: LandscapeHeroSvgProps) {
  return (
    <View style={{ width: '100%', height }}>
      <Svg width="100%" height="100%" viewBox="0 0 360 156" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#D8F0D3" />
            <Stop offset="1" stopColor="#9BCB8E" />
          </LinearGradient>
          <LinearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#5FAE63" />
            <Stop offset="1" stopColor="#3E8E44" />
          </LinearGradient>
        </Defs>

        <Rect x="0" y="0" width="360" height="156" fill="url(#bg)" />
        <Circle cx="292" cy="36" r="18" fill="#FFD973" opacity="0.95" />

        <Path d="M0 108 C65 88, 126 121, 188 103 C260 82, 320 104, 360 92 L360 156 L0 156 Z" fill="#78BA74" />
        <Path d="M0 121 C52 96, 138 140, 210 116 C286 92, 328 126, 360 112 L360 156 L0 156 Z" fill="url(#hill)" />

        <Rect x="236" y="64" width="44" height="29" rx="3" fill="#FFFFFF" />
        <Path d="M230 66 L258 48 L286 66 Z" fill="#29763A" />
        <Rect x="252" y="76" width="9" height="17" rx="2" fill="#BFE3B5" />

        <Rect x="83" y="67" width="8" height="24" rx="2" fill="#6A4A34" />
        <Circle cx="87" cy="60" r="13" fill="#1D7C37" />
      </Svg>
    </View>
  );
}

type RingChartSvgProps = {
  size?: number;
  pct?: number;
};

export function RingChartSvg({ size = 62, pct = 85 }: RingChartSvgProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (1 - pct / 100);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#DCEAD8"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1F8A3D"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          fill="none"
        />
      </Svg>
    </View>
  );
}

type WeeklyBarsSvgProps = {
  height?: number;
};

export function WeeklyBarsSvg({ height = 108 }: WeeklyBarsSvgProps) {
  const bars = [44, 70, 58, 36, 78, 62, 86];

  return (
    <View style={{ width: '100%', height }}>
      <Svg width="100%" height="100%" viewBox="0 0 330 108" preserveAspectRatio="none">
        <Rect x="0" y="0" width="330" height="108" rx="14" fill="#F3FAF2" />

        {bars.map((value, index) => {
          const barWidth = 27;
          const gap = 17;
          const x = 22 + index * (barWidth + gap);
          const y = 92 - value;

          return (
            <Rect
              key={`bar-${index}`}
              x={x}
              y={y}
              width={barWidth}
              height={value}
              rx="6"
              fill={index === bars.length - 1 ? '#1F8A3D' : '#69B96F'}
            />
          );
        })}
      </Svg>
    </View>
  );
}

type SuccessSproutSvgProps = {
  size?: number;
};

export function SuccessSproutSvg({ size = 96 }: SuccessSproutSvgProps) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 96 96">
        <Defs>
          <LinearGradient id="sproutBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#ECF8E8" />
            <Stop offset="1" stopColor="#CFE9C6" />
          </LinearGradient>
        </Defs>

        <Circle cx="48" cy="48" r="47" fill="url(#sproutBg)" />
        <Path d="M47 66 C46 55, 49 48, 56 41" stroke="#2A7A36" strokeWidth="4" fill="none" strokeLinecap="round" />
        <Path d="M47 53 C39 52, 33 46, 30 38 C38 38, 46 43, 47 53 Z" fill="#52A85B" />
        <Path d="M51 47 C52 38, 58 32, 66 30 C66 39, 60 46, 51 47 Z" fill="#2F8F47" />
        <Rect x="43" y="64" width="10" height="8" rx="3" fill="#8A5F3D" />
      </Svg>
    </View>
  );
}

type LotTilePatternSvgProps = {
  height?: number;
};

export function LotTilePatternSvg({ height = 108 }: LotTilePatternSvgProps) {
  return (
    <View style={{ width: '100%', height }}>
      <Svg width="100%" height="100%" viewBox="0 0 330 108" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="lotBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#DDF0D6" />
            <Stop offset="1" stopColor="#A9CF9D" />
          </LinearGradient>
        </Defs>

        <Rect x="0" y="0" width="330" height="108" fill="url(#lotBg)" />
        <Path d="M0 86 C70 60, 124 98, 190 78 C253 58, 296 79, 330 66 L330 108 L0 108 Z" fill="#70B46F" />
        <Path d="M0 96 C65 72, 130 112, 204 92 C268 74, 301 92, 330 84 L330 108 L0 108 Z" fill="#4A994F" />
        <Circle cx="285" cy="24" r="11" fill="#FFE27B" opacity="0.95" />

        <Path d="M84 40 L132 20 L176 45 L130 67 Z" fill="#2F7C3E" opacity="0.35" />
        <Path d="M169 52 L208 32 L246 52 L206 72 Z" fill="#2F7C3E" opacity="0.28" />
      </Svg>
    </View>
  );
}

type AuthShieldSvgProps = {
  size?: number;
};

export function AuthShieldSvg({ size = 68 }: AuthShieldSvgProps) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 68 68">
        <Defs>
          <LinearGradient id="shieldBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#ECF8E8" />
            <Stop offset="1" stopColor="#CDE6C4" />
          </LinearGradient>
        </Defs>
        <Circle cx="34" cy="34" r="33" fill="url(#shieldBg)" />
        <Path d="M34 13 L49 19 V32 C49 41 43 48 34 53 C25 48 19 41 19 32 V19 Z" fill="#1F8A3D" />
        <Path d="M28 33 L32 37 L40 29" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

type AuthUserPlusSvgProps = {
  size?: number;
};

export function AuthUserPlusSvg({ size = 68 }: AuthUserPlusSvgProps) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 68 68">
        <Defs>
          <LinearGradient id="userBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#EDF8EA" />
            <Stop offset="1" stopColor="#D3EBCB" />
          </LinearGradient>
        </Defs>
        <Circle cx="34" cy="34" r="33" fill="url(#userBg)" />
        <Circle cx="30" cy="26" r="8" fill="#1F8A3D" />
        <Path d="M16 47 C18 39, 24 35, 31 35 C38 35, 44 39, 46 47" stroke="#1F8A3D" strokeWidth="6" fill="none" strokeLinecap="round" />
        <Rect x="45" y="20" width="14" height="14" rx="3" fill="#2FA44B" />
        <Path d="M52 23 V31" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <Path d="M48 27 H56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

type AuthWaveSvgProps = {
  height?: number;
};

export function AuthWaveSvg({ height = 90 }: AuthWaveSvgProps) {
  return (
    <View style={{ width: '100%', height }}>
      <Svg width="100%" height="100%" viewBox="0 0 330 90" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="waveBg" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#EAF6E6" />
            <Stop offset="1" stopColor="#D2EBC9" />
          </LinearGradient>
        </Defs>

        <Rect x="0" y="0" width="330" height="90" rx="18" fill="url(#waveBg)" />
        <Path d="M0 60 C45 48, 88 78, 133 62 C177 46, 223 69, 266 54 C294 45, 311 47, 330 40 L330 90 L0 90 Z" fill="#6AB56A" opacity="0.45" />
        <Path d="M0 70 C55 52, 110 89, 167 67 C214 48, 275 72, 330 56 L330 90 L0 90 Z" fill="#2F8D45" opacity="0.42" />
        <Circle cx="289" cy="22" r="10" fill="#FFE27B" opacity="0.9" />
      </Svg>
    </View>
  );
}

type AuthMountainHeroSvgProps = {
  height?: number;
};

export function AuthMountainHeroSvg({ height = 290 }: AuthMountainHeroSvgProps) {
  return (
    <View style={{ width: '100%', height }}>
      <Svg width="100%" height="100%" viewBox="0 0 390 290" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#163B2A" />
            <Stop offset="1" stopColor="#284E37" />
          </LinearGradient>
          <LinearGradient id="m1" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#1D5A36" />
            <Stop offset="1" stopColor="#123A24" />
          </LinearGradient>
          <LinearGradient id="m2" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#2A6B41" />
            <Stop offset="1" stopColor="#17492D" />
          </LinearGradient>
        </Defs>

        <Rect x="0" y="0" width="390" height="290" fill="url(#sky)" />

        <Path d="M0 162 C58 128, 121 196, 181 151 C226 118, 281 146, 336 118 C357 108, 372 111, 390 104 L390 290 L0 290 Z" fill="url(#m1)" />
        <Path d="M0 186 C54 146, 104 220, 170 176 C227 138, 282 198, 344 166 C360 158, 376 160, 390 152 L390 290 L0 290 Z" fill="url(#m2)" opacity="0.95" />
        <Path d="M0 210 C64 178, 133 238, 204 196 C255 166, 325 206, 390 182 L390 290 L0 290 Z" fill="#356D48" opacity="0.9" />

        <Path d="M26 248 C68 218, 118 264, 164 236 C203 212, 246 246, 291 224 C320 209, 356 220, 390 206 L390 290 L26 290 Z" fill="#4D845A" opacity="0.85" />

        <Rect x="0" y="0" width="390" height="290" fill="#000000" opacity="0.22" />
      </Svg>
    </View>
  );
}

type AuthCoffeeFarmHeroSvgProps = {
  height?: number;
};

export function AuthCoffeeFarmHeroSvg({ height = 290 }: AuthCoffeeFarmHeroSvgProps) {
  return (
    <View style={{ width: '100%', height }}>
      <Svg width="100%" height="100%" viewBox="0 0 390 290" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="coffeeSky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#3D6A4B" />
            <Stop offset="1" stopColor="#274A35" />
          </LinearGradient>
          <LinearGradient id="coffeeHill1" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#2D6A45" />
            <Stop offset="1" stopColor="#1A452E" />
          </LinearGradient>
          <LinearGradient id="coffeeHill2" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#4D835A" />
            <Stop offset="1" stopColor="#28563B" />
          </LinearGradient>
        </Defs>

        <Rect x="0" y="0" width="390" height="290" fill="url(#coffeeSky)" />

        <Path d="M0 155 C61 115, 123 192, 181 146 C237 103, 282 142, 338 115 C358 106, 373 109, 390 98 L390 290 L0 290 Z" fill="url(#coffeeHill1)" />
        <Path d="M0 183 C53 145, 111 218, 172 173 C230 132, 287 194, 349 162 C364 154, 377 154, 390 145 L390 290 L0 290 Z" fill="url(#coffeeHill2)" opacity="0.95" />
        <Path d="M0 208 C62 173, 138 236, 208 193 C261 162, 327 206, 390 181 L390 290 L0 290 Z" fill="#5B8E63" opacity="0.86" />

        <Path d="M24 250 C57 227, 87 258, 122 237 C149 220, 183 248, 216 226 C243 209, 277 238, 313 218 C340 203, 367 214, 390 203 L390 290 L24 290 Z" fill="#7BA077" opacity="0.8" />

        <Path d="M48 203 C58 182, 73 182, 82 203" stroke="#204832" strokeWidth="2" fill="none" opacity="0.6" />
        <Path d="M87 214 C97 193, 112 193, 121 214" stroke="#204832" strokeWidth="2" fill="none" opacity="0.6" />
        <Path d="M328 208 C338 187, 353 187, 362 208" stroke="#204832" strokeWidth="2" fill="none" opacity="0.6" />

        <Rect x="0" y="0" width="390" height="290" fill="#000000" opacity="0.18" />
      </Svg>
    </View>
  );
}
