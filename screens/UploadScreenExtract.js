import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const textData = [
  {
    id: 1,
    text: 'Extracting frames from the video',
  },
  {
    id: 2,
    text: 'Looking for a match almost there',
  },
  {
    id: 3,
    text: 'Comparing patterns with database',
  },
];

const UploadScreen = () => {
  const navigation = useNavigation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heights = [
    useSharedValue(20), // Initial height of 20
    useSharedValue(20),
    useSharedValue(20),
  ];

  const config = {
    duration: 1000, // Adjust the duration as needed
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const circleStyle = (index) =>
    useAnimatedStyle(() => ({
      width: 16,
      height: withTiming(heights[index].value, config),
      borderRadius: 20,
      marginTop: index === 0 ? 0 : withTiming(-20, config),
      marginBottom: index === 0 ? 0 : withTiming(-20, config),
    }));

  useEffect(() => {
    const animateSequence = async () => {
      for (let i = 0; i < heights.length; i++) {
        heights[i].value = 100; // Set height to 100 for each circle
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for 300ms
      }
      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for 300ms before reversing

      for (let i = heights.length - 1; i >= 0; i--) {
        heights[i].value = 20; // Set back to initial height
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for 300ms
        if (i === 2) {
          setCurrentTextIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
        }
      }

      // Wait for 2 seconds before restarting the animation sequence
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Repeat the animation sequence
      animateSequence();
    };

    animateSequence();

    const timeout = setTimeout(() => {
        navigation.navigate('UploadScreenExtractMatch'); // Replace 'UploadScreenExtractError' with your actual screen name
      }, 10000);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.uploadBoxContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={24} color="white" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.circlesContainer}>
        {heights.map((_, index) => (
          <Animated.View key={index} style={[styles.circle, circleStyle(index)]} />
        ))}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{textData[currentTextIndex].text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5303FF',
  },
  uploadBoxContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(83, 3, 255, 0.8)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  circlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  circle: {
    width: 40,
    backgroundColor: 'white',
    marginHorizontal: 5,
    zIndex: 2,
  },
  textContainer: {
    position: 'absolute',
    top: 'auto',
    bottom: '30%',
    zIndex: 2,
  },
  text: {
    marginTop: 20,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    zIndex: 2,
    fontFamily: 'Outfit_400Regular'
  },
});

export default UploadScreen;
