import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';

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
        <Stack.Navigator
          screenOptions={globalScreenOptions}
        //  initialRouteName='Home'
        >
          <Stack.Screen
            name='Login'
            component={LoginScreen}
          />

          <Stack.Screen
            name='Register'
            component={RegisterScreen}
          />

          <Stack.Screen
            name='Home'
            component={HomeScreen}
          />

          <Stack.Screen
            name='AddChat'
            component={AddChatScreen}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
