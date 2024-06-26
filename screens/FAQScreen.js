import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackIconWhite, BackIcon } from './icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const FAQ = [
  {
    id : 1,
    title : 'Can I download selected movies on Swing?',
    info : 'No, you cannot. Swing is strictly designed to meet user’s needs when it comes to providing the movie titles and details you are in search of. However, we can lead you to cinemas, website or streaming app where you can watch your preferred movie.'
  },
  {
    id : 2,
    title : 'Can I upload more than one videos for the search?',
    info : 'Yes, you can upload two videos on the go while our system do the appropriate search.'
  },
  {
    id : 3,
    title : 'Is it mandatory I make my cinema ticket payment via Swing?',
    info : 'No, it is not mandatory. We however advise the ticket payment on the app to foster ease and flexibility.'
  },
  {
    id : 4,
    title : 'Are there any other payment that should  be made aside the ticket option?',
    info : 'No, there aren’t. You are only expected to make your cinema ticket payment which is also optional.'
  },
]

const FAQScreen = () => {
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
        <Text style={[styles.ContactUsText, textStyle]}>FAQ</Text>
      </View>
      <View style={styles.separator} />
    <ScrollView>
    <View style={styles.contents}>
      {FAQ.map((item, index) => (
        <View key={item.id}>
          <View style={styles.titleContainer}>
            <Text style={[styles.contentstxt3, textStyle]}>
              {item.id}. 
            </Text>
            <Text style={[styles.contentstxt1, styles.titleText, textStyle]}>
              {item.title}
            </Text>
          </View>
          <Text style={[styles.contentstxt2, textStyle]}>
            {item.info}
          </Text>
          {index !== FAQ.length - 1 && <View style={styles.separator2} />}
        </View>
          ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;

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
    height: 1,
    backgroundColor: 'gray',
    width: '100%',
    alignSelf: 'center',
  },
  separator2: {
    height: 1,
    backgroundColor: 'gray',
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
    marginLeft: 8,
  },
  contentstxt2: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20
  },
  titleContainer: {
    flexDirection: 'row',
  },
  contentstxt3: {
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
  },
});
