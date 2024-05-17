// OnBoardingScreen3.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';



const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';




const OnBoardingScreen3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Image 
         source={require('../assets/Onboarding_background3.png')}
         style={styles.image}
         placeholder={{ blurhash }}
         transition={1000}

          />
        <View style={styles.overlay}></View>
        <Text style={styles.text}>Get the best recommendation for all movies</Text>
        <View style={styles.paginationContainer}>
          <View style={styles.paginationEllipse}></View>
          <View style={styles.paginationEllipse}></View>
          <View style={[styles.paginationEllipse, styles.activeEllipse]}></View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={[styles.skipButton, { backgroundColor: '#5303FF' }]}>
          <Text style={styles.skipText}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={styles.signInButton}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 450,
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Purple color with 40% opacity
  },
  text: {
    position: 'absolute',
    top: 120,
    left: 30,
    color: '#fff',
    fontSize: 28,
    padding: 10,
    lineHeight: 34,
    fontWeight: 'bold',
    width: 300,
    fontFamily: 'Outfit_700Bold',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 180,
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  paginationEllipse: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  activeEllipse: {
    backgroundColor: '#5303FF', // Purple color
  },
  skipButton: {
    position: 'absolute',
    bottom: 110,
    width: 343,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit_500Medium',
  },
  signInButton: {
    position: 'absolute',
    bottom: 50,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit_500Medium'
  },
});
