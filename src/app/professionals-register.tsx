import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

const PROFESSIONAL_CATEGORIES = [
  {
    id: 'agronomist',
    label: 'Ingeniero Agrónomo',
    icon: '🌱',
    description: 'Especialista en cultivos',
    type: 'professional',
  },
  {
    id: 'veterinarian',
    label: 'Médico Veterinario',
    icon: '🐄',
    description: 'Salud animal',
    type: 'professional',
  },
  {
    id: 'zootechnician',
    label: 'Zootecnista',
    icon: '🐑',
    description: 'Producción animal',
    type: 'professional',
  },
  {
    id: 'irrigation',
    label: 'Especialista en Riego',
    icon: '💧',
    description: 'Sistemas de riego',
    type: 'professional',
  },
  {
    id: 'forestry',
    label: 'Especialista Forestal',
    icon: '🌿',
    description: 'Gestión forestal',
    type: 'professional',
  },
  {
    id: 'aquaculture',
    label: 'Especialista en Piscicultura',
    icon: '🐟',
    description: 'Cultivos acuáticos',
    type: 'professional',
  },
  {
    id: 'coffee',
    label: 'Especialista en Café',
    icon: '☕',
    description: 'Cultivo de café',
    type: 'professional',
  },
  {
    id: 'crops',
    label: 'Especialista por Cultivo',
    icon: '🌾',
    description: 'Cultivos específicos',
    type: 'professional',
  },
  {
    id: 'accountant',
    label: 'Contador Agropecuario',
    icon: '💰',
    description: 'Servicios financieros',
    type: 'professional',
  },
  {
    id: 'lawyer',
    label: 'Asesor Jurídico',
    icon: '⚖️',
    description: 'Asesoría legal',
    type: 'professional',
  },
  {
    id: 'finance',
    label: 'Entidad Financiera',
    icon: '🏦',
    description: 'Créditos y seguros',
    type: 'provider',
  },
  {
    id: 'supplier',
    label: 'Proveedor',
    icon: '🛒',
    description: 'Insumos y equipos',
    type: 'provider',
  },
  {
    id: 'buyer',
    label: 'Comprador',
    icon: '🚚',
    description: 'Busca productos',
    type: 'provider',
  },
  {
    id: 'laboratory',
    label: 'Laboratorio',
    icon: '🧪',
    description: 'Análisis técnicos',
    type: 'provider',
  },
  {
    id: 'trainer',
    label: 'Capacitador',
    icon: '🎓',
    description: 'Educación y cursos',
    type: 'professional',
  },
];

export default function ProfessionalsRegisterScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [step, setStep] = useState<'type' | 'category' | 'form'>('type');
  const [userType, setUserType] = useState<'professional' | 'provider' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });

  const isTablet = width > 768;

  const filteredCategories = PROFESSIONAL_CATEGORIES.filter(cat => 
    userType === null || cat.type === userType
  );

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep('form');
  };

  const handleRegister = () => {
    // Mock registration
    router.push('/professionals-network');
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#020403', '#08120D', '#10261A']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Pressable onPress={() => {
            if (step === 'category') setStep('type');
            else if (step === 'form') setStep('category');
            else router.back();
          }}>
            <Ionicons name="chevron-back" size={28} color="#52FF94" />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Registrarse</Text>
            <Text style={styles.headerSubtitle}>
              {step === 'type' ? 'Selecciona tu tipo' : step === 'category' ? 'Elige tu especialidad' : 'Completa tu perfil'}
            </Text>
          </View>
          <View style={{ width: 28 }} />
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* STEP 1: Type Selection */}
          {step === 'type' && (
            <View style={styles.stepContainer}>
              <Animated.View entering={FadeInDown.duration(400).delay(100)}>
                <Text style={styles.stepTitle}>¿Qué eres?</Text>
                <Text style={styles.stepDescription}>
                  Selecciona si eres un profesional o un proveedor de servicios
                </Text>

                <View style={styles.typeGrid}>
                  <Pressable
                    style={styles.typeCard}
                    onPress={() => {
                      setUserType('professional');
                      setStep('category');
                    }}
                  >
                    <LinearGradient
                      colors={['rgba(82,255,148,0.15)', 'rgba(82,255,148,0.08)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.typeCardGradient}
                    >
                      <Text style={styles.typeIcon}>👨‍💼</Text>
                      <Text style={styles.typeLabel}>Profesional</Text>
                      <Text style={styles.typeSubtext}>
                        Agrónomo, veterinario, abogado, etc.
                      </Text>
                    </LinearGradient>
                  </Pressable>

                  <Pressable
                    style={styles.typeCard}
                    onPress={() => {
                      setUserType('provider');
                      setStep('category');
                    }}
                  >
                    <LinearGradient
                      colors={['rgba(3,182,212,0.15)', 'rgba(3,182,212,0.08)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.typeCardGradient}
                    >
                      <Text style={styles.typeIcon}>🏢</Text>
                      <Text style={styles.typeLabel}>Proveedor</Text>
                      <Text style={styles.typeSubtext}>
                        Empresa, laboratorio, banco, etc.
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </Animated.View>
            </View>
          )}

          {/* STEP 2: Category Selection */}
          {step === 'category' && (
            <View style={styles.stepContainer}>
              <Animated.View entering={FadeInDown.duration(400).delay(100)}>
                <Text style={styles.stepTitle}>Elige tu especialidad</Text>

                <View style={styles.categoryGrid}>
                  {filteredCategories.map((cat, index) => (
                    <Pressable
                      key={cat.id}
                      style={[styles.categoryCard, selectedCategory === cat.id && styles.categoryCardActive]}
                      onPress={() => handleCategorySelect(cat.id)}
                    >
                      <LinearGradient
                        colors={selectedCategory === cat.id ? ['rgba(82,255,148,0.2)', 'rgba(82,255,148,0.1)'] : ['rgba(82,255,148,0.08)', 'rgba(82,255,148,0.03)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.categoryCardGradient}
                      >
                        <Text style={styles.categoryIcon}>{cat.icon}</Text>
                        <Text style={styles.categoryLabel}>{cat.label}</Text>
                        <Text style={styles.categoryDesc}>{cat.description}</Text>
                      </LinearGradient>
                    </Pressable>
                  ))}
                </View>
              </Animated.View>
            </View>
          )}

          {/* STEP 3: Form */}
          {step === 'form' && (
            <View style={styles.stepContainer}>
              <Animated.View entering={FadeInDown.duration(400).delay(100)}>
                <Text style={styles.stepTitle}>Datos de Registro</Text>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Nombre Completo *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Tu nombre"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Email *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="tu@email.com"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Teléfono *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+57 300 000 0000"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Ciudad/Municipio *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Donde prestas servicios"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={formData.location}
                    onChangeText={(text) => setFormData({ ...formData, location: text })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Acerca de ti</Text>
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="Cuéntanos sobre tu experiencia y especialidades..."
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    multiline
                    numberOfLines={4}
                    value={formData.bio}
                    onChangeText={(text) => setFormData({ ...formData, bio: text })}
                  />
                </View>

                <View style={styles.infoBox}>
                  <Ionicons name="information-circle" size={16} color="#52FF94" />
                  <Text style={styles.infoText}>
                    Después de registrarte podrás agregar foto, certificaciones, portafolio y más detalles.
                  </Text>
                </View>

                <Pressable
                  style={[styles.registerButton, !formData.name || !formData.email ? styles.registerButtonDisabled : {}]}
                  onPress={handleRegister}
                  disabled={!formData.name || !formData.email}
                >
                  <Text style={styles.registerButtonText}>Crear Perfil</Text>
                </Pressable>
              </Animated.View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(82,255,148,0.1)' },
  headerContent: { flex: 1, alignItems: 'center', gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  stepContainer: { paddingHorizontal: 16, paddingVertical: 24 },
  stepTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  stepDescription: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 24 },
  typeGrid: { gap: 12 },
  typeCard: { borderRadius: 14, overflow: 'hidden', height: 140 },
  typeCardGradient: { borderRadius: 14, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, justifyContent: 'center', alignItems: 'center', gap: 12 },
  typeIcon: { fontSize: 40 },
  typeLabel: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  typeSubtext: { fontSize: 12, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
  categoryGrid: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: { width: '48%', borderRadius: 12, overflow: 'hidden', minHeight: 110 },
  categoryCardActive: { borderWidth: 2, borderColor: '#52FF94' },
  categoryCardGradient: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 12, alignItems: 'center', justifyContent: 'center', gap: 6 },
  categoryIcon: { fontSize: 28 },
  categoryLabel: { fontSize: 12, fontWeight: '700', color: '#FFFFFF', textAlign: 'center' },
  categoryDesc: { fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center' },
  formGroup: { marginBottom: 16, gap: 6 },
  label: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  input: { backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: '#FFFFFF', fontSize: 13 },
  textarea: { textAlignVertical: 'top', paddingTop: 10, minHeight: 100 },
  infoBox: { flexDirection: 'row', gap: 8, padding: 12, borderRadius: 10, backgroundColor: 'rgba(82,255,148,0.08)', borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', marginBottom: 20 },
  infoText: { fontSize: 11, color: 'rgba(255,255,255,0.7)', flex: 1 },
  registerButton: { backgroundColor: '#52FF94', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 24 },
  registerButtonDisabled: { opacity: 0.5 },
  registerButtonText: { color: '#020403', fontWeight: '700', fontSize: 14 },
});
