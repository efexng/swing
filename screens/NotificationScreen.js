import React, { useState, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './NotificationStyle';
import { BackIcon} from './icons';




const notifications = [
    {
        date: '06/05/2024',
        notifications: [
            {
                image: require('../assets/genesis-icon.png'), 
                images: [
                    require('../assets/if.png'),
                    require('../assets/mad-max.png'),
                    require('../assets/bad-boys.png'),
                ],
                company: 'Genesis Cinema',
                message: 'Enjoy non-stop happiness with our selected up to date movie collections curated just f...',
                time: '11:50 AM',
                type: 'unread',
            },
            {
                image: require('../assets/genesis-icon.png'), 
                company: 'Genesis Cinema',
                message: 'Enjoy non-stop happiness with our selected up to date movie collections curated just for you and ...',
                time: '11:50 AM',
                type: 'unread',
            },
        ]
    },
    {
        date: '07/05/2024',
        notifications: [
            {
                image: require('../assets/Netflix-icon.png'), 
                company: 'Netflix',
                message: 'The unbeatable offer of the summer: Netflix Premium for just $1.99/month for 3 months, starts on May 20.',
                time: '11:50 AM',
                type: 'read',
            },
            {
                image: require('../assets/primevideo-icon.png'), 
                company: 'Prime Video',
                message: 'The highly anticipated fourth season of the Emmy-nominated hit drama series The Boys will premiere on Prime Video on June 13. ',
                time: '11:50 AM',
                type: 'unread',
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
    ? notifications.filter(notification => notification.type === 'unread')
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
                <Text style={styles.notificationText}>Notification</Text>
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
                    <View style={styles.unread} >
                        <Text style={[styles.boxText, activeSection === 'Unread' ? { color: 'white' } : null]}>Unread</Text>
                        <Ionicons name="ellipse" size={5} color="#07F411" style={{ marginLeft: 4, }} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>
    {notifications.map((dailyNotifications, index) => {
        const unreadNotifications = dailyNotifications.notifications.filter(notification => notification.type === 'unread');
        if (showUnread && unreadNotifications.length === 0) {
            return null; 
        }

        return (
            <View key={index} style={styles.notificationbox}>
                <Text>{dailyNotifications.date}</Text>
                {dailyNotifications.notifications
                    .filter(notification => !showUnread || notification.type === 'unread')
                    .map((notification, innerIndex) => (
                        <View key={innerIndex} style={styles.notificationboxcontent}>
                            <View style={styles.notificationlogo}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <View style={styles.shadowContainer}>
                                    <Image style={styles.streamLogo} source={notification.image} />
                                    <Image source={notification.images} />
                                </View>
                                    <Text style={notification.type === 'unread' ? styles.notificationboxmsgtextunread : styles.notificationboxmsgtext}>
                                        {notification.company}
                                    </Text>
                                </View>
                                <Ionicons name="ellipsis-horizontal-outline" size={24} color="#56545C" />
                            </View>
                                <Text style={notification.type === 'unread' ? styles.notificationboxmsgtextbottom :  styles.notificationboxmsgtextbottomgray}>
                                    {truncateText(notification.message, 86)}
                                </Text>
              
                            <View style={styles.notificationboxtime}>
                                <Text style={styles.notificationboxmsgtime}>{notification.time}</Text>
                            </View>
                        </View>
                    ))}
            </View>
        );
    })}
</ScrollView>


            
        </SafeAreaView>
    );
};


export default NotificationScreen;
