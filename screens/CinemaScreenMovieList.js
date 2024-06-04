import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get('window').width;

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
  

const CinemaScreenMovieList = () => {
  return (
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
  )
}

export default CinemaScreenMovieList

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
})