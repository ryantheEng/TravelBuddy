import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { OverallBar } from '../components/showgraph.js'

export default function OverallScreen() {

    // const navigation = useNavigation()

    return(
    <View>
        <Text style={styles.text}>Travel Buddy</Text>
        <OverallBar/>
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

  })