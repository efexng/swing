import React, { useState, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './NotificationStyle';
import { BackIcon, EllipseHorizontalIcon } from './icons';

const notifications = [
    {
        date: 'Today',
        notifications: [
            {
                image: require('../assets/genesis-icon.png'),
                contentimages: [
                    {
                        source: require('../assets/if.png'),
                        title: 'IF',
                        date: 'May 17, 2024',
                        Genre: 'Comedy, drama, Family',
                        Actor: 'Cailey Fleming, Emily Blunt, John Krasinski'
                    },
                    {
                        source: require('../assets/mad-max.png'),
                        title: 'FURIOSA: A MAD MAX SAGA',
                        date: 'May 24, 2024',
                        Genre: 'Action, Adventure, Sci-Fi,',
                        Actor: 'Angus Sampson, Anya Taylor-Joy, Chris Hemsworth'
                    },
                    {
                        source: require('../assets/bad-boys.png'),
                        title: 'BAD BOYS RIDE OR DIE',
                        date: 'June 5, 2024',
                        Genre: 'Comedy, Action, Thriller',
                        Actor: 'Will Smith, Martin Lawrence, Paola Núñez'
                    },
                ],
                company: 'Genesis Cinema',
                title: 'Step into a World of Cinematic Magic: Discover Our Latest Blockbusters!',
                message: 'Enjoy non-stop happiness with our selected up to date movie collections curated just for Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
                time: '11:50 AM',
                type: 'unread',
                date: '16/05/2024',
            },
            {
                image: require('../assets/genesis-icon.png'),
                company: 'Genesis Cinema',
                title: 'Step into a World of Cinematic Magic: Discover Our Latest Blockbusters!',
                message: 'Enjoy non-stop happiness with our selected up to date movie collections curated just for Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
                time: '11:50 AM',
                type: 'unread',
                date: '16/05/2024'
            },
        ]
    },
    {
        date: 'Last Week',
        notifications: [
            {
                image: require('../assets/Netflix-icon.png'),
                company: 'Netflix',
                title: 'DEAL ALERT! Netflix Premium Limited Time Offer, starts on May 22.',
                message: 'The unbeatable offer of the summer: Netflix Premium for just $1.99/month for 3 months, starts on May 20.',
                time: '11:59 AM',
                type: 'read',
                date: '16/05/2024'
            },
            {
                image: require('../assets/primevideo-icon.png'),
                contentimages: [
                    {
                        source: require('../assets/thboys-s4.png'),
                        text: 'Watch The Boys Season 4 - Official Trailer',
                        trailer: 'https://youtu.be/EzFXDvC-EwM'
                    },
                ],
                company: 'Prime Video',
                title: 'The Boys: Season 4 Premiere Date Announced for June 13 on Prime Video',
                message: 'The highly anticipated fourth season of the Emmy-nominated hit drama series The Boys will premiere on Prime Video on June 13. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
                time: '11:50 AM',
                type: 'unread',
                date: '16/05/2024'
            },
        ]
    },
];

const NotificationScreen = () => {
    const navigation = useNavigation();
    const [activeSection, setActiveSection] = useState('All'); // State to track active section
    const [showUnread, setShowUnread] = useState(false); // State to track whether to show Unread  or all 

    const handleUnreadPress = () => {
        setShowUnread(true); // Set state to show only Unread 
        setActiveSection('Unread'); // Set state to 'Unread' when Unread section is pressed
    };

    const handleAllPress = () => {
        setShowUnread(false); // Set state to show all 
        setActiveSection('All'); // Set state to 'All' when All section is pressed
    };

    const filteredNotifications = showUnread
        ? notifications.map(notificationGroup => ({
            ...notificationGroup,
            notifications: notificationGroup.notifications.filter(notification => notification.type === 'unread')
        })).filter(notificationGroup => notificationGroup.notifications.length > 0)
        : notifications;

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.notificationText}>Notifications</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.boxContainer}>
                <TouchableOpacity
                    style={[
                        styles.boxItem,
                        activeSection === 'All' ? styles.activeBoxItem : null,
                        { backgroundColor: activeSection === 'All' ? '#5303FF' : '#fff' },
                    ]}
                    onPress={handleAllPress}
                >
                    <Text style={[styles.boxText, activeSection === 'All' ? { color: 'white' } : null]}>All notification</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.boxItem,
                        activeSection === 'Unread' ? styles.activeBoxItem : null,
                        { backgroundColor: activeSection === 'Unread' ? '#5303FF' : '#fff' },
                    ]}
                    onPress={handleUnreadPress}
                >
                    <View style={styles.unread}>
                        <Text style={[styles.boxText, activeSection === 'Unread' ? { color: 'white' } : null]}>Unread</Text>
                        <Ionicons name="ellipse" size={5} color="#07F411" style={{ marginLeft: 4, }} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {filteredNotifications.map((dailyNotifications, index) => (
                    <View key={index} style={styles.notificationbox}>
                        <Text>{dailyNotifications.date}</Text>
                        {dailyNotifications.notifications.map((notification, innerIndex) => (
                            <TouchableOpacity onPress={() => navigation.navigate('NotificationOpenedScreen', { company: notification.company, image: notification.image, date: notification.date, time: notification.time, title: notification.title, message: notification.message, contentimages: notification.contentimages, })} key={innerIndex} style={styles.notificationboxcontent}>
                                <View style={styles.notificationlogo}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <View style={styles.shadowContainer}>
                                            <Image style={styles.streamLogo} source={notification.image} />
                                        </View>
                                        <Text style={notification.type === 'unread' ? styles.notificationboxmsgtextunread : styles.notificationboxmsgtext}>
                                            {notification.company}
                                        </Text>
                                    </View>
                                    <EllipseHorizontalIcon />
                                </View>
                                <Text style={notification.type === 'unread' ? styles.notificationboxmsgtextbottom : styles.notificationboxmsgtextbottomgray}>
                                    {truncateText(notification.message, 86)}
                                </Text>
                                <View style={styles.streamlogocontent}>
                                {notification.contentimages && notification.contentimages.map((img, imgIndex) => (
                                    <View key={imgIndex} style={styles.imageContainer}>
                                        <Image
                                            style={[
                                                styles.streamlogocontents,
                                                notification.company === 'Netflix' && styles.netflixImage,
                                                notification.company === 'Prime Video' && styles.streamlogocontents2,
                                                notification.company === 'Genesis Cinema' && (
                                                    (imgIndex === 0 && { transform: [{ rotate: '-20deg' }] }) ||
                                                    (imgIndex === notification.contentimages.length - 1 && { transform: [{ rotate: '20deg' }] })
                                                ),
                                                // Add more conditions for other companies if needed
                                            ]}
                                            source={img.source}
                                        />
                                    </View>
                                ))}
                                </View>
                                <View style={styles.notificationboxtime}>
                                    <Text style={styles.notificationboxmsgtime}>{notification.time}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationScreen;
