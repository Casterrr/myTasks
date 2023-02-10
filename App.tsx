import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView } from 'react-native';
import { Home } from './src/screens/home';

export default function App() {
  console.log('opaaa')

  return (
    <View className="flex-1">
      <Home />
      <StatusBar style="light" hidden={false} translucent={false}/>
    </View>
  );
}

