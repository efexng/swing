import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CinemaIconFill, HomeIconNF, SavedIcon, MoreIcon, SearchIcon, LocationIcon, ChevronDownICon, ChevronUpICon, SavedIconWhite, MoreIconFillWhite, HomeIconWhite, SearchIconWhite, LocationIconWhite, ChevronUpIConWhite, ChevronDownIConWhite } from './icons'; // Ensure other icons are imported if needed
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CinemaCompaniesList from './CinemaCompaniesList';
import CinemaScreenMovieList from './CinemaScreenMovieList';

const screenWidth = Dimensions.get('window').width;

const Genre = [
  'All', 'Adventure', 'Horror', 'Thriller', 'Romance', 'Sci-Fi',
];

const CinemaScreen = () => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const selectGenre = (genre) => {
    // Handle genre selection if needed
    setIsExpanded(false);
  };

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

 

  const containerStyle = isDarkMode ? [styles.container, styles.darkContainer] : styles.container;
  const textStyle = isDarkMode ? styles.textDark : styles.text;
  const bottomContainerStyle = isDarkMode ? [styles.bottomContainer, styles.darkBottomContainer] : styles.bottomContainer;
  const iconTextStyle = isDarkMode ? [styles.iconText, styles.darkIconText] : styles.iconText;
  const dropdownContainerStyle = isDarkMode ? [styles.dropdownContainer, styles.darkdropdownContainer] : styles.dropdownContainer;
  const activeGenreStyle = isDarkMode ? [styles.activeGenre, styles.darkGenre] : styles.activeGenre;
  return (
    <>
      <View style={containerStyle}>
        <View style={styles.separatorTop} />
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            {isDarkMode ? <SearchIconWhite style={styles.searchIcon} /> : <SearchIcon style={styles.searchIcon}  />}
            <TextInput
              style={styles.searchBar}
              placeholder="Search for more cinemas and movies"
              placeholderTextColor={isDarkMode ? '#ffffff' : '#000000'}
            />
          </View>
        </View>
        
        <FlatList
          data={[]}
          ListHeaderComponent={() => (
            <View>
              <View style={styles.headercontent}>
                <Text style={[styles.Company, textStyle]}>Cinemas in your area</Text>
                <View style={styles.CompanyContents}>
                  <CinemaCompaniesList />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.skipButton}>
                  <Text style={styles.skipText}>Change Location</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headercontentsub3}>
                <Text style={[styles.headercontentsub2txt, textStyle]}>Movies showing this week</Text>
              </View>
              <View style={styles.headercontentsubs3}>
                <View style={styles.headercontentsubinner3}>
                {isDarkMode ? <LocationIconWhite /> : <LocationIcon />}
                  <Text style={[styles.headercontentsubinner3txt, textStyle]}>Near Gwagwalada, Abuja </Text>
                </View>

                <TouchableOpacity onPress={toggleDropdown} style={[styles.headercontentsubinner4, isExpanded && activeGenreStyle ]}>
                <Text style={[styles.headercontentsubinner3txt2, textStyle, isExpanded ]}>{isExpanded ? "All Genre" : "All Genre"}</Text>
                  <View >
                  {isExpanded 
            ? (isDarkMode ? <ChevronUpIConWhite /> : <ChevronUpICon />) 
            : (isDarkMode ? <ChevronDownIConWhite /> : <ChevronDownICon />)
        }
                  </View>
                </TouchableOpacity>
              </View>
             <View style={styles.dropdown}>
             {isExpanded && (
                <View style={dropdownContainerStyle}>
                  <FlatList
                    data={Genre}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.genreItem} onPress={() => selectGenre(item)}>
                        <Text style={[styles.genreText, textStyle]}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
             </View>
              <View style={styles.headercontentsubs4}>
                <Text style={[styles.headercontentsubs4txt, textStyle]}>Genesis Cinema</Text>
              </View>
              <View style={styles.moviescontainer}>
                <CinemaScreenMovieList />
              </View>
              <View style={styles.moviesbtncontainer}>
                <TouchableOpacity onPress={() => navigation.navigate('OnBoardingScreen2')} style={styles.moviesbtn}>
                  <Text style={styles.moviesbtntxt}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headercontentsubs4}>
                <Text style={[styles.headercontentsubs5txt, textStyle]}>SILVERBIRD ENTERTAINMENT CENTER</Text>
              </View>
              <View style={styles.moviescontainer}>
                <CinemaScreenMovieList />
              </View>
              <View style={styles.moviesbtncontainer}>
                <TouchableOpacity onPress={() => navigation.navigate('OnBoardingScreen2')} style={styles.moviesbtn}>
                  <Text style={styles.moviesbtntxt}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={bottomContainerStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
        {isDarkMode ? <HomeIconWhite /> : <HomeIconNF />}
          <Text style={[styles.iconText, iconTextStyle]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <CinemaIconFill />
          <Text style={styles.iconTextCinema}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SavedScreen')} style={styles.iconContainer}>
        {isDarkMode ? <SavedIconWhite /> : <SavedIcon />}
          <Text style={[styles.iconText, iconTextStyle]}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MoreScreen')} style={styles.iconContainer}>
        {isDarkMode ? <MoreIconFillWhite /> : <MoreIcon />}
          <Text style={[styles.iconText, iconTextStyle]}>More</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CinemaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: 'rgba(23,25,28,255)',
  },
  separatorTop: {
    height: 1,
    backgroundColor: 'rgba(17, 34, 17, 0.1287)',
    marginVertical: 1,
    width: '100%',
    marginTop: 90,
    marginBottom: 10,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  headercontent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  Company: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 20,
    marginBottom: 30,
  },
  CompanyContents: {
    flexDirection: 'column',
    width: screenWidth > 375 ? 363 : 343,
  },
  CompanyAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  CompanyAddressMain: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  CompanyMoviesInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 40,
  },
  EllipseIcon: {
    marginRight: 10,
    marginLeft: 10,
  },
  CompanyAddressMaintxt: {
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
  },
  CompanyMovies: {
    fontSize: 11,
    fontFamily: 'Outfit_700Bold',
    color: 'rgba(83, 3, 255, 1)',
    marginRight: 5,
  },
  CompanyMoviesShowTime: {
    fontSize: 11,
    fontFamily: 'Outfit_400Regular'
  },
  ArrowRightIcon2: {
    alignItems: 'flex-end',
    left: 5,
  },
  CompanyAddressMaintxtMedium: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular'
  },
  CompanyAddressDistance: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular'
  },
  CompanyAddressDistanceTime: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular'
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(17, 34, 17, 0.1287)',
    marginVertical: 1,
    width: '100%',
    marginBottom: 40
  },
  skipButton: {
    backgroundColor: 'rgba(238, 233, 254, 1)',
    width: 154,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  skipText: {
    color: '#5303FF',
    fontSize: 14,
    fontFamily: 'Outfit_500Medium'
  },
  headercontentsub3: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  headercontentsub2txt: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 20,
  },
  headercontentsubs3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headercontentsubinner3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  headercontentsubinner4: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 130,
    justifyContent: 'center',
  },
  headercontentsubinner3txt: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: 'rgba(67, 67, 74, 1)'
  },
  headercontentsubinner3txt2: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
    padding: 10,
    color: 'rgba(60, 60, 67, 1)',
    textAlign: 'center',
  },
  headercontentsubs4: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  headercontentsubs4txt: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 20,
    color: 'rgba(81, 79, 79, 1)',
  },
  headercontentsubs5txt: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 20,
    width: screenWidth > 375 ? 363 : 343,
    color: 'rgba(81, 79, 79, 1)',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    width: '100%',
  },
  darkBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#',
    shadowColor: '#000',
    width: '100%',
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
    lineHeight: 16.8
  },
  darkIconText: {
    color: 'white',
  },
  iconTextCinema: {
    color: '#5303FF',
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    lineHeight: 16.8
  },
  dropdown: {
    zIndex: 99,
  },
  dropdownContainer: {
    position: 'absolute',
    right: 0, // Adjust according to your layout
    width: 130,
    backgroundColor: 'white',
    borderTopWidth: .5,
    alignItems: 'center', // Centering the items horizontally
    zIndex: 99,
  },
  darkdropdownContainer: {
    position: 'absolute',
    right: 0, // Adjust according to your layout
    width: 130,
    backgroundColor: '#222225',
    borderTopWidth: .5,
    borderColor: '#FFFFFF',
    alignItems: 'center', // Centering the items horizontally
    zIndex: 99,
  },
  activeGenre: {
    backgroundColor: 'white',
  },  
  darkGenre: {
    backgroundColor: 'rgba(23,25,28,255)',
  },  
  genreItem: {
    padding: 10,
  },
  genreText: {
    fontSize: 16,
    fontFamily: 'Outfit_500Medium',
    textAlign: 'center'
  },
  movieItem: {
    marginRight: 10, 
    alignItems: 'center', 
  },
  movieImage: {
    width: 165,
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    color: '#514F4F',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 165, 
  },
  movieSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    width: 165, 
  },
  moviesList: {
    paddingVertical: 20,
    alignItems: 'flex-start', 
  },
  moviescontainer: {
    width: screenWidth > 375 ? 363 : 343,
  },
  moviesbtncontainer: {
    alignItems: 'center',
  },
  moviesbtn: {
    backgroundColor: '#5303FF',
    width: 94,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  moviesbtntxt: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Outfit_500Medium'
  },
  textDark: {
    color: '#fff'
  },
});
