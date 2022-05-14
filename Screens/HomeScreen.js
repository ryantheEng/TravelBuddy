import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import EntryForm from '../components/entryform'

const Separator = () => {
    <View style={styles.sep}/>
}

export default function HomeScreen() {
    return(
    <View style={styles.view}>
        <Text style={styles.text}>Travel Buddy</Text>
        <EntryForm/>
    </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontWeight:'bold',
        fontSize:32,
        marginTop: 5,
        marginLeft:5,
        color:'#004E96'      
    },
    sep: {
        marginVertical: 2,
        color: '#737373'
    }
  })