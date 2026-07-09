import { router } from 'expo-router';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const { completeOnboarding, isAuthenticated } = useAuth();

  const goToLogin = async () => {
    await completeOnboarding();
    router.push('/login');
  };

  const goToRegister = async () => {
    await completeOnboarding();
    router.push('/register');
  };

  const continueWithoutAccount = () => {
    router.push('/onboarding-1');
  };

  const skipWelcome = () => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
      return;
    }

    router.replace('/login');
  };

 return (
  <View style={styles.page}>
    <ImageBackground
      source={require('../../assets/images/login/hunterproducciones-farming-6959629.jpg')}
      resizeMode="cover"
      style={styles.bgImage}
      blurRadius={8}
    >
      <LinearGradient
        colors={[
          'rgba(2,4,3,0.75)',
          'rgba(2,4,3,0.92)',
          '#020403',
        ]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'left', 'right', 'bottom']}
      >
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={styles.centerBlock}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logos/logo_Transparente.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            Agro<Text style={styles.titleAccent}>AI</Text>
          </Text>

          <Text style={styles.subtitle}>
            Gestiona cultivos, costos y producción desde cualquier lugar.
          </Text>

          <View style={styles.featureRow}>
            <Text style={styles.featureItem}>
              🌱 Cultivos
            </Text>

            <Text style={styles.featureItem}>
              📊 Producción
            </Text>

            <Text style={styles.featureItem}>
              💰 Costos
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(150).duration(600)}
          style={styles.ctaBlock}
        >
          <Pressable
            style={[styles.buttonBase, styles.primaryButton]}
            onPress={goToLogin}
          >
            <Text style={styles.primaryText}>
              Iniciar sesión
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonBase, styles.secondaryButton]}
            onPress={goToRegister}
          >
            <Text style={styles.secondaryText}>
              Crear cuenta
            </Text>
          </Pressable>

          <Pressable
            style={styles.linkButton}
            onPress={continueWithoutAccount}
          >
            <Text style={styles.linkText}>
              Continuar
            </Text>
          </Pressable>

          <Pressable
            style={styles.linkButton}
            onPress={skipWelcome}
          >
            <Text style={styles.linkTextMuted}>
              Saltar
            </Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  </View>
);
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#020403',
  },

  bgImage: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },

  glowTop: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(82,255,148,0.18)',
  },

  glowBottom: {
    position: 'absolute',
    bottom: -150,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(0,210,106,0.12)',
  },

  centerBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 36,

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#52FF94',
    shadowOpacity: 0.25,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  logoImage: {
    width: 90,
    height: 90,
  },

  title: {
    marginTop: 28,

    fontSize: 52,
    fontWeight: '900',

    color: '#FFFFFF',

    letterSpacing: -2,
  },

  titleAccent: {
    color: '#52FF94',
  },

  subtitle: {
    marginTop: 16,

    maxWidth: 320,

    textAlign: 'center',

    fontSize: 17,

    lineHeight: 28,

    color: 'rgba(255,255,255,0.72)',
  },

  featureRow: {
    flexDirection: 'row',

    marginTop: 28,

    gap: 12,

    flexWrap: 'wrap',

    justifyContent: 'center',
  },

  featureItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,

    borderRadius: 30,

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',

    color: '#FFFFFF',

    fontSize: 13,

    fontWeight: '600',
  },

  ctaBlock: {
    width: '100%',
    gap: 14,
  },

  buttonBase: {
    width: '100%',
    height: 62,

    borderRadius: 22,

    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButton: {
    backgroundColor: '#52FF94',

    shadowColor: '#52FF94',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.05)',

    borderWidth: 1,

    borderColor: 'rgba(82,255,148,0.22)',
  },

  primaryText: {
    color: '#041109',

    fontSize: 16,

    fontWeight: '800',
  },

  secondaryText: {
    color: '#52FF94',

    fontSize: 16,

    fontWeight: '700',
  },

  linkButton: {
    marginTop: 4,

    alignItems: 'center',
  },

  linkText: {
    color: 'rgba(255,255,255,0.7)',

    fontSize: 15,

    fontWeight: '600',
  },
  linkTextMuted: {
    color: 'rgba(255,255,255,0.52)',
    fontSize: 14,
    fontWeight: '600',
  },
});
