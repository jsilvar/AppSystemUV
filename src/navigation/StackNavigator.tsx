import React from 'react'
import { Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { ScreenMain } from '../screens/ScreenMain';

import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { CounterBluetoothScreen } from '../screens/CounterBluetoothScreen';
import { UserInfoGeneralScreen } from '../screens/UserInfoGeneralScreen';
import { ConfigCounterScreen } from '../screens/ConfigCounterScreen';
import { BluetoothDeviceConnectScreen } from '../screens/BluetoothDeviceConnectScreen';
import { BluetoothDeviceDiscoveryScreen } from '../screens/BluetoothDeviceDiscoveryScreen';

export type RootStackParams = {
    //Screen2Test:undefined,
    //PersonScreen:{id:number,name:string},
    ScreenMain: undefined,
    LoginScreen: undefined,
    SplashScreen: undefined,
    RegisterScreen: undefined,
    CounterScreen: undefined,
    UserInfoGeneralScreen: undefined,
    ConfigCounterScreen: undefined,
    BluetoothDeviceConnectScreen: undefined,
    BluetoothDeviceDiscoveryScreen: undefined,
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = ({navigation}) => {

    return (
        <Stack.Navigator
            initialRouteName='ScreenMain'
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name='ScreenMain' options={{ title: 'Main' }} component={ScreenMain} />
            <Stack.Screen name='SplashScreen' options={{ title: 'Splash', headerShown: false }} component={SplashScreen} />
            <Stack.Screen name='LoginScreen' options={{ title: 'Login' }} component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' options={{ title: 'register' }} component={RegisterScreen} />
            <Stack.Screen name='CounterScreen' options={{ title: 'counter' }} component={CounterBluetoothScreen} />
            <Stack.Screen name='UserInfoGeneralScreen' options={{ title: 'UserInfoGeneral' }} component={UserInfoGeneralScreen} />
            <Stack.Screen name='ConfigCounterScreen' options={{ title: 'ConfigCounter' }} component={ConfigCounterScreen} />
            <Stack.Screen name='BluetoothDeviceConnectScreen' component={BluetoothDeviceConnectScreen}/>
            <Stack.Screen name='BluetoothDeviceDiscoveryScreen' component={BluetoothDeviceDiscoveryScreen}/>
        </Stack.Navigator>
    )
}
