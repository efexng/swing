import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions} from 'react-native'
import { CinemaIconFill, HomeIconNF, SavedIcon, MoreIcon, SearchIcon, ArrowRightIcon2, LocationIcon, ChevronDownICon, ChevronUpICon } from './icons'; // Ensure other icons are imported if needed
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
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
            title: 'Madam web'
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
    

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

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
              <Text style={styles.CompanyAddressMaintxt}>{truncateText(item.Company, 19)}</Text>
            </View>
            <View style={styles.CompanyMoviesInfo}>
              <Text style={styles.CompanyMovies}>{item.CompanyMovies}</Text>
              <Text style={styles.CompanyMoviesShowTime}>{item.CompanyMoviesShowTime}</Text>
            </View>
          </View>
          <View style={styles.ArrowRightIcon2}>
            <ArrowRightIcon2 />
          </View>
          <View style={styles.CompanyAddress}>
            <View style={styles.CompanyAddressMain}>
              <Text style={styles.CompanyAddressMaintxtMedium}>{truncateText(item.CompanyAddress, 30)}</Text>
            </View>
            <View style={styles.CompanyMoviesInfo}>
              <Text style={styles.CompanyAddressDistance}>{item.CompanyAddressDistance}</Text>
              <Ionicons style={styles.EllipseIcon} name='ellipse' size={4} />
              <Text style={styles.CompanyAddressDistanceTime}>{item.CompanyAddressDistanceTime}</Text>
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
})
