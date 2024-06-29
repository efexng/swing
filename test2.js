<Video
ref={(ref) => (videos.current[index] = ref)}
style={styles.video}
source={{ uri: item.source }}
useNativeControls
resizeMode={ResizeMode.COVER}
isLooping
isMuted={videoStates[item.id] && videoStates[item.id].isMuted} // Use individual isMuted state for each video
onPlaybackStatusUpdate={() => {}}
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
  <EllipseVerticalHomeIcon />
</TouchableOpacity>
</View>




 <Video
              ref={(ref) => (videos.current[index] = ref)}
              style={styles.video}
              source={{ uri: item.source }}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
              isMuted={videoStates[item.id] && videoStates[item.id].isMuted}
              onPlaybackStatusUpdate={() => {}}
            />









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



     <ScrollView
        ref={scrollViewRef}
        style={styles.videoScrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        pagingEnabled={true}
      >
       {videoList
  .filter((item) => item.header === activeHeader) // Filter videos based on activeHeader
  .map((item, index) => (
    <View key={`${item.id}-${index}`} style={styles.videoContainer}>
     <Text style={{color: 'red'}}> Hey</Text>
    </View>
  ))}

      </ScrollView>


      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
      >
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={toggleModal}>
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalOption}>
            <ModalSaveIcon />
            <Text style={styles.modalOptionText}>Add Trailer to Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
          <ModalShareIcon />
            <Text style={styles.modalOptionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
          <ModalFlagIcon />
            <Text style={styles.modalOptionText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
          <ModalStopIcon />
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



