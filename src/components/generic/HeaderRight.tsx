import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { StackScreenProps } from '@react-navigation/stack'

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<any, any> {
    nameScreen: string;
    forwardScreen:()=>void;
}

export const HeaderRight = ({ navigation, nameScreen, forwardScreen }: Props) => {

    const pressButton = () => {
        forwardScreen()
    }

    return (
        <View>
            <TouchableOpacity onPress={()=>pressButton()}>
                <IconAntDesign name="arrowright" solid size={25} color="white" />
            </TouchableOpacity>
        </View>
    )
}
