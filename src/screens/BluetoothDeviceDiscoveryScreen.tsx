import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    PermissionsAndroid
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

import PushNotification  from 'react-native-push-notification';

export const BluetoothDeviceDiscoveryScreen = ({ navigation }) => {

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
        createChannels()
        //requestCameraPermission()
        //discoverUnpairedDevices()
    }, [])

    const createChannels=()=>{
        PushNotification.createChannel(
            {
                channelId:"test-channel",
                channelName:'Test Channel'
            },
            (created)=>console.log(`createdChannel returned '${created}'`)
        )
    }

    const handleNotification=()=>{
        PushNotification.localNotification({
            channelId:"test-channel",
            title:"You clicked on",
            message:'Define here message'
        })
    }

    const requestCameraPermission = async () => {
        handleNotification()
        try {

            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
                .then(result => {
                    if (!result) {
                        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
                    } else {
                        console.log('permission enabled by coarse location')
                    }
                });

            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                .then(result => {
                    if (!result) {
                        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                    } else {
                        console.log('permission enabled by fine location')
                    }
                });

            // await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)
            //     .then(result => {
            //         if (!result) {
            //             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
            //         } else {
            //             console.log('permission enabled by ACCESS_BACKGROUND_LOCATION location')
            //         }
            //     });

            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN)
            .then(result => {
                if (!result) {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
                } else {
                    console.log('permission enabled by BLUETOOTH_SCAN location')
                }
            });

            // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN)
            //     .then(result => {
            //         if (!result) {
            //             console.log('permission DENIED BLUETOOTH_SCAN')
            //             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            //                 {
            //                     title: "Cool Photo App Camera Permission",
            //                     message:
            //                         "Cool Photo App needs access to your camera " +
            //                         "so you can take awesome pictures.",
            //                     buttonNeutral: "Ask Me Later",
            //                     buttonNegative: "Cancel",
            //                     buttonPositive: "OK"
            //                 }
            //             );
            //         } else {
            //             console.log('permission enabled by BLUETOOTH_SCAN')
            //         }
            //     });

            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );

            console.log('granted', granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }

            // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE)
            //     .then(result => {
            //         if (!result) {
            //             console.log('permission DENIED BLUETOOTH_ADVERTISE')
            //             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE);
            //         } else {
            //             console.log('permission enabled by bluetooth advertise')
            //         }
            //     });

        } catch (err) {
            console.warn(err);
        }
    }

    const discoverUnpairedDevices = async () => {
        setVisibleLoading(true)
        console.log('enter discover unpaired devices')
        try {
            console.log('enter2 discover unpaired devices')
            const isEnabled = await BluetoothSerial.isEnabled();
            console.log('is enabled', isEnabled)
            const unpairedDevices = await BluetoothSerial.listUnpaired();

            //const devices =  BluetoothSerial.discoverUnpairedDevices();

            //const devices = await BluetoothSerial.list();

            console.log('discoverUnpairedDevices', devices)
            setVisibleLoading(false)

        } catch (e) {
            console.log('error discover unpaired', e.message)
            setVisibleLoading(false)
        }
    };

    const cancelDiscovery = () => async () => {
        try {
            await BluetoothSerial.cancelDiscovery();
            setVisibleLoading(false)
        } catch (e) {

        }
    };

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
            </View>

            <Button title="request permissions" onPress={requestCameraPermission} />

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