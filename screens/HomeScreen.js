import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import styles from './HomeScreenStyle';

const videoData = [
  {
    id: 1,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715284562/m0n6tqk9b6jqaliqvmho.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
  },
  {
    id: 2,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715367171/vtdpihagqxlurrymvxch.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
  },
  {
    id: 3,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715373759/etsxpjmodymbmnngp4ip.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
  },
  {
    id: 4,
    source: 'https://res.cloudinary.com/dsspatqxn/video/upload/v1715397809/zs4rmpsaejb9qfum6ifz.mp4',
    title: 'BEETLEJUICE BEETLEJUICE _ Official Teaser Trailer',
    description: 'In Cinemas on January 19',
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

  const players = videoData.map(video =>
    useVideoPlayer(video.source, player => {
      player.loop = false;
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

  const pauseAllExcept = index => {
    for (let i = 0; i < players.length; i++) {
      if (i !== index) {
        players[i].pause();
        setIsPlaying(prevState => ({ ...prevState, [i]: false }));
      }
    }
  };

  const handleScroll = event => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(contentOffsetY / 790); // Assuming each video is 790 units in height

    if (index !== currentVideoIndex) {
      pauseAllExcept(index);
      players[index].play();
      setIsPlaying(prevState => ({ ...prevState, [index]: true }));
      setCurrentVideoIndex(index);

      players[index].replay();

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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.videoScrollView}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
      >
        {videoData.map((video, index) => (
          <View key={video.id} style={styles.videocontainer}>
            <View style={{ backgroundColor: 'black', borderRadius: 5 }}>
              <VideoView
                ref={ref}
                style={{ height: 790, borderRadius: 10 }}
                player={players[index]}
                contentFit="cover"
                contentPosition="center"
                nativeControls={false}
                shouldPlay={isPlaying[index]}
                resizeMode="cover"
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
          </View>
        ))}
      </ScrollView>

      <View style={styles.headercontainer}>
        <Text style={styles.headertitle}>What's Coming</Text>
        <ScrollView horizontal={true} style={styles.headerScrollView}>
          {['Cinema', 'Netflix', 'HBO', 'Disney +', 'Showmax', 'Apple Tv'].map(headerText => (
            <TouchableOpacity
              key={headerText}
              style={[styles.headercontents, activeHeader === headerText && styles.activeHeader]}
              onPress={() => setActiveHeader(headerText)}
            >
              <Text>{headerText}</Text>
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
