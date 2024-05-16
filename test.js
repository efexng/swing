import React from 'react';
import { Text, View } from 'react-native';
import { useFonts, Outfit_100Thin, Outfit_200ExtraLight, Outfit_300Light, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold, Outfit_900Black } from '@expo-google-fonts/outfit';

export default () => {
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
    return null; // Or return a loading indicator if needed
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Outfit_100Thin' }}>Outfit Thin</Text>
        <Text style={{ fontFamily: 'Outfit_200ExtraLight' }}>Outfit Extra Light</Text>
        <Text style={{ fontFamily: 'Outfit_300Light' }}>Outfit Light</Text>
        <Text style={{ fontFamily: 'Outfit_400Regular' }}>Outfit Regular</Text>
        <Text style={{ fontFamily: 'Outfit_500Medium' }}>Outfit Medium</Text>
        <Text style={{ fontFamily: 'Outfit_600SemiBold' }}>Outfit Semi Bold</Text>
        <Text style={{ fontFamily: 'Outfit_700Bold' }}>Outfit Bold</Text>
        <Text style={{ fontFamily: 'Outfit_800ExtraBold' }}>Outfit Extra Bold</Text>
        <Text style={{ fontFamily: 'Outfit_900Black' }}>Outfit Black</Text>
      </View>
    );
  }
};




