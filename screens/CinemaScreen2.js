import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Modal, FlatList, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackIcon, ChevronDownICon, ChevronUpICon } from './icons';
import { Ionicons } from '@expo/vector-icons';
import CinemaScreenMovieList from './CinemaScreenMovieList';

const screenWidth = Dimensions.get('window').width;


const CinemaScreen2 = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { company, address, distance, distanceTime, images, image } = route.params;

    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const Genre = [
        'All', 'Adventure', 'Horror', 'Thriller', 'Romance', 'Sci-Fi',
    ];


    const toggleIcon = () => {
        setIsExpanded(!isExpanded);
        setIsModalVisible(!isModalVisible);
    };

    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);
    };

    const closeModal = () => {
        setIsExpanded(false);
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.companyHeader}>
                    <Image source={image} style={styles.logo} />
                    <Text style={styles.Company}>{company}</Text>
                </View>

                <View style={styles.companyAddressContainer}>
                    <View style={styles.companyAddressInfo}>
                        <Text style={styles.companyAddress}>{address}</Text>
                    </View>
                    <View style={styles.companyAddressContainerDT}>
                        <Text style={styles.text}>{distance}</Text>
                        <Ionicons style={styles.EllipseIcon} name='ellipse' size={4} />
                        <Text style={styles.text}>{distanceTime}</Text>
                    </View>
                </View>
                <View style={styles.bottomseparator} />
                {images && images.length > 0 && ( 
                    <View>
                        <Text style={styles.Text}>Movies Showing Today</Text>
                        <View style={styles.imagesContainer}>
                            {images.map((item) => (
                                <TouchableOpacity onPress={() => navigation.navigate('MovieShowTime', {image: item.image, title: item.title, about: item.about, releasedate: item.releasedate, movietime: item.movietime, genre: item.genre })} key={item.id.toString()} style={styles.imageContainer}>
                                    <Image source={item.image} style={styles.image} />
                                    <Text style={styles.imageText}>{item.title}</Text>
                                    {/* "about" information not displayed here */}
                                    {/* "releasedate" information not displayed here */}
                                    {/* "movietime" information not displayed here */}
                                    {/* "genre" information not displayed here */}
            </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.Text}>Movies Showing Today</Text>
                </View>
                <View style={styles.GenreContainer}>
                    <TouchableOpacity onPress={toggleDropdown} style={[styles.headercontentsubinner4, isExpanded && styles.activeGenre]}>
                        <Text style={[styles.headercontentsubinner3txt2, isExpanded]}>{isExpanded ? "All Genre" : "All Genre"}</Text>
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
                <View style={styles.moviescontainer}>
                    <CinemaScreenMovieList />
                </View>
                <View style={styles.moviesbtncontainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('OnBoardingScreen2')} style={styles.moviesbtn}>
                        <Text style={styles.moviesbtntxt}>See All</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CinemaScreen2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        margin: 20,
    },
    back: {
        marginRight: 16,
    },
    separator: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: '100%',
        alignSelf: 'center',
    },
    bottomseparator: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    content: {
        padding: 20,
    },
    Company: {
        fontSize: 20,
        fontFamily: 'Outfit_600SemiBold',
        width: 282,
        lineHeight: 24
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    imageContainer: {
        width: '48%',
        marginVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 165,
        height: 200,
        marginBottom: 5,
        borderRadius: 6,
    },
    imageText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    companyHeader: {
        flexDirection: 'row',
        gap: 6,
        width: '100%',
    },
    logo: {
        width: 55,
        height: 55,
        borderRadius: 4,
    },
    companyAddressContainer: {
        flexDirection: 'column',
        marginTop: 5,
    },
    companyAddressInfo: {
        marginTop: 5,
    },
    companyAddress: {
        fontSize: 14,
        fontFamily: 'Outfit_400Regular',
    },
    companyAddressContainerDT: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 5,
    },
    Text: {
        fontSize: 20,
        fontFamily: 'Outfit_600SemiBold',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Outfit_400Regular',
    },
    GenreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dropdown: {
        zIndex: 99,
    },
    dropdownContainer: {
        position: 'absolute',
        left: 0, // Adjust according to your layout
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
    headercontentsubinner4: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: 130,
        justifyContent: 'center',
    },
    headercontentsubinner3txt2: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        padding: 10,
        color: 'rgba(60, 60, 67, 1)',
        textAlign: 'center',
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
