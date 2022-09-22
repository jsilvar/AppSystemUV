import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    Alert
} from 'react-native'

import BluetoothSerial, {
    withSubscription
} from "react-native-bluetooth-serial-next";

import Toast from 'react-native-toast-message';
import { ToastGeneric } from '../components/generic/ToastGeneric';
import EnabledBluetooth from '../components/bluetooth/EnabledBluetooth';
import { DeviceList } from '../components/bluetooth/DeviceList';
import { GLOBAL_CONSTANT, SCREEN_APP } from '../constants/GlobalConstant';

import ModalGeneric from '../components/bluetooth/ModalGeneric';
//navigation
import { useRoute } from '@react-navigation/native';
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { useBackHandler } from '@react-native-community/hooks'

//constant
import { BLUETOOTH_DEVICE_CONNECT_SCREEN } from '../constants/GlobalConstant';

//use memory to cellphone
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { HeaderRight } from '../components/generic/HeaderRight';
import { HeaderLeft } from '../components/generic/HeaderLeft';
import { useBluetoothDeviceConnectScreen } from '../hooks/useBluetoothDeviceConnectScreen';


interface Props extends StackScreenProps<any, any> {}

export const BluetoothDeviceConnectScreen = ({ navigation }: Props) => {
    const {
        titleToast,
        messageToast,
        typeToast,
        visibleToast,
        visibleLoading,
        modalVisible,
        deviceUnique,
        connect,
        disconnect,
        devices,
        isEnabled,
        onChangeModalVisible,
        choiceDevice,
    } = useBluetoothDeviceConnectScreen(navigation)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 1 }}>
                <ToastGeneric
                    title={titleToast}
                    message={messageToast}
                    type={typeToast}
                    visible={visibleToast}
                />
                <LoaderGeneric
                    visible={visibleLoading}
                />
                <ModalGeneric
                    modalVisible={modalVisible}
                    deviceUnique={deviceUnique}
                    onChange={(visible) => onChangeModalVisible(visible)}
                    connect={connect}
                    disconnect={disconnect}
                />
            </View>

            {!isEnabled &&
                (
                    <View style={styles.textField}>
                        <Text style={styles.textNotActived}>ACTIVE EL BLUETOOTH</Text>
                    </View>
                )}
            {isEnabled && devices.length !== 0 &&
                (<DeviceList
                    devices={devices}
                    onDevicePressed={(id) => choiceDevice(id)}
                />)}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textField: {
        flex: 1,
        backgroundColor: '#aed6f1',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textNotActived: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'white'
    }
})
