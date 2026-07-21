import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { useAuth } from '@/context/auth-context';

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    setError('');

    const value = credential.trim();
    if (!value) {
      setError('Ingresa tu correo o teléfono.');
      return;
    }

    if (password.trim().length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    try {
      setLoading(true);
      await signIn({ phone: value, password });
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 200);
    } catch (err) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#020403', '#08120D', '#10261A']}
        style={StyleSheet.absoluteFill}
      />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {/* HEADER */}
              <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.headerSection}>
                <Text style={styles.logo}>
                  Agro<Text style={styles.logoAccent}>App</Text>
                </Text>
                <Text style={styles.subtitle}>La red más grande de profesionales agrícolas</Text>
                <Text style={styles.tagline}>Gestión integral con expertos verificados</Text>
              </Animated.View>

              {/* BENEFITS */}
              <Animated.View entering={FadeInUp.duration(600).delay(150)} style={styles.benefitsBar}>
                <View style={styles.benefitItem}>
                  <Ionicons name="people" size={20} color="#52FF94" />
                  <Text style={styles.benefitText}>1,200+ Expertos</Text>
                </View>
                <View style={styles.benefitDivider} />
                <View style={styles.benefitItem}>
                  <Ionicons name="shield-checkmark" size={20} color="#52FF94" />
                  <Text style={styles.benefitText}>Verificados</Text>
                </View>
                <View style={styles.benefitDivider} />
                <View style={styles.benefitItem}>
                  <Ionicons name="lock-closed" size={20} color="#52FF94" />
                  <Text style={styles.benefitText}>Seguro</Text>
                </View>
              </Animated.View>

              {/* FORM */}
              <Animated.View entering={FadeInUp.duration(600).delay(200)} style={styles.formCard}>
                <View style={styles.formHeader}>
                  <Text style={styles.formTitle}>Inicia sesión</Text>
                  <Text style={styles.formSubtitle}>Accede a tu cuenta</Text>
                </View>

                {/* Credential Input */}
                <View style={styles.fieldWrapper}>
                  <Text style={styles.fieldLabel}>Correo o Teléfono</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#52FF94" />
                    <TextInput
                      placeholder="3001234567 o tu@email.com"
                      placeholderTextColor="rgba(255,255,255,0.35)"
                      style={styles.input}
                      value={credential}
                      onChangeText={setCredential}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                      returnKeyType="next"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.fieldWrapper}>
                  <View style={styles.labelRow}>
                    <Text style={styles.fieldLabel}>Contraseña</Text>
                    <Link href="/welcome" asChild>
                      <Pressable disabled={loading}>
                        <Text style={styles.forgotLink}>¿Olvidaste?</Text>
                      </Pressable>
                    </Link>
                  </View>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#52FF94" />
                    <TextInput
                      placeholder="Mínimo 4 caracteres"
                      placeholderTextColor="rgba(255,255,255,0.35)"
                      style={styles.input}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      editable={!loading}
                      returnKeyType="go"
                      onSubmitEditing={onLogin}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                      <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="rgba(82,255,148,0.7)" />
                    </Pressable>
                  </View>
                </View>

                {/* Error */}
                {error ? (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle" size={16} color="#FF7070" />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}

                {/* Login Button */}
                <Pressable style={[styles.loginButton, loading && styles.loginButtonDisabled]} onPress={onLogin} disabled={loading}>
                  <LinearGradient colors={['#52FF94', '#22C55E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.buttonGradient}>
                    <Ionicons name="log-in-outline" size={20} color="#020403" />
                    <Text style={styles.loginButtonText}>{loading ? '⏳ Conectando...' : 'Ingresar'}</Text>
                  </LinearGradient>
                </Pressable>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>O</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Register Link */}
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                  <Link href="/register" asChild>
                    <Pressable disabled={loading}>
                      <Text style={styles.registerLink}>Regístrate aquí</Text>
                    </Pressable>
                  </Link>
                </View>
              </Animated.View>

              {/* INFO SECTION */}
              <Animated.View entering={FadeInUp.duration(600).delay(250)} style={styles.infoSection}>
                <Text style={styles.infoTitle}>¿Qué es AgroApp?</Text>

                <View style={styles.infoBox}>
                  <View style={styles.infoIconBox}>
                    <Ionicons name="grid-outline" size={22} color="#52FF94" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoBoxTitle}>Gestión Completa</Text>
                    <Text style={styles.infoBoxDesc}>Administra lotes, cultivos, gastos y producción en un solo lugar</Text>
                  </View>
                </View>

                <View style={styles.infoBox}>
                  <View style={styles.infoIconBox}>
                    <Ionicons name="people-outline" size={22} color="#06B6D4" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoBoxTitle}>Red de Expertos</Text>
                    <Text style={styles.infoBoxDesc}>Conecta con 1,200+ profesionales verificados cuando los necesites</Text>
                  </View>
                </View>

                <View style={styles.infoBox}>
                  <View style={styles.infoIconBox}>
                    <Ionicons name="bar-chart-outline" size={22} color="#F59E0B" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoBoxTitle}>Análisis Avanzado</Text>
                    <Text style={styles.infoBoxDesc}>KPIs, reportes y predicciones para mejor toma de decisiones</Text>
                  </View>
                </View>
              </Animated.View>

              {/* Back Link */}
              <Animated.View entering={FadeInUp.duration(600).delay(300)} style={styles.footerContainer}>
                <Link href="/welcome" asChild>
                  <Pressable disabled={loading} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={20} color="rgba(255,255,255,0.6)" />
                    <Text style={styles.backButtonText}>Volver a inicio</Text>
                  </Pressable>
                </Link>
              </Animated.View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020403',
  },

  glowTop: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(82,255,148,0.12)',
  },

  glowBottom: {
    position: 'absolute',
    bottom: -200,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(82,255,148,0.08)',
  },

  safeArea: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    minHeight: '100%',
  },

  content: {
    paddingVertical: 12,
  },

  /* HEADER */
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 12,
    textAlign: 'center',
  },

  logoAccent: {
    color: '#52FF94',
    textShadowColor: 'rgba(82,255,148,0.4)',
    textShadowRadius: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#52FF94',
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
    marginBottom: 8,
  },

  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 8,
  },

  /* BENEFITS BAR */
  benefitsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(82,255,148,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.15)',
    marginBottom: 24,
    gap: 8,
  },

  benefitItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },

  benefitText: {
    fontSize: 10,
    color: '#52FF94',
    fontWeight: '600',
    textAlign: 'center',
  },

  benefitDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(82,255,148,0.2)',
  },

  /* FORM */
  formCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.2)',
    backgroundColor: 'rgba(15,118,110,0.08)',
    padding: 24,
    marginBottom: 24,
  },

  formHeader: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,255,148,0.1)',
    paddingBottom: 16,
  },

  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.5,
  },

  formSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '500',
  },

  fieldWrapper: {
    marginBottom: 16,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.3,
  },

  forgotLink: {
    fontSize: 12,
    color: '#52FF94',
    fontWeight: '600',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(82,255,148,0.15)',
    backgroundColor: 'rgba(82,255,148,0.03)',
    paddingHorizontal: 14,
    height: 54,
    gap: 10,
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },

  errorText: {
    color: '#FF7070',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },

  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 8,
  },

  loginButtonDisabled: {
    opacity: 0.6,
  },

  buttonGradient: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  loginButtonText: {
    color: '#041109',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(82,255,148,0.1)',
  },

  dividerText: {
    color: 'rgba(255,255,255,0.45)',
    marginHorizontal: 12,
    fontSize: 13,
    fontWeight: '600',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },

  registerText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    fontWeight: '500',
  },

  registerLink: {
    color: '#52FF94',
    fontSize: 13,
    fontWeight: '700',
  },

  /* INFO SECTION */
  infoSection: {
    marginBottom: 20,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52FF94',
    marginBottom: 12,
  },

  infoBox: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(82,255,148,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(82,255,148,0.1)',
    marginBottom: 10,
    gap: 12,
    alignItems: 'flex-start',
  },

  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(82,255,148,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContent: {
    flex: 1,
  },

  infoBoxTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  infoBoxDesc: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
    lineHeight: 15,
  },

  footerContainer: {
    alignItems: 'center',
    marginTop: 16,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  backButtonText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
});
