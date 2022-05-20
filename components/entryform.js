import React, { Component, useState } from 'react'
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { pushObject } from '../services/db'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Separator = () => {
    return(<View style={styles.sep}/>)
}

const EntryForm = () => {

    const navigation = useNavigation()

    const [type,setType] = useState()
    const [units,setUnits] = useState()
    const [price,setPrice] = useState('CAD')
    const [description,setDescription] = useState()

    const onpush = () => {
        // pushObject(desc,curr,price,type)
        console.log(description,units,price,type)
    }

    const onpush1 = () => {
        navigation.navigate('Daily')
    }

    const onpush2 = () => {
        navigation.navigate('Overall')
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.view}>
                <Text style={styles.text}>Description</Text>
                <TextInput style={styles.bordercontainer}
                    placeholder='Plane ticket from London to Madrid'
                    onValueChange={(value,index) => setDescription(value)}
                />

                <Text style={styles.text}>Price</Text>
                <TextInput style={styles.bordercontainer}
                    placeholder='12.24'
                    keyboardType='numeric'
                    onValueChange={(value,index) => setPrice(value)}
                />

                <Text style={styles.text}>Currency</Text>
                <Picker style={styles.margins}
                    selectedValue={units}
                    onValueChange={(value,index) => setUnits(value)}
                >
                    <Picker.Item label='CAD' value='CAD'/>
                    <Picker.Item label='EUR' value='EUR'/>
                    <Picker.Item label='GBP' value='GBP'/>                    
                </Picker>

                <Text style={styles.text}>Type</Text>
                <Picker style={styles.margins}
                    selectedValue={type}
                    onValueChange={(value,index) => setType(value)}
                >
                    <Picker.Item label='Transportation' value='transportation'/>
                    <Picker.Item label='Food' value='food'/>
                    <Picker.Item label='Accomadation' value='accomandation'/>
                    <Picker.Item label='Other' value='other'/>
                    
                </Picker>
                <Separator style={styles.sep}/>
                <Button 
                    title='Submit'
                    color='#676767'
                    onPress={onpush}
                />
                <Separator style={styles.sep}/>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.margins2}>
                        <Button
                            title="Daily"
                            color='#004E96'
                            onPress={onpush1}/>
                    </View>
                    <View>
                        <Button
                            title='Overall'
                            color='#004E96'
                            onPress={onpush2}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EntryForm

const styles = StyleSheet.create({
    safeView:{
        // flex:2,
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
        marginLeft: 40,
        marginTop: 2
    },
    bordercontainer: {
        borderWidth:1,
        paddingVertical: 4,
        paddingLeft: 5
    },
    text:{
        fontWeight:'bold',
        fontSize:14,
        paddingVertical: 2
        
    },
    view: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    margins: {
        // marginLeft:"40%",
        // paddingHorizontal: 5
    },
    margins2: {
        marginLeft:"2%",
        paddingHorizontal: 5,
        marginRight: "2%"
    },
    sep: {
        marginVertical: 3,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
})
