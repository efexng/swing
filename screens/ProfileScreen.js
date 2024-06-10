import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackIconWhite, BackIcon, ChevronDownICon, ChevronDownIConWhite, ChevronUpICon, ChevronUpIConWhite } from './icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const FAQ = [
  {
    id: 1,
    name: 'Ebelechukwu Daniels',
    email: 'Ebelechukwudaniels@gmail.com',
    location: 'WV10 0JT'
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;

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

  

  const toggleDropdown = () => {
    const toValue = isDropdownVisible ? 0 : 1;
    setIsDropdownVisible(!isDropdownVisible);
    Animated.timing(rotationAnim, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const containerStyle = isDarkMode ? styles.containerDark : styles.container;
  const textStyle = isDarkMode ? styles.textDark : styles.text;

  const rotateIcon = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '180deg'],
  });

  return (
    <SafeAreaView style={containerStyle}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {isDarkMode ? <BackIconWhite /> : <BackIcon />}
        </TouchableOpacity>
        <Text style={[styles.ContactUsText, textStyle]}>Your Profile</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.contents}>
        {FAQ.map((item) => (
          <View key={item.id}>
            <View style={styles.profileinfo}>
              <View style={styles.profileinfoname}>
                <Text style={[styles.contentstxt1, textStyle]}>Name</Text>
                <View style={styles.sub1}>
                  <Text style={[styles.contentstxt2, textStyle]}>{item.name}</Text>
                  <View style={[styles.separator2, { borderBottomColor: isDarkMode ? 'gray' : 'white' }]} />
                </View>
              </View>
              <View style={styles.profileinfoemail}>
                <Text style={[styles.contentstxt1, textStyle]}>Email</Text>
                <View style={styles.sub1}>
                  <Text style={[styles.contentstxt2, textStyle]}>{item.email}</Text>
                  <View style={[styles.separator2, { borderBottomColor: isDarkMode ? 'gray' : 'white' }]} />
                </View>
              </View>
              <View style={styles.profileinfolocation}>
                <Text style={[styles.contentstxt1, textStyle]}>Location</Text>
                <View style={styles.sub1}>
                  <TouchableOpacity style={styles.sub} onPress={toggleDropdown}>
                    <Text style={[styles.contentstxt2, textStyle]}>{item.location}</Text>
                    <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
                      {isDarkMode ? <ChevronDownIConWhite /> : <ChevronDownICon />}
                    </Animated.View>
                  </TouchableOpacity>
                  {isDropdownVisible && (
                    <View style={styles.dropdown}>
                      <Text style={[styles.dropdownText, textStyle]}>Additional location info here</Text>
                    </View>
                  )}
                  <View style={[styles.separator2, { borderBottomColor: isDarkMode ? 'gray' : 'white' }]} />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
    borderBottomWidth: 0.8,
    borderBottomColor: 'gray',
    width: screenWidth > 375 ? 261 : 241,
    alignSelf: 'center',
    marginTop: 15
  },
  sub: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  contents: {
    margin: 20,
    marginTop: 30,
  },
  profileinfo: {
    flexDirection: 'column',
    gap: 10,
  },
  profileinfoname: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profileinfoemail: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profileinfolocation: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  contentstxt1: {
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
    width: 100,
    marginBottom: 20,
  },
  contentstxt2: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
  sub1: {
    flexDirection: 'column',
  },
  dropdown: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
});
