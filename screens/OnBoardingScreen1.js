import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnBoardingScreen1 = () => {
  const navigation = useNavigation();
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(0.5), // Change the easing function here
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: animValue }]}>
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
    </Animated.View>
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
    backgroundColor: 'rgba(83, 3, 255, 0.4)', // Purple color with 40% opacity
  },
  text: {
    position: 'absolute',
    top: 120,
    left: 30,
    color: '#fff',
    fontSize: 20,
    padding: 10,
    lineHeight: 25,
    fontWeight: 'bold',
    width: 272,
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
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  skipText: {
    color: '#5303FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnBoardingScreen1;
