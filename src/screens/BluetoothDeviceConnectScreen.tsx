import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
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
import { GLOBAL_CONSTANT, SCREEN_APP } from '../constants/GlobalConstant';

import ModalGeneric from '../components/bluetooth/ModalGeneric';
//navigation
import { useRoute } from '@react-navigation/native';
import { LoaderGeneric } from '../components/generic/LoaderGeneric';

//constant
import {BLUETOOTH_DEVICE_CONNECT_SCREEN} from '../constants/GlobalConstant';

//use memory to cellphone
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';

interface IDeviceType extends StackScreenProps<any, any>{
    address:string|undefined;
    class:number|undefined;
    connected:number|undefined;
    id:string|undefined;
    name:string|undefined;
    paired:string|undefined;
}

export const BluetoothDeviceConnectScreen = ({ navigation }:IDeviceType) => {

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
    //context
    const { authState,assignDeviceBluetooth } = useContext(AuthContext)


    useEffect(() => {
        console.log('sue effect ', (authState.deviceBluetooth.id!=undefined), authState.deviceBluetooth.connected)
        if(authState.deviceBluetooth.id!=undefined && authState.deviceBluetooth.connected)
            navigation.navigate(SCREEN_APP.CONFIG_COUNTER_SCREEN)
        console.log('from useEffect', authState)
        searchDevicesAndStatus()
        listDevicesConnect()
    }, [])

    const isConnectDevice = async (id: string) => {
        return await BluetoothSerial.isConnected(id)
    }
    const isConnect = (devicesTemp: Array<IDeviceType>) => {
        let devicesIsConnect:any[] = []
        devicesTemp.map(device => {
            isConnectDevice(device.id)
                .then((value) => {
                    devicesIsConnect.push({
                        ...device,
                        connected: value
                    })
                })
                .then(() => {
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

            const devicesTemp:Array<IDeviceType> = devices.map(device => ({
                ...device,
                paired: true,
                connected: false
            }))
            
            await setIsEnabled(isEnabled)
            await isConnect(devicesTemp)
            await AsyncStorage.setItem('listDevicesConnect', JSON.stringify(devicesTemp));
        } catch (e) {
            renderToast(
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR, 
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR_BLUETOOTH.TITLE,
                e.message)
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
        setModalVisible(false)
    }

    const choiceDevice = (id) => {
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
                renderToast(
                    BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_SUCCESS, 
                    BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_CONNECT_BLUETOOTH.TITLE,
                    BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_CONNECT_BLUETOOTH.MESSAGE)

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

                setDevices(tempDevice)
                //use context
                assignDeviceBluetooth(tempDevice.filter(device => device.id === connected.id)[0])
                //save to device memory
                await AsyncStorage.setItem('deviceBluetoothConnect', JSON.stringify(tempDevice.filter(device => device.id === connected.id)[0]));
                await AsyncStorage.setItem('listDevicesConnect', JSON.stringify(tempDevice));
                //go to screen configCounterScreen
                navigation.navigate(SCREEN_APP.CONFIG_COUNTER_SCREEN)

            } else {
                renderToast(
                    BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR, 
                    BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR_BLUETOOTH.TITLE,
                    BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR_BLUETOOTH.MESSAGE)
                setVisibleLoading(false)
            }
        } catch (e) {
            renderToast(
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR, 
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR_BLUETOOTH.TITLE,
                e.message)
            setVisibleLoading(false)
        }
    };

    const disconnect = async (deviceUnique: any) => {
        setVisibleLoading(true)
        try {
            await BluetoothSerial.device(deviceUnique.id).disconnect();

            renderToast(
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_SUCCESS, 
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR_BLUETOOTH.TITLE,
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR_BLUETOOTH.MESSAGE)

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

            //use context
            assignDeviceBluetooth(tempDevice.filter(device => device.id === deviceUnique.id)[0])
            setDevices(tempDevice)
            //setDisableReadBluetooth(true)
        } catch (e) {
            renderToast(
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR, 
                BLUETOOTH_DEVICE_CONNECT_SCREEN.TOAST_ERROR_BLUETOOTH.TITLE,
                e.message)
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