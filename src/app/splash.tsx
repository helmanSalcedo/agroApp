import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/auth-context';

export default function SplashScreen() {
  const { isReady } = useAuth();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!isReady || hasNavigated.current) {
      return;
    }

    const timer = setTimeout(() => {
      hasNavigated.current = true;
      router.replace('/welcome');
    }, 900);

    return () => clearTimeout(timer);
  }, [isReady]);

  return (
    <LinearGradient colors={['#0D7032', '#1C8E41', '#47AE58']} style={styles.page}>
      <View style={styles.bgBubbleA} />
      <View style={styles.bgBubbleB} />

      <View style={styles.logoWrap}>
        <Image
          source={require('../../assets/images/logos/logo_Transparente.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.subtitle}>Gestion inteligente para tus cultivos</Text>
      <ActivityIndicator color="#FFFFFF" style={styles.loader} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  bgBubbleA: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -50,
    right: -80,
  },
  bgBubbleB: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.09)',
    bottom: -90,
    left: -70,
  },
  logoWrap: {
    width: 252,
    height: 252,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoImage: {
    width: 220,
    height: 220,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.94)',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.2,
    marginTop: 2,
  },
  loader: {
    marginTop: 8,
  },
});
