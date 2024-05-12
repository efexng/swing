import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import HomeScreen1 from './screens/HomeScreen1';
import HomeScreen2 from './screens/HomeScreen2';
import OnBoardingScreen1 from './screens/OnBoardingScreen1';
import OnBoardingScreen2 from './screens/OnBoardingScreen2';
import OnBoardingScreen3 from './screens/OnBoardingScreen3';
import SignupScreen from './screens/SignupScreen';
import ExploreGenres from './screens/ExploreGenres';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import SavedScreen from './screens/SavedScreen';
import CinemaScreen from './screens/CinemaScreen';
import UploadScreen from './screens/UploadScreen';
import NotificationScreen from './screens/NotificationScreen';

enableScreens();

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false, // Disable transition animation
        }}
      >

        <Stack.Screen name='HomeScreen1' component={HomeScreen1} />
        <Stack.Screen name='HomeScreen2' component={HomeScreen2} />
        <Stack.Screen name='OnBoardingScreen1' component={OnBoardingScreen1} />
        <Stack.Screen name='OnBoardingScreen2' component={OnBoardingScreen2} />
        <Stack.Screen name='OnBoardingScreen3' component={OnBoardingScreen3} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
        <Stack.Screen name='ExploreGenres' component={ExploreGenres} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='CinemaScreen' component={CinemaScreen} />
        <Stack.Screen name='SavedScreen' component={SavedScreen} />
        <Stack.Screen name='MoreScreen' component={MoreScreen} />
        <Stack.Screen name='UploadScreen' component={UploadScreen} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} />
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
