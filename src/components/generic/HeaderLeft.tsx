import React, { useEffect } from 'react'
import { View } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { StackScreenProps } from '@react-navigation/stack'

import { SCREEN_APP } from '../../constants/GlobalConstant'

interface Props extends StackScreenProps<any, any> { 
    nameScreen:string,
    backScreen:()=>void;
}

export const HeaderLeft = ({ navigation, nameScreen, backScreen }: Props) => {

    const pressButton = () => {
        backScreen()
    }

    return (
        <View>
            <HeaderBackButton
                tintColor='white'
                style={{ backgroundColor: 'white', color:'white' }}
                onPress={() => pressButton()}
            />
        </View>
    )
}
