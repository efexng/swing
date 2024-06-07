import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CinemaIcon, HomeIconNF, SavedIcon, MoreIconFill, SignoutIcon } from './icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const MoreScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.separator} />

      <View style={styles.headercontent}>
        <Text style={styles.headercontenttxt}>More</Text>
      </View>

      <View style={styles.profilecontent}>
        <Text style={styles.profilecontentstxt}>Profile</Text>
        <View style={styles.profilecontents}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.optionText}>Your Profile</Text>
          </TouchableOpacity>
          <View style={styles.profilecontentseparator} />
          <View style={styles.option}>
            <Text style={styles.optionText}>Dark Mode</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#5303FF' }}
              thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="rgba(214, 214, 216, 1)"
              onValueChange={toggleSwitch}
              value={isDarkMode}
              style={styles.switch}
            />
          </View>
          <View style={styles.profilecontentseparator2} />
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profilecontent}>
        <Text style={styles.profilecontentstxt}>Support</Text>
        <View style={styles.profilecontents}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.optionText}>Contact Us</Text>
          </TouchableOpacity>
          <View style={styles.profilecontentseparator} />
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.optionText}>About Swing</Text>
          </TouchableOpacity>
          <View style={styles.profilecontentseparator2} />
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.optionText}>FAQ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.siginoutbtn}>
        <TouchableOpacity style={styles.siginoutbtncontents}>
          <SignoutIcon />
          <Text style={styles.siginoutbtncontentstxt}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
          <HomeIconNF />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CinemaScreen')} style={styles.iconContainer}>
          <CinemaIcon />
          <Text style={styles.iconText}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SavedScreen')} style={styles.iconContainer}>
          <SavedIcon />
          <Text style={styles.iconText}>Save</Text>
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
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
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
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  iconText: {
    color: '#17161A',
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    lineHeight: 16.8,
  },
  iconTextMore: {
    color: '#5303FF',
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    lineHeight: 16.8,
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
  profilecontentseparator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 8,
    width: screenWidth > 375 ? 383 : 343,
  },
  profilecontentseparator2: {
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 8,
    width: screenWidth > 375 ? 383 : 343,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
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
  },
});
