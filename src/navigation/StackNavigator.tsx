import React from 'react'
import { Button, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderBackButton } from '@react-navigation/elements'
import { ScreenMain } from '../screens/ScreenMain';

import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ValidatePinScreen } from '../screens/ValidatePinScreen';
import { CounterBluetoothScreen } from '../screens/CounterBluetoothScreen';
import { UserInfoGeneralScreen } from '../screens/UserInfoGeneralScreen';
import { ConfigCounterScreen } from '../screens/ConfigCounterScreen';
import { BluetoothDeviceConnectScreen } from '../screens/BluetoothDeviceConnectScreen';
import { BluetoothDeviceDiscoveryScreen } from '../screens/BluetoothDeviceDiscoveryScreen';
import { CheckBackgroundTaskScreen } from '../screens/CheckBackgroundTaskScreen';
import { TestApiSystemUv } from '../screens/TestApiSystemUV';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';


export type RootStackParams = {
    //Screen2Test:undefined,
    //PersonScreen:{id:number,name:string},
    ScreenMain: undefined,
    LoginScreen: undefined,
    SplashScreen: undefined,
    RegisterScreen: undefined,
    ValidatePinScreen: undefined,
    ChangePasswordScreen: undefined,
    CounterScreen: undefined,
    UserInfoGeneralScreen: undefined,
    ConfigCounterScreen: undefined,
    BluetoothDeviceConnectScreen: undefined,
    BluetoothDeviceDiscoveryScreen: undefined,
    CheckBackgroundScreen: undefined,
    TestApiSystemUV: undefined,
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = ({ navigation }) => {

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
            <Stack.Screen name='LoginScreen' options={{
                title: 'Login',
                headerShown: false,
            }} component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' options={{ title: 'register' }} component={RegisterScreen} />
            <Stack.Screen name='ValidatePinScreen' options={{ title: 'validatePin' }} component={ValidatePinScreen} />
            <Stack.Screen name='ChangePasswordScreen' options={{ title: 'changePassword' }} component={ChangePasswordScreen} />
            <Stack.Screen name='CounterScreen' options={{ title: 'counter' }} component={CounterBluetoothScreen} />
            <Stack.Screen name='UserInfoGeneralScreen' options={{ title: 'UserInfoGeneral' }} component={UserInfoGeneralScreen} />
            <Stack.Screen name='ConfigCounterScreen' options={{
                title: 'ConfigCounter',
                headerLeft: (props) => (
                    <HeaderBackButton
                        {...props}
                        style={{backgroundColor:'cyan'}}
                        onPress={() => {
                            alert('fadsfsa')
                        }}
                    />
                )
            }} component={ConfigCounterScreen} />
            <Stack.Screen name='BluetoothDeviceConnectScreen' component={BluetoothDeviceConnectScreen} />
            <Stack.Screen name='BluetoothDeviceDiscoveryScreen' component={BluetoothDeviceDiscoveryScreen} />
            <Stack.Screen name='CheckBackgroundScreen' component={CheckBackgroundTaskScreen} />
            <Stack.Screen name='TestApiSystemUV' component={TestApiSystemUv} />
        </Stack.Navigator>
    )
}
