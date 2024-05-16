import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Modal, Linking } from 'react-native';
import React, { useState, } from 'react';
import { useRoute,} from '@react-navigation/native'; // Import useRoute to access route params
import { useNavigation } from '@react-navigation/native';
import { BackIcon, EllipseVerticalIcon, ArrowRightIcon, ModalShareIcon, ModalFlagIcon, TrashIcon, YoutubeIcon, } from './icons';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const NotificationOpenedScreen = () => {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { company } = route.params; 
    const { image } = route.params; 
    const { date } = route.params; 
    const { time } = route.params; 
    const { title } = route.params; 
    const { message } = route.params; 
    const { contentimages } = route.params; 
    const [isModalVisible, setIsModalVisible] = useState(false);


    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
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

<ScrollView>
    <View style={styles.headersub}>
       <View style={styles.headersubimgsdwb}>
       <Image style={styles.headersubimg} source={image}></Image>
       </View>
       <View>
       <Text style={styles.headersubimgtxt}>{company}</Text> 
       </View>
       <TouchableOpacity onPress={toggleModal} style={styles.headersubicon}>
        <EllipseVerticalIcon />
       </TouchableOpacity>
    </View>
    <View style={styles.headersubdate}>
        <Text style={styles.headersubimgtxtdate}>{date}</Text> 
        <Ionicons style={styles.headersubdateicon} name="ellipse" size={3} color="#56545C" />
        <Text style={styles.headersubimgtxtdate}>{time}</Text> 
    </View>
    <View style={styles.headersub2}>
        <Text style={styles.headersub2txt1}>{title}</Text> 
        <Text style={styles.headersub2txt2}>{message}</Text>
    </View>

    <View style={styles.headersub3}>
  {contentimages && contentimages.length > 0 && (
    <View>
      {company === 'Netflix' && contentimages.length > 0 && (
        <View style={styles.netflixContainer}>
          <Image style={styles.NetflixImage} source={contentimages[0].source} />
          <Text>{contentimages[0].text}</Text>
        </View>
      )}
      {company === 'Prime Video' && contentimages.length > 0 && (
        <View style={styles.primeVideoContainer}>
        <TouchableOpacity style={{marginBottom: 10,}}  onPress={() => Linking.openURL(contentimages[0].trailer)}>
        <YoutubeIcon />
        </TouchableOpacity>
          <Text style={styles.PrimeImagetxt}>{contentimages[0].text}</Text>
          <Image style={styles.PrimeImage} source={contentimages[0].source} />
          <TouchableOpacity style={styles.primeplay} onPress={() => Linking.openURL(contentimages[0].trailer)}>
          <Image source={require('../assets/play-icon.png')} style={styles.playicon} />
          </TouchableOpacity>
        </View>
      )}
      {company === 'Genesis Cinema' && contentimages.length > 0 && (
        <View>
          <View style={styles.genesisCinemaContainer1}>
            <Image style={styles.genesisCinemaImage} source={contentimages[0].source} />
            <View style={styles.genesisCinemaContainersub}>
            <Text style={styles.genesisCinemaContainersubtxt}>{contentimages[0].title}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Release: {contentimages[0].date}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Genre: {contentimages[0].Genre}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Actor: {contentimages[0].Actor}</Text>
            <TouchableOpacity style={styles.genesisCinemaContainersubicon}>
            <Text style={styles.genesisCinemaContainersubicontxt}>Full Details</Text>
            <ArrowRightIcon />
            </TouchableOpacity>
            </View>
          </View>
          {contentimages.length > 1 && (
            <View style={styles.genesisCinemaContainer1}>
              <Image style={styles.genesisCinemaImage} source={contentimages[1].source} />
              <View style={styles.genesisCinemaContainersub}>
              <Text style={styles.genesisCinemaContainersubtxt}>{contentimages[1].title}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Release: {contentimages[1].date}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Genre: {contentimages[1].Genre}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Actor: {contentimages[1].Actor}</Text>
            <TouchableOpacity style={styles.genesisCinemaContainersubicon}>
            <Text style={styles.genesisCinemaContainersubicontxt}>Full Details</Text>
            <ArrowRightIcon />
            </TouchableOpacity>
            </View>
            </View>
          )}
          {contentimages.length > 2 && (
            <View style={styles.genesisCinemaContainer1}>
              <Image style={styles.genesisCinemaImage} source={contentimages[2].source} />
              <View style={styles.genesisCinemaContainersub}>
              <Text style={styles.genesisCinemaContainersubtxt}>{contentimages[2].title}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Release: {contentimages[2].date}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Genre: {contentimages[2].Genre}</Text>
            <Text style={styles.genesisCinemaContainersubtxtp}>Actor: {contentimages[2].Actor}</Text>
            <TouchableOpacity style={styles.genesisCinemaContainersubicon}>
            <Text style={styles.genesisCinemaContainersubicontxt}>Full Details</Text>
            <ArrowRightIcon />
            </TouchableOpacity>
            </View>
            </View>
          )}
        </View>
      )}
    </View>
  )}
</View>



    <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
      >
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={toggleModal}>
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalOption}>
          <ModalShareIcon />
            <Text style={styles.modalOptionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
          <ModalFlagIcon />
            <Text style={styles.modalOptionText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
          <TrashIcon />
            <Text style={[styles.modalOptionText, { color: 'red' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>


</ScrollView>
    </SafeAreaView>
  );
};

export default NotificationOpenedScreen;

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
        fontFamily: 'Outfit_500Medium',
        textAlign: 'center',
        flex: 1,
    },
    back: {
        marginRight: 16,
    },
    separator: {
        borderBottomWidth: .5,
        borderBottomColor: 'gray',
        width: '100%',
        alignSelf: 'center',
    },
    headersub: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    headersubicon: {
        marginLeft: 'auto', // Moves the icon to the right
    },
    headersubimg: {
        width: 55,
        height: 55,
        borderRadius: 4,
    },
    headersubimgsdwb: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },headersubimgtxt: {
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
        marginLeft: 10,
        color: 'black',
    },
    headersubdate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    headersubimgtxtdate: {
        fontSize: 12,
        fontFamily: 'Outfit_400Regular',
        color: 'rgba(89, 89, 97, 1)',
    },
    headersubdateicon: {
        marginRight: 5,
        marginLeft: 5,
        color: 'rgba(89, 89, 97, 1)',
    },
    headersub2: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 20,
    },
    headersub2txt1: {
        fontSize: 20,
        fontFamily: 'Outfit_600SemiBold',
        color: 'rgba(23, 22, 26, 1)',
        marginTop: 10,
        marginBottom: 10,
    },
    headersub2txt2: {
        fontSize: 16,
        fontFamily: 'Outfit_400Regular',
        color: 'rgba(52, 52, 58, 1)',
        marginTop: 10,
        marginBottom: 10,
    },
    headersub3: {
        margin: 20,
        
    }, 
    genesisCinemaImage: {
        width: 126,
        height: 150,
        borderRadius: 4,
    },
    genesisCinemaContainer1: {
        width: screenWidth > 375 ? 363 : 343, 
        height: 174,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        justifyContent: 'flex-start',
        padding: 10,
        flexDirection: 'row',
    },
    genesisCinemaContainersub: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    genesisCinemaContainersubtxt: {
        fontSize: 14,
        fontFamily: 'Outfit_600SemiBold',
        color: 'rgba(0, 0, 0, 1)',
        marginBottom: 5,
    },
    genesisCinemaContainersubtxtp: {
        fontSize: 13,
        fontFamily: 'Outfit_400Regular',
        color: 'rgba(0, 0, 0, 1)',
        marginTop: 5,
        marginBottom: 5,
        width: 185,
    },
    genesisCinemaContainersubicon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
    },
    genesisCinemaContainersubicontxt: {
        marginRight: 10,
        color: 'rgba(83, 3, 255, 1)',
        fontFamily: 'Outfit_400Regular',
        fontSize: 13,
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end', // Center content vertically
        alignItems: 'flex-end', // Center content horizontally
      },
      modalContent: {
        backgroundColor: 'rgba(245, 245, 245, 1)',
        width: 177,
        height: 184,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(80, 85, 92, 1)',
        padding: 20,
        right: 20,
        position: 'absolute',
        top: 180,
      },
      modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
      },
      modalOptionText: {
        marginLeft: 10,
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        color: 'rgba(60, 60, 67, 1)'
      },
      primeVideoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      PrimeImagetxt: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        color: 'rgba(23, 22, 26, 1)',
        marginBottom: 20,
      },
      PrimeImage: {
        width: 343,
        height: 199,
        borderRadius: 8
      },
      primeplay:{
        position: 'absolute',
        top: '50%', // Position at the vertical center
        left: '50%', // Position at the horizontal center
        transform: [{ translateX: -54 }, { translateY: 1 }], // Center the icon
        zIndex: 1, // Ensure it's above the image
        width: 64,
        height: 64,
      },
      playicon: {
        width: 64,
        height: 64,
      }
});
