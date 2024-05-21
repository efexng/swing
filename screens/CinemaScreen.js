import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView , Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CinemaIconFill, HomeIconNF, SavedIcon, MoreIcon, SearchIcon,CinemaArrowRightIcon } from './icons'; // Ensure other icons are imported if needed
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;


const CinemaScreen = () => {
  const navigation = useNavigation();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};


  return (
    <View style={styles.headercontainer}>
    <SafeAreaView style={styles.container}>
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

<ScrollView>
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
               <Text style={styles.headercontentsub1txt4}>{truncateText(' Plot 1161, Memorial Drive, By Musa Yaradua Center, Central Business District, F.C.T, Abuja.', 30)}</Text>
               </View>
               <View style={styles.headercontentsubs2}>
                    <Text style={styles.headercontentsub1txt5}>8km</Text>
                    <Ionicons style={styles.headercontentsubs2icon} name='ellipse' size={4}/>
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
                    <Ionicons style={styles.headercontentsubs2icon} name='ellipse' size={4}/>
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
                    <Ionicons style={styles.headercontentsubs2icon} name='ellipse' size={4}/>
                    <Text style={styles.headercontentsub1txt6}>20mins</Text>
                   </View>
               </View>
               <View style={styles.separator} />
            </TouchableOpacity>

         
        </View>
      </View>
</ScrollView>
      
    </SafeAreaView>

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
      </View>
  );
};

export default CinemaScreen;

const styles = StyleSheet.create({
  headercontainer: {
    flex: 1,
  },
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
    marginTop: 30,
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
});
