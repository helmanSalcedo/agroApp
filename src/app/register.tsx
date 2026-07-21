import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
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
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '@/context/auth-context';

const ROLES = [
  {
    id: 'agricultor',
    label: 'Agricultor',
    icon: '🌾',
    description: 'Propietario de finca',
    color: '#52FF94',
    fields: ['nombre', 'email', 'telefono', 'finca_nombre', 'finca_ubicacion', 'finca_area'],
  },
  {
    id: 'profesional',
    label: 'Profesional',
    icon: '👨‍💼',
    description: 'Agrónomo, veterinario, abogado...',
    color: '#3B82F6',
    fields: ['nombre', 'email', 'telefono', 'especialidad', 'experiencia', 'certificacion'],
  },
  {
    id: 'proveedor',
    label: 'Proveedor',
    icon: '🛒',
    description: 'Empresa de insumos o servicios',
    color: '#EC4899',
    fields: ['nombre', 'email', 'telefono', 'empresa_nombre', 'ruc', 'sector'],
  },
  {
    id: 'trabajador',
    label: 'Trabajador',
    icon: '👷',
    description: 'Empleado o jornalero',
    color: '#F59E0B',
    fields: ['nombre', 'email', 'telefono', 'especialidad_trabajo', 'experiencia'],
  },
  {
    id: 'afiliado',
    label: 'Afiliado',
    icon: '🤝',
    description: 'Socio o distribuidor',
    color: '#06B6D4',
    fields: ['nombre', 'email', 'telefono', 'empresa_nombre', 'region', 'productos'],
  },
  {
    id: 'administrador',
    label: 'Administrador',
    icon: '⚙️',
    description: 'Administrador de plataforma',
    color: '#8B5CF6',
    fields: ['nombre', 'email', 'telefono', 'codigo_admin'],
  },
];

export default function RegisterScreen() {
  const { signUp } = useAuth();

  const [step, setStep] = useState<'role' | 'datos_basicos' | 'datos_especificos'>('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Datos básicos
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Datos específicos por rol
  const [datosEspecificos, setDatosEspecificos] = useState<Record<string, string>>({});

  const roleData = ROLES.find(r => r.id === selectedRole);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setStep('datos_basicos');
  };

  const handleDatosBasicos = () => {
    setError('');

    if (nombre.trim().length < 3) {
      setError('Ingresa tu nombre completo.');
      return;
    }

    if (telefono.trim().length < 8) {
      setError('Ingresa un teléfono válido.');
      return;
    }

    if (!email.includes('@')) {
      setError('Ingresa un correo válido.');
      return;
    }

    if (password.trim().length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setStep('datos_especificos');
  };

  const handleRegister = async () => {
    setError('');

    try {
      setLoading(true);
      await signUp({
        name: nombre.trim(),
        phone: telefono.trim(),
        email: email.trim(),
        password,
        role: selectedRole,
        roleData: datosEspecificos,
      });
      router.replace('/(tabs)');
    } catch {
      setError('No fue posible crear la cuenta. Intenta de nuevo.');
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
            {/* STEP 1: SELECCIONAR ROL */}
            {step === 'role' && (
              <Animated.View entering={FadeInDown.duration(500)}>
                <View style={styles.header}>
                  <Text style={styles.title}>Crea tu Cuenta</Text>
                  <Text style={styles.subtitle}>Selecciona tu rol en AgroApp</Text>
                </View>

                <View style={styles.rolesGrid}>
                  {ROLES.map((role, index) => (
                    <Animated.View key={role.id} entering={FadeInDown.duration(400).delay(index * 50)}>
                      <Pressable
                        style={styles.roleCard}
                        onPress={() => handleRoleSelect(role.id)}
                      >
                        <LinearGradient
                          colors={[`${role.color}15`, `${role.color}08`]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.roleGradient}
                        >
                          <Text style={styles.roleIcon}>{role.icon}</Text>
                          <Text style={styles.roleLabel}>{role.label}</Text>
                          <Text style={styles.roleDesc}>{role.description}</Text>
                          <View style={styles.roleArrow}>
                            <Ionicons name="arrow-forward" size={20} color={role.color} />
                          </View>
                        </LinearGradient>
                      </Pressable>
                    </Animated.View>
                  ))}
                </View>

                <View style={styles.loginLink}>
                  <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                  <Link href="/login" asChild>
                    <Pressable>
                      <Text style={styles.loginLinkText}>Inicia sesión</Text>
                    </Pressable>
                  </Link>
                </View>
              </Animated.View>
            )}

            {/* STEP 2: DATOS BÁSICOS */}
            {step === 'datos_basicos' && (
              <Animated.View entering={FadeInUp.duration(400)}>
                <View style={styles.header}>
                  <Pressable onPress={() => setStep('role')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#52FF94" />
                  </Pressable>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Datos Básicos</Text>
                    <Text style={styles.subtitle}>Información principal</Text>
                  </View>
                </View>

                <View style={styles.formCard}>
                  {/* Nombre */}
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.fieldLabel}>Nombre Completo *</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="person-outline" size={20} color="#52FF94" />
                      <TextInput
                        placeholder="Tu nombre"
                        placeholderTextColor="rgba(255,255,255,0.35)"
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        editable={!loading}
                      />
                    </View>
                  </View>

                  {/* Email */}
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.fieldLabel}>Email *</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="mail-outline" size={20} color="#52FF94" />
                      <TextInput
                        placeholder="tu@email.com"
                        placeholderTextColor="rgba(255,255,255,0.35)"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading}
                      />
                    </View>
                  </View>

                  {/* Teléfono */}
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.fieldLabel}>Teléfono *</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="call-outline" size={20} color="#52FF94" />
                      <TextInput
                        placeholder="+57 300 000 0000"
                        placeholderTextColor="rgba(255,255,255,0.35)"
                        style={styles.input}
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                        editable={!loading}
                      />
                    </View>
                  </View>

                  {/* Contraseña */}
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.fieldLabel}>Contraseña *</Text>
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
                      />
                      <Pressable onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                        <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="rgba(82,255,148,0.7)" />
                      </Pressable>
                    </View>
                  </View>

                  {/* Confirmar Contraseña */}
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.fieldLabel}>Confirmar Contraseña *</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons name="lock-closed-outline" size={20} color="#52FF94" />
                      <TextInput
                        placeholder="Confirma tu contraseña"
                        placeholderTextColor="rgba(255,255,255,0.35)"
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        editable={!loading}
                      />
                      <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} disabled={loading}>
                        <Ionicons name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="rgba(82,255,148,0.7)" />
                      </Pressable>
                    </View>
                  </View>

                  {error ? (
                    <View style={styles.errorBox}>
                      <Ionicons name="alert-circle" size={16} color="#FF7070" />
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                  ) : null}

                  <Pressable style={styles.continueButton} onPress={handleDatosBasicos} disabled={loading}>
                    <LinearGradient colors={['#52FF94', '#22C55E']} style={styles.buttonGradient}>
                      <Text style={styles.buttonText}>Continuar</Text>
                      <Ionicons name="arrow-forward" size={20} color="#020403" />
                    </LinearGradient>
                  </Pressable>
                </View>
              </Animated.View>
            )}

            {/* STEP 3: DATOS ESPECÍFICOS POR ROL */}
            {step === 'datos_especificos' && roleData && (
              <Animated.View entering={FadeInUp.duration(400)}>
                <View style={styles.header}>
                  <Pressable onPress={() => setStep('datos_basicos')} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#52FF94" />
                  </Pressable>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Datos de {roleData.label}</Text>
                    <Text style={styles.subtitle}>Información específica</Text>
                  </View>
                </View>

                <View style={styles.formCard}>
                  <RoleSpecificFields
                    role={selectedRole}
                    data={datosEspecificos}
                    setData={setDatosEspecificos}
                    loading={loading}
                  />

                  {error ? (
                    <View style={styles.errorBox}>
                      <Ionicons name="alert-circle" size={16} color="#FF7070" />
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                  ) : null}

                  <Pressable
                    style={[styles.continueButton, loading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                  >
                    <LinearGradient colors={['#52FF94', '#22C55E']} style={styles.buttonGradient}>
                      <Text style={styles.buttonText}>{loading ? 'Creando cuenta...' : 'Crear Cuenta'}</Text>
                      <Ionicons name="checkmark-done" size={20} color="#020403" />
                    </LinearGradient>
                  </Pressable>
                </View>
              </Animated.View>
            )}

            <View style={{ height: 20 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

// Componente para campos específicos de cada rol
function RoleSpecificFields({ role, data, setData, loading }: any) {
  const updateField = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const renderField = (field: string, label: string, icon: string) => (
    <View key={field} style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={20} color="#52FF94" />
        <TextInput
          placeholder={label}
          placeholderTextColor="rgba(255,255,255,0.35)"
          style={styles.input}
          value={data[field] || ''}
          onChangeText={(value) => updateField(field, value)}
          editable={!loading}
        />
      </View>
    </View>
  );

  switch (role) {
    case 'agricultor':
      return (
        <>
          {renderField('finca_nombre', 'Nombre de la Finca', 'home-outline')}
          {renderField('finca_ubicacion', 'Ubicación/Municipio', 'location-outline')}
          {renderField('finca_area', 'Área Total (hectáreas)', 'resize-outline')}
        </>
      );

    case 'profesional':
      return (
        <>
          {renderField('especialidad', 'Especialidad', 'briefcase-outline')}
          {renderField('experiencia', 'Años de Experiencia', 'time-outline')}
          {renderField('certificacion', 'Certificaciones', 'medal-outline')}
        </>
      );

    case 'proveedor':
      return (
        <>
          {renderField('empresa_nombre', 'Nombre de la Empresa', 'business-outline')}
          {renderField('ruc', 'RUC o NIT', 'card-outline')}
          {renderField('sector', 'Sector (Semillas, Fertilizantes...)', 'pricetag-outline')}
        </>
      );

    case 'trabajador':
      return (
        <>
          {renderField('especialidad_trabajo', 'Especialidad de Trabajo', 'wrench-outline')}
          {renderField('experiencia', 'Años de Experiencia', 'time-outline')}
        </>
      );

    case 'afiliado':
      return (
        <>
          {renderField('empresa_nombre', 'Nombre de la Empresa', 'business-outline')}
          {renderField('region', 'Región de Operación', 'map-outline')}
          {renderField('productos', 'Productos/Servicios', 'cube-outline')}
        </>
      );

    case 'administrador':
      return (
        <>
          {renderField('codigo_admin', 'Código de Administrador', 'key-outline')}
        </>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020403' },
  safeArea: { flex: 1 },
  keyboardView: { flex: 1 },
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

  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24, gap: 12 },
  backButton: { paddingVertical: 6 },
  title: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },

  rolesGrid: { gap: 12, marginBottom: 24 },
  roleCard: { borderRadius: 14, overflow: 'hidden', minHeight: 120 },
  roleGradient: { borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', padding: 16, gap: 8 },
  roleIcon: { fontSize: 32, marginBottom: 4 },
  roleLabel: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  roleDesc: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  roleArrow: { position: 'absolute', top: 12, right: 12 },

  loginLink: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: 4 },
  loginText: { color: 'rgba(255,255,255,0.65)', fontSize: 13 },
  loginLinkText: { color: '#52FF94', fontWeight: '700', fontSize: 13 },

  formCard: { borderRadius: 16, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', backgroundColor: 'rgba(15,118,110,0.08)', padding: 20, gap: 12 },
  fieldWrapper: { gap: 8 },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: '#52FF94' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(82,255,148,0.15)', backgroundColor: 'rgba(82,255,148,0.03)', paddingHorizontal: 12, height: 50, gap: 10 },
  input: { flex: 1, color: '#FFFFFF', fontSize: 14, fontWeight: '500' },

  errorBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,107,107,0.1)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,107,107,0.2)', padding: 12, gap: 10 },
  errorText: { color: '#FF7070', fontSize: 12, fontWeight: '500', flex: 1 },

  continueButton: { borderRadius: 12, overflow: 'hidden', marginTop: 8 },
  buttonGradient: { paddingVertical: 14, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 },
  buttonText: { color: '#020403', fontSize: 15, fontWeight: '800' },
  buttonDisabled: { opacity: 0.6 },
});
