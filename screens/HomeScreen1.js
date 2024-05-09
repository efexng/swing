import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen1 = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current; // New animated value for scaling

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(rotateAnim, {
        toValue: 60,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true, // Use native driver for rotation animation
      }).start();
      setTimeout(() => {
        navigation.navigate('HomeScreen2');
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 3, // Scale factor, adjust as needed
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]).start();
      }, 1200);
    }, 500);

    return () => {};
  }, [fadeAnim, navigation, rotateAnim, scaleAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredView}>
          <Animated.Image
            source={require('../assets/logo.png')}
            style={[
              styles.image,
              {
                transform: [
                  { rotate: rotateAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '360deg'] }) },
                  { scale: scaleAnim },
                ],
                opacity: fadeAnim,
              },
            ]}
          />
        </View>

        <View style={styles.bottom}>
          <Text style={styles.text_bottom}>from</Text>
          <View style={styles.bottomContent}>
            <Image source={require('../assets/logo.png')} style={styles.logo_bottom} />
            <Text style={styles.bottomText}>Swing</Text>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default HomeScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    resizeMode: 'contain',
  },
  bottom: {
    alignItems: 'center',
  },
  text_bottom: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '200',
    color: '#fff',
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
    color: '#fff',
  },
});
