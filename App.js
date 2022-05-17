import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import DailyScreen from './Screens/DailyScreen';
import OverallScreen from './Screens/OverallScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Daily' component={DailyScreen}/>
        <Stack.Screen name='Overall' component={OverallScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
      <MyStack/>
  )
}

