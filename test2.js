import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreenTransition = () => {
  const navigation = useNavigation();
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0.5)).current; // Initial scale for SplashScreen2
  const rotateAnim1 = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(rotateAnim1, {
        toValue: 60,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim2, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]).start(() => {
          navigation.navigate('OnBoardingScreen1');
        });
      }, 1200);
    }, 500);
  }, [fadeAnim1, fadeAnim2, scaleAnim2, navigation, rotateAnim1]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.absoluteFill, { opacity: fadeAnim1 }]}>
        <View style={styles.centeredView}>
          <Animated.Image
            source={require('../assets/logo_black.png')}
            style={[
              styles.image,
              {
                transform: [
                  { rotate: rotateAnim1.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '360deg'] }) },
                ],
              },
            ]}
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.absoluteFill, { opacity: fadeAnim2, transform: [{ scale: scaleAnim2 }] }]}>
        <View style={styles.centeredView}>
          <Image source={require('../assets/logo.png')} style={styles.image} />
          <Text style={styles.logotext}>SWING</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreenTransition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17191C',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 152,
    height: 150,
    resizeMode: 'contain',
  },
  bottom: {
    alignItems: 'center',
  },
  logotext: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 32,
    color: 'rgba(83, 3, 255, 1)',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  }
});
