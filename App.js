import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import SplashScreenTransition from './screens/SplashScreenTransition';
import OnBoardingScreen1 from './screens/OnBoardingScreen1';
import OnBoardingScreen2 from './screens/OnBoardingScreen2';
import OnBoardingScreen3 from './screens/OnBoardingScreen3';
import SignupScreen from './screens/SignupScreen';
import ExploreGenres from './screens/ExploreGenres';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import ProfileScreen from './screens/ProfileScreen';
import ContactScreen from './screens/ContactScreen';
import AboutScreen from './screens/AboutScreen';
import FAQScreen from './screens/FAQScreen';
import SavedScreen from './screens/SavedScreen';
import CinemaScreen from './screens/CinemaScreen';
import CinemaScreen2 from './screens/CinemaScreen2';
import MovieShowTime from './screens/MovieShowTime';
import TicketPurchaseModal from './screens/TicketPurchaseModal';
import CinemaCompaniesList from './screens/CinemaCompaniesList';
import CinemaScreenMovieList from './screens/CinemaScreenMovieList';
import UploadScreen from './screens/UploadScreen';
import NotificationScreen from './screens/NotificationScreen';
import NotificationOpenedScreen from './screens/NotificationOpenedScreen';
import UploadScreenExtract from './screens/UploadScreenExtract';
import UploadScreenExtractError from './screens/UploadScreenExtractError';
import UploadScreenExtractMatch from './screens/UploadScreenExtractMatch';

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
        <Stack.Screen name='CinemaScreen' component={CinemaScreen} />

        <Stack.Screen name='MoreScreen' component={MoreScreen} />
        <Stack.Screen name='ContactScreen' component={ContactScreen} />

        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <Stack.Screen name='AboutScreen' component={AboutScreen} />
        <Stack.Screen name='FAQScreen' component={FAQScreen} />

        <Stack.Screen name='SplashScreenTransition' component={SplashScreenTransition} />
        <Stack.Screen name='OnBoardingScreen1' component={OnBoardingScreen1} />
        <Stack.Screen name='OnBoardingScreen2' component={OnBoardingScreen2} />
        <Stack.Screen name='OnBoardingScreen3' component={OnBoardingScreen3} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
        <Stack.Screen name='ExploreGenres' component={ExploreGenres} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='CinemaCompaniesList' component={CinemaCompaniesList} />
        <Stack.Screen name='CinemaScreen2' component={CinemaScreen2} />
        <Stack.Screen name='MovieShowTime' component={MovieShowTime} />
        <Stack.Screen name='CinemaScreenMovieList' component={CinemaScreenMovieList} />
        <Stack.Screen name='TicketPurchaseModal' component={TicketPurchaseModal} />
        <Stack.Screen name='SavedScreen' component={SavedScreen} />

     
        <Stack.Screen name='UploadScreen' component={UploadScreen} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} />

        <Stack.Screen name='NotificationOpenedScreen' component={NotificationOpenedScreen} />
        <Stack.Screen name='UploadScreenExtract' component={UploadScreenExtract} />
        <Stack.Screen name='UploadScreenExtractError' component={UploadScreenExtractError} />
        <Stack.Screen name='UploadScreenExtractMatch' component={UploadScreenExtractMatch} />


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
