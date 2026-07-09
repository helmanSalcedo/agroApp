import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth-context';

export default function RegisterScreen() {
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<'name' | 'phone' | 'email' | 'password' | 'confirmPassword' | null>(null);

  const onRegister = async () => {
    setError('');

    if (name.trim().length < 3) {
      setError('Ingresa tu nombre completo.');
      return;
    }

    if (phone.trim().length < 8) {
      setError('Ingresa un celular valido.');
      return;
    }

    if (!email.includes('@')) {
      setError('Ingresa un correo valido.');
      return;
    }

    if (password.trim().length < 4) {
      setError('La contrasena debe tener al menos 4 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contrasenas no coinciden.');
      return;
    }

    try {
      setLoading(true);
      await signUp({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password,
      });
      router.replace('/(tabs)');
    } catch {
      setError('No fue posible crear la cuenta. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

 return (
  <View style={styles.page}>
    <LinearGradient
      colors={['#020403', '#08120D', '#10261A']}
      style={StyleSheet.absoluteFill}
    />

    <View style={styles.glowTop} />
    <View style={styles.glowBottom} />

    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={styles.heroContainer}
          >
            <Image
              source={require('../../assets/images/logos/logo_solo.png')}
              resizeMode="contain"
              style={styles.heroLogo}
            />

            <Text style={styles.brandSubtitle}>
              Crea tu cuenta y comienza a gestionar tu producción agrícola
            </Text>
          </Animated.View>

          {/* FORM */}
          <Animated.View
            entering={FadeInUp.delay(150).duration(500)}
            style={styles.formCard}
          >
            <Text style={styles.title}>
              Crear cuenta
            </Text>

            <Text style={styles.subtitle}>
              Completa la información para comenzar
            </Text>

            {/* NOMBRE */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Nombre completo
              </Text>

              <View
                style={[
                  styles.inputShell,
                  focusedField === 'name' &&
                    styles.inputShellFocused,
                ]}
              >
                <TextInput
                  placeholder="Nombre completo"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={styles.inputText}
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* CELULAR */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Celular
              </Text>

              <View
                style={[
                  styles.inputShell,
                  focusedField === 'phone' &&
                    styles.inputShellFocused,
                ]}
              >
                <TextInput
                  placeholder="Celular"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="phone-pad"
                  style={styles.inputText}
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* EMAIL */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Correo electrónico
              </Text>

              <View
                style={[
                  styles.inputShell,
                  focusedField === 'email' &&
                    styles.inputShellFocused,
                ]}
              >
                <TextInput
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={styles.inputText}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* PASSWORD */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Contraseña
              </Text>

              <View
                style={[
                  styles.inputShell,
                  focusedField === 'password' &&
                    styles.inputShellFocused,
                ]}
              >
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  secureTextEntry={!showPassword}
                  style={styles.inputText}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />

                <Pressable
                  onPress={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  <Text style={styles.passwordToggle}>
                    {showPassword ? 'Ocultar' : 'Ver'}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* CONFIRM PASSWORD */}
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Confirmar contraseña
              </Text>

              <View
                style={[
                  styles.inputShell,
                  focusedField === 'confirmPassword' &&
                    styles.inputShellFocused,
                ]}
              >
                <TextInput
                  placeholder="Confirmar contraseña"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  secureTextEntry={!showConfirmPassword}
                  style={styles.inputText}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() =>
                    setFocusedField('confirmPassword')
                  }
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="go"
                  onSubmitEditing={onRegister}
                />

                <Pressable
                  onPress={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  <Text style={styles.passwordToggle}>
                    {showConfirmPassword
                      ? 'Ocultar'
                      : 'Ver'}
                  </Text>
                </Pressable>
              </View>
            </View>

            {!!error && (
              <Text style={styles.errorText}>
                {error}
              </Text>
            )}

            <Pressable
              onPress={onRegister}
              disabled={loading}
              style={[
                styles.primaryButton,
                loading && styles.primaryDisabled,
              ]}
            >
              <LinearGradient
                colors={['#52FF94', '#00D26A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryGradient}
              >
                <Text style={styles.primaryText}>
                  {loading
                    ? 'Creando cuenta...'
                    : 'Crear cuenta'}
                </Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.rowCenter}>
              <Text style={styles.helperText}>
                ¿Ya tienes cuenta?
              </Text>

              <Link href="./login" asChild>
                <Pressable>
                  <Text style={styles.linkText}>
                    {' '}Ingresar
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
    backgroundColor: '#020403',
  },

  safeArea: {
    flex: 1,
  },

  keyboardArea: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 40,
    paddingBottom: 60,
  },

  glowTop: {
    position: 'absolute',
    top: -180,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 999,
    backgroundColor: 'rgba(82,255,148,0.12)',
  },

  glowBottom: {
    position: 'absolute',
    bottom: -180,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(0,210,106,0.10)',
  },

  heroContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logoContainer: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.20)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandTitle: {
    marginTop: 18,
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },

  brandAccent: {
    color: '#52FF94',
  },

  brandSubtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 25,
  },

  formCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 24,

    shadowColor: '#52FF94',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 25,
    elevation: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.60)',
  },

  fieldBlock: {
    marginBottom: 18,
  },

  fieldLabel: {
    marginBottom: 8,
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '600',
  },

  inputShell: {
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',
  },

  inputShellFocused: {
    borderColor: '#52FF94',

    shadowColor: '#52FF94',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },

  inputText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 14,
  },

  passwordToggle: {
    color: '#52FF94',
    fontSize: 13,
    fontWeight: '700',
  },

  errorText: {
    marginTop: 4,
    marginBottom: 12,
    color: '#FF7070',
    fontSize: 13,
    fontWeight: '600',
  },

  primaryButton: {
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },

  primaryGradient: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryDisabled: {
    opacity: 0.6,
  },

  primaryPressed: {
    transform: [{ scale: 0.98 }],
  },

  primaryText: {
    color: '#041109',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  rowCenter: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  helperText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 14,
  },

  linkText: {
    color: '#52FF94',
    fontSize: 14,
    fontWeight: '700',
  },
 heroLogo: {
  width: 180,
  height: 180,
  marginBottom: 10,
  opacity: 0.95,
},
});
