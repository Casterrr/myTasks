import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { TasksProviderComponent } from './src/context/TasksContext';
import { Home } from './src/screens/home';

export default function App() {

  return (
    <TasksProviderComponent>
      <View className="flex-1">
        <Home />
        <StatusBar style="light" hidden={false} translucent={false}/>
      </View>
    </TasksProviderComponent>
  );
}

