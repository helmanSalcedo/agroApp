import { router } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';

import { AgroScreen, AgroSurface } from '@/components/agro-screen';
import { AppScreenHeader } from '@/components/app-screen-header';
import { PrimaryAction } from '@/components/primary-action';
import { Spacing } from '@/constants/theme';

export default function LotEditScreen() {
  return (
    <AgroScreen>
      <AppScreenHeader title="Editar lote" subtitle="Modifica los datos del lote." />

      <View style={[AgroSurface.cardStrong, styles.formCard]}>
        <TextInput style={styles.input} defaultValue="Lote Alto" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} defaultValue="Cafe Catio" placeholderTextColor="rgba(255,255,255,0.4)" />
        <TextInput style={styles.input} defaultValue="2.1" placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="decimal-pad" />
        <TextInput style={styles.input} defaultValue="2021" placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="number-pad" />

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
