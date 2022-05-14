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

    const onpush = (desc,curr,price,type) => {
        // pushObject(desc,curr,price,type)
        navigation.navigate('Daily')
    }

    const [type,setType] = useState('unknown')
    const [units,setUnits] = useState('cad')
    const [price,setPrice] = useState(0)
    const [description,setDescription] = useState('unknown')

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
        paddingVertical: 7,
        paddingLeft: 5
    },
    text:{
        fontWeight:'bold',
        fontSize:16,
        paddingVertical: 5
        
    },
    view: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    margins: {
        // marginBottom:5,
        // paddingVertical: 5
    },
    sep: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
})
