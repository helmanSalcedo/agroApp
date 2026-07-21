import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

type QuickActionCardProps = {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
  delay?: number;
};

export function QuickActionCard({
  title,
  icon,
  color,
  onPress,
  delay = 0,
}: QuickActionCardProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(500).delay(delay)}
      style={{ flex: 1 }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.card,
          { borderColor: color },
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon as any} size={28} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
