import React, { useEffect } from 'react'
import { Button, Text } from 'react-native'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
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

import { SCREEN_HEADER } from '../constants/GlobalConstant'
import {RequestPermissionScreen} from '../screens/RequestPermissionScreen';


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
    RequestPermissionScreen:undefined,
}

const Stack = createStackNavigator<RootStackParams>();
interface Props extends StackScreenProps<any, any> { }
export const StackNavigator = ({ navigation }: Props) => {

    return (
        <Stack.Navigator
            initialRouteName='SplashScreen'
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent',
                    backgroundColor: '#af73eb'
                },
                headerTintColor:'white',
                headerTitleAlign: 'center',
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            {/* <Stack.Screen name='ScreenMain' options={{ title: 'Main' }} component={ScreenMain} /> */}
            <Stack.Screen
                name='SplashScreen'
                options={{
                    title: 'Splash',
                    headerShown: false
                }}
                component={SplashScreen} />
            <Stack.Screen
                name='LoginScreen'
                options={{
                    title: 'Login',
                    headerShown: false,
                }}
                component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' options={{ title: SCREEN_HEADER.REGISTER_SCREEN }} component={RegisterScreen} />
            <Stack.Screen name='ValidatePinScreen' options={{ title: SCREEN_HEADER.VALIDATE_SCREEN }} component={ValidatePinScreen} />
            <Stack.Screen name='ChangePasswordScreen' options={{ title: SCREEN_HEADER.CHANGE_PASSWORD_SCREEN }} component={ChangePasswordScreen} />
            <Stack.Screen name='CounterScreen' options={{ title: SCREEN_HEADER.COUNTER_BLUETOOTH_SCREEN }} component={CounterBluetoothScreen} />
            <Stack.Screen name='UserInfoGeneralScreen' options={{ title: SCREEN_HEADER.USER_INFO_GENERAL_SCREEN }} component={UserInfoGeneralScreen} />
            <Stack.Screen name='ConfigCounterScreen' options={{ title: SCREEN_HEADER.CONFIG_COUNTER_SCREEN }} component={ConfigCounterScreen} />
            <Stack.Screen name='BluetoothDeviceConnectScreen' options={{ title: SCREEN_HEADER.BLUETOOTH_DEVICE_CONNECT_SCREEN }} component={BluetoothDeviceConnectScreen} />
            {/* <Stack.Screen name='BluetoothDeviceDiscoveryScreen' options={{ title: 'ConfigCounter' }} component={BluetoothDeviceDiscoveryScreen} />
            <Stack.Screen name='CheckBackgroundScreen' options={{ title: 'ConfigCounter' }} component={CheckBackgroundTaskScreen} />
            <Stack.Screen name='TestApiSystemUV' options={{ title: 'ConfigCounter' }} component={TestApiSystemUv} />
            <Stack.Screen name='RequestPermissionScreen' options={{ title: 'RequestPermission'}} component={RequestPermissionScreen} /> */}
        </Stack.Navigator>
    )
}
