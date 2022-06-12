import React, { useEffect, useRef, useState } from 'react'
import { AppState, View, Text, Button } from 'react-native'

import BluetoothSerial, {
    isEnabled,
    withSubscription
} from "react-native-bluetooth-serial-next";

import BackgroundService from 'react-native-background-actions';

export const CheckBackgroundTaskScreen = () => {

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [idBluetooth, setIsBluetooth]=useState("00:21:13:02:C3:06")
    const [isConnected, setIsConnected] = useState(false);
    const [resetLamp,setResetLamp]=useState("RESET_LAMPS")
    const [group1Lamp,setGroup1Lamp]=useState("GROUP1")

    const options = {
        taskName: 'Example',
        taskTitle: 'ExampleTask title',
        taskDesc: 'ExampleTask description',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
        parameters: {
            delay: 1000,
        },
    };

    const resolve = () => {
        console.log('resolve promise')
    }

    const connect = async (id: 'string') => {
        try {
            if (!isConnected) {
                const connected = await BluetoothSerial.device(id).connect();
                if (connected) {
                    console.log('connected device', connected)
                    setIsConnected(true)
                    readBluetooth()
                }
            }
            else {
                console.log('devices not connected')
                setIsConnected(false)
            }
        } catch (e) {
            console.log('error', e.message)
        }
    };

    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                await sleep(delay);
            }
        });
    };

    const startTask = async () => {
        console.log('start button')
        await BackgroundService.start(veryIntensiveTask, options);
        writeBluetooth(idBluetooth,group1Lamp)
    }

    const updateTask = async () => {
        console.log('update button')
        await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' });
    }

    const stopTask = async () => {
        console.log('stop button')
        await BackgroundService.stop();
        writeBluetooth(idBluetooth,resetLamp)
    }

    const readBluetooth = () => {
        try {
            BluetoothSerial.readEvery(
                (data, intervalId) => {
                    console.log('data arduino', data, 'idInterval', intervalId);
                    //setIdIntervalReadBluetooth(intervalId)
                    //formatDataSensor(data)
                },
                1000,
                "\r\n"
            );
        } catch (e) {
            renderToast('error', 'error', e.message)
        }
    };

    const writeBluetooth = async (id, message) => {
        try {
            await BluetoothSerial.device(id).write(message);
            console.log('write device', id, 'message', message)
        } catch (e) {
            console.log('error', e.message)
        }
    };

    useEffect(() => {

        connect(idBluetooth)

        const subscription = AppState.addEventListener("change", nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                console.log("App has come to the foreground!");
                stopTask()
            }

            if (
                appState.current.match(/active/) &&
                nextAppState === "background"
            ) {
                console.log("App has come to the foreground!");
                startTask()
            }

            console.log('nextAppState', nextAppState, 'appState', appState.current)

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log("AppState", appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, [])


    return (
        <View>
            <Text>Check Background Task</Text>
            <Button onPress={() => startTask()} title='RUN TASK BACKGROUND' />
            <Button onPress={() => updateTask()} title='UPDATE TASK BACKGROUND' color='purple' />
            <Button onPress={() => stopTask()} title='STOP TASK BACKGROUND' color='red' />
        </View>
    )
}
