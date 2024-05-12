import React, { useState, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


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
                    <Ionicons style={styles.back} name="arrow-back" size={20} color="black" />
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
            <View style={styles.notificationbox}>
                <Text>20/ 02/ 2024</Text>
                <View style={styles.notificationboxcontent}>
                <View style={styles.notificationlogo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#808080', borderRadius: '20', width: 30, height: 30,}}>
                    <Text style={{fontWeight: '900', color: '#fff', fontSize: 20,}}>G</Text>
                    </View>
                    <Text style={styles.notificationboxmsgtext}>Genesis Cinema</Text>
                </View>
                    <Ionicons name="ellipsis-horizontal-outline" size={24} color="#56545C" />
                </View>
                <View style={styles.notificationboxmsg}>
                <Text style={styles.notificationboxmsgtextbottom}>
                            {truncateText(
                                'Enjoy non-stop happiness with our selected up to date movie collections curated just for you and ...',
                                100
                            )}
                        </Text>         
                               </View>
                <View style={styles.notificationboxtime}>
                <Text style={styles.notificationboxmsgtime}>11:50 AM</Text>
                </View>
            </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '##F5F5F5'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    notificationText: {
        fontSize: 16,
        fontWeight: 'semibold',
        textAlign: 'center',
        flex: 1,
    },
    back: {
        marginRight: 16,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
        alignSelf: 'center',
        marginTop: 16,
    },
    statusContainer: {
        marginTop: 16,
        justifyContent: 'center', // Center content vertically
        paddingHorizontal: 70, // Add space from left and right
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20, // Add space from left and right
    },
    statusText: {
        color: 'black',
        fontSize: 16,
    },
    statuslightContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statuslight: {
        fontSize: 5,
        color: '#07F411',
        marginLeft: 2,
    },
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginVertical: 20,
        marginHorizontal: 40,
        borderRadius: 10, // Add border radius for rounded corners
    },
    boxItem: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 6,
        marginHorizontal: 6,
        paddingVertical: 10,
        borderRadius: 10,
    },
    boxText: {
        fontSize: 12,
    },
    unread: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationbox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationboxcontent: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        marginTop: 10,
    },
    notificationlogo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    },
    notificationboxmsg: {
        marginLeft: 45,
        width: 280,
        height: 29,
      },
      notificationboxmsgtext: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
      },
      notificationboxmsgtextbottom: {
        fontSize: 12,
        fontWeight: '400',
      },
      notificationboxtime: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 5,
        color: 'gray',
      },
      notificationboxmsgtime: {
        fontSize: 12,
        fontWeight: '400',
        marginLeft: 10,
        color: 'gray',
      },
});

export default NotificationScreen;
