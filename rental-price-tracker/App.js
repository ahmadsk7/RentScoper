import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';
import TestScreen from './screens/TestScreen';

const Tab = createBottomTabNavigator();

// Load the rental data
const rentalData = require('./data/rentals.json');

export default function App() {
  // Initialize state with the rental data
  const [listings] = React.useState(rentalData);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          initialParams={{ listings }}
          options={{
            tabBarLabel: 'Home',
            tabBarTestID: 'home-tab'
          }}
        />
        <Tab.Screen 
          name="Saved" 
          component={SavedScreen}
          options={{
            tabBarLabel: 'Saved',
            tabBarTestID: 'saved-tab'
          }}
        />
        <Tab.Screen 
          name="Test" 
          component={TestScreen}
          options={{
            tabBarLabel: 'Test',
            tabBarTestID: 'test-tab'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 