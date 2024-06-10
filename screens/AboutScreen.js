import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Linking, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackIconWhite, BackIcon } from './icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const AboutSwing = [
  {
    id : 1,
    title : 'Who are we?',
    info : 'We are a people on a mission to induce ease and flexibility into the entertainment industry with our goal  being a corresponding data base that grants access to users, all over the globe.'
  },
  {
    id : 2,
    title : 'What do we do?',
    info : 'We control and promote a user-centered application that provides movie title, information and details via an upload of a 20-30 seconds video, which then leads to the provision of an accurate data analysis.'
  },
  {
    id : 3,
    title : 'Our Mission',
    info : 'To bring together people of interest and like-minds with the agenda of profering flexible solutions in entertainment and cinematic proportion.'
  },
]

const AboutScreen = () => {
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
        <Text style={[styles.ContactUsText, textStyle]}>About Swing</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.contents}>
        {AboutSwing.map((item, index) => (
          <View key={item.id}>
            <Text style={[styles.contentstxt1, textStyle]}>{item.title}</Text>
            <Text style={[styles.contentstxt2, textStyle]}>{item.info}</Text>
            {index !== AboutSwing.length - 1 && <View style={styles.separator2} />}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;

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
  separator2: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  contents: {
    margin: 20,
    marginTop: 50,
    gap: 40
  },
  contentstxt1: {
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
    marginBottom: 5,
  },
  contentstxt2: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    marginBottom: 10,
    marginTop: 10,
  },
});
