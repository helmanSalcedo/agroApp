import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth-context';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    setError('');

    const value = credential.trim();
    const normalizedPhone = value.replace(/\D/g, '');
    const isEmailCandidate = value.includes('@');
    const isEmail = EMAIL_REGEX.test(value);

    if (!value) {
      setError('Ingresa tu correo o numero de celular.');
      return;
    }

    if (isEmailCandidate && !isEmail) {
      setError('Ingresa un correo valido.');
      return;
    }

    if (!isEmailCandidate && normalizedPhone.length < 8) {
      setError('Ingresa un correo valido o un numero de celular valido.');
      return;
    }

    if (password.trim().length < 4) {
      setError('La contrasena debe tener al menos 4 caracteres.');
      return;
    }

    try {
      setLoading(true);
      await signIn({ phone: value, password });
      router.replace('/(tabs)');
    } catch {
      setError('No fue posible iniciar sesion. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

 return (
  <View style={styles.page}>
    <LinearGradient
      colors={['#020403', '#08120D', '#10261A']}
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
    />

    <View pointerEvents="none" style={styles.glowTop} />
    <View pointerEvents="none" style={styles.glowBottom} />

    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          automaticallyAdjustKeyboardInsets
          contentInsetAdjustmentBehavior="always"
          bounces={false}
          showsVerticalScrollIndicator={false}>

          <Animated.View
            entering={FadeInUp.duration(600)}
            style={styles.formCard}>

            {/* Logo */}
            <Image
                          source={require('../../assets/images/logos/logo_solo.png')}
                          resizeMode="contain"
                          style={styles.heroLogo}
                        />

            {/* Header */}
            <Text style={styles.title}>
            Agro
            <Text
              style={{
                color: '#52FF94',
                textShadowColor: '#52FF94',
                textShadowRadius: 15,
              }}>
              AI
            </Text>
          </Text>

            <Text style={styles.subtitle}>
              Gestiona tu producción agrícola desde cualquier lugar
            </Text>

            {/* Usuario */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Correo o celular
              </Text>

              <View
                style={styles.inputShell}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#52FF94"
                />

                <TextInput
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="default"
                  style={styles.inputText}
                  value={credential}
                  onChangeText={setCredential}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  showSoftInputOnFocus

                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Contraseña
              </Text>

              <View
                style={styles.inputShell}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#52FF94"
                />

                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  secureTextEntry={!showPassword}
                  style={styles.inputText}
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="go"
                  onSubmitEditing={onLogin}
                  showSoftInputOnFocus
                />

                <Pressable
                  onPress={() =>
                    setShowPassword(!showPassword)
                  }>
                  <Ionicons
                    name={
                      showPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={22}
                    color="#52FF94"
                  />
                </Pressable>
              </View>
            </View>

            {/* Recuperar */}
            <View
              style={{
                marginTop: 12,
                alignItems: 'flex-end',
              }}>
              <Pressable>
                <Text style={styles.forgotText}>
                  Recuperar acceso
                </Text>
              </Pressable>
            </View>

            {/* Error */}
            {error ? (
              <Text style={styles.errorText}>
                {error}
              </Text>
            ) : null}

            {/* Login */}
            <Pressable
              style={styles.primaryButton}
              onPress={onLogin}
              disabled={loading}>

              <LinearGradient
                colors={['#52FF94', '#1CFF7A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryGradient}>

                <Text
                  style={{
                    color: '#041109',
                    fontSize: 16,
                    fontWeight: '800',
                  }}>
                  {loading
                    ? 'Conectando...'
                    : 'Ingresar'}
                </Text>

              </LinearGradient>
            </Pressable>

            {/* Biométrico */}
            <Pressable style={styles.biometricButton}>
              <Ionicons
                name="finger-print"
                size={30}
                color="#52FF94"
              />
            </Pressable>

            {/* Registro */}
            <View style={styles.rowCenter}>
              <Text style={styles.helperText}>
                ¿No tienes cuenta?
              </Text>

              <Link href="./register" asChild>
                <Pressable>
                  <Text style={styles.linkText}>
                    {' '}Crear cuenta
                  </Text>
                </Pressable>
              </Link>
            </View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </View>
);
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#08120D',
  },

  safeArea: {
    flex: 1,
  },

  keyboardArea: {
    flex: 1,
  },
  titleAccent: {
  color: '#52FF94',
},

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  formCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',

    borderRadius: 32,
    padding: 28,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',

    shadowColor: '#52FF94',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 30,

    elevation: 12,
  },



  subtitle: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
    lineHeight: 24,
  },

  valueCard: {
    marginTop: 24,

    backgroundColor: 'rgba(255,255,255,0.05)',

    borderRadius: 24,

    padding: 18,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',

    gap: 14,
  },

  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  valueText: {
    color: '#E8F5EC',
    fontSize: 14,
    fontWeight: '500',
  },

  fieldBlock: {
    marginTop: 20,
  },

  fieldLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginBottom: 10,
    fontWeight: '600',
  },

  inputShell: {
    flexDirection: 'row',
    alignItems: 'center',

    minHeight: 60,

    borderRadius: 22,

    paddingHorizontal: 18,

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  inputShellFocused: {
    backgroundColor: 'rgba(255,255,255,0.09)',

    borderColor: '#52FF94',

    shadowColor: '#52FF94',
    shadowOpacity: 0.25,
    shadowRadius: 25,

    elevation: 10,
  },

  inputText: {
    flex: 1,
    marginLeft: 12,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  rowBetween: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 7,

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.15)',

    backgroundColor: 'rgba(255,255,255,0.05)',

    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxActive: {
    backgroundColor: '#52FF94',
    borderColor: '#52FF94',
  },

  checkboxCheck: {
    color: '#08120D',
    fontWeight: '900',
  },

  rememberText: {
    color: 'rgba(255,255,255,0.75)',
  },

  forgotText: {
    color: '#52FF94',
    fontWeight: '600',
  },

  errorText: {
    marginTop: 12,
    color: '#FF7070',
    fontWeight: '600',
  },

  primaryButton: {
    marginTop: 28,
    borderRadius: 22,
    overflow: 'hidden',
  },

  primaryGradient: {
    height: 62,

    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.4,
  },



  biometricText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  rowCenter: {
    marginTop: 26,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  helperText: {
    color: 'rgba(255,255,255,0.6)',
  },

  linkText: {
    color: '#52FF94',
    fontWeight: '700',
  },



title: {
  fontSize: 42,
  fontWeight: '700',
  color: '#FFFFFF',
  letterSpacing: -2,
},

biometricButton: {
  width: 72,
  height: 72,
  borderRadius: 36,
  alignSelf: 'center',
  marginTop: 18,

  backgroundColor: 'rgba(255,255,255,0.06)',

  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.08)',

  justifyContent: 'center',
  alignItems: 'center',
},
glowTop: {
  position: 'absolute',
  top: -150,
  left: -120,
  width: 350,
  height: 350,
  borderRadius: 200,
  backgroundColor: 'rgba(82,255,148,0.18)',
},

glowBottom: {
  position: 'absolute',
  bottom: -180,
  right: -120,
  width: 320,
  height: 320,
  borderRadius: 200,
  backgroundColor: 'rgba(82,255,148,0.10)',
},
heroLogo: {
  width: 180,
  height: 180,
  marginBottom: 10,
  opacity: 0.95,
},
});
