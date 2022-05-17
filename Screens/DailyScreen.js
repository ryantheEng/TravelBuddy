import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DailyDoughnut } from '../components/showgraph.js'

export default function DailyScreen() {

    // const navigation = useNavigation()

    return(
    <View>
        <Text style={styles.text}>Travel Buddy</Text>
        <DailyDoughnut/>
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