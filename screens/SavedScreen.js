import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; // Added TouchableOpacity
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CinemaIcon, HomeIconNF, SavedIconFill, MoreIcon, } from './icons'; // Ensure other icons are imported if needed
import { useNavigation } from '@react-navigation/native';

const SavedScreen = () => {
  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
        <Text>This is SavedScreen</Text>

        <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
          <HomeIconNF />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('CinemaScreen')} style={styles.iconContainer}>
          <CinemaIcon />
          <Text  style={styles.iconText}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <SavedIconFill />
          <Text style={styles.iconTextSaved}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MoreScreen')} style={styles.iconContainer}>
          <MoreIcon />
          <Text style={styles.iconText}>More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    lineHeight: 16.8
  },
  iconTextSaved: {
    color: '#5303FF',
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    lineHeight: 16.8
  },
});
