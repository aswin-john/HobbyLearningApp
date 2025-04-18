import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import PlanScreen from './src/screens/PlanScreen';
import TechniqueDetails from './src/screens/TechniqueDetails'; // ✅ Make sure this file exists

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      // screenOptions={{
      //   headerShown: false,
      //   animation: 'slide_from_right',
      // }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Plan" component={PlanScreen} />
      <Stack.Screen name="TechniqueDetails" component={TechniqueDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
