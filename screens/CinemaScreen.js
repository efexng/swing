import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Dimensions, Modal, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CinemaIconFill, HomeIconNF, SavedIcon, MoreIcon, SearchIcon, CinemaArrowRightIcon, LocationIcon, ChevronDownICon, ChevronUpICon } from './icons'; // Ensure other icons are imported if needed
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const Genre = [
  'All', 'Adventure', 'Horror', 'Thriller', 'Romance', 'Sci-Fi',
];

const Movies = [
  {
    id: 1,
    image: (require('../assets/Overlay.png')),
    title: 'Spider-Man: Beyond the Spider-Verse',
  },
  {
    id: 2,
    image: (require('../assets/Overlay (1).png')),
    title: 'House of the Dragon',
    subtitle: 'S1 E10'
  },
  {
    id: 3,
    image: (require('../assets/Overlay (2).png')),
    title: 'Orange Is the New Black',
    subtitle: 'S07 E03'
  },
  {
    id: 4,
    image: (require('../assets/Overlay (3).png')),
    title: 'Spider-Man: Beyond the Spider-Verse',
  },
  {
    id: 5,
    image: (require('../assets/Overlay (4).png')),
    title: 'House of the Dragon',
    subtitle: 'S1 E10'
  },
  {
    id: 6,
    image: (require('../assets/Overlay (5).png')),
    title: 'Orange Is the New Black',
    subtitle: 'S07 E03 '
  },
]

const CinemaScreen = () => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const toggleIcon = () => {
    setIsExpanded(!isExpanded);
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsExpanded(false);
    setIsModalVisible(false);
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headercontent}>
            <Text style={styles.headercontenttxt}>Cinemas</Text>
            <View style={styles.headercontents}>
              <TouchableOpacity>
                <View style={styles.headercontentsub1}>
                  <View style={styles.headercontentsubs1}>
                    <Text style={styles.headercontentsub1txt1}>{truncateText('SILVERBIRD ENTERTAINMENT CENTER ABUJA', 19)}</Text>
                  </View>
                  <View style={styles.headercontentsubs2}>
                    <Text style={styles.headercontentsub1txt2}>3 movies</Text>
                    <Text style={styles.headercontentsub1txt3}>showing today</Text>
                  </View>
                </View>
                <View style={styles.headercontentsub1icon}>
                  <CinemaArrowRightIcon />
                </View>
                <View style={styles.headercontentsub1}>
                  <View style={styles.headercontentsubs1}>
                    <Text style={styles.headercontentsub1txt4}>{truncateText(' Plot 1161, Memorial Drive, By Musa Yaradua Center, Central Business District, F.C.T, Abuja.', 30)}</Text>
                  </View>
                  <View style={styles.headercontentsubs2}>
                    <Text style={styles.headercontentsub1txt5}>8km</Text>
                    <Ionicons style={styles.headercontentsubs2icon} name='ellipse' size={4} />
                    <Text style={styles.headercontentsub1txt6}>37mins</Text>
                  </View>
                </View>
                <View style={styles.separator} />
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.headercontentsub1}>
                  <View style={styles.headercontentsubs1}>
                    <Text style={styles.headercontentsub1txt1}>{truncateText('Genesis cinema', 19)}</Text>
                  </View>
                  <View style={styles.headercontentsubs2}>
                    <Text style={styles.headercontentsub1txt2}>4 movies</Text>
                    <Text style={styles.headercontentsub1txt3}>showing today</Text>
                  </View>
                </View>
                <View style={styles.headercontentsub1icon}>
                  <CinemaArrowRightIcon />
                </View>
                <View style={styles.headercontentsub1}>
                  <View style={styles.headercontentsubs1}>
                    <Text style={styles.headercontentsub1txt4}>{truncateText('264 Tafawa Balewa Way, Abuja, FCT', 30)}</Text>
                  </View>
                  <View style={styles.headercontentsubs2}>
                    <Text style={styles.headercontentsub1txt5}>5km</Text>
                    <Ionicons style={styles.headercontentsubs2icon} name='ellipse' size={4} />
                    <Text style={styles.headercontentsub1txt6}>20mins</Text>
                  </View>
                </View>
                <View style={styles.separator} />
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.headercontentsub1}>
                  <View style={styles.headercontentsubs1}>
                    <Text style={styles.headercontentsub1txt1}>{truncateText('Genesis cinema', 19)}</Text>
                  </View>
                  <View style={styles.headercontentsubs2}>
                    <Text style={styles.headercontentsub1txt2}>4 movies</Text>
                    <Text style={styles.headercontentsub1txt3}>showing today</Text>
                  </View>
                </View>
                <View style={styles.headercontentsub1icon}>
                  <CinemaArrowRightIcon />
                </View>
                <View style={styles.headercontentsub1}>
                  <View style={styles.headercontentsubs1}>
                    <Text style={styles.headercontentsub1txt4}>{truncateText('264 Tafawa Balewa Way, Abuja, FCT', 30)}</Text>
                  </View>
                  <View style={styles.headercontentsubs2}>
                    <Text style={styles.headercontentsub1txt5}>5km</Text>
                    <Ionicons style={styles.headercontentsubs2icon} name='ellipse' size={4} />
                    <Text style={styles.headercontentsub1txt6}>20mins</Text>
                  </View>
                </View>
                <View style={styles.separator} />
              </TouchableOpacity>
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

            <View style={styles.headercontentsubinner3}>
              <Text style={styles.headercontentsubinner3txt2}>All Genre</Text>
              <TouchableOpacity onPress={toggleIcon}>
                {isExpanded ? <ChevronUpICon /> : <ChevronDownICon />}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headercontentsubs4}>
            <Text style={styles.headercontentsubs4txt}>Genesis Cinema</Text>
          </View>

            <View style={styles.moviescontainer}>
                <FlatList
                  data={Movies}
                  horizontal={true}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.movieItem}>
                      <Image source={item.image} style={styles.movieImage} />
                      <Text style={styles.movieTitle}>{item.title}</Text>
                      {item.subtitle && <Text style={styles.movieSubtitle}>{item.subtitle}</Text>}
                    </View>
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.moviesList}
                />
            </View>

              <View style={styles.moviesbtncontainer}>
              <TouchableOpacity onPress={() => navigation.navigate('OnBoardingScreen2')} style={styles.moviesbtn}>
              <Text style={styles.moviesbtntxt}>See All</Text>
            </TouchableOpacity>
              </View>

        </ScrollView>
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
          <Text style={styles.iconText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MoreScreen')} style={styles.iconContainer}>
          <MoreIcon />
          <Text style={styles.iconText}>More</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalDropdown}>
            <FlatList
              data={Genre}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.genreItem} onPress={closeModal}>
                  <Text style={styles.genreText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  headercontenttxt: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 20,
    marginBottom: 30,
  },
  headercontents: {
    flexDirection: 'column',
    width: screenWidth > 375 ? 363 : 343,
  },
  headercontentsub1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  headercontentsubs1: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headercontentsubs2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 40,
  },
  headercontentsubs2icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  headercontentsub1txt1: {
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
  },
  headercontentsub1txt2: {
    fontSize: 11,
    fontFamily: 'Outfit_700Bold',
    color: 'rgba(83, 3, 255, 1)',
    marginRight: 5,
  },
  headercontentsub1txt3: {
    fontSize: 11,
    fontFamily: 'Outfit_400Regular'
  },
  headercontentsub1icon: {
    alignItems: 'flex-end',
    left: 5,
  },
  headercontentsub1txt4: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular'
  },
  headercontentsub1txt5: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular'
  },
  headercontentsub1txt6: {
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
  },
  headercontentsubinner3txt: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: 'rgba(67, 67, 74, 1)'
  },
  headercontentsubinner3txt2: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
    color: 'rgba(60, 60, 67, 1)'
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
    marginTop: 5,
  },
  iconTextCinema: {
    color: '#5303FF',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  modalDropdown: {
    width: '50%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10,
    right: 10,
    position: 'absolute',
    bottom: -30,
  },
  genreItem: {
    padding: 10,
  },
  genreText: {
    fontSize: 16,
    fontFamily: 'Outfit_500Medium',
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
