import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleSignup = () => {
    const hasSpaces = /\s/.test(email); // Check if email has spaces
    const isValidFormat = /\S+@\S+\.\S+/.test(email); // Check if email format is valid
    const validDomains = /\.(com|org|net|edu|gov)$/i; // List of valid domain extensions
  
    setIsValidEmail(
      !hasSpaces &&
      isValidFormat &&
      validDomains.test(email.toLowerCase()) // Check if email ends with a valid domain
    );
  
    if (!hasSpaces && isValidFormat && validDomains.test(email.toLowerCase())) {
      setIsButtonEnabled(true);
      navigation.navigate('ExploreGenres');
      // Implement your signup logic here
    } else {
      setIsButtonEnabled(false); // Disable the button if email has spaces, format is invalid, or domain is invalid
    }
  };
  
  
  


  const handleForgotPassword = () => {
    // Implement your forgot password logic here
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsButtonEnabled(false); // Disable the button whenever the email is changed
    setIsValidEmail(true); // Clear error when user starts typing
  };


  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.containerlogin}>
        <Text style={styles.login}>Log in or Sign up</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !isValidEmail && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        {!isValidEmail && (
          <Ionicons name="alert-circle-outline" size={24} color="red" style={styles.errorIcon} />
        )}
      </View>
      {!isValidEmail && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>Invalid email address</Text>
        </View>
      )}

      <TouchableOpacity
  style={[
    styles.ctabutton,
    (email.trim().length === 0 || !isValidEmail) && styles.ctabuttonDisabled, // Check if button should be disabled
  ]}
  onPress={handleSignup}
  disabled={email.trim().length === 0 || !isValidEmail} // Disable button based on conditions
>
  <Text style={styles.ctaText}>Continue</Text>
</TouchableOpacity>


      
      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>or</Text>
        <View style={styles.line}></View>
      </View>

      {/* Buttons for continuing with Google and Apple */}
      <TouchableOpacity style={styles.socialButton} onPress={handleSignup}>
        <Image source={require('../assets/google.png')} style={styles.socialImage} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton2} onPress={handleSignup}>
        <Image source={require('../assets/apple.png')} style={styles.socialImage} />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ForgotButton} onPress={handleForgotPassword}>
        <Text style={styles.ForgotbuttonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up, you are creating a Swing account and agree to Swing's
          <Text style={styles.blueText}> Terms</Text> and <Text style={styles.blueText}>Privacy Policy</Text>
        </Text>
      </View>
      
    </SafeAreaView>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  login: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  containerlogin: {
    margin: 20,
  },
  inputContainer: {
    position: 'relative',
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DCE1E5',
    borderRadius: 5,
    width: '100%',
    height: 50,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#DCE1E5',
  },
  inputError: {
    borderColor: 'red', // Red border for input on error
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    width: '90%', // Set width to match input
    marginBottom: 20,
  },
  errorIcon: {
    position: 'absolute',
    top: '50%', // Position the icon at the center vertically
    right: 10,
    transform: [{ translateY: -12 }], // Adjust this value based on the icon size to center it vertically
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    position: 'absolute',
    top: '50%', // Position the icon at the center vertically
    left: 10,
    transform: [{ translateY: -12 }], // Adjust this value based on the icon size to center it vertically
  },
  ctabutton: {
    backgroundColor: '#5303FF',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    height: 50,
    width: '90%',
  },
  ctabuttonDisabled: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 10,
    borderWidth: 2,
    borderColor: '#DCE1E5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    height: 50,
    width: '90%',
    color: 'gray',
  },
  ctaTextDisabled: {
    color: '#999', // You can change this color to your preferred disabled text color
    fontSize: 16,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    height: 50,
    width: '90%',
  },
  socialButton2: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 10,
    borderWidth: 2,
    borderColor: '#DCE1E5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    height: 50,
    width: '90%',
  },
  ForgotButton: {
    flexDirection: 'row',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    width: '90%',
    margin: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  ForgotbuttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#DCE1E5',
    marginHorizontal: 5, // Adjust this value to increase/decrease spacing between lines
  },
  orText: {
    marginHorizontal: 10, // Adjust this value for spacing between "or" text and lines
    fontSize: 16,
    color: 'black',
  },
  termsContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    margin: 20,
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },
  blueText: {
    color: '#5303FF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
})
