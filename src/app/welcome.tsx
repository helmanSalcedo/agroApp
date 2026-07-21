import { router } from 'expo-router';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '@/context/auth-context';

export default function WelcomeScreen() {
  const { completeOnboarding } = useAuth();

  const goToLogin = async () => {
    await completeOnboarding();
    router.push('/login');
  };

  const goToRegister = async () => {
    await completeOnboarding();
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO SECTION */}
          <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.heroSection}>
            <Text style={styles.mainTitle}>
              Agro<Text style={styles.titleAccent}>App</Text>
            </Text>
            <Text style={styles.heroSubtitle}>La red más grande de profesionales agrícolas</Text>
            <Text style={styles.heroDescription}>
              Gestión completa de tu finca + Conexión con 1,200+ expertos verificados
            </Text>
          </Animated.View>

          {/* MAIN FEATURES - 3 COLUMNS */}
          <Animated.View entering={FadeInDown.duration(600).delay(150)} style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Lo que puedes hacer</Text>

            <View style={styles.featureGrid}>
              <View style={styles.featureBox}>
                <LinearGradient
                  colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.05)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureBoxGradient}
                >
                  <View style={styles.featureIcon}>
                    <Ionicons name="grid-outline" size={32} color="#52FF94" />
                  </View>
                  <Text style={styles.featureName}>Gestiona tu Finca</Text>
                  <Text style={styles.featureDesc}>Lotes, cultivos, inventario y cosechas</Text>
                </LinearGradient>
              </View>

              <View style={styles.featureBox}>
                <LinearGradient
                  colors={['rgba(59,182,246,0.15)', 'rgba(59,182,246,0.05)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureBoxGradient}
                >
                  <View style={styles.featureIcon}>
                    <Ionicons name="stats-chart-outline" size={32} color="#3B82F6" />
                  </View>
                  <Text style={styles.featureName}>Analiza Datos</Text>
                  <Text style={styles.featureDesc}>Rentabilidad, costos y producción</Text>
                </LinearGradient>
              </View>

              <View style={styles.featureBox}>
                <LinearGradient
                  colors={['rgba(236,72,153,0.15)', 'rgba(236,72,153,0.05)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureBoxGradient}
                >
                  <View style={styles.featureIcon}>
                    <Ionicons name="people-outline" size={32} color="#EC4899" />
                  </View>
                  <Text style={styles.featureName}>Conecta Expertos</Text>
                  <Text style={styles.featureDesc}>Agrónomos, veterinarios, abogados</Text>
                </LinearGradient>
              </View>
            </View>
          </Animated.View>

          {/* MODULES AVAILABLE */}
          <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.modulesSection}>
            <Text style={styles.sectionTitle}>Módulos Disponibles</Text>

            <View style={styles.modulesList}>
              <ModuleItem icon="leaf-outline" title="🌱 Cultivos" desc="Siembra, riego, fertilización" color="#52FF94" />
              <ModuleItem icon="git-compare" title="🐄 Ganadería" desc="Ganado, veterinaria, reproducción" color="#EC4899" />
              <ModuleItem icon="water" title="🐟 Acuacultura" desc="Estanques, peces, agua" color="#06B6D4" />
              <ModuleItem icon="wallet-outline" title="💰 Finanzas" desc="Costos, gastos, rentabilidad" color="#FF9F43" />
              <ModuleItem icon="people-outline" title="👥 Red Pro" desc="1,200+ profesionales verificados" color="#52FF94" />
              <ModuleItem icon="storefront-outline" title="🛍️ Marketplace" desc="Compra insumos, vende productos" color="#EC4899" />
            </View>
          </Animated.View>

          {/* STATS SECTION */}
          <Animated.View entering={FadeInDown.duration(600).delay(250)} style={styles.statsSection}>
            <LinearGradient
              colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statsGradient}
            >
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>1,200+</Text>
                <Text style={styles.statLabel}>Profesionales Verificados</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>50K+</Text>
                <Text style={styles.statLabel}>Agricultores Activos</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>4.8★</Text>
                <Text style={styles.statLabel}>Rating Promedio</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* WHY CHOOSE SECTION */}
          <Animated.View entering={FadeInDown.duration(600).delay(300)} style={styles.whySection}>
            <Text style={styles.sectionTitle}>¿Por qué elegir AgroApp?</Text>

            <View style={styles.benefitsList}>
              <BenefitItem icon="checkmark-circle" title="Gestión Integral" desc="Todo lo que necesitas en un solo lugar" />
              <BenefitItem icon="shield-checkmark" title="Expertos Verificados" desc="Acceso a 1,200+ profesionales confiables" />
              <BenefitItem icon="bar-chart" title="Análisis Avanzado" desc="KPIs, reportes y predicciones" />
              <BenefitItem icon="flash" title="Fácil de Usar" desc="Interfaz intuitiva y rápida" />
              <BenefitItem icon="lock-closed" title="Seguro" desc="Tus datos protegidos con encriptación" />
              <BenefitItem icon="globe" title="Para Todos" desc="Desde pequeños agricultores hasta grandes empresas" />
            </View>
          </Animated.View>

          {/* CTA BUTTONS */}
          <Animated.View entering={FadeInUp.duration(600).delay(400)} style={styles.ctaSection}>
            <Pressable style={styles.loginButton} onPress={goToLogin}>
              <LinearGradient
                colors={['#52FF94', '#22C55E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="log-in-outline" size={20} color="#020403" />
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </LinearGradient>
            </Pressable>

            <Pressable style={styles.registerButton} onPress={goToRegister}>
              <LinearGradient
                colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="person-add-outline" size={20} color="#52FF94" />
                <Text style={styles.registerButtonText}>Crear Cuenta</Text>
              </LinearGradient>
            </Pressable>

            <Text style={styles.disclaimer}>
              Al continuar, aceptas nuestros términos de servicio y política de privacidad
            </Text>
          </Animated.View>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ModuleItem({ icon, title, desc, color }: any) {
  return (
    <View style={styles.moduleItem}>
      <View style={[styles.moduleIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.moduleContent}>
        <Text style={styles.moduleTitle}>{title}</Text>
        <Text style={styles.moduleDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.4)" />
    </View>
  );
}

function BenefitItem({ icon, title, desc }: any) {
  return (
    <View style={styles.benefitItem}>
      <View style={styles.benefitIconBox}>
        <Ionicons name={icon} size={24} color="#52FF94" />
      </View>
      <View style={styles.benefitContent}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020403' },
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingVertical: 24 },

  glowTop: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(82,255,148,0.08)',
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

  /* HERO */
  heroSection: { alignItems: 'center', marginBottom: 36 },
  mainTitle: { fontSize: 48, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1, textAlign: 'center' },
  titleAccent: { color: '#52FF94', textShadowColor: 'rgba(82,255,148,0.4)', textShadowRadius: 12 },
  heroSubtitle: { fontSize: 18, color: '#52FF94', fontWeight: '700', marginTop: 12, textAlign: 'center' },
  heroDescription: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 8, textAlign: 'center', lineHeight: 20 },

  /* FEATURES */
  featuresContainer: { marginBottom: 36 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 16 },
  featureGrid: { gap: 12 },
  featureBox: { borderRadius: 14, overflow: 'hidden', height: 130 },
  featureBoxGradient: { flex: 1, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, justifyContent: 'space-between' },
  featureIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(82,255,148,0.1)', justifyContent: 'center', alignItems: 'center' },
  featureName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF', marginTop: 8 },
  featureDesc: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },

  /* MODULES */
  modulesSection: { marginBottom: 36 },
  modulesList: { gap: 10 },
  moduleItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, backgroundColor: 'rgba(82,255,148,0.05)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)', gap: 12 },
  moduleIcon: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  moduleContent: { flex: 1 },
  moduleTitle: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  moduleDesc: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },

  /* STATS */
  statsSection: { marginBottom: 36 },
  statsGradient: { borderRadius: 14, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statBox: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#52FF94' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4, textAlign: 'center' },
  statDivider: { width: 1, height: 50, backgroundColor: 'rgba(82,255,148,0.2)' },

  /* WHY CHOOSE */
  whySection: { marginBottom: 36 },
  benefitsList: { gap: 12 },
  benefitItem: { flexDirection: 'row', gap: 12, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, backgroundColor: 'rgba(82,255,148,0.05)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.1)' },
  benefitIconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.15)', justifyContent: 'center', alignItems: 'center' },
  benefitContent: { flex: 1 },
  benefitTitle: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  benefitDesc: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },

  /* CTA */
  ctaSection: { gap: 12 },
  loginButton: { borderRadius: 14, overflow: 'hidden' },
  registerButton: { borderRadius: 14, overflow: 'hidden' },
  buttonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  loginButtonText: { color: '#020403', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  registerButtonText: { color: '#52FF94', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },

  disclaimer: { fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 12, lineHeight: 16 },
});
