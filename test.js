import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';


const ProgressBar = ({ progress }) => {
  // Calculate the width of the progress bar and the low-opacity background bar
  const fillWidth = `${progress}%`;
  let backgroundWidth = progress * 1.2; // Adjust the multiplier (1.2 in this case) to make it move faster
  backgroundWidth = backgroundWidth > 100 ? 100 : backgroundWidth; // Limit the width to 100 (100%)

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: fillWidth }]} />
      <View style={[styles.progressBarBackground, { width: `${backgroundWidth}%` }]} />
    </View>
  );
};


const UploadScreen = () => {
  const navigation = useNavigation();
  const [media, setMedia] = useState(null);
  const videoRef = useRef(null); // Ref for the Video component
  const [isPlaying, setIsPlaying] = useState(false); // State to track playback status
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);

  const pickMedia = async (mediaType) => {
    let result;
    if (mediaType === 'video') {
      result = await VideoPicker.launchImageLibraryAsync({
        mediaTypes: VideoPicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      setMedia({ type: mediaType, uri: result.assets[0].uri });
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const playbackStatus = await videoRef.current.getStatusAsync();
        const newProgress = (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
        setProgress(newProgress);
      }
    }, 500); // Update every 500 milliseconds
    return () => clearInterval(interval);
  }, []);
  
  


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
          <TouchableOpacity onPress={() => {
            if (media && media.type === 'video') {
              // Handle click on the video (e.g., pause/play the video or navigate to a different screen)
              console.log('Clicked on the video');
            } else {
              pickMedia('video'); // Handle click on "Browse Files" button
            }
          }}>
            {media && media.type === 'video' ? (
              <View style={styles.mediaContainer}>
              <Video
                ref={videoRef}
                source={{ uri: media.uri }}
                style={styles.video}
                useNativeControls={false}
                resizeMode="cover"
                isLooping
                shouldPlay
                onPlaybackStatusUpdate={(status) => setIsPlaying(status.isPlaying)}
                 />
                <View style={styles.pauseIconContainer} >
                  <TouchableOpacity style={styles.pauseIconbody} onPress={togglePlayback}>
                  <Ionicons
                    name={isPlaying ? 'pause-outline' : 'play-outline'}
                    size={18}
                    color="white"
                  />
                </TouchableOpacity>
                <ProgressBar progress={progress} />
                </View>
                 <TouchableOpacity
                  style={styles.trashIconContainer}
                  onPress={() => {
                    setMedia(null);
                  }}
                >
                  <Ionicons name="trash-outline" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addMoreButton} onPress={() => pickMedia('video')}>
                  <Ionicons name="add-outline" size={24} color="white" />
                  <Text style={styles.addMoreButtonText}>Browse Files</Text>
                </TouchableOpacity>

              </View>
            ) : (
              <View style={styles.overlayBox}>
                <Ionicons name="share" size={24} color="white" />
                <Text style={styles.overlayBoxText}>Browse Files</Text>
              </View>
            )}
          </TouchableOpacity>

          {!media || media.type !== 'video' ? (
          <Text style={styles.overlayTextdown}>
            You can upload up to 3 videos from the same movie to enhance your search.
          </Text>
        ) : (
          <TouchableOpacity onPress={() => { /* Your logic here */ }} style={styles.ctabutton}>
            <Text style={styles.ctaText}>Continue</Text>
          </TouchableOpacity>
        )}
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
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
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
  mediaContainer: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  video: {
    flex: 1,
    width: 400,
    borderRadius: 10,
    borderWidth: .5,
    borderColor: 'white',
    height: 300,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 10,
  },
  addMoreButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  trashIconContainer: {
    position: 'absolute',
    top: 10, // Adjust as needed
    right: 10, // Adjust as needed
    zIndex: 2, // Ensure it's above the video
    backgroundColor: '#635D5F', // Dark opacity background
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseIconContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    zIndex: 2, 
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pauseIconbody: {
    zIndex: 2, 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#ccc',
    position: 'absolute',
    left: 30,
    width: 340,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Use rgba for opacity
  },
  progressBarBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Use rgba for opacity
    borderRadius: 20,
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  ctabutton: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    height: 50,
    width: 400,
  },
  ctaText: {
    color: '#5303FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
