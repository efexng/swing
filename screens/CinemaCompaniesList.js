import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions} from 'react-native'
import { CinemaIconFill, HomeIconNF, SavedIcon, MoreIcon, ArrowRightIcon2White, ArrowRightIcon2, LocationIcon, ChevronDownICon, ChevronUpICon } from './icons'; // Ensure other icons are imported if needed
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;

const Companies = [
  {
    id: 1,
    Company: 'SILVERBIRD ENTERTAINMENT CENTER',
    CompanyAddress:'Plot 1161, Memorial Drive, By Musa Yaradua Center, Central Business District, F.C.T, Abuja.',
    CompanyAddressDistance: '8km',
    CompanyAddressDistanceTime: '37mins',
    CompanyMovies: '3 Movies',
    CompanyMoviesShowTime: 'Showing today',
    CompanyLogo: require('../assets/cinemacompanylogo.png'),
    CompanyImage : [
        {
            id: 1,
            image : require('../assets/onelovebob.png'),
            title: 'bob marley: one love'
        },
        {
            id: 2,
            image : require('../assets/argylle.png'),
            title: 'Argylle'
        },
        {
            id: 3,
            image : require('../assets/madamweb.png'),
            title: 'Madam web',
            about: 'Cassandra Webb is a New York metropolis paramedic who begins to demonstrate signs of clairvoyance. Forced to challenge revelations about her past, she needs to safeguard three young women from a deadly adversary who wants them destroyed.',
            releasedate: '2024',
            movietime: '116mins',
            genre: 'Sci-fi, Action, Adventure'
        },
    ]
  },
  {
    id: 2,
    Company: 'Genesis',
    CompanyAddress:' Plot 1161, Memorial Drive, By Musa Yaradua Center, Central Business District, F.C.T, Abuja.',
    CompanyAddressDistance: '8km',
    CompanyAddressDistanceTime: '37mins',
    CompanyMovies: '3 Movies',
    CompanyMoviesShowTime: 'Showing today',
    CompanyLogo: require('../assets/cinemacompanylogo.png'),
  },
  {
    id: 3,
    Company: 'Efe',
    CompanyAddress:' Plot 1161, Memorial Drive, By Musa Yaradua Center, Central Business District, F.C.T, Abuja.',
    CompanyAddressDistance: '8km',
    CompanyAddressDistanceTime: '37mins',
    CompanyMovies: '3 Movies',
    CompanyMoviesShowTime: 'Showing today',
    CompanyLogo: require('../assets/cinemacompanylogo.png'),
  },
]

const CinemaCompaniesList = () => {
    const navigation = useNavigation();
    const [isDarkMode, setIsDarkMode] = useState(false);


  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
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


  const textStyle = isDarkMode ? styles.textDark : styles.text;

  return (
    <FlatList
      data={Companies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CinemaScreen2', {
          company: item.Company,
          address: item.CompanyAddress,
          distance: item.CompanyAddressDistance,
          distanceTime: item.CompanyAddressDistanceTime,
          images: item.CompanyImage,
          image: item.CompanyLogo
        })} >
          <View style={styles.CompanyAddress}>
            <View style={styles.CompanyAddressMain}>
              <Text style={[styles.CompanyAddressMaintxt, textStyle]}>{truncateText(item.Company, 19)}</Text>
            </View>
            <View style={styles.CompanyMoviesInfo}>
              <Text style={styles.CompanyMovies}>{item.CompanyMovies}</Text>
              <Text style={[styles.CompanyMoviesShowTime, textStyle]}>{item.CompanyMoviesShowTime}</Text>
            </View>
          </View>
          <View style={styles.ArrowRightIcon2}>
            {isDarkMode ? <ArrowRightIcon2White /> : <ArrowRightIcon2 />}
          </View>
          <View style={styles.CompanyAddress}>
            <View style={styles.CompanyAddressMain}>
              <Text style={[styles.CompanyAddressMaintxtMedium, textStyle]}>{truncateText(item.CompanyAddress, 30)}</Text>
            </View>
            <View style={styles.CompanyMoviesInfo}>
              <Text style={[styles.CompanyAddressDistance, textStyle]}>{item.CompanyAddressDistance}</Text>
              <Ionicons style={styles.EllipseIcon} name='ellipse' size={4}  color={isDarkMode ? 'white' : 'black'} />
              <Text style={[styles.CompanyAddressDistanceTime, textStyle]}>{item.CompanyAddressDistanceTime}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
      )}
    />
  )
}

export default CinemaCompaniesList

const styles = StyleSheet.create({
  Company: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 20,
    marginBottom: 30,
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
    marginRight: screenWidth <= 375 ? 20 : 40,
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
    marginLeft: 10,

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
    backgroundColor: 'gray',
    marginVertical: 1,
    width: '100%',
    marginBottom: 40
  },
  textDark: {
    color: '#fff'
  },
})
