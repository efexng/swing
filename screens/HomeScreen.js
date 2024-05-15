import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import styles from './HomeScreenStyle';
import { CinemaIcon, HomeIcon, SavedIcon, MoreIcon, HeartIcon, TinyCircleIcon, HeartFillIcon, VolumeIcon, VolumeSlashIcon, NotificationIcon } from './icons';
import { useFonts, Outfit_100Thin, Outfit_200ExtraLight, Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold, Outfit_900Black } from '@expo-google-fonts/outfit';

const videoData = [
  {
    id: 1,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715284562/m0n6tqk9b6jqaliqvmho.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
    header: 'Cinema',
  },
  {
    id: 2,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715367171/vtdpihagqxlurrymvxch.mp4',
    title: 'Monkey Man Official Trailer 2',
    description: 'Showing on HBO April 15',
    header: 'Netflix',
  },
  {
    id: 3,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715373759/etsxpjmodymbmnngp4ip.mp4',
    title: 'Spider-Man: Beyond the Spider-Verse First Trailer (2024)',
    description: 'Showing on HBO April 15',
    header: 'HBO',
  },
  {
    id: 4,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Disney +',
  },
  {
    id: 5,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Disney +',
  },
  {
    id: 6,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Cinema',
  },
  {
    id: 7,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Showmax',
  },
  {
    id: 8,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Disney +',
  },
];





const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={{ width: `${progress}%`, height: 8, backgroundColor: 'white' }} />
    </View>
  );
};



export default function HomeScreen() {
  const navigation = useNavigation();
  const videos = useRef([]);
  const [progresses, setProgresses] = useState(Array(videoData.length).fill(0));
  const [activeHeader, setActiveHeader] = useState('Cinema');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const [lastPlayedIndex, setLastPlayedIndex] = useState(-1);
  

  const [focused, setFocused] = useState(true); // State to track focus

  useEffect(() => {
    // Scroll to the top when the component mounts or when activeHeader changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [activeHeader]); // Add activeHeader to the dependency array

  useEffect(() => {
    // Play the first video of each active header automatically
    const activeHeaderVideos = videoData.filter((item) => item.header === activeHeader);
    activeHeaderVideos.forEach((item, index) => {
      if (index === 0 && videos.current[index] && focused) {
        // Check if the video is not already playing before playing it
        const video = videos.current[index];
        video.getStatusAsync().then((status) => {
          if (!status.isPlaying) {
            video.playAsync();
          }
        });
      }
    });

    const intervals = activeHeaderVideos.map((item, index) =>
      setInterval(async () => {
        const video = videos.current[index];
        if (!video) return;

        const playbackStatus = await video.getStatusAsync();
        const newProgress = (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
        setProgresses((prevProgresses) =>
          prevProgresses.map((prev, i) => (i === index ? newProgress : prev))
        );
      }, 500)
    );

    return () => {
      // Clear intervals and pause videos when unmounting
      intervals.forEach((interval) => clearInterval(interval));
      videos.current.forEach((video) => {
        if (video) {
          video.pauseAsync();
        }
      });
      setLastPlayedIndex(-1);
    };
  }, [activeHeader, focused]); // Update the dependency array

  // useEffect to handle focus changes
  useFocusEffect(
    React.useCallback(() => {
      setActiveHeader('Cinema'); // Reset the active header to 'Cinema' when the screen is focused
      setFocused(true); // Component is focused
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false }); // Scroll to the top
      }
      videos.current.forEach((video) => {
        if (video) {
          video.stopAsync(); // Stop all videos when the screen is refocused
        }
      });
      return () => setFocused(false); // Clean up on blur
    }, [scrollViewRef]) // Add scrollViewRef to the dependency array
  );
  

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(contentOffsetY / 790);

    // If the index is different from the last played index, replay the video
    if (index !== lastPlayedIndex && focused) {
      videos.current.forEach((video, idx) => {
        if (video) {
          if (idx === index) {
            video.replayAsync(); // Use replayAsync to replay the video
            setLastPlayedIndex(index); // Update the last played index
          } else {
            video.pauseAsync();
          }
        }
      });
    }
  };


  const togglePlayback = async (index) => {
    const video = videos.current[index];
    if (!video) {
      console.error(`Video at index ${index} is null or undefined`);
      return;
    }

    const status = await video.getStatusAsync();
    if (!status) {
      console.error(`Unable to get status for video at index ${index}`);
      return;
    }

    if (status.isPlaying) {
      await video.pauseAsync();
    } else {
      await video.playAsync();
    }
  };


  const [videoStates, setVideoStates] = useState(
    videoData.reduce((acc, curr) => {
      acc[curr.id] = { isMuted: false, isLiked: false };
      return acc;
    }, {})
  );
  const [likeCount, setLikeCount] = useState(
    videoData.reduce((acc, curr) => {
      acc[curr.id] = 0;
      return acc;
    }, {})
  );

  // Toggle like for a specific video ID
  const toggleLike = (videoId) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [videoId]: {
        ...prevStates[videoId],
        isLiked: !prevStates[videoId].isLiked,
      },
    }));
    setLikeCount((prevCount) => ({
      ...prevCount,
      [videoId]: prevCount[videoId] + (videoStates[videoId].isLiked ? -1 : 1),
    }));
  };


  const formatLikeCount = count => {
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


  // Toggle mute for a specific video ID
  const toggleMute = (videoId) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [videoId]: {
        ...prevStates[videoId],
        isMuted: !prevStates[videoId].isMuted,
      },
    }));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let [fontsLoaded] = useFonts({
    Outfit_100Thin,
    Outfit_200ExtraLight,
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
  });

  if (!fontsLoaded) {
    return null; 
  } else {

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.videoScrollView}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
      >
        {videoData
          .filter((item) => item.header === activeHeader) // Filter videos based on activeHeader
          .map((item, index) => (
            <View key={item.id}>
              <View style={{ backgroundColor: 'black', borderRadius: 10, marginBottom: 5, }}>
                <Video
                  ref={(ref) => (videos.current[index] = ref)}
                  style={{ height: 790, borderRadius: 10 }}
                  source={{ uri: item.source }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  isMuted={videoStates[item.id] && videoStates[item.id].isMuted} // Use individual isMuted state for each video
                  onPlaybackStatusUpdate={() => { }}
                />
                <ProgressBar progress={progresses[index]} />
                <View style={styles.controlsContainer}>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    title={'Play'}
                    onPress={() => togglePlayback(index)}
                  />
                </View>
                <View style={styles.videodetails}>
                  <Text style={styles.videodetailstext}>{item.title}</Text>
                  <Text style={styles.videodetailstext2}>{item.description}</Text>
                </View>
                <View style={styles.videocontrols}>
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                    {videoStates[item.id]?.isLiked ? <HeartFillIcon /> : <HeartIcon />}
                    {likeCount[item.id] > 0 && (
                      <Text style={styles.likeCountText}>{formatLikeCount(likeCount[item.id])}</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleMute(item.id)}>
                    {videoStates[item.id]?.isMuted ? <VolumeSlashIcon /> : <VolumeIcon />}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleModal}>
                    <Ionicons
                      name="ellipsis-vertical-outline"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

      </ScrollView>



      <View style={styles.headercontainer}>
        <Text style={styles.headertitle}>What's Coming</Text>
        <ScrollView horizontal={true} style={styles.headerScrollView} showsHorizontalScrollIndicator={false} >
        {['Cinema', 'Netflix', 'HBO', 'Disney +', 'Showmax', 'Apple Tv'].map(headerText => (
          <TouchableOpacity
            key={headerText}
            style={[
              styles.headercontents,
              activeHeader === headerText && styles.activeHeader,
            ]}
            onPress={() => {
              setActiveHeader(headerText); // Set the activeHeader when a header is pressed
            }}
          >
            <Text style={[styles.headerText, { color: '#fff' }]}>{headerText.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>



     <TouchableOpacity style={styles.notificationContainer} onPress={() => navigation.navigate('NotificationScreen')}>
     <View style={styles.notification}>
        <View style={styles.notificationtinyCircle} />
        <Ionicons name="notifications-outline" size={24} color="#17161A" />
      </View>
     </TouchableOpacity>

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

      <TouchableOpacity style={styles.outerCirclecontainer} onPress={() => navigation.navigate('UploadScreen')}>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
        <View style={styles.tinyCircle}>
      <TinyCircleIcon />
    </View>
          </View>
      </View>
    </TouchableOpacity>




      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <HomeIcon />
          <Text style={styles.iconTextHome}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CinemaScreen')} style={styles.iconContainer}>
        <CinemaIcon />
          <Text style={styles.iconText}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SavedScreen')} style={styles.iconContainer}>
         <SavedIcon />
          <Text style={styles.iconText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MoreScreen')} style={styles.iconContainer}>
        <MoreIcon />
          <Text style={styles.iconText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
}
