import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ScrollView } from 'react-native-gesture-handler';

const videoSource = 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715284562/m0n6tqk9b6jqaliqvmho.mp4';

const HomeScreen = () => {
  const navigation = useNavigation();
  const ref = useRef(null);
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Track like count
  const [isPlaying, setIsPlaying] = useState(true); // Track video playing state
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const subscription = player.addListener('playingChange', (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  const toggleVolume = () => {
    setIsVolumeMuted(!isVolumeMuted);
    player.muted = !isVolumeMuted; // Toggle the muted state of the player
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1); // Update like count based on like state
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying); // Toggle play/pause state
    if (!isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  };

  // Format the like count for display
  const formatLikeCount = (count) => {
    if (count < 1000) {
      return count.toString();
    } else if (count < 1000000) {
      return `${(count / 1000).toFixed(1)}k`;
    } else if (count < 1000000000) {
      return `${(count / 1000000).toFixed(1)}m`;
    } else {
      return `${(count / 1000000000).toFixed(1)}b`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videocontainer}>
        <TouchableOpacity onPress={handlePlayPause} style={styles.video}>
          <VideoView
            ref={ref}
            style={styles.video}
            player={player}
            contentFit="cover"
            contentPosition="center"
            nativeControls={false}
            shouldPlay={isPlaying}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.videocontrols}>
          <TouchableOpacity onPress={toggleLike}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={30}
              color={isLiked ? 'red' : '#fff'}
            />
            {likeCount > 0 && (
              <Text style={styles.likeCountText}>{formatLikeCount(likeCount)}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleVolume}>
            <Ionicons
              name={isVolumeMuted ? 'volume-mute-outline' : 'volume-high-outline'}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal}>
            <Ionicons
              name="ellipsis-vertical-outline"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.headercontainer}>
      <Text style={styles.headertitle}>What's Coming</Text>

      <ScrollView horizontal={true}>
      <Text style={styles.headercontents}>Cinema</Text>  
      <Text style={styles.headercontents}>Netflix</Text>  
      <Text style={styles.headercontents}>HBO</Text>  
      <Text style={styles.headercontents}>Disney +</Text>  
      <Text style={styles.headercontents}>Showmax</Text>  
      <Text style={styles.headercontents}>Apple Tv</Text>  
      </ScrollView>

      </View>

      <View style={styles.notification}>
        <View style={styles.notificationtinyCircle} />
        <Ionicons name="notifications-outline" size={30} color="#17161A" />
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
            <Ionicons name="bookmark-outline" size={30} color="#000" />
            <Text style={styles.modalOptionText}>Add Trailer to Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
            <Ionicons name="share-social-outline" size={30} color="#000" />
            <Text style={styles.modalOptionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
            <Ionicons name="flag-outline" size={30} color="#000" />
            <Text style={styles.modalOptionText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
            <Ionicons name="alert-circle-outline" size={30} color="red" />
            <Text style={[styles.modalOptionText, { color: 'red' }]}>Not Interested</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <View style={styles.tinyCircle} />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="home" size={30} color="#5303FF" />
          <Text style={styles.iconTextHome}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CinemaScreen')} style={styles.iconContainer}>
          <Ionicons name="film-outline" size={30} color="#17161A" />
          <Text style={styles.iconText}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SavedScreen')} style={styles.iconContainer}>
          <Ionicons name="bookmark-outline" size={30} color="#17161A" />
          <Text style={styles.iconText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MoreScreen')} style={styles.iconContainer}>
          <Ionicons name="ellipsis-horizontal-outline" size={30} color="#17161A" />
          <Text style={styles.iconText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
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
  iconTextHome: {
    color: '#5303FF',
    marginTop: 5,
  },
  video: {
    width: '100%',
    height: 790, // Updated height
    borderRadius: 10,
  },
  videocontainer: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    shadowColor: '#000',
    position: 'relative', // Added to position the controls relative to this container
  },
  videocontrols: {
    position: 'absolute',
    bottom: 100,
    right: 0,
    gap: 30,
    flexDirection: 'column', // Changed to column layout
    alignItems: 'flex-end', // Aligned to the bottom right
    marginRight: 10, // Added margin for spacing
  },
  likeCountText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
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
    backgroundColor: '#fff',
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
    padding: 20,
    right: 10,
    position: 'absolute',
    bottom: 200,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 18,
  },
  outerCircle: {
    position: 'absolute',
    bottom: 140,
    right: 0,
    flexDirection: 'column', // Changed to column layout
    alignItems: 'flex-end', // Aligned to the bottom right
    marginRight: 10, // Added margin for spacing
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: 'white',
    backgroundColor: '#5303FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    bottom: -10,
    right: -6,
  },
  notification: {
    position: 'absolute',
    top: 60,
    right: 0,
    flexDirection: 'column', // Changed to column layout
    alignItems: 'flex-end', // Aligned to the bottom right
    marginRight: 10, // Added margin for spacing
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: 'white',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationtinyCircle: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#5303FF',
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    top: 15,
    right: 13,
    zIndex: 1,
  },
  headercontainer: {
    position: 'absolute',
    top: 60,
    flexDirection: 'column',
    gap: 30,
    alignItems: 'center',
    width: 400,
  },
  headertitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  headercontents: {
    color: '#fff',
    margin: 10,
    fontSize: 18,
  }
});
