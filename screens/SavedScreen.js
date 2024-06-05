import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, } from 'react-native'; // Added TextInput
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CinemaIcon, HomeIconNF, SavedIconFill, MoreIcon, SearchIcon, EllipseVerticalSavedIcon } from './icons'; // Ensure other icons are imported if needed
import { useNavigation } from '@react-navigation/native';




const Movies = [
  {
    id: 1,
    image: (require('../assets/Match1.png')),
    title: 'Spider-Man: Beyond the Spider-Verse',
    Realeasedate: '2024',
    type: 'Movie'
  },
  {
    id: 2,
    image: (require('../assets/kungfupanda4movie.jpg')),
    title: 'Kung fu panda',
    Realeasedate: '2024',
    type: 'Movie'
  },
  {
    id: 3,
    image: (require('../assets/Match2.png')),
    title: 'House of the Dragon',
    Realeasedate: '2023',
    type: 'Show'
  },
  {
    id: 4,
    image: (require('../assets/creatormovie.jpeg')),
    title: 'The Creator',
    Realeasedate: '2023',
    type: 'Movie'
  },
  {
    id: 5,
    image: (require('../assets/missingmovie.jpeg')),
    title: 'Missing',
    Realeasedate: '2023',
    type: 'Movie'
  },
  {
    id: 6,
    image: (require('../assets/dune2movie.webp')),
    title: 'Dune: Two',
    Realeasedate: '2024',
    type: 'Movie'
  },
]


const SavedScreen = () => {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState('All');
  const [showMovies, setShowMovies] = useState(false);
  const [showShows, setShowShows] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query
  const [filteredMovies, setFilteredMovies] = useState(Movies); // State to manage filtered movies

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
    setSearchQuery(''); // Clear search query when canceling
    setFilteredMovies(Movies); // Reset filtered movies
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = Movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.notificationText}>Your Library</Text>
      </View>
      <View style={styles.separator} />

      {showSearchBar ? ( // Conditionally render search bar
        <View style={styles.searchContainer}>
        <View style={styles.search}>
         <SearchIcon  /> 
         </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            autoFocus={true}
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <TouchableOpacity onPress={handleCancelPress}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.boxContainer}>
          <TouchableOpacity style={styles.boxItemsearch} onPress={handleSearchIconPress}>
            <SearchIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxItem,
              activeSection === 'All' ? styles.activeBoxItem : null,
              { backgroundColor: activeSection === 'All' ? '#5303FF' : '#fff' },
            ]}
            onPress={handleAllPress}
          >
            <Text style={[styles.boxText, activeSection === 'All' ? { color: 'white' } : null]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxItem,
              activeSection === 'Movies' ? styles.activeBoxItem : null,
              { backgroundColor: activeSection === 'Movies' ? '#5303FF' : '#fff' },
            ]}
            onPress={handleMoviePress}
          >
            <View style={styles.unread}>
              <Text style={[styles.boxText, activeSection === 'Movies' ? { color: 'white' } : null]}>Movies</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxItem,
              activeSection === 'Shows' ? styles.activeBoxItem : null,
              { backgroundColor: activeSection === 'Shows' ? '#5303FF' : '#fff' },
            ]}
            onPress={handleShowsPress}
          >
            <View style={styles.unread}>
              <Text style={[styles.boxText, activeSection === 'Shows' ? { color: 'white' } : null]}>Shows</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 90}}>
  <View style={styles.moviesList}>
    {filteredMovies.map((item) => {
      if (activeSection === 'Movies' && item.type === 'Movie') {
        return (
          <View key={item.id} style={styles.movieItem}>
          <View style={styles.iconEllipse}>
            <EllipseVerticalSavedIcon />
          </View>
            <Image source={item.image} style={styles.movieImage} />
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieRealeasedate}>{item.Realeasedate}</Text>
          </View>
        );
      } else if (activeSection === 'Shows' && item.type === 'Show') {
        return (
          <View key={item.id} style={styles.movieItem}>
          <View style={styles.iconEllipse}>
            <EllipseVerticalSavedIcon />
          </View>
            <Image source={item.image} style={styles.movieImage} />
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieRealeasedate}>{item.Realeasedate}</Text>
          </View>
        );
      } else if (activeSection === 'All') {
        return (
          <View key={item.id} style={styles.movieItem}>
          <View style={styles.iconEllipse}>
            <EllipseVerticalSavedIcon />
          </View>
            <Image source={item.image} style={styles.movieImage} />
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieRealeasedate}>{item.Realeasedate}</Text>
          </View>
        );
      }
    })}
  </View>
</ScrollView>



      
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
          <HomeIconNF />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CinemaScreen')} style={styles.iconContainer}>
          <CinemaIcon />
          <Text style={styles.iconText}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <SavedIconFill />
          <Text style={styles.iconTextSaved}>Saved</Text>
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
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
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
    borderRadius: 10, // Add border radius for rounded corners
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
  movieItem: {
    width: '48%', 
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
    marginTop: 10
  },
  iconEllipse: {
    position: 'absolute',
    top: 10, 
    right: 5, 
    zIndex: 1
  },
  movieImage: {
    width: 163,
    height: 210,
    borderRadius: 10,
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
  moviesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
});
