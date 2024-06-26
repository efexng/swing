import { Alert, StyleSheet, Text, View, TouchableOpacity,Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
import {UploadIcon} from './icons'

const screenWidth = Dimensions.get('window').width;


const ProgressBar = ({ progress }) => {
  const fillWidth = `${progress}%`;
  let backgroundWidth = progress * 1.2;
  backgroundWidth = backgroundWidth > 100 ? 100 : backgroundWidth;

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: fillWidth }]} />
      <View style={[styles.progressBarBackground, { width: `${backgroundWidth}%` }]} />
    </View>
  );
};

const UploadScreen = () => {
  const navigation = useNavigation();
  const [mediaList, setMediaList] = useState([]);
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [progress, setProgress] = useState([]);

  const addMedia = async (mediaType) => {

    let result;
    if (mediaType === 'video') {
      result = await VideoPicker.launchImageLibraryAsync({
        mediaTypes: VideoPicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });
    }
  
    if (!result.canceled) {
      const duration = result.assets[0]?.duration || 0; // Get the duration of the video
      const durationInSeconds = duration / 1000; // Convert duration to seconds
      if (durationInSeconds >= 10 && durationInSeconds <= 30) {
        const newMedia = { type: mediaType, uri: result.assets[0].uri };
        setMediaList(prevMediaList => [...prevMediaList, newMedia]);
        setIsPlaying(prevIsPlaying => [...prevIsPlaying, false]); // Set initial state to paused
        setProgress(prevProgress => [...prevProgress, 0]);
      } else {
        alert('Please select a video between 10 and 30 seconds.');
      }
    }
  };
  
  

  const removeMedia = (index) => {
    const updatedMediaList = [...mediaList];
    updatedMediaList.splice(index, 1);
    setMediaList(updatedMediaList);

    const updatedIsPlaying = [...isPlaying];
    updatedIsPlaying.splice(index, 1);
    setIsPlaying(updatedIsPlaying);

    const updatedProgress = [...progress];
    updatedProgress.splice(index, 1);
    setProgress(updatedProgress);
  };

  const togglePlayback = (index) => {
    if (videoRefs.current[index]) {
      if (isPlaying[index]) {
        videoRefs.current[index].pauseAsync();
      } else {
        videoRefs.current[index].playAsync();
      }
      setIsPlaying(prevIsPlaying => {
        const updatedIsPlaying = [...prevIsPlaying];
        updatedIsPlaying[index] = !updatedIsPlaying[index];
        return updatedIsPlaying;
      });
    }
  };

  useEffect(() => {
    const intervals = mediaList.map((_, index) =>
      setInterval(async () => {
        if (videoRefs.current[index]) {
          const playbackStatus = await videoRefs.current[index].getStatusAsync();
          const newProgress = (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
          setProgress(prevProgress => {
            const updatedProgress = [...prevProgress];
            updatedProgress[index] = newProgress;
            return updatedProgress;
          });
        }
      }, 500)
    );
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [mediaList]);

  return (
    <View style={styles.container}>
      <View style={styles.uploadBoxContainer}>
        <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={30} color="white" style={styles.closeIcon} />
        </TouchableOpacity>
       <View style={styles.overlayBoxTextContainer}>
          <Text style={styles.overlayTextSearch}>Searching for a movie?</Text>
          <Text style={styles.overlayTexttime}>
            We need you to upload a 10-20 seconds video from the movie first
          </Text>
       </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {mediaList.map((media, index) => (
            <View key={index} style={styles.mediaContainer}>
              <Video
                ref={ref => (videoRefs.current[index] = ref)}
                source={{ uri: media.uri }}
                style={styles.video}
                useNativeControls={false}
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={(status) =>
                  setIsPlaying(prevIsPlaying => {
                    const updatedIsPlaying = [...prevIsPlaying];
                    updatedIsPlaying[index] = status.isPlaying;
                    return updatedIsPlaying;
                  })
                }
              />
              <View style={styles.pauseIconContainer}>
                <TouchableOpacity style={styles.pauseIconbody} onPress={() => togglePlayback(index)}>
                  <Ionicons
                    name={isPlaying[index] ? 'pause-outline' : 'play-outline'}
                    size={18}
                    color="white"
                  />
                </TouchableOpacity>
                <ProgressBar progress={progress[index]} />
              </View>
              <TouchableOpacity
                style={styles.trashIconContainer}
                onPress={() => removeMedia(index)}
              >
                <Ionicons name="trash-outline" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ))}


          {mediaList.length === 0 && (
            <TouchableOpacity style={styles.addMoreButton} onPress={() => addMedia('video')}>
              <View style={styles.overlayBox}>
                <UploadIcon />
                <Text style={styles.overlayBoxText}>Browse Files</Text>
              </View>
            </TouchableOpacity>
          )}


          {mediaList.length < 2 && mediaList.length > 0 ? (
          <TouchableOpacity style={styles.addMoreButton} onPress={() => addMedia('video')}>
            <Ionicons name="add-outline" size={24} color="white" />
            <Text style={styles.addMoreButtonText}>Browse Files</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addMoreButtonPlaceholder} />
        )}


          {mediaList.length > 0 && (
            <TouchableOpacity onPress={() => navigation.navigate('UploadScreenExtract')} style={styles.ctabutton}>
              <Text style={styles.ctaText}>Continue</Text>
            </TouchableOpacity>
          )}

          {mediaList.length === 0 && (
            <View style={styles.overlayBoxTextdown}>
             <Text style={styles.overlayTextdown}>
             You can upload up to 2 videos from the same movie to enhance your search.
             </Text>
            </View>
          )}

        </ScrollView>
      </View>
      {/* End of UploadBoxContainer */}

      {/* Circles */}
      
      {mediaList.length < 1 && (
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <View style={styles.tinyCircle} />
          </View>
        </View>
      )}
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
    width:  screenWidth  <= 375 ? 500 : 600,
    height: screenWidth  <= 375 ? 500 : 600,
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
  closeIcon: {
    marginLeft: 'auto',
    marginRight: 20,
    marginTop: screenWidth  <= 375 ? 50 : 90,
    zIndex: 1,
  },
  overlayBoxTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
    margin: screenWidth  <= 375 ? 20 : 20,
    marginTop: screenWidth  <= 375 ? 30 : 40,
  }, 
  overlayTextSearch: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Outfit_700Bold'
  },
  overlayTexttime: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Outfit_400Regular'
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
    width: '90%',
    height: screenWidth  <= 375 ? 128 : 148,
    margin: 'auto',
    marginTop: screenWidth  <= 375 ? 40 : 60,
    marginBottom: screenWidth  <= 375 ? 10 : 20,
  },
  overlayBoxText: {
    color: 'white',
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
  },
  overlayBoxTextdown: {
    marginLeft: screenWidth  <= 375 ? 20 : 20,
  },
  overlayTextdown: {
    color: 'white',
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    textAlign: 'start',
  },
  mediaContainer: {
    width: '90%',
    height: screenWidth  <= 375 ? 180 : 200,
    marginTop: 10,
    margin: screenWidth  <= 375 ? 20 : 20,
  },
  video: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
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
  bottom: 10,
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
  width: screenWidth <= 375 ? 290 : screenWidth === 393 ? 305 : 340,
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
  margin: 'auto',
  width: '90%',
},
ctaText: {
  color: '#5303FF',
  fontSize: 16,
  fontWeight: 'bold',
},
addMoreButtonPlaceholder: {
  height: 10, 
},  
});
