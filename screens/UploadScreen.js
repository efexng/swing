import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useNavigation } from '@react-navigation/native';


const UploadScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.uploadBoxContainer}>
      <View style={styles.overlayTextContainer}>
              <Text style={styles.overlayText}>Searching for a movie?</Text>
              <Text style={styles.overlayTextup}>
                We need you to upload a 10-20 seconds video from the movie first
              </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={24} color="white" style={styles.closeIcon} />
          </TouchableOpacity>
        <View style={styles.overlay}>      
          <View style={styles.overlayBox}>
            <Ionicons name="share" size={24} color="white" />
            <Text style={styles.overlayBoxText}>Browse Files</Text>
          </View>
          <Text style={styles.overlayTextdown}>
            You can upload up to 3 videos from the same movie to enhance your search.
          </Text>
        </View>
      </View>
      {/* End of UploadBoxContainer */}

      {/* Circles */}
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <View style={styles.tinyCircle} />
        </View>
      </View>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5303FF',
  },
  uploadBoxContainer: {
    position: 'absolute',
    zIndex: 1, // Ensure it appears above the circles
    backgroundColor: 'rgba(83, 3, 255, 0.8)', // Dark opacity background
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    
  },  
  outerCircle: {
    flexDirection: 'column',
    marginRight: 10,
    width: 600,
    height: 600,
    borderRadius: 300,
    borderWidth: 30,
    borderColor: 'white',
    backgroundColor: '#5303FF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0, // Lower z-index for the circles
  },
  innerCircle: {
    width: 250,
    height: 250,
    borderRadius: 200,
    borderWidth: 20,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 100,
  },
  tinyCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 10,
    borderColor: 'white',
    position: 'absolute',
    bottom: -30,
    right: -50,
  },
  overlay: {
    position: 'relative', // Added position relative
    alignItems: 'center',
    top: 300,
  },
  closeIcon: {
    position: 'absolute', // Position the close icon absolutely
    top: 60, // Adjust top spacing as needed
    right: 20, // Adjust right spacing as needed
  },
  overlayText: {
    color: 'white',
    width: 343,
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlayTextup: {
    color: 'white',
    marginTop: 10,
    width: 343,
    alignItems: 'flex-start',
    fontSize: 15,
    fontWeight: 'semibold',
  },
  overlayTextdown: {
    color: 'white',
    marginTop: 10,
    width: 343,
    alignItems: 'flex-start',
    fontSize: 12,
    fontWeight: 'semibold',
  },
  overlayBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
    backgroundColor: 'transparent', // Set background to transparent
    borderRadius: 5,
    borderWidth: 2, // Add border width
    borderColor: 'white', // Border color
    borderStyle: 'dashed', // Dashed border style
    gap: 10, 
    width: 343,
    height: 128,
  },  
  overlayBoxText: {
    color: 'white',
    marginLeft: 5,
  },
  overlayTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute', // Position the close icon absolutely
    top: 120, // Adjust top spacing as needed
    left: 20, // Adjust right spacing as needed
  },
});
