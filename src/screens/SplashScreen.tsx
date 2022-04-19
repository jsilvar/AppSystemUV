import { StackScreenProps } from '@react-navigation/stack';
import React,{useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import {  ScreenStackProps } from 'react-native-screens';

import { SPLASH_SCREEN } from '../constants/GlobalConstant';


interface Props extends StackScreenProps<any,any>{

}


export const SplashScreen = ({navigation}:Props) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LoginScreen')
        }, 3000);
    }, [])


    return (
        <View style={styles.container}>
            <Image
                source={require('../images/splash.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})