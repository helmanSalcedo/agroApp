import { View, Text } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#020403' }}>
      <Text style={{ color: '#52FF94', fontSize: 24, fontWeight: 'bold' }}>AgroApp</Text>
    </View>
  );
}
