import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '##F5F5F5'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    notificationText: {
        fontSize: 16,
        fontFamily: 'Outfit_500Medium',
        textAlign: 'center',
        flex: 1,
    },
    back: {
        marginRight: 16,
    },
    separator: {
        borderBottomWidth: .5,
        borderBottomColor: 'gray',
        width: '100%',
        alignSelf: 'center',
    },
    statusContainer: {
        marginTop: 16,
        justifyContent: 'center', // Center content vertically
        paddingHorizontal: 70, // Add space from left and right
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20, // Add space from left and right
    },
    statusText: {
        color: 'black',
        fontSize: 16,
    },
    statuslightContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statuslight: {
        fontSize: 5,
        color: '#07F411',
        marginLeft: 2,
    },
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginVertical: 20,
        marginHorizontal: 40,
        borderRadius: 10, // Add border radius for rounded corners
    },
    boxItem: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 6,
        marginHorizontal: 6,
        paddingVertical: 10,
        borderRadius: 10,
    },
    boxText: {
        fontSize: 14,
        fontFamily: 'Outfit_400Regular'
    },
    unread: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationbox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    notificationboxcontent: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    notificationlogo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    notificationlogo2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        marginTop: 15,
    },
    notificationboxmsgtext: {
        fontSize: 14,
        fontFamily: 'Outfit_600SemiBold',
        marginLeft: 10,
        color: 'gray', 
    },
    notificationboxmsgtextunread: {
        fontSize: 14,
        fontFamily: 'Outfit_600SemiBold',
        marginLeft: 10,
        color: 'black', 
    },    
    notificationboxmsgtextbottom: {
        fontSize: 14,
        fontFamily: 'Outfit_400Regular',
        color: 'black',
        width: 270,
        marginLeft: 45,
    },
    notificationboxmsgtextbottomgray: {
        fontSize: 14,
        fontFamily: 'Outfit_400Regular',
        color: 'gray',
        width: 270,
        marginLeft: 45,
    },
    notificationboxtime: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 5,
        color: 'gray',
    },
    notificationboxmsgtime: {
        fontSize: 12,
        fontWeight: '400',
        marginLeft: 10,
        color: 'gray',
    },
    shadowContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    streamLogo: {
        width: 24,
        height: 24,
        borderRadius: 50,
    },
    streamlogocontent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        marginTop: 10,
    },
    streamlogocontents: {
        width: 42,
        height: 50,
        borderRadius: 4,
    },
    streamlogocontents2: {
        width: 270,
        height: 150,
        borderRadius: 4,
        marginLeft: 45,
    },
    streamlogocontentstxt:{
        fontSize: 16,
        fontFamily: 'Outfit_400Regular',
        marginLeft: 10,
        color: 'black',
    },
    streamlogocontentstxtgray: {
        fontSize: 16,
        fontFamily: 'Outfit_400Regular',
        marginLeft: 10,
        color: 'gray',
    }
});

export default styles;
