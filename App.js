import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StackNavigator } from './src/navigation/StackNavigator';
import { AuthProvider } from './src/context/AuthContext';


const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App;
