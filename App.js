import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tour from "./components/Tour";
import Upload from "./components/Upload";

const StackNavigator = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator headerMode={false} initialRouteName='tour'>
        <StackNavigator.Screen component={Tour} name='tour' />
        <StackNavigator.Screen component={Upload} name='upload' />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
