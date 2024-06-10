import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Linking, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackIconWhite, BackIcon, EmailIcon, PhonecallIcon, InstagramIcon, FacebookIcon, XIcon } from './icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const ContactScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
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

  const containerStyle = isDarkMode ? styles.containerDark : styles.container;
  const textStyle = isDarkMode ? styles.textDark : styles.text;
  const contactInfoBackground = isDarkMode ? 'rgba(34, 34, 37, 1)' : 'white';
  const socialMediaBackground = isDarkMode ? 'rgba(34, 34, 37, 1)' : 'white';

  return (
    <SafeAreaView style={containerStyle}>
     <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {isDarkMode ? <BackIconWhite /> : <BackIcon />}
      </TouchableOpacity>
      <Text style={[styles.ContactUsText, textStyle]}>Contact Us</Text>
    </View>
      <View style={styles.separator} />
      <View style={styles.descriptioncontents}>
        <Text style={[styles.description, textStyle]}>
          If you have any inquiries or complaints, get in touch with us. We will be glad to help.
        </Text>
      </View>
      <View style={[styles.contactInfo, { backgroundColor: contactInfoBackground }]}>
        <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('tel:07034567890')}>
          <View style={styles.iconBackground}>
            <PhonecallIcon />
          </View>
          <Text style={[styles.contactText, textStyle]}>07034567890</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('mailto:help@swing.com')}>
          <View style={styles.iconBackground}>
            <EmailIcon />
          </View>
          <Text style={[styles.contactText, textStyle]}>help@swing.com</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.socialMedia, { backgroundColor: socialMediaBackground }]}>
        <Text style={[styles.sectionHeader, textStyle]}>SOCIAL MEDIA HANDLES</Text>
        <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('https://facebook.com/Swingofficial')}>
          <View style={styles.iconBackground}>
            <FacebookIcon />
          </View>
          <Text style={[styles.contactText, textStyle]}>Swingofficial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('https://instagram.com/Swingofficial')}>
          <View style={styles.iconBackground}>
            <InstagramIcon />
          </View>
          <Text style={[styles.contactText, textStyle]}>Swingofficial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('https://twitter.com/Swingofficial_')}>
          <View style={styles.iconBackground}>
            <XIcon />
          </View>
          <Text style={[styles.contactText, textStyle]}>Swingofficial_</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  containerDark: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(23,25,28,255)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  ContactUsText: {
    fontSize: 16,
    fontFamily: 'Outfit_500Medium',
    textAlign: 'center',
    flex: 1,
  },
  textDark: {
    color: '#fff'
  },
  text: {
    color: 'black'
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    width: '100%',
    alignSelf: 'center',
  },
  descriptioncontents: {
    margin: 20
  },
  description: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    color: 'rgba(255, 255, 255, 1)', // White text color
  },
  contactInfo: {
    margin: 20,
    width: screenWidth > 375 ? 383 : 343,
    height: 138,
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Outfit_600SemiBold',
    color: 'rgba(255, 255, 255, 1)', // White text color
  },
  socialMedia: {
    margin: 20,
    marginBottom: 32,
    width: screenWidth > 375 ? 383 : 343,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
    color: 'rgba(255, 255, 255, 1)', // White text color
    marginBottom: 20,
  },
  iconBackground: {
    backgroundColor: 'rgba(238, 233, 254, 1)',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
