import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Upload from './components/Upload';
import ml from './utils/ml';

const StackNavigator = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <StackNavigator.Navigator headerMode={false} initialRouteName="upload">
         <StackNavigator.Screen component={Upload} name="upload" />
       </StackNavigator.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
