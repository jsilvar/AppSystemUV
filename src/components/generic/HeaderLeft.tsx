import React, { useEffect } from 'react'
import { View } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { StackScreenProps } from '@react-navigation/stack'

import { SCREEN_APP } from '../../constants/GlobalConstant'

interface Props extends StackScreenProps<any, any> { 
    nameScreen:string
}

export const HeaderLeft = ({ navigation, nameScreen }: Props) => {

    useEffect(() => {
        console.log('from HeaderLeft: ', navigation)
        console.log('nameScreen: ', nameScreen)
    }, [])


    const backScreen = (value: string) => {
        navigation.navigate(value)
    }

    return (
        <View>
            <HeaderBackButton
                style={{ backgroundColor: 'cyan' }}
                onPress={() => backScreen(nameScreen)}
            />
        </View>
    )
}
