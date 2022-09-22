import { NavigationHelpersContext } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';

interface Props extends StackScreenProps<any, any> {

}

export const ScreenMain = ({navigation}:Props) => {

    const onPressScreen=(e:any)=>{
        navigation.navigate(e)
    }

    return (
        <View>
            <Text>Main Screen Only Test</Text>
            <Button title='splash' onPress={()=>onPressScreen('SplashScreen')}  />
            <Button title='login' onPress={()=>onPressScreen('LoginScreen')} />
            <Button title='register' onPress={()=>onPressScreen('RegisterScreen')} />
            <Button title='validatePin' onPress={()=>onPressScreen('ValidatePinScreen')} />
            <Button title='changePassword' onPress={()=>onPressScreen('ChangePasswordScreen')} />
            <Button title='counter' onPress={()=>onPressScreen('CounterScreen')} />
            <Button title='userInfo' onPress={()=>onPressScreen('UserInfoGeneralScreen')} />
            <Button title='ConfigCounter' onPress={()=>onPressScreen('ConfigCounterScreen')} />
            <Button title='BluetoothConnect' onPress={()=>onPressScreen('BluetoothDeviceConnectScreen')} />
            <Button title='BluetoothDiscovery' onPress={()=>onPressScreen('BluetoothDeviceDiscoveryScreen')} />
            <Button title='CheckBackground' onPress={()=>onPressScreen('CheckBackgroundScreen')} />
            <Button title='TestApiSystemUV' onPress={()=>onPressScreen('TestApiSystemUV')} />
            <Button title='RequestPermissionScreen' onPress={()=>onPressScreen('RequestPermissionScreen')}/>
        </View>
    )
}
