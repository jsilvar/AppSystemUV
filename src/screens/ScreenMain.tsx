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

    const displaySplashScreen=()=>{
        navigation.navigate('SplashScreen')
    }

    const displayLoginScreen=()=>{
        navigation.navigate('LoginScreen')
    }

    const displayRegisterScreen=()=>{
        navigation.navigate('RegisterScreen')
    }

    return (
        <View>
            <Text>Main Screen Only Test</Text>
            <Button title='splash' onPress={displaySplashScreen} />
            <Button title='login' onPress={displayLoginScreen} />
            <Button title='register' onPress={displayRegisterScreen} />
        </View>
    )
}
