import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Linking } from 'react-native'; // Import Linking
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';




const UploadScreenExtractMatch = () => {
    const navigation = useNavigation();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkToggle = () => {
        setIsBookmarked(prevState => !prevState);
    };

    const handleOpenMap = () => {
        const address = 'Gwagwalada, Abuja'; // Address to prepopulate in the map
        const encodedAddress = encodeURIComponent(address);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        Linking.openURL(mapUrl); // Open Google Maps with the prepopulated address
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>

                <Image
                    style={styles.image}
                    source={require('../assets/Match2.png')}
                    contentFit="cover"
                    transition={1000}
                >
                    <View style={styles.overlay} />

                    <SafeAreaView style={styles.bottom}>
                        <View>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons style={styles.back} name="arrow-back" size={20} color="black" />
                                </TouchableOpacity>
                                <View style={styles.headertopright}>
                                <TouchableOpacity onPress={handleBookmarkToggle}>
                                <Ionicons
                                    style={styles.save}
                                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                                    size={20}
                                    color={isBookmarked ? '#5303FF' : 'white'}
                                />
                                </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Ionicons style={styles.share} name="share-social-outline" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.contents}>
                                <Text style={styles.contentstxt1}>House of the Dragon</Text>
                                <Text style={styles.contentstxt2}>season 1 Episode 10 - The Black Queen</Text>
                                <Text style={styles.contentstxt3}>An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.</Text>
                                <View style={styles.subcontents}>
                                    <Text style={styles.contentstxt4}>2024</Text>
                                    <Ionicons style={styles.seprator} name="ellipse" size={20} color="black" />
                                    <Text style={styles.contentstxt5}>TV Series</Text>
                                    <Ionicons style={styles.seprator} name="ellipse" size={20} color="black" />
                                    <Text style={styles.contentstxt6}>Action, Adventure, Drama</Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.ctabutton}>
                                <Text style={styles.ctaText}>Watch Trailer</Text>
                            </TouchableOpacity>

                            <View>

                                <Text style={styles.contentstxt7}>Top Cast</Text>

                                <View style={styles.cast}>
                                    <View style={styles.castImageContainer}>
                                        <Image
                                            style={styles.castImage}
                                            source={require('../assets/cast1.png')}
                                            contentFit="cover"
                                            transition={1000}
                                        />
                                        <View style={styles.castTextContainer}>
                                            <Text style={styles.castText}>Actor 1</Text>
                                            <Text style={styles.castText}>Role: Character 1</Text>
                                        </View>
                                    </View>
                                    <View style={styles.castImageContainer}>
                                        <Image
                                            style={styles.castImage}
                                            source={require('../assets/cast1.png')}
                                            contentFit="cover"
                                            transition={1000}
                                        />
                                        <View style={styles.castTextContainer}>
                                            <Text style={styles.castText}>Actor 1</Text>
                                            <Text style={styles.castText}>Role: Character 1</Text>
                                        </View>
                                    </View>
                                    <View style={styles.castImageContainer}>
                                        <Image
                                            style={styles.castImage}
                                            source={require('../assets/cast1.png')}
                                            contentFit="cover"
                                            transition={1000}
                                        />
                                        <View style={styles.castTextContainer}>
                                            <Text style={styles.castText}>Actor 1</Text>
                                            <Text style={styles.castText}>Role: Character 1</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.contentstxt7}>Available on: </Text>

                                <View style={{ flexDirection: 'column', }}>
                                    <View style={styles.streamplatform}>
                                        <View style={styles.platform}>
                                            <Image
                                                style={styles.platformicon}
                                                source={require('../assets/hbo-icon.png')}
                                                contentFit="cover"
                                                transition={1000}
                                            />
                                            <View>
                                                <TouchableOpacity onPress={() => navigation.navigate('UploadScreenExtract')} style={styles.platformcta}>
                                                    <Text style={styles.platformtxt1}>Watch now</Text>
                                                    <Ionicons style={styles.platformtxt1icon} name="arrow-forward-outline" color="black" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.streamplatform}>
                                        <View style={styles.platform}>
                                            <Image
                                                style={styles.platformicon}
                                                source={require('../assets/hulu-icon.png')}
                                                contentFit="cover"
                                                transition={1000}
                                            />
                                            <TouchableOpacity onPress={() => navigation.navigate('UploadScreenExtract')} style={styles.platformcta2}>
                                                <Text style={styles.platformtxt2}>Subscribe</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.streamplatform2}>
                                        <View style={styles.platform}>
                                            <Text style={styles.platformicontxt}>Cinema</Text>
                                            <TouchableOpacity onPress={handleOpenMap} style={styles.platformlocation}>
                                                <Ionicons name="location" size={12} color="white" />
                                                <Text style={styles.platformtxt3}>Near Gwagwalada, Abuja</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20, alignItems: 'center', marginBottom: 20 }}>
                                    <Text style={{ color: 'white' }}>Showing Today</Text>
                                </View>

                                <View style={{ flexDirection: 'column', }}>

                                    <TouchableOpacity>
                                        <Text style={{ color: '#fff', fontSize: '15', fontWeight: '600' }}>SILVERBIRD ENTERTAINMENT CENTER,</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Ionicons style={{ fontSize: 20, }} name="chevron-forward-outline" color="white" />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <Text style={{ color: '#fff', fontSize: '12', fontWeight: '300', }}>Plat 1161, Memorial Drive, By</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 40 }}>
                                                <Text style={{ color: 'white', fontSize: '12', fontWeight: '300', }}>8km</Text>
                                                <Ionicons style={{ marginLeft: 10, marginRight: 10, fontSize: 4, }} name="ellipse" color="white" />
                                                <Text style={{ color: 'white', fontSize: '12', fontWeight: '300', }}>37mins</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', borderBottomWidth: .5, borderBottomColor: 'gray' }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginTop: 20, marginBottom: 50 }}>
                                        <Text style={{ color: '#fff', fontSize: '15', fontWeight: '600' }}>Genesis cinema</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Ionicons style={{ fontSize: 20, }} name="chevron-forward-outline" color="white" />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <Text style={{ color: '#fff', fontSize: '12', fontWeight: '300', }}>Plat 1161, Memorial Drive, By</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 40 }}>
                                                <Text style={{ color: 'white', fontSize: '12', fontWeight: '300', }}>8km</Text>
                                                <Ionicons style={{ marginLeft: 10, marginRight: 10, fontSize: 4, }} name="ellipse" color="white" />
                                                <Text style={{ color: 'white', fontSize: '12', fontWeight: '300', }}>37mins</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', borderBottomWidth: .5, borderBottomColor: 'gray' }} />
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </ScrollView>
                    </SafeAreaView>

                </Image>
            </View>
        </View>
    );
};

export default UploadScreenExtractMatch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    headertopright: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white',
    },
    back: {
        color: 'white',
    },
    save: {
        marginRight: 10,
    },
    share: {
        marginRight: 5,
        color: 'white',
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the alpha value to control darkness
    },
    ctabutton: {
        backgroundColor: '#EEE9FE',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        height: 50,
    },
    ctaText: {
        color: '#5303FF',
        fontSize: 16,
    },
    bottom: {
        margin: 20,
    },
    contents: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: 'white',
        marginTop: 540, // Adjust as needed
    },
    contentstxt1: {
        color: 'white',
        fontSize: 20,
        fontWeight: '900',
    },
    contentstxt2: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    contentstxt3: {
        color: 'white',
        fontSize: 14,
        width: 343,
        marginTop: 5,
        fontWeight: '300',
    },
    contentstxt4: {
        color: 'white',
        fontSize: 14,
        fontWeight: '300',
        marginRight: 10,
    },
    contentstxt5: {
        color: 'white',
        fontSize: 14,
        fontWeight: '300',
        marginRight: 10,
    },
    contentstxt6: {
        color: 'white',
        fontSize: 14,
        width: 343,
        fontWeight: '300',
    },
    contentstxt7: {
        color: 'white',
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
    },
    subcontents: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    seprator: {
        color: 'white',
        fontSize: 4,
        marginRight: 10,
    },
    cast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 10,
    },
    castImageContainer: {
        alignItems: 'center',
    },
    castImage: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 100,
    },
    castTextContainer: {
        alignItems: 'center',
        marginTop: 5,
    },
    castText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
    streamplatform: {
        flexDirection: 'column',
        marginTop: 10,
    },
    streamplatform2: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    platform: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    platformicon: {
        width: 30,
        height: 30,
        borderRadius: 100,
    },
    platformcta: {
        backgroundColor: '#5303FF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 30,
        width: 140,
    },
    platformcta2: {
        backgroundColor: '#EEE9FE',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 30,
        width: 120,
    },
    platformicontxt: {
        color: '#fff',
        fontSize: 16,
    },
    platformtxt1: {
        color: '#fff',
        fontSize: 12,
    },
    platformtxt2: {
        color: '#5303FF',
        fontSize: 12,
    },
    platformtxt1icon: {
        color: '#fff',
        fontSize: 12,
    },
    platformlocation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    platformtxt3: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 10,
    },
});
