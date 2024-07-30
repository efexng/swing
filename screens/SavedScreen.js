import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CinemaIcon, HomeIconNF, SavedIconFill, MoreIcon, SearchIcon,SearchIconWhite, EllipseVerticalSavedIcon, ModalShareIcon, ModalFlagIcon, TrashIcon, CinemaIconWhite, HomeIconWhite, MoreIconFillWhite, ModalFlagIconWhite, ModalShareIconWhite } from './icons';
import { useNavigation } from '@react-navigation/native';



const Movies = [
  {
    id: 1,
    image: require('../assets/Match1.png'),
    title: 'Spider-Man: Beyond the Spider-Verse',
    Realeasedate: '2024',
    type: 'Movie',
  },
  {
    id: 2,
    image: require('../assets/kungfupanda4movie.jpg'),
    title: 'Kung fu panda',
    Realeasedate: '2024',
    type: 'Movie',
  },
  {
    id: 3,
    image: require('../assets/houseofdragon.png'),
    title: 'House of the Dragon',
    Realeasedate: '2023',
    type: 'Show',
  },
  {
    id: 4,
    image: require('../assets/creatormovie.jpeg'),
    title: 'The Creator',
    Realeasedate: '2023',
    type: 'Movie',
  },
  {
    id: 5,
    image: require('../assets/missingmovie.jpeg'),
    title: 'Missing',
    Realeasedate: '2023',
    type: 'Movie',
  },
  {
    id: 6,
    image: require('../assets/dune2movie.webp'),
    title: 'Dune: Two',
    Realeasedate: '2024',
    type: 'Movie',
  },
];


const screenWidth = Dimensions.get('window').width;

const SavedScreen = () => {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState('All');
  const [showMovies, setShowMovies] = useState(false);
  const [showShows, setShowShows] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(Movies);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleMoviePress = () => {
    setShowMovies(true);
    setActiveSection('Movies');
  };

  const handleShowsPress = () => {
    setShowShows(true);
    setActiveSection('Shows');
  };

  const handleAllPress = () => {
    setShowShows(false);
    setShowMovies(false);
    setActiveSection('All');
  };

  const handleSearchIconPress = () => {
    setShowSearchBar(true);
  };

  const handleCancelPress = () => {
    setShowSearchBar(false);
    setSearchQuery('');
    setFilteredMovies(Movies);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = Movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


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
  const bottomContainerStyle = isDarkMode ? [styles.bottomContainer, styles.darkBottomContainer] : styles.bottomContainer;
  const iconTextStyle = isDarkMode ? [styles.iconText, styles.darkIconText] : styles.iconText;
  const searchContainerStyle = isDarkMode ?  styles.darksearchContainer : styles.searchContainer;
  const boxContainerStyle = isDarkMode ?  styles.darkboxContainer : styles.boxContainer;
  const modalContentStyle = isDarkMode ?  styles.darkmodalContent : styles.modalContent;

  return (
    <SafeAreaView style={containerStyle}>
      <View style={styles.header}>
        <Text style={[styles.notificationText, textStyle]}>Your Library</Text>
      </View>
      <View style={styles.separator} />

      {showSearchBar ? (
        <View style={searchContainerStyle}>
          <View style={styles.search}>
          {isDarkMode ? <SearchIconWhite /> : <SearchIcon />}
          </View>
          <TextInput
            style={[styles.searchInput, textStyle]}
            placeholder="Search..."
            placeholderTextColor={isDarkMode ? '#ffffff' : '#000000'}
            autoFocus={true}
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <TouchableOpacity onPress={handleCancelPress}>
            <Text style={[styles.cancelText, textStyle]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={boxContainerStyle}>
          <TouchableOpacity style={styles.boxItemsearch} onPress={handleSearchIconPress}>
          {isDarkMode ? <SearchIconWhite /> : <SearchIcon />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxItem,
              activeSection === 'All' ? styles.activeBoxItem : null,
              { backgroundColor: activeSection === 'All' ? (isDarkMode ? '#5303FF' : '#5303FF') : (isDarkMode ? '#222225' : '#fff') },
            ]}
            onPress={handleAllPress}
          >
            <Text style={[styles.boxText, textStyle, activeSection === 'All' ? { color: 'white' } : null]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxItem,
              activeSection === 'Movies' ? styles.activeBoxItem : null,
              { backgroundColor: activeSection === 'Movies' ? (isDarkMode ? '#5303FF' : '#5303FF') : (isDarkMode ? '#222225' : '#fff') },
            ]}
            onPress={handleMoviePress}
          >
            <View style={styles.unread}>
              <Text style={[styles.boxText, textStyle, activeSection === 'Movies' ? { color: 'white' } : null]}>Movies</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxItem,
              activeSection === 'Shows' ? styles.activeBoxItem : null,
              { backgroundColor: activeSection === 'Shows' ? (isDarkMode ? '#5303FF' : '#5303FF') : (isDarkMode ? '#222225' : '#fff') },
            ]}
            onPress={handleShowsPress}
          >
            <View style={styles.unread}>
              <Text style={[styles.boxText,textStyle , activeSection === 'Shows' ? { color: 'white' } : null]}>Shows</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {filteredMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.oopsText, textStyle]}>Oops</Text>
          <Text style={[styles.emptyText, textStyle]}>Nothing has been added</Text>
          <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={[styles.searchButtonText, textStyle]}>Search for movies</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 90 }}>
          <View style={styles.moviesList}>
            {filteredMovies.map((item) => {
              if (activeSection === 'Movies' && item.type === 'Movie') {
                return (
                  <View key={item.id} style={styles.movieItem}>
                    <View style={styles.iconEllipse}>
                      <TouchableOpacity onPress={toggleModal}>
                        <EllipseVerticalSavedIcon />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('UploadScreenExtractMatch')}>
                      <Image source={item.image} style={styles.movieImage} />
                    </TouchableOpacity>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={styles.movieRealeasedate}>{item.Realeasedate}</Text>
                  </View>
                );
              } else if (activeSection === 'Shows' && item.type === 'Show') {
                return (
                  <View key={item.id} style={styles.movieItem}>
                    <View style={styles.iconEllipse}>
                      <TouchableOpacity onPress={toggleModal}>
                        <EllipseVerticalSavedIcon />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('UploadScreenExtractMatch')}>
                      <Image source={item.image} style={styles.movieImage} />
                    </TouchableOpacity>
                    <Text style={[styles.movieTitle, textStyle]}>{item.title}</Text>
                    <Text style={styles.movieRealeasedate}>{item.Realeasedate}</Text>
                  </View>
                );
              } else if (activeSection === 'All') {
                return (
                  <View key={item.id} style={styles.movieItem}>
                    <View style={styles.iconEllipse}>
                      <TouchableOpacity onPress={toggleModal}>
                        <EllipseVerticalSavedIcon />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('UploadScreenExtractMatch')}>
                      <Image source={item.image} style={styles.movieImage} />
                    </TouchableOpacity>
                    <Text style={[styles.movieTitle, textStyle]}>{item.title}</Text>
                    <Text style={[styles.movieRealeasedate, textStyle]}>{item.Realeasedate}</Text>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
      )}

      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={toggleModal}></TouchableOpacity>
        <View style={modalContentStyle}>
          <TouchableOpacity style={styles.modalOption}>
            <TrashIcon />
            <Text style={[styles.modalOptionText, { color: 'red' }]}>Remove from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
          {isDarkMode ? <ModalShareIconWhite /> : <ModalShareIcon />}
            <Text style={[styles.modalOptionText, textStyle]}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
          {isDarkMode ? <ModalFlagIconWhite /> : <ModalFlagIcon />}
            <Text style={[styles.modalOptionText, textStyle]}>Report</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={bottomContainerStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
        {isDarkMode ? <HomeIconWhite /> : <HomeIconNF />}
          <Text style={iconTextStyle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CinemaScreen')} style={styles.iconContainer}>
        {isDarkMode ? <CinemaIconWhite /> : <CinemaIcon />}
          <Text style={iconTextStyle}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <SavedIconFill />
          <Text style={styles.iconTextSaved}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MoreScreen')} style={styles.iconContainer}>
        {isDarkMode ? <MoreIconFillWhite /> : <MoreIcon />}
          <Text style={iconTextStyle}>More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    flex: 1,
    backgroundColor: 'rgba(23,25,28,255)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  notificationText: {
    fontSize: 16,
    fontFamily: 'Outfit_500Medium',
    textAlign: 'center',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(17, 34, 17, 0.1287)',
    width: '100%',
    alignSelf: 'center',
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
    marginBottom: screenWidth <= 375 ? 10 : 40,
  },
  iconText: {
    color: '#17161A',
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    lineHeight: 16.8,
  },
  iconTextSaved: {
    color: '#5303FF',
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    lineHeight: 16.8,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 20,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  darkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222225',
    marginVertical: 20,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  boxItem: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  boxItemsearch: {
    flex: 0.5,
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  boxText: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
  unread: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 20,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  darksearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222225',
    marginVertical: 20,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  search: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelText: {
    paddingHorizontal: 10,
    color: '#5303FF',
  },
  iconEllipse: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 1,
  },
  moviesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  movieItem: {
    width: '48%',
    marginBottom: 10,
  },
  movieImage: {
    width: '100%',
    height: screenWidth * 0.66 * (3 / 4), // 90% of the screen width, maintaining a 3:4 aspect ratio
    borderRadius: 10,
    objectFit: 'cover'
  },
  movieTitle: {
    marginTop: 5,
    color: 'rgba(36, 36, 40, 1)',
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
    textAlign: 'center',
  },
  movieRealeasedate: {
    fontSize: 12,
    color: 'rgba(36, 36, 40, 1)',
    fontFamily: 'Outfit_400Regular',
    textAlign: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(245, 245, 245, 1)',
    width: '60%',
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(80, 85, 92, 1)',
    padding: 20,
    gap: 20,
    margin: 'auto',
  },
  darkmodalContent: {
    backgroundColor: '#222225',
    width: '60%',
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(80, 85, 92, 1)',
    padding: 20,
    gap: 20,
    margin: 'auto',
    marginBottom: 150,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  modalOptionText: {
    marginLeft: 10,
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
    color: 'rgba(60, 60, 67, 1)',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '20%',
    margin: 'auto'
  },
  oopsText: {
    fontSize: 22,
    fontFamily: 'Outfit_600SemiBold',
    color: 'rgba(36, 36, 40, 1)',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    color: 'rgba(36, 36, 40, 1)',
    marginTop: 10,
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: '#5303FF',
    width: 151,
    height: 48,
    justifyContent: 'center',
    borderRadius: 10,
  },
  searchButtonText: {
    color: 'white',
    fontFamily: 'Outfit_500Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  textDark: {
    color: '#fff'
  },
  darkIconText: {
    color: 'white',
  },
});
