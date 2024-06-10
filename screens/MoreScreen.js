import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CinemaIcon, HomeIconNF, SavedIcon, MoreIconFill, SignoutIcon, CinemaIconWhite, HomeIconWhite, SavedIconWhite, MoreIconFillWhite, SignoutIconWhite } from './icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const MoreScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleSwitch = async () => {
    try {
      // Toggle dark mode state
      setIsDarkMode(previousState => !previousState);
      // Save dark mode state to AsyncStorage
      await AsyncStorage.setItem('darkModeState', JSON.stringify(!isDarkMode));
    } catch (error) {
      console.error('Error saving dark mode state:', error);
    }
  };

  const containerStyle = isDarkMode ? [styles.container, styles.darkContainer] : styles.container;
  const textStyle = isDarkMode ? [styles.headercontenttxt, styles.darkText] : styles.headercontenttxt;
  const profileTextStyle = isDarkMode ? [styles.profilecontentstxt, styles.darkText] : styles.profilecontentstxt;
  const optionTextStyle = isDarkMode ? [styles.optionText, styles.darkText] : styles.optionText;
  const profileContentsStyle = isDarkMode ? [styles.profilecontents, styles.darkProfileContents] : styles.profilecontents;
  const bottomContainerStyle = isDarkMode ? [styles.bottomContainer, styles.darkBottomContainer] : styles.bottomContainer;
  const profileContentSeparatorStyle = isDarkMode ? [styles.profilecontentseparator, styles.darkProfileContentSeparator] : styles.profilecontentseparator;
  const profileContentSeparator2Style = isDarkMode ? [styles.profilecontentseparator2, styles.darkProfileContentSeparator2] : styles.profilecontentseparator2;
  const separatorStyle = isDarkMode ? [styles.separator, styles.darkSeparator] : styles.separator;

  const iconTextStyle = isDarkMode ? [styles.iconText, styles.darkIconText] : styles.iconText;

  return (
    <SafeAreaView style={containerStyle}>
      <View style={separatorStyle} />

      <View style={styles.headercontent}>
        <Text style={textStyle}>More</Text>
      </View>

      <View style={styles.profilecontent}>
        <Text style={profileTextStyle}>Profile</Text>
        <View style={profileContentsStyle}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={optionTextStyle}>Your Profile</Text>
          </TouchableOpacity>
          <View style={profileContentSeparatorStyle} />
          <View style={styles.option}>
            <Text style={optionTextStyle}>Dark Mode</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#5303FF' }}
              thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="rgba(214, 214, 216, 1)"
              onValueChange={toggleSwitch}
              value={isDarkMode}
              style={styles.switch}
            />
          </View>
          <View style={profileContentSeparator2Style} />
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('NotificationScreen')}>
            <Text style={optionTextStyle}>Notifications</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profilecontent}>
        <Text style={profileTextStyle}>Support</Text>
        <View style={profileContentsStyle}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ContactScreen')}>
            <Text style={optionTextStyle}>Contact Us</Text>
          </TouchableOpacity>
          <View style={profileContentSeparatorStyle} />
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AboutScreen')}>
            <Text style={optionTextStyle}>About Swing</Text>
          </TouchableOpacity>
          <View style={profileContentSeparator2Style} />
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FAQScreen')}>
            <Text style={optionTextStyle}>FAQ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.siginoutbtn}>
        <TouchableOpacity  onPress={() => navigation.navigate('SignupScreen')} style={styles.siginoutbtncontents}>
          <SignoutIcon />
          <Text style={styles.siginoutbtncontentstxt}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={bottomContainerStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
          {isDarkMode ? <HomeIconWhite /> : <HomeIconNF />}
          <Text style={iconTextStyle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CinemaScreen')} style={styles.iconContainer}>
          {isDarkMode ? <CinemaIconWhite /> : <CinemaIcon />}
          <Text style={iconTextStyle}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SavedScreen')} style={styles.iconContainer}>
          {isDarkMode ? <SavedIconWhite /> : <SavedIcon />}
          <Text style={iconTextStyle}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <MoreIconFill />
          <Text style={styles.iconTextMore}>More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: 'rgba(23,25,28,255)',
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  darkSeparator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(23,25,28,255)',
  },
  headercontent: {
    margin: 20,
    marginTop: 30,
  },
  headercontenttxt: {
    fontSize: 22,
    fontFamily: 'Outfit_700Bold',
    color: 'rgba(81, 79, 79, 1)',
  },
  darkText: {
    color: 'white',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    borderTopColor: 'black',
  },
  darkBottomContainer: {
    backgroundColor: '#17161a',
    shadowColor: 'rgba(245, 245, 245, 0.1)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1.25,
    shadowRadius: 7.84,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  iconText: {
    color: '#17161A',
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
  },
  darkIconText: {
    color: 'white',
  },
  iconTextMore: {
    color: '#5303FF',
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
  },
  profilecontent: {
    margin: 20,
    width: screenWidth > 375 ? 383 : 343,
  },
  profilecontentstxt: {
    fontSize: 18,
    fontFamily: 'Outfit_600SemiBold',
    marginBottom: 10,
  },
  profilecontents: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  darkProfileContents: {
    backgroundColor: '#333',
  },
  profilecontentseparator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    width: screenWidth > 375 ? 383 : 343,
    alignSelf: 'center',
  },
  darkProfileContentSeparator: {
    borderBottomWidth: 1.5,
  },
  profilecontentseparator2: {
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    width: screenWidth > 375 ? 383 : 343,
    alignSelf: 'center',
  },
  darkProfileContentSeparator2: {
    borderBottomWidth: 1.5,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
  switch: {
    marginLeft: 'auto',
  },
  siginoutbtn: {
    alignSelf: 'center',
    marginVertical: 50,
  },
  siginoutbtncontents: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  siginoutbtncontentstxt: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
});
