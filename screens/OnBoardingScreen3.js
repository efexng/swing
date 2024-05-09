import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const OnBoardingScreen3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Image source={require('../assets/Onboarding_background3.png')} style={styles.image} />
        <View style={styles.overlay}></View>
        <Text style={styles.text}>Get the best recommendation for all movies</Text>
        <View style={styles.paginationContainer}>
          <View style={styles.paginationEllipse}></View>
          <View style={styles.paginationEllipse}></View>
          <View style={[styles.paginationEllipse, styles.activeEllipse]}></View>
        </View>
        <TouchableOpacity  onPress={() => navigation.navigate('SignupScreen')} style={[styles.skipButton, { backgroundColor: '#5303FF' }]}>
          <Text style={styles.skipText}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('SignupScreen')} style={styles.signInButton}>
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
    backgroundColor: 'rgba(83, 3, 255, 0.4)', // Purple color with 40% opacity
  },
  text: {
    position: 'absolute',
      top: 120,
      left: 30,
      color: '#fff',
      fontSize: 30,
      padding: 10,
      lineHeight: 35,
      fontWeight: 'bold',
      width: 320,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 150,
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  paginationEllipse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  activeEllipse: {
    backgroundColor: '#5303FF', // Purple color
  },
  skipButton: {
    position: 'absolute',
    bottom: 70,
    paddingHorizontal: 150,
    paddingVertical: 20,
    borderRadius: 10,
  },
  skipText: {
    color: '#fff',
    fontSize: 18,
  },
  signInButton: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
