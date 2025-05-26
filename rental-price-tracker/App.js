import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';

const Stack = createNativeStackNavigator();

// Load the rental data
const rentalData = require('./data/rentals.json');

export default function App() {
  // Initialize state with the rental data
  const [listings] = useState(rentalData);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          initialParams={{ listings }}
        />
        <Stack.Screen name="Saved" component={SavedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 