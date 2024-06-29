import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import styles from './HomeScreenStyle';
import { CinemaIcon, HomeIcon, SavedIcon, MoreIcon, HeartIcon, TinyCircleIcon, HeartFillIcon, VolumeIcon, VolumeSlashIcon, ModalSaveIcon, ModalShareIcon, ModalFlagIcon, ModalStopIcon, EllipseVerticalHomeIcon } from './icons';
import { useFonts, Outfit_100Thin, Outfit_200ExtraLight, Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold, Outfit_900Black } from '@expo-google-fonts/outfit';


const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.85; // 80% of the screen height
const BOTTOM_PADDING = 10;


const videoData = [
  {
    id: 1,
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
    header: 'Cinema',
  },
  {
    id: 2,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715367171/vtdpihagqxlurrymvxch.mp4',
    title: 'Monkey Man Official Trailer 2',
    description: 'Showing on HBO April 15',
    header: 'Cinema',
  },
  {
    id: 3,
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Spider-Man: Beyond the Spider-Verse First Trailer (2024)',
    description: 'Showing on HBO April 15',
    header: 'Cinema',
  },
  {
    id: 4,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Netflix',
  },
  {
    id: 5,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Netflix',
  },
  {
    id: 6,
    source: 'https://res.cloudinary.com/dj55dp2oh/video/upload/v1718952835/xu9zu3e9tu7kj4alxul7.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Netflix',
  },
  {
    id: 7,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Netflix',
  },
  {
    id: 8,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'Dune Part Two  Official Trailer',
    description: 'In Cinemas on January 19',
    header: 'Netflix',
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
  const [videoList, setVideoList] = useState(videoData);
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

  const DATA = Array.from({ length: 100 }).flatMap((_, iterationIndex) =>
  videoData.map(video => ({
    id: video.id + (iterationIndex * videoData.length), // Unique ID combining video ID and iteration index
    videoUrl: video.source, // Assuming video.source is used for videoUrl
    title: video.title,
    description: video.description,
    header: video.header, // Include header if needed
  }))
);

  return (
    <View style={styles.container}>

<FlatList
  data={DATA}
  renderItem={({ item, index }) => (
    <View key={item.id} style={styles.videoContainer}>
      <Video
        ref={(ref) => (videos.current[item.id] = ref)}
        style={styles.video}
        source={{ uri: item.videoUrl }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted={videoStates[item.id] && videoStates[item.id].isMuted}
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
          onPress={() => togglePlayback(item.id)}
        />
      </View>
      <View style={styles.videodetails}>
        <Text style={styles.videodetailstext}>{item.title}</Text>
        <Text style={styles.videodetailstext2}>{item.description}</Text>
      </View>
      <View style={styles.videocontrols}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          {videoStates[item.id]?.isLiked ? <HeartFillIcon /> : <HeartIcon />}
          {/* Assuming likeCount is correctly mapped */}
          {likeCount[item.id] > 0 && (
            <Text style={styles.likeCountText}>{formatLikeCount(likeCount[item.id])}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleMute(item.id)}>
          {videoStates[item.id]?.isMuted ? <VolumeSlashIcon /> : <VolumeIcon />}
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <EllipseVerticalHomeIcon />
        </TouchableOpacity>
      </View>
    </View>
  )}
  contentContainerStyle={styles.contentContainer}
  keyExtractor={(item) => item.id.toString()} // Ensure unique key
  pagingEnabled
  showsVerticalScrollIndicator={false}
  snapToInterval={ITEM_HEIGHT + BOTTOM_PADDING}
  decelerationRate="fast"
/>



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
