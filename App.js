import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import HomeScreen1 from './screens/HomeScreen1';
import HomeScreen2 from './screens/HomeScreen2';
import OnBoardingScreen1 from './screens/OnBoardingScreen1';
import OnBoardingScreen2 from './screens/OnBoardingScreen2';
import OnBoardingScreen3 from './screens/OnBoardingScreen3';
import SignupScreen from './screens/SignupScreen';
import ExploreGenres from './screens/ExploreGenres';


enableScreens();

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade', // Default animation
          // Add transition for modal animation
          transition: 'modal',
        }}>
        {/* HomeScreen1 with custom animation */}
        <Stack.Screen
          name='HomeScreen1'
          component={HomeScreen1}

        />
        {/* HomeScreen2 with default animation */}
        <Stack.Screen name='HomeScreen2' component={HomeScreen2} />
        {/* OnBoardingScreen1 with custom animation */}
        <Stack.Screen
  name='OnBoardingScreen1'
  component={OnBoardingScreen1}
  options={{ animation: 'fade_from_right' }} // Custom animation
/>

        {/* OnBoardingScreen2 with default animation */}
        <Stack.Screen name='OnBoardingScreen2' component={OnBoardingScreen2} />
        {/* OnBoardingScreen3 with default animation */}
        <Stack.Screen name='OnBoardingScreen3' component={OnBoardingScreen3} />
        {/* SignupScreen with custom animation */}
        <Stack.Screen
          name='SignupScreen'
          component={SignupScreen}
          options={{ animation: 'fade_from_bottom' }} // Custom animation
        />
        <Stack.Screen
          name='ExploreGenres'
          component={ExploreGenres}
          options={{ animation: 'fade_from_bottom' }} // Custom animation
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
