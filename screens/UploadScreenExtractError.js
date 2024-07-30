import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const UploadScreenExtractError = () => {
    const navigation = useNavigation();




  return (
    <View style={styles.container}>
    <View style={styles.uploadBoxContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="close-outline" size={24} color="white" style={styles.closeIcon} />
      </TouchableOpacity>

      <View style={styles.error}>
        <Text style={styles.errorText}>Oops</Text>
        <Text style={styles.errorText2}>Nothing has been added</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UploadScreenExtract')} style={styles.ctabutton}>
              <Text style={styles.ctaText}>Try Again</Text>
            </TouchableOpacity>
        </View>
    </View>
  </View>
  )
}

export default UploadScreenExtractError

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5303FF',
      },
      uploadBoxContainer: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(83, 3, 255, 0.8)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      ctabutton: {
        backgroundColor: '#fff',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        height: 50,
        width: 116,
      },
      ctaText: {
        color: '#5303FF',
        fontSize: 16,
        fontFamily: 'Outfit_500Medium' 
      },
      closeIcon: {
        position: 'absolute',
        top: 60,
        right: 20,
      },
      error: {
        margin : 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorText: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'Outfit_600SemiBold',
        marginTop: 10,
      },
      errorText2:{
        color: 'white',
        fontSize: 16,
        fontFamily: 'Outfit_400Regular',
        marginTop: 10,
      }
    });
