import React, {useState, useRef, useEffect} from 'react';
import {
    View,
} from 'react-native';
import { CounterDown } from '../components/bluetooth/CounterDown';

export const CounterBluetoothScreen = () => {

  return (
    <View style={{flex:1}}>
        <CounterDown

        />
    </View>
  )
}
