import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { useVideoPlayer, VideoView } from 'expo-video';
import styles from './HomeScreenStyle';

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
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
    header: 'Netflix',
  },
  {
    id: 3,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715373759/etsxpjmodymbmnngp4ip.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
    header: 'HBO',
  },
  {
    id: 4,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
    header: 'Disney +',
  },
  {
    id: 5,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
    header: 'Cinema',
  },
  {
    id: 6,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715373759/etsxpjmodymbmnngp4ip.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
    header: 'Netflix',
  },
  {
    id: 7,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715373759/etsxpjmodymbmnngp4ip.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
    header: 'Cinema',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const ref = useRef(null);
  const [isVolumeMuted, setIsVolumeMuted] = useState({});
  const [isLiked, setIsLiked] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeHeader, setActiveHeader] = useState('Cinema');
  const scrollViewRef = useRef(null);


  const players = videoData.map(video =>
    useVideoPlayer(video.source, player => {
      player.loop = true;
      player.play();
      setLikeCount(prevState => ({ ...prevState, [video.id]: 0 }));
      setIsPlaying(prevState => ({ ...prevState, [video.id]: true }));
      setIsVolumeMuted(prevState => ({ ...prevState, [video.id]: false }));
      setIsLiked(prevState => ({ ...prevState, [video.id]: false }));
    })
  );

  useEffect(() => {
    // Pause all videos except the first one initially
    pauseAllExcept(0);
  }, []);

  const pauseAllVideos = () => {
    players.forEach(player => player.pause());
    setIsPlaying(prevState => {
      const updatedState = {};
      Object.keys(prevState).forEach(key => {
        updatedState[key] = false;
      });
      return updatedState;
    });
  };

  const playFirstVideoOnFocus = () => {
    setActiveHeader('Cinema'); // Set active header to "Cinema"
    playFirstVideoOnHeaderChange('Cinema');
  };
  

  // useFocusEffect hook to play the first video when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      playFirstVideoOnFocus();
      return () => {
        pauseAllVideos();
      };
    }, [])
  );


  const pauseAllExcept = index => {
    if (index >= 0 && index < players.length) {
      for (let i = 0; i < players.length; i++) {
        if (i !== index) {
          players[i].pause();
          setIsPlaying(prevState => ({ ...prevState, [i]: false }));
        }
      }
      players[index].replay();
    } else {
      console.error('Invalid index:', index);
    }
  };

  const playVideoUnderHeader = (header, index) => {
    const videosUnderHeader = videoData.filter(video => video.header === header);
    if (videosUnderHeader.length > index && index >= 0) {
      pauseAllExcept(videosUnderHeader[index].id - 1);
      players[videosUnderHeader[index].id - 1].play();
      setIsPlaying(prevState => ({ ...prevState, [videosUnderHeader[index].id]: true }));
      setCurrentVideoIndex(videosUnderHeader[index].id - 1);
    }
  };
  
  const handleScroll = event => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(contentOffsetY / 790);
    const videosUnderHeader = videoData.filter(video => video.header === activeHeader);
  
    if (index >= 0 && index < videosUnderHeader.length && videosUnderHeader[index].id - 1 !== currentVideoIndex) {
      playVideoUnderHeader(activeHeader, index);
    }
  };
  
  

  

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleLike = videoId => {
    const updatedLikeCount = isLiked[videoId] ? likeCount[videoId] - 1 : likeCount[videoId] + 1;
    setLikeCount(prevState => ({ ...prevState, [videoId]: updatedLikeCount }));
    setIsLiked(prevState => ({ ...prevState, [videoId]: !prevState[videoId] }));
  };

  const toggleVolume = videoId => {
    setIsVolumeMuted(prevState => ({ ...prevState, [videoId]: !prevState[videoId] }));
    players[videoId - 1].muted = !isVolumeMuted[videoId];
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

  const playFirstVideoOnHeaderChange = header => {
    const index = videoData.findIndex(video => video.header === header);
    if (index !== -1) {
      pauseAllExcept(index);
      players[index].play();
      setIsPlaying(prevState => ({ ...prevState, [index]: true }));
      setCurrentVideoIndex(index);
  
      // Reset scroll position to top
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
      }
    }
  };
  

  const pauseOtherVideosUnderHeader = (index, header) => {
    videoData.forEach((video, idx) => {
      if (video.header === header && idx !== index) {
        players[idx].pause();
        setIsPlaying(prevState => ({ ...prevState, [idx]: false }));
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.videoScrollView}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
      >
        {videoData.map((video, index) => (
          <View key={video.id} >
            {video.header === activeHeader && (
              <View style={{ backgroundColor: 'black', borderRadius: 10 , marginBottom: 5,}}>
                <VideoView
                  ref={ref}
                  style={{ height: 790, borderRadius: 10,}}
                  player={players[index]}
                  contentFit="cover"
                  contentPosition="center"
                  nativeControls={false}
                  shouldPlay={isPlaying[index]}
                  resizeMode="cover"
                  onPlaybackStatusUpdate={status => {
                    if (!status.isPlaying) {
                      setIsPlaying(prevState => ({ ...prevState, [index]: false }));
                    }
                  }}
                />
                <View style={styles.controlsContainer}>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (isPlaying[index]) {
                        players[index].pause();
                      } else {
                        players[index].play();
                      }
                      setIsPlaying(prevState => ({ ...prevState, [index]: !prevState[index] }));
                      pauseOtherVideosUnderHeader(index, activeHeader);
                    }}
                  />
                </View>
                <View style={styles.videodetails}>
                  <Text style={styles.videodetailstext}>{video.title}</Text>
                  <Text style={styles.videodetailstext2}>{video.description}</Text>
                </View>
                <View style={styles.videocontrols}>
                  <TouchableOpacity onPress={() => toggleLike(video.id)}>
                    <Ionicons
                      name={isLiked[video.id] ? 'heart' : 'heart-outline'}
                      size={30}
                      color={isLiked[video.id] ? 'red' : '#fff'}
                    />
                    {likeCount[video.id] > 0 && (
                      <Text style={styles.likeCountText}>{formatLikeCount(likeCount[video.id])}</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleVolume(video.id)}>
                    <Ionicons
                      name={isVolumeMuted[video.id] ? 'volume-mute-outline' : 'volume-high-outline'}
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
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.headercontainer}>
        <Text style={styles.headertitle}>What's Coming</Text>
        <ScrollView horizontal={true} style={styles.headerScrollView}     showsHorizontalScrollIndicator={false} >
          {['Cinema', 'Netflix', 'HBO', 'Disney +', 'Showmax', 'Apple Tv'].map(headerText => (
            <TouchableOpacity
              key={headerText}
              style={[
                styles.headercontents,
                activeHeader === headerText && styles.activeHeader,
              ]}
              onPress={() => {
                setActiveHeader(headerText);
                playFirstVideoOnHeaderChange(headerText);
              }}
            >
              <Text style={{ color: '#fff',     fontSize: 15, }}>{headerText}</Text>
            </TouchableOpacity>
          ))}
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
