import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

const TicketPurchaseModal = ({ visible, onClose, startTimer, resetSelectedTime }) => {
    const rotation = useSharedValue(0);
    const [redirecting, setRedirecting] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const config = {
        duration: 2000,
        easing: Easing.linear,
    };


  useEffect(() => {
    // Load dark mode state from AsyncStorage
    const loadDarkModeState = async () => {
      try {
        const darkModeState = await AsyncStorage.getItem('darkModeState');
        if (darkModeState !== null) {
          setIsDarkMode(JSON.parse(darkModeState));
        }
      } catch (error) {
        console.error('Error loading dark mode state:', error);
      }
    };

    loadDarkModeState();
  }, []);

    useEffect(() => {
        let rotationAnimation;

        if (startTimer) {
            rotationAnimation = withRepeat(withTiming(360, config), -1); // Start rotation animation
            rotation.value = rotationAnimation; // Assign animation to the shared value
            // Set a timer for 5 seconds
            const timer = setTimeout(() => {
                setRedirecting(true);
            }, 5000);

            // Clear the timer when the component unmounts or when startTimer becomes false
            return () => {
                clearTimeout(timer);
                rotation.value = 0; // Reset rotation value when unmounting or startTimer changes
            };
        }
    }, [startTimer]);

    useEffect(() => {
        // Redirect when 'redirecting' state is true
        if (redirecting) {
            Linking.openURL('https://silverbirdcinemas.com/movie/kung-fu-panda-4/');
            onClose(); // Close the modal after redirection
            resetSelectedTime(); // Reset selected time
        }
    }, [redirecting]);

    const circles = Array.from({ length: 12 }).map((_, index) => {
        const angle = (index / 12) * (2 * Math.PI);
        const x = Math.cos(angle) * 30;
        const y = Math.sin(angle) * 30;

        const animatedStyle = useAnimatedStyle(() => {
            const primaryIndex = Math.floor((rotation.value / 360) * 12) % 12;
            const secondaryIndex = (primaryIndex + 11) % 12;

            let backgroundColor = 'rgba(217, 217, 217, 1)';
            if (primaryIndex === index) {
                backgroundColor = '#5303FF';
            } else if (secondaryIndex === index) {
                backgroundColor = 'rgba(123, 83, 255, 1)';
            }

            return {
                backgroundColor,
            };
        });

        return (
            <Animated.View
                key={index}
                style={[
                    styles.tinyCircle,
                    {
                        top: 40 + y,
                        left: 40 + x,
                    },
                    animatedStyle,
                ]}
            />
        );
    });


  const centeredViewStyle = isDarkMode ? [styles.centeredView, styles.darkcenteredView] : styles.centeredView;
  const modalViewStyle = isDarkMode ? [styles.modalView, styles.darkmodalView] : styles.modalView;
  const textStyle = isDarkMode ? styles.textDark : styles.modalText;
  const textStyle2 = isDarkMode ? styles.textDark2 : styles.modalText2;
  const specialTextStyle = isDarkMode ? styles.darkspecialText : styles.specialText;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={centeredViewStyle}>
                <View style={modalViewStyle}>
                    <Text style={textStyle}>Ticket Purchase Redirect</Text>
                    <View style={styles.separator} />
                    <Text style={textStyle2}>Swing is redirecting you to{' '}<Text style={specialTextStyle}>SILVERBIRD ENTERTAINMENT CENTER</Text> website to complete your ticket purchase.</Text>
                    <View style={styles.spinnercontainer}>
                        <View style={styles.spinner}>{circles}</View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    darkcenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light white background with some opacity
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
    },
    textDark: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 22,
        padding: 10,
    },
    darkmodalView: {
        backgroundColor: 'rgba(23,25,28,255)',
        borderRadius: 20,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        textAlign: 'center',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 22,
        padding: 10,
    },
    modalText2: {
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        padding: 10,
    },
    textDark2: {
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        padding: 10,
        color: '#fff'
    },
    specialText: {
        textAlign: 'center',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: 'rgba(71, 84, 103, 1)',
    },
    darkspecialText: {
        textAlign: 'center',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: '##D9D9D9',

    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#fff',
        width: '100%',
        height: 44,
        borderRadius: 5,
        borderColor: 'rgba(208, 213, 221, 1)',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontFamily: 'Outfit_400Regular',
        color: 'rgba(52, 64, 84, 1)',
        fontSize: 16,
    },
    spinnercontainer: {
        marginBottom: 20,
    },
    spinner: {
        width: 80,
        height: 80,
        position: 'relative',
    },
    tinyCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: 'absolute',
        borderColor: 'white',
        borderWidth: 1,
    },
});

export default TicketPurchaseModal;
