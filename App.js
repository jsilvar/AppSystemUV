import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {

} from 'react-native'
import { StackNavigator } from './src/navigation/StackNavigator';


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  )
}

export default App;
