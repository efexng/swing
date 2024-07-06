






import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.85; // 80% of the screen height
const BOTTOM_PADDING = 20;

// Define your 4 videos with titles and simplified IDs
const videos = [
  {
    id: 1,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny1.mp4',
    title: 'Video 1',
  },
  {
    id: 2,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny2.mp4',
    title: 'Video 2',
  },
  {
    id: 3,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny3.mp4',
    title: 'Video 3',
  },
  {
    id: 4,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny4.mp4',
    title: 'Video 4',
  },
];

// Create an array that repeats the 4 videos 10 times with unique IDs
const DATA = Array.from({ length: 10 }).flatMap((_, iterationIndex) =>
  videos.map(video => ({
    id: video.id + (iterationIndex * videos.length), // Unique ID combining video ID and iteration index
    videoUrl: video.videoUrl,
    title: video.title,
  }))
);

const SnapScroll = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Video
        source={{ uri: item.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        useNativeControls
        isLooping
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()} // Use `id` as the unique key (convert to string)
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT + BOTTOM_PADDING}
      decelerationRate="fast"
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: BOTTOM_PADDING,
  },
  item: {
    width: width,
    height: ITEM_HEIGHT,
    marginBottom: BOTTOM_PADDING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: '80%', // Adjust height as needed
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default SnapScroll;



