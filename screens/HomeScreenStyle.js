import { StyleSheet } from 'react-native';

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
    backgroundColor: 'white',
    shadowColor: '#000',
    width: '100%',
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
  videodetails: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    gap: 10,
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
    fontWeight: 'bold',
  },
  videodetailstext2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'semi-bold',
  },
  videoScrollView: {
    width: '100%',
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    alignItems: 'center',
    width: 400,
    margin: 30,
  },
  headertitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headercontents: {
    margin: 10,
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
});

export default styles;
