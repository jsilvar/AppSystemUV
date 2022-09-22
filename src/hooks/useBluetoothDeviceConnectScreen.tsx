import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import {View,Alert} from 'react-native'

import BluetoothSerial, {withSubscription} from "react-native-bluetooth-serial-next";

import EnabledBluetooth from '../components/bluetooth/EnabledBluetooth';
//navigation
import { useBackHandler } from '@react-native-community/hooks'

//constant
import { GLOBAL_CONSTANT, SCREEN_APP,BLUETOOTH_DEVICE_CONNECT_SCREEN } from '../constants/GlobalConstant';
//use memory to cellphone
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { HeaderRight } from '../components/generic/HeaderRight';
import { HeaderLeft } from '../components/generic/HeaderLeft';

interface IDeviceType {
    address: string | undefined;
    class: number | undefined;
    connected: number | undefined;
    id: string | undefined;
    name: string | undefined;
    paired: string | undefined;
}

export const useBluetoothDeviceConnectScreen = (navigation) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [isEnabled, setIsEnabled] = useState()
    const [devices, setDevices] = useState([])
    const [deviceUnique, setDeviceUnique] = useState(null)
    //toast
    const [typeToast, setTypeToast] = useState()
    const [titleToast, setTitleToast] = useState()
    const [messageToast, setMessageToast] = useState()
    const [visibleToast, setVisibleToast] = useState(false)
    //context
    const { authState, assignDeviceBluetooth, assignUser } = useContext(AuthContext)

    useEffect(() => {
        if (authState.deviceBluetooth.id != undefined && authState.deviceBluetooth.connected)
            navigation.navigate(SCREEN_APP.CONFIG_COUNTER_SCREEN)
        searchDevicesAndStatus()
        listDevicesConnect()
    }, [])

    const isConnectDevice = async (id: string) => {
        return await BluetoothSerial.isConnected(id)
    }
    const isConnect = (devicesTemp: Array<IDeviceType>) => {
        let devicesIsConnect: any[] = []
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
        if (listDevicesConnect != null)
            setDevices(JSON.parse(listDevicesConnect))
    }

    const searchDevicesAndStatus = async () => {
        try {
            const [isEnabled, devices] = await Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]);

            const devicesTemp: Array<IDeviceType> = devices.map(device => ({
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
            headerLeft: () => (
                <HeaderLeft
                    nameScreen='LoginScreen'
                    navigation={navigation}
                    backScreen={() => backScreen()}
                />
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                    <EnabledBluetooth
                        isEnabled={isEnabled}
                        toggleButton={(isEnabled) => toggleBluetooth(isEnabled)}
                    />
                    <HeaderRight
                        nameScreen='ConfigCounterScreen'
                        navigation={navigation}
                        forwardScreen={() => forwardScreen(SCREEN_APP.CONFIG_COUNTER_SCREEN)}
                    />
                </View>

            ),
        });
    }, [isEnabled, authState]);

    //back screen: login
    const backScreen = () => {
        if (authState.user != null) {
            Alert.alert(
                BLUETOOTH_DEVICE_CONNECT_SCREEN.ALERT_LOGOUT.TITLE,
                BLUETOOTH_DEVICE_CONNECT_SCREEN.ALERT_LOGOUT.MESSAGE,
                [
                    {
                        text: BLUETOOTH_DEVICE_CONNECT_SCREEN.ALERT_LOGOUT.CANCEL_BUTTON,
                        style: "cancel"
                    },
                    {
                        text: BLUETOOTH_DEVICE_CONNECT_SCREEN.ALERT_LOGOUT.ACCEPT_BUTTON,
                        onPress: () => {
                            //use context
                            assignUser(
                                {
                                    identificationNumber: undefined,
                                    email: undefined,
                                    firstName: undefined,
                                    lastName: undefined,
                                    role: undefined,
                                    enabled: undefined
                                }
                            )
                            assignDeviceBluetooth(
                                {
                                    idDevice: undefined,
                                    name: undefined,
                                    connected: undefined,
                                    paired: undefined,
                                }
                            )
                            navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
                        }
                    }
                ]
            )
        }
        return true
    }
    //backButton
    useBackHandler(backScreen)

    //forward next screen
    const forwardScreen = (screen: string) => {
        if (authState.deviceBluetooth.id == undefined)
            Alert.alert(
                BLUETOOTH_DEVICE_CONNECT_SCREEN.ALERT_CONNECT_DEVICE.TITLE,
                BLUETOOTH_DEVICE_CONNECT_SCREEN.ALERT_CONNECT_DEVICE.MESSAGE,
                [
                    {
                        text: BLUETOOTH_DEVICE_CONNECT_SCREEN.ALERT_CONNECT_DEVICE.CANCEL_BUTTON,
                        style: "cancel"
                    },
                    {
                        text: BLUETOOTH_DEVICE_CONNECT_SCREEN.ALERT_CONNECT_DEVICE.ACCEPT_BUTTON,
                    }
                ]
            )
        else
            navigation.navigate(screen)
    }

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
            assignDeviceBluetooth(
                {
                    idDevice: undefined,
                    name: undefined,
                    connected: undefined,
                    paired: undefined,
                }
            )
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

    return({
        titleToast,
        messageToast,
        typeToast,
        visibleToast,
        visibleLoading,
        modalVisible,
        deviceUnique,
        devices,
        isEnabled,
        connect,
        disconnect,
        onChangeModalVisible,
        choiceDevice,
    })
}