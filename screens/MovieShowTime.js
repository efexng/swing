import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { BackIcon, BackIconWhite,ArrowRightIcon3, ArrowRightIcon4 } from './icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import TicketPurchaseModal from './TicketPurchaseModal';


const screenWidth = Dimensions.get('window').width;
const genreData = [
    { id: 1, date: 'Friday 8th March', times: ['17:25'] },
    { id: 2, date: 'Saturday 9th March', times: ['20:20', '16:15', '17:25'] },
    { id: 3, date: 'Sunday 10th March', times: ['19:20'] },
    { id: 4, date: 'Monday 11th March', times: ['21:40', '12:00', '17:25', '20:20'] }
];

const MovieShowTime = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { image, title, about, releasedate, movietime, genre } = route.params;
    const [selectedTime, setSelectedTime] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const isTimeSelected = (date, time) => selectedTime && selectedTime.date === date && selectedTime.time === time;
    const resetSelectedTime = () => {
        setSelectedTime(null);
    };
    const toggleTime = (date, time) => {
        if (isTimeSelected(date, time)) {
            setSelectedTime(null);
        } else {
            setSelectedTime({ date, time });
        }
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [startTimer, setStartTimer] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
        setStartTimer(isModalVisible); // Set startTimer based on modal visibility
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
    const buyButtonStyle = isDarkMode ? [styles.buyButton, styles.darkbuyButton] : styles.buyButton;
    const textStyle = isDarkMode ? [styles.Moviename, styles.darkMoviename] : styles.Moviename;
    const textStyl2 = isDarkMode ? [styles.Movieabout, styles.darkMovieabout] : styles.Movieabout;
    const textStyl3 = isDarkMode ? [styles.MovieInfoContenttxt, styles.darkMovieInfoContenttxt] : styles.MovieInfoContenttxt;
    const textStyl4 = isDarkMode ? [styles.movieshowingtimetxt, styles.darkmovieshowingtimetxt] : styles.movieshowingtimetxt;
    const textStyl5 = isDarkMode ? [styles.dateText, styles.darkdateText] : styles.dateText;
    const textStyl6 = isDarkMode ? [styles.timeText, styles.darktimeText] : styles.timeText;

    return (
        <SafeAreaView style={containerStyle}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {isDarkMode ? <BackIconWhite/> : <BackIcon />}
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <ScrollView >
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} />
                </View>
                <View style={styles.MovieInfo}>
                    <Text style={textStyle}>{title}</Text>
                    <Text style={textStyl2}>{about}</Text>
                </View>
                <View style={styles.MovieInfoContent}>
                    <Text style={textStyl3}>{releasedate}</Text>
                    <Ionicons name='ellipse' size={5} color={isDarkMode ? '#fff' : '#000'} />
                    <Text style={textStyl3}>{movietime}</Text>
                    <Ionicons name='ellipse' size={5} color={isDarkMode ? '#fff' : '#000'} />
                    <Text style={textStyl3}>{genre}</Text>
                </View>
                <View style={styles.bottomseparator} />
                <View style={styles.movieshowingtime}>
                    <Text style={textStyl4}>
                        Movie Times
                    </Text>
                    <View>
                        {genreData.map((item) => (
                            <View key={item.id} style={styles.dateContainer}>
                                <Text style={textStyl5}>{item.date}</Text>
                                <View style={styles.timeRow}>
                                    {item.times.map((time, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.timeBox,
                                                isTimeSelected(item.date, time) && styles.selectedTime,
                                            ]}
                                            onPress={() => toggleTime(item.date, time)}
                                        >
                                            <Text style={[textStyl6, isTimeSelected(item.date, time) && styles.selectedTimeText]}>
                                                {time}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                   <TouchableOpacity
                style={[
                    buyButtonStyle,
                    selectedTime && styles.activeBuyButton,
                ]}
                disabled={!selectedTime}
                onPress={toggleModal} // Open modal when button is pressed
            >
                <Text style={[
                    styles.buyButtonText,
                    selectedTime && styles.activeBuyButtonText,
                ]}>
                    Buy Ticket
                </Text>
                {selectedTime ? <ArrowRightIcon4 style={styles.buyButtonIcon} /> : <ArrowRightIcon3 style={styles.buyButtonIcon} />}
            </TouchableOpacity>

            {/* Ticket Purchase Modal */}
            <TicketPurchaseModal visible={isModalVisible} onClose={toggleModal} startTimer={isModalVisible}  resetSelectedTime={resetSelectedTime} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MovieShowTime;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    darkContainer: {
        flex: 1,
        backgroundColor: 'rgba(23,25,28,255)',
    },
    header: {
        flexDirection: 'row',
        margin: 20,
    },
    back: {
        marginRight: 16,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        width: '100%',
        alignSelf: 'center',
    },
    bottomseparator: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width: screenWidth > 375 ? 363 : 343,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    imageContainer: {
        marginVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: screenWidth > 375 ? 363 : 343,
        height: 230,
        marginBottom: 5,
        borderRadius: 8,
        objectFit: 'fill',
    },
    MovieInfo: {
        width: screenWidth > 375 ? 363 : 343,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'center',
        gap: 15,
    },
    Moviename: {
        fontSize: 20,
        fontFamily: 'Outfit_700Bold',
    },
    Movieabout: {
        fontSize: 14,
        fontFamily: 'Outfit_400Regular',
    },
    MovieInfoContent: {
        width: screenWidth > 375 ? 363 : 343,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 10,
        marginTop: 15,
    },
    MovieInfoContenttxt: {
        fontSize: 14,
        fontFamily: 'Outfit_600SemiBold',
    },
    movieshowingtime: {
        width: screenWidth > 375 ? 363 : 343,
        alignSelf: 'center',
    },
    dateContainer: {
        marginVertical: 10,
    },
    dateText: {
        fontSize: 14,
        fontFamily: 'Outfit_400Regular',
        marginBottom: 10,
    },
    timeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    timeBox: {
        width: 80,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DCE1E5',
    },
    timeText: {
        fontSize: 14,
        fontFamily: 'Outfit_400Regular',
        color: 'rgba(67, 67, 74, 1)',
    },
    selectedTime: {
        backgroundColor: '#5303FF',
        borderWidth: 0,
    },
    selectedTimeText: {
        color: '#fff',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    buyButton: {
        width: '90%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DCE1E5',
        backgroundColor: '#F5F5F5',
        paddingRight: 12, // Add paddingRight to create space for the icon
    },
    activeBuyButton: {
        borderColor: '#5303FF',
        backgroundColor: '#5303FF',
    },
    buyButtonText: {
        fontSize: 16,
        fontFamily: 'Outfit_500Medium',
        color: '#9E9E9E',
        textAlign: 'center',
        flex: 1, // Occupy remaining space
    },
    activeBuyButtonText: {
        color: '#fff',
    },
    buyButtonIcon: {
        marginLeft: 12, // Add marginLeft instead of marginRight
    },    
    movieshowingtimetxt: {
        fontSize: 20,
        fontFamily: 'Outfit_600SemiBold',
    },
    darkMoviename: {
        color: '#fff',
    },
    darkMovieabout: {
        color: '#fff',
    },
    darkMovieInfoContenttxt: {
        color: '#fff',
    },
    darkmovieshowingtimetxt: {
        color: '#fff',
    },
    darkdateText: {
        color: '#fff',
    },
    darktimeText: {
        color: '#fff',
    },
    darkbuyButton :{
        backgroundColor: '#39393B',
    }
});
