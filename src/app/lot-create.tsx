import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { WeeklyBarsSvg } from '@/components/agro-graphics';
import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Spacing } from '@/constants/theme';

export default function LotCreateScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Crear lote" subtitle="Ingresa los datos del lote a registrar." />

      <View style={[AgroSurface.cardStrong, styles.heroCard]}>
        <Text style={styles.heroTitle}>Estimacion inteligente</Text>
        <Text style={styles.heroText}>Completa los datos base para calcular produccion y rendimiento.</Text>
        <WeeklyBarsSvg height={92} />
      </View>

      <View style={[AgroSurface.card, styles.formCard]}>
        <Field label="Nombre del lote">
          <TextInput style={styles.input} placeholder="Ej: Lote Alto" placeholderTextColor="rgba(255,255,255,0.4)" />
        </Field>
        <Field label="Cultivo">
          <TextInput style={styles.input} placeholder="Ej: Cafe" placeholderTextColor="rgba(255,255,255,0.4)" />
        </Field>
        <Field label="Variedad">
          <TextInput style={styles.input} placeholder="Ej: Castillo" placeholderTextColor="rgba(255,255,255,0.4)" />
        </Field>
        <Field label="Area (ha)">
          <TextInput style={styles.input} placeholder="Ej: 2.1" placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="decimal-pad" />
        </Field>
        <Field label="Ano de siembra">
          <TextInput style={styles.input} placeholder="Ej: 2021" placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="number-pad" />
        </Field>

        <PrimaryAction label="Calcular produccion" onPress={() => router.push('/lot-result')} />
      </View>
    </AgroScreen>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  heroText: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 13,
    lineHeight: 18,
  },
  formCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  field: {
    gap: 4,
  },
  fieldLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  input: AgroSurface.input,
});
