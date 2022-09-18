import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { StackScreenProps } from '@react-navigation/stack'

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<any, any> {
    nameScreen: string
}

export const HeaderRight = ({ navigation, nameScreen }: Props) => {

    useEffect(() => {
        console.log('from HeaderLeft: ', navigation)
        console.log('nameScreen: ', nameScreen)
    }, [])


    const forwardScreen = (value: string) => {
        navigation.navigate(value)
    }

    return (
        <View>
            <TouchableOpacity onPress={()=>forwardScreen(nameScreen)}>
                <IconAntDesign name="arrowright" solid size={25} color="black" />
            </TouchableOpacity>
        </View>
    )
}
