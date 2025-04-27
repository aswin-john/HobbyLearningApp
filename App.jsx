import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import PlanScreen from './src/screens/PlanScreen';
import TechniqueDetails from './src/screens/TechniqueDetails';
import CustomHeader from './src/components/CustomHeader';

const Stack = createNativeStackNavigator();

const App = () => {
  // Memoize the screen options to prevent unnecessary re-renders
  const screenOptions = useMemo(() => {
    return ({ route }) => ({
      header: () => <CustomHeader title={route.name} />,
      // Add additional options for better performance
      animationEnabled: true,
      freezeOnBlur: true,
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Plan" component={PlanScreen} />
        <Stack.Screen name="TechniqueDetails" component={TechniqueDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;