import React, { useState, useRef, useEffect } from 'react';
import {
  View,
} from 'react-native';
import { CounterDown } from '../components/bluetooth/CounterDown';
import {COUNTER_DOWN} from '../constants/GlobalConstant'
import PushNotification  from 'react-native-push-notification';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const CounterBluetoothScreen = ({navigation}:Props) => {

  useEffect(() => {
    createChannels()
    console.log('navigation', navigation)
  }, [])

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: COUNTER_DOWN.NOTIFICATION_LOCAL.ID,
        channelName: COUNTER_DOWN.NOTIFICATION_LOCAL.NAME_CHANNEL,
        vibrate:true,
        vibration:2000,
        soundName:COUNTER_DOWN.NOTIFICATION_LOCAL.SOUND_NAME,
      },
      (created) => console.log(`createdChannel returned '${created}'`)
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <CounterDown
        navigation={navigation}
      />
    </View>
  )
}
