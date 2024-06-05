import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
import * as Linking from 'expo-linking';

const TicketPurchaseModal = ({ visible, onClose, startTimer, resetSelectedTime }) => {
    const rotation = useSharedValue(0);
    const [redirecting, setRedirecting] = useState(false);

    const config = {
        duration: 2000,
        easing: Easing.linear,
    };

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

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Ticket Purchase Redirect</Text>
                    <View style={styles.separator} />
                    <Text style={styles.modalText2}>Swing is redirecting you to{' '}<Text style={styles.specialText}>SILVERBIRD ENTERTAINMENT CENTER</Text> website to complete your ticket purchase.</Text>
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
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '80%',
        elevation: 5,
    },
    modalText: {
        textAlign: 'center',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 22
    },
    modalText2: {
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
    },
    specialText: {
        textAlign: 'center',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: 'rgba(71, 84, 103, 1)'
    },
    separator: {
        width: 343,
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#fff',
        width: 311,
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
