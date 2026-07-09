import { router } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Spacing } from '@/constants/theme';

export default function FarmEditScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Editar finca" subtitle="Actualiza los datos de tu finca." />

      <View style={[AgroSurface.cardStrong, styles.formCard]}>
        <TextInput style={styles.input} defaultValue="Finca El Mirador" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} defaultValue="Pitalito" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} defaultValue="Huila" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} defaultValue="5.2" placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="decimal-pad" />

        <PrimaryAction label="Guardar cambios" onPress={() => router.back()} />
      </View>
    </AgroScreen>
  );
}

const styles = StyleSheet.create({
  formCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  input: AgroSurface.input,
});
