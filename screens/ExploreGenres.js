import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExploreGenres = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const isGenreSelected = (genre) => selectedGenres.includes(genre);

  const genreData = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Documentary' },
    { id: 4, name: 'Horror' },
    { id: 5, name: 'Sci-Fi' },
    { id: 6, name: 'Romance' },
    { id: 7, name: 'Thriller' },
    { id: 8, name: 'Fantasy' },
    { id: 9, name: 'Drama' },
    { id: 10, name: 'Animation' },
    { id: 11, name: 'Adventure' },
    { id: 12, name: 'Crime' },
    { id: 13, name: 'Mystery' },
    { id: 14, name: 'Musical' },
    { id: 15, name: 'Western' },
    { id: 16, name: 'Biography' },
    { id: 17, name: 'Family' },
    { id: 18, name: 'History' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hr} />
      <Text style={styles.title}>Explore Your Favorite Movie Genres for Personalized Recommendations!</Text>
      <ScrollView contentContainerStyle={styles.genreContainer}>
        {genreData.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[
              styles.genreBox,
              isGenreSelected(genre.name) && styles.selectedGenre,
            ]}
            onPress={() => toggleGenre(genre.name)}
          >
            <Text style={[styles.genreText, isGenreSelected(genre.name) && styles.selectedGenreText]}>
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.hr} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <Text style={styles.modaltext1}>Swing needs access to your current location to enable and connect cinemas near you.</Text>
            <Image source={require('../assets/location.png')} style={styles.location} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeScreen');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButton}>Allow Full Access</Text>
            </TouchableOpacity>
            <View style={styles.hr} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeScreen');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButton}>Allow While Using the App</Text>
            </TouchableOpacity>
            <View style={styles.hr} />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonDanger}>Don't Allow</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hr: {
    borderWidth: 1,
    borderColor: '#DCE1E5',
    width: '100%',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Outfit_500Medium',
    marginTop: 10,
    marginBottom: 20,
    marginTop: 20,
    margin: 20,
    color: 'rgba(58, 58, 58, 1)'
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center', // Added alignItems property
  },
  
  genreBox: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    minWidth: 100, // Minimum width for the genre box
    maxWidth: '40%', // Maximum width as a percentage of the container
    height: 50,
    borderWidth: 1,
    borderColor: '#DCE1E5',
  },
  
  genreText: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    color: 'rgba(67, 67, 74, 1)',
  },
  selectedGenre: {
    borderWidth: 0,
    backgroundColor: '#5303FF',
  },
  selectedGenreText: {
    color: '#fff', // White text color when selected
    fontFamily: 'Outfit_600SemiBold', 
    fontSize: 14,
  },
  button: {
    backgroundColor: '#5303FF',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    width: '90%',
    margin: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold' 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 400,
    borderRadius: 5,
  },
  location: {
    width: 400,
    height: 250,
  },
  modaltext1: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    textAlign: 'center',
    color: '#000',
    marginBottom: 30,
    marginTop: 30,
    margin: 20,
  },
  modalButton: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    textAlign: 'center',
    color: '#5303FF',
    marginTop: 15,
    marginBottom: 5,
  },
  modalButtonDanger: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    marginBottom: 40,
  },
});

export default ExploreGenres;
