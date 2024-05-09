import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Easing } from 'react-native'; // Import Animated and Easing
import OnBoardingScreen1 from './OnBoardingScreen1'; // Import your OnBoardingScreen1 component

const HomeScreen2 = () => {
  const [showOnBoarding, setShowOnBoarding] = useState(false);

  const fadeInAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.2); // Initial scale value set to 0.2 (very small)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 300, // Reduced duration for faster fade-in
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Zoom to normal size
        duration: 350, // Duration for quick zooming to normal size
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const timer = setTimeout(() => {
        setShowOnBoarding(true);
      }, 1000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer); // Cleanup function to clear the timer on unmounting
    });
  }, []);

  if (showOnBoarding) {
    return <OnBoardingScreen1 />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.centeredView, { opacity: fadeInAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
        <Text  style={styles.logotext}>SWING</Text>
      </Animated.View>
      
      <View style={styles.bottom}>
        <Text style={styles.text_bottom}>from</Text>
        <View style={styles.bottomContent}>
          <Image source={require('../assets/logo.png')} style={styles.logo_bottom} />
          <Text style={styles.bottomText}>Swing</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain', // Corrected from 'objectFit'
  },
  bottom: {
    alignItems: 'center',
  },
  text_bottom: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '200', // Corrected from 200
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  logo_bottom: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  bottomText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logotext: {
    fontSize: 50,
    margin: 20,
    fontWeight: 'bold',
    color: '#5303FF',
  }
});
