import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnBoardingScreen1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Image source={require('../assets/Onboarding_background1.png')} style={styles.image} />
        <View style={styles.overlay}></View>
        <Text style={styles.text}>Couldn't figure out a movie title? We've got you.</Text>
        <View style={styles.paginationContainer}>
          <View style={[styles.paginationEllipse, styles.activeEllipse]}></View>
          <View style={styles.paginationEllipse}></View>
          <View style={styles.paginationEllipse}></View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('OnBoardingScreen2')} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    fontSize: 25,
    padding: 10,
    fontFamily: 'Outfit_600SemiBold',
    width: 300,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 120,
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
    bottom: 70,
    backgroundColor: '#fff',
    width: 78,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  skipText: {
    color: '#5303FF',
    fontSize: 16,
    fontFamily: 'Outfit_500Medium'
  },
});

export default OnBoardingScreen1;
