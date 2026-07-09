import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Spacing } from '@/constants/theme';

export default function ActivityRegisterScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Registrar actividad" subtitle="Completa los datos de la labor realizada." />

      <View style={styles.chipsRow}>
        <TypeChip label="Fertilizacion" />
        <TypeChip label="Poda" />
        <TypeChip label="Limpieza" />
        <TypeChip label="Cosecha" />
      </View>

      <View style={[AgroSurface.cardStrong, styles.formCard]}>
        <Field label="Fecha">
          <TextInput style={styles.input} placeholder="dd/mm/aaaa" placeholderTextColor="rgba(255,255,255,0.4)" />
        </Field>
        <Field label="Tipo de actividad">
          <TextInput style={styles.input} placeholder="Fertilizacion, Poda..." placeholderTextColor="rgba(255,255,255,0.4)" />
        </Field>
        <Field label="Lote">
          <TextInput style={styles.input} placeholder="Ej: Lote Alto" placeholderTextColor="rgba(255,255,255,0.4)" />
        </Field>
        <Field label="Cantidad / Producto">
          <TextInput style={styles.input} placeholder="Ej: 5 kg Urea" placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="default" />
        </Field>
        <Field label="Costo ($)">
          <TextInput style={styles.input} placeholder="Ej: 120000" placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="decimal-pad" />
        </Field>
        <Field label="Observaciones">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe la actividad realizada..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            multiline
          />
        </Field>

        <PrimaryAction label="Guardar actividad" onPress={() => router.push('/activity-detail')} />
      </View>
    </AgroScreen>
  );
}

function TypeChip({ label }: { label: string }) {
  return (
    <View style={styles.typeChip}>
      <Text style={styles.typeChipText}>{label}</Text>
    </View>
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
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  typeChip: AgroSurface.chip,
  typeChipText: AgroSurface.chipText,
});
