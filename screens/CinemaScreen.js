import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CinemaIconFill, HomeIconNF, SavedIcon, MoreIcon, SearchIcon, LocationIcon, ChevronDownICon, ChevronUpICon } from './icons'; // Ensure other icons are imported if needed
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CinemaCompaniesList from './CinemaCompaniesList';
import CinemaScreenMovieList from './CinemaScreenMovieList';

const screenWidth = Dimensions.get('window').width;

const Genre = [
  'All', 'Adventure', 'Horror', 'Thriller', 'Romance', 'Sci-Fi',
];

const CinemaScreen = () => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const selectGenre = (genre) => {
    // Handle genre selection if needed
    setIsExpanded(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.separatorTop} />
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <SearchIcon style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search for more cinemas and movies"
              placeholderTextColor="#888"
            />
          </View>
        </View>
        
        <FlatList
          data={[]}
          ListHeaderComponent={() => (
            <View>
              <View style={styles.headercontent}>
                <Text style={styles.Company}>Cinemas</Text>
                <View style={styles.CompanyContents}>
                  <CinemaCompaniesList />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('OnBoardingScreen2')} style={styles.skipButton}>
                  <Text style={styles.skipText}>Change Location</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headercontentsub3}>
                <Text style={styles.headercontentsub2txt}>Movies showing this week</Text>
              </View>
              <View style={styles.headercontentsubs3}>
                <View style={styles.headercontentsubinner3}>
                  <LocationIcon />
                  <Text style={styles.headercontentsubinner3txt}>Near Gwagwalada, Abuja </Text>
                </View>

                <TouchableOpacity onPress={toggleDropdown} style={[styles.headercontentsubinner4, isExpanded && styles.activeGenre ]}>
                <Text style={[styles.headercontentsubinner3txt2, isExpanded ]}>{isExpanded ? "All Genre" : "All Genre"}</Text>
                  <View >
                    {isExpanded ? <ChevronUpICon /> : <ChevronDownICon />}
                  </View>
                </TouchableOpacity>
              </View>
             <View style={styles.dropdown}>
             {isExpanded && (
                <View style={styles.dropdownContainer}>
                  <FlatList
                    data={Genre}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.genreItem} onPress={() => selectGenre(item)}>
                        <Text style={styles.genreText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
             </View>
              <View style={styles.headercontentsubs4}>
                <Text style={styles.headercontentsubs4txt}>Genesis Cinema</Text>
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
                <Text style={styles.headercontentsubs5txt}>SILVERBIRD ENTERTAINMENT CENTER</Text>
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

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
          <HomeIconNF />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <CinemaIconFill />
          <Text style={styles.iconTextCinema}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SavedScreen')} style={styles.iconContainer}>
          <SavedIcon />
          <Text style={styles.iconText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MoreScreen')} style={styles.iconContainer}>
          <MoreIcon />
          <Text style={styles.iconText}>More</Text>
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
  activeGenre: {
    backgroundColor: 'white',
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
});
