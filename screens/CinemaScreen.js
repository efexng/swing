import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CinemaScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
    <Text>This is cinema</Text>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="home" size={30} color="#17161A" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="film" size={30} color="#5303FF" />
          <Text style={styles.iconTextCinema}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('SavedScreen')}>
          <Ionicons name="bookmark-outline" size={30} color="#17161A" />
          <Text style={styles.iconText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('MoreScreen')}>
          <Ionicons name="ellipsis-horizontal-outline" size={30} color="#17161A" />
          <Text style={styles.iconText}>More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CinemaScreen;

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
    marginTop: 5,
  },
  iconTextCinema: {
    color: '#5303FF',
    marginTop: 5,
  },
});
