import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView
} from 'react-native'

import BluetoothSerial, {
    withSubscription
} from "react-native-bluetooth-serial-next";

import Toast from 'react-native-toast-message';
import { ToastGeneric } from '../components/generic/ToastGeneric';
import EnabledBluetooth from '../components/bluetooth/EnabledBluetooth';
import { DeviceList } from '../components/bluetooth/DeviceList';
import { GLOBAL_CONSTANT } from '../constants/GlobalConstant';

//this line
import ConstantTest from '../constants/DeviceTest'
import ModalGeneric from '../components/bluetooth/ModalGeneric';
//navigation
import { useRoute } from '@react-navigation/native';
import { LoaderGeneric } from '../components/generic/LoaderGeneric';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const BluetoothDeviceConnectScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [isEnabled, setIsEnabled] = useState()
    const [events, setEvents] = useState(null)
    const [devices, setDevices] = useState([])
    const [deviceUnique, setDeviceUnique] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [dateIO, setDataIO] = useState()
    const [disabledReadBluetooth, setDisableReadBluetooth] = useState(false)

    //toast
    const [typeToast, setTypeToast] = useState()
    const [titleToast, setTitleToast] = useState()
    const [messageToast, setMessageToast] = useState()
    const [visibleToast, setVisibleToast] = useState(false)

    useEffect(() => {
        console.log('from useEffect')
        searchDevicesAndStatus()
        listDevicesConnect()
    }, [])

    const isConnectDevice=async(id:string)=>{
        return await BluetoothSerial.isConnected(id)
    }
    const isConnect =  (devicesTemp:any) => {
        let devicesIsConnect=[]
        devicesTemp.map( device=>{
            isConnectDevice(device.id)
            .then((value)=>{
                console.log('deviceId',device.id,'isConnect',value)
                devicesIsConnect.push({
                    ...device,
                    connected:value
                })
            })
            .then(()=>{
                console.log('asdfasdfds',devicesIsConnect)
                setDevices(devicesIsConnect)
            })
        })
    }

    const listDevicesConnect = async () => {
        const listDevicesConnect = await AsyncStorage.getItem('listDevicesConnect');
        console.log('list devices connect', listDevicesConnect)
        if (listDevicesConnect === null)
            console.log('NO EXISTE LIST DEVICES')
        else {
            console.log('EXISTS LIST DEVICES', JSON.parse(listDevicesConnect))
            setDevices(JSON.parse(listDevicesConnect))
        }
    }

    const searchDevicesAndStatus = async () => {
        try {
            const [isEnabled, devices] = await Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]);

            console.log('search device', isEnabled)

            const devicesTemp = devices.map(device => ({
                ...device,
                paired: true,
                connected: false
            }))
            console.log(devicesTemp)
            await setIsEnabled(isEnabled)
            await isConnect(devicesTemp)
            await AsyncStorage.setItem('listDevicesConnect', JSON.stringify(devicesTemp));
        } catch (e) {
            renderToast(GLOBAL_CONSTANT.TOAST_ERROR, GLOBAL_CONSTANT.TOAST_NOT_REGISTER.TITLE, e.message)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <EnabledBluetooth
                    isEnabled={isEnabled}
                    toggleButton={(isEnabled) => toggleBluetooth(isEnabled)}
                />
            ),
        });
    }, [isEnabled]);

    //return EnableBluetooth
    const toggleBluetooth = async (isEnabled?: boolean) => {
        console.log('is enabled toggle bluetooth', isEnabled)
        if (isEnabled) {
            setVisibleLoading(true)
            setTimeout(() => {
                setVisibleLoading(false)
                searchDevicesAndStatus()
            }, 1500)
        }
        await setIsEnabled(isEnabled)
    }

    //Parameterize toast
    const renderToast = (type: string, title: string, message: string) => {
        setTypeToast(type)
        setTitleToast(title)
        setMessageToast(message)
        setVisibleToast(true)

        setTimeout(() => {
            setVisibleToast(false)
        }, 2000);
    }

    const onChangeModalVisible = (visible) => {
        console.log('BLUETOOTH SCREEN MODAL VISIBLE')
        setModalVisible(false)
    }

    const choiceDevice = (id) => {
        console.log('FROM BLUETOOTH SCREEN jdklfjlkasd')
        console.log(id)

        let tempDevice
        devices.map(row => {
            if (row.id == id)
                tempDevice = row
        })
        setModalVisible(true)
        setDeviceUnique(tempDevice)
    }

    const connect = async (deviceUnique: any) => {
        setVisibleLoading(true)
        try {
            const connected = await BluetoothSerial.device(deviceUnique.id).connect();

            if (connected) {
                renderToast('success', 'connected', 'device connected')
                console.log('connected device', connected)

                setVisibleLoading(false)
                const tempDevice = devices.map(v => {
                    if (v.id === connected.id) {
                        return {
                            ...v,
                            ...connected,
                            connected: true
                        };
                    }

                    return v;
                })
                console.log('list devices with element connected', tempDevice)
                setDevices(tempDevice)

                await AsyncStorage.setItem('deviceBluetoothConnect', JSON.stringify(tempDevice.filter(device => device.id === connected.id)[0]));
                await AsyncStorage.setItem('listDevicesConnect', JSON.stringify(tempDevice));

            } else {
                renderToast('error', 'error', 'failed connected device')
                setVisibleLoading(false)
            }
        } catch (e) {
            renderToast('error', 'error', e.message)
            setVisibleLoading(false)
        }
    };

    const disconnect = async (deviceUnique: any) => {
        setVisibleLoading(true)
        try {
            await BluetoothSerial.device(deviceUnique.id).disconnect();


            renderToast('success', 'connected', 'device disconnected')

            setVisibleLoading(false)
            const tempDevice = devices.map(v => {
                if (v.id === deviceUnique.id) {
                    return {
                        ...v,
                        connected: false
                    };
                }
                return v;
            })
            console.log('list devices with element disconnected', tempDevice)
            setDevices(tempDevice)
            //setDisableReadBluetooth(true)
        } catch (e) {
            renderToast('error', 'error', e.message)
            setVisibleLoading(false)
        }
    };

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
                        <Text style={styles.textNotActived}>Active el bluetooth</Text>
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
        backgroundColor: 'orange',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textNotActived: {
        fontSize: 60,
        fontWeight: 'bold'
    }
})