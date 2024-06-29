import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;


const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.85; // 80% of the screen height
const BOTTOM_PADDING = 10;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },

  contentContainer: {
    paddingBottom: BOTTOM_PADDING, // Ensure the list ends with padding
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: screenWidth <= 375 ? 10 : 40,
  },
  iconText: {
    color: '#17161A',
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    lineHeight: 16.8
  },
  iconTextHome: {
    color: '#5303FF',
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    lineHeight: 16.8
  },
  separator: {
    height: 10,
    backgroundColor: 'red', 
    zIndex:1,

  },
  contentContainer: {
    paddingBottom: BOTTOM_PADDING,
  },
  videoContainer: {
    width: width,
    height: ITEM_HEIGHT,
    marginBottom: BOTTOM_PADDING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: '80%', // Adjust height as needed
  },
  videodetails: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    gap: 12,
    color: 'white',
    flexDirection: 'column', // Changed to column layout
    alignItems: 'flex-start', // Aligned to the bottom right
    marginRight: 10, // Added margin for spacing
    width: 350,
    marginLeft: 20,
  },
  videodetailstext: {
    color: 'white',
    fontSize: 20,
    width: 298,
    lineHeight: 24,
    fontFamily: 'Outfit_600SemiBold'
  },
  videodetailstext2: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Outfit_400Regular',
    lineHeight: 19.2,
  },
  videoScrollView: {
    flex: 1,
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
    backgroundColor: 'rgba(245, 245, 245, 1)',
    width: 236,
    height: 256,
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
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
    color: 'rgba(60, 60, 67, 1)'
  },
  outerCirclecontainer: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    flexDirection: 'column', // Changed to column layout
    alignItems: 'flex-end', // Aligned to the bottom right
    marginRight: 10, // Added margin for spacing
  },
  outerCircle: {
    position: 'absolute',
    bottom: 140,
    right: 0,
    flexDirection: 'column', // Changed to column layout
    alignItems: 'flex-end', // Aligned to the bottom right
    marginRight: 10, // Added margin for spacing
    width: 62,
    height: 62,
    borderRadius: 100,
    borderWidth: 4,
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
    position: 'absolute',
    top: 15.29,
    left: 15.41, 
    width: 8.43,
    height: 8.43,
    border: 1.43
  },
  notificationContainer: {
    position: 'absolute',
    top: screenWidth <= 375 ? 30 : 60,
    right: 0,
    flexDirection: 'column', // Changed to column layout
    alignItems: 'flex-end', // Aligned to the bottom right
    marginRight: 10, // Added margin for spacing
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: 'white',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  notification: {
    position: 'absolute',
    flexDirection: 'column', // Changed to column layout
    alignItems: 'flex-end', // Aligned to the bottom right
    marginRight: 10, // Added margin for spacing
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationtinyCircle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: '#5303FF',
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    top: 18,
    right: 19,
    zIndex: 1,
  },
  headercontainer: {
    position: 'absolute',
    top: screenWidth <= 375 ? 30 : 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    margin: 10,
    zIndex: 1
  },
  headertitle: {
    color: '#fff',
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 20,
    },
  headercontents: {
    margin: 10,
    fontFamily: 'Outfit_700Bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Set background color if needed
  },
  activeHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  progressBarContainer: {
    width: '80%', // Adjusted width for the progress bar
    height: 5, // Height of the progress bar
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark transparent background
    position: 'absolute',
    bottom: 40,
    marginLeft: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  
});
 
export default styles;


