import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
