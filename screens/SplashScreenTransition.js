import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreenTransition = () => {
  const navigation = useNavigation();
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0.5)).current;
  const rotateAnim1 = useRef(new Animated.Value(30)).current;
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(rotateAnim1, {
        toValue: 60,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim2, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(backgroundColorAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setTimeout(() => {
            navigation.navigate('OnBoardingScreen1');
          }, 2000);
        });
      }, 900);
    }, 500);
  }, [fadeAnim1, fadeAnim2, scaleAnim2, navigation, rotateAnim1, backgroundColorAnim]);

  const backgroundColorInterpolate = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#17191C', '#FFFFFF'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, { backgroundColor: backgroundColorInterpolate }]}>
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
      </Animated.View>
    </View>
  );
};

export default SplashScreenTransition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
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
