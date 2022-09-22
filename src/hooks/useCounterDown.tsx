import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, StyleSheet, Button, useWindowDimensions, AppState } from 'react-native'
import Spinner from 'react-native-spinkit';
//navigation
import { useRoute } from '@react-navigation/native';

import { ToastGeneric } from '../components/generic/ToastGeneric';
import PushNotification from 'react-native-push-notification';

//constants
import { COUNTER_DOWN_API } from '../constants/ApiResource';
import { CODE_HTTP, ERROR_TOKEN, VERB_HTTP } from '../constants/ApiResource';
import { COUNTER_DOWN, SCREEN_APP } from '../constants/GlobalConstant';
import BackgroundService from 'react-native-background-actions';

import BluetoothSerial, {
    withSubscription
} from "react-native-bluetooth-serial-next";
import { AuthContext } from '../context/AuthContext';

import { PetitionAPI } from '../util/PetitionAPI';

export const useCounterDown = (navigation) => {

    const [timeDuration, setTimeDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [key, setKey] = useState(0);
    const { height, width } = useWindowDimensions()
    const { params } = useRoute();
    const [finishedTime, setFinishedTime] = useState(false)
    //bluetooth
    const [deviceConnect, setDeviceConnect] = useState()
    const [messageBluetooth, setMessageBluetooth] = useState()
    const [resetLamps, setResetLamps] = useState(COUNTER_DOWN.RESET_LAMPS)
    const [dataIO, setDataIO] = useState(COUNTER_DOWN.WITHOUT_DATA_SENSOR)
    const [dataTemp, setDataTemp] = useState([])
    const [idIntervalReadBluetooth, setIdIntervalReadBluetooth] = useState()
    //enabled render time
    const [enabledPushNotification, setEnablePushNotification] = useState(false)
    //toast
    const [typeToast, setTypeToast] = useState()
    const [titleToast, setTitleToast] = useState()
    const [messageToast, setMessageToast] = useState()
    const [visibleToast, setVisibleToast] = useState(false)
    const [visibleLoader, setVisibleLoader] = useState(false)
    const [enabledCounterDown, setEnabledCounterDown] = useState(false)
    //appState
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current)
    //context
    const { authState } = useContext(AuthContext)
    //call api
    const { tokenJWT, tokenJWTUser, requestPetition } = PetitionAPI()


    const options = {
        taskName: 'Hilo',
        taskTitle: !isPlaying ?
            COUNTER_DOWN.NOTIFICATION_THREAD_DISINFECTION_PENDING.TITLE :
            COUNTER_DOWN.NOTIFICATION_THREAD_DISINFECTION_RUNNING.TITLE,
        taskDesc: !isPlaying ?
            COUNTER_DOWN.NOTIFICATION_THREAD_DISINFECTION_PENDING.MESSAGE.replace('{0}', params.classRoom.value) :
            COUNTER_DOWN.NOTIFICATION_THREAD_DISINFECTION_RUNNING.MESSAGE.replace('{0}', params.classRoom.value),
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


    useEffect(() => {
        getStatusApp()
        setEnabledCounter()

        setDeviceConnect(params.deviceBluetoothConnect)
        setMessageBluetooth(params.luminary.value)
        convertTime(params)

    }, [isPlaying, timeDuration])

    const setEnabledCounter = () => {
        setTimeout(() => {
            setEnabledCounterDown(true)
        }, 500);

    }
    //use toast
    const useToast = (type: string, title: string, message: string) => {
        setTypeToast(type)
        setTitleToast(title)
        setMessageToast(message)
        setVisibleToast(true)
        setTimeout(() => {
            setVisibleToast(false)
        }, 3000);
    }

    //call register api
    const callDisinfectionAPI = async () => {
        setVisibleLoader(true)

        //get average sensor UV
        //loop array
        const initialValue = 0
        const sumWithInitial = dataTemp.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
        );

        //assembler object
        let disinfection = {
            user: {
                ...authState.user,
                identification_number: authState.user.identificationNumber,
            },
            luminary: {
                id_luminary: params.luminary.idLuminary,
                name: params.luminary.value
            },
            class_room: {
                id_class_room: params.classRoom.idClassRoom,
                name: params.classRoom.value
            },
            sensor_uv: (sumWithInitial / dataTemp.length).toFixed(2),
            duration_time: timeDuration
        }

        //call api
        let { code, data } = await requestPetition(VERB_HTTP.POST, COUNTER_DOWN_API.REGISTER_DISINFECTION, authState.tokenUser, disinfection)
        setVisibleLoader(false)

        if (code == CODE_HTTP.CREATED) {
            useToast(COUNTER_DOWN.TOAST_SUCCESS, COUNTER_DOWN.TOAST_REGISTER_DATA.TITLE, COUNTER_DOWN.TOAST_REGISTER_DATA.MESSAGE)
        }
        else {
            errorResponseCallApi(code, data)
        }
    }

    const errorResponseCallApi = (code: string, data: any) => {
        if (code == CODE_HTTP.ERROR_SERVER)
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_ERROR_SERVER.TITLE, COUNTER_DOWN.TOAST_ERROR_SERVER.MESSAGE)
        else if (code == CODE_HTTP.CONFLICT)
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_NOT_REGISTER.TITLE, data.message)
        else if (code == CODE_HTTP.NOT_FOUND)
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_NOT_FOUND.TITLE, data.message)
        else if (code == CODE_HTTP.NOT_AUTHORIZED) {
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, COUNTER_DOWN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
            setTimeout(() => {
                navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
            }, 3500);
        }
        else {
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_ROLE_NON_EXISTENT.TITLE, COUNTER_DOWN.TOAST_ROLE_NON_EXISTENT.MESSAGE)
        }
    }

    const errorCallApi = (code: string, data: any) => {
        setVisibleLoader(false)
        if (code == CODE_HTTP.BAD_REQUEST && data.error_description.search(ERROR_TOKEN.BAD_CREDENTIALS) >= 0)
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_BAD_CREDENTIALS.TITLE, COUNTER_DOWN.TOAST_BAD_CREDENTIALS.MESSAGE)
        else if (code == CODE_HTTP.NOT_AUTHORIZED)
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, COUNTER_DOWN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
        else if (code == CODE_HTTP.FORBIDDEN)
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_ACCESS_IS_DENIED.TITLE, COUNTER_DOWN.TOAST_ACCESS_IS_DENIED.MESSAGE)
        else if (code == CODE_HTTP.NOT_AUTHORIZED) {
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, COUNTER_DOWN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
            navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
        }
        else
            useToast(COUNTER_DOWN.TOAST_ERROR, COUNTER_DOWN.TOAST_ERROR_NOT_FOUND.TITLE, COUNTER_DOWN.TOAST_ERROR_NOT_FOUND.MESSAGE)
    }


    const startTask = async () => {
        console.log('start task')
        await BackgroundService.start(veryIntensiveTask, options);
    }

    const updateTask = async () => {
        console.log('update task')
        await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' });
    }

    const stopTask = async () => {
        console.log('stop task')
        await BackgroundService.stop();
    }

    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                await sleep(delay);
            }
        });
    };

    const getStatusApp = () => {
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
        });

        return () => {
            subscription.remove();
        };
    }

    const handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active')
            console.log("App has come to the foreground")

        appState.current = nextAppState
        setAppStateVisible(appState.current)

        if (appState.current.match(/background/)) {
            console.log('enter background')
            setInterval(() => {
            }, 1000)
        }
    }

    const handleNotification = () => {
        PushNotification.localNotification({
            channelId: COUNTER_DOWN.NOTIFICATION_LOCAL.ID,
            title: COUNTER_DOWN.NOTIFICATION_LOCAL.TITLE,
            message: COUNTER_DOWN.NOTIFICATION_LOCAL.MESSAGE,
            bigtext: COUNTER_DOWN.NOTIFICATION_LOCAL.BIG_TEXT,
            smallIcon: COUNTER_DOWN.NOTIFICATION_LOCAL.SMALL_ICON,
            color: COUNTER_DOWN.NOTIFICATION_LOCAL.COLOR
        })
    }

    const formatDataSensor = async (data: string) => {
        if (data === '')
            setDataIO(COUNTER_DOWN.WITHOUT_DATA_SENSOR)
        else {
            const dataSensor = data.substring(data.search('=') + 1, data.search(','))
            let sensorUV: number = parseFloat(dataSensor) * COUNTER_DOWN.CONSTANT_UV
            await setDataTemp(dataTemp => [...dataTemp, parseFloat(sensorUV.toFixed(2))])
            await setDataIO(COUNTER_DOWN.DATA_SENSOR.replace('{0}', sensorUV.toFixed(2).toString()))
        }
    }

    const readBluetooth = () => {
        try {
            BluetoothSerial.readEvery(
                (data, intervalId) => {
                    setIdIntervalReadBluetooth(intervalId)
                    formatDataSensor(data)
                },
                2000,
                "\r\n"
            );
        } catch (e) {
            renderToast('error', 'error', e.message)
        }
    };

    const writeBluetooth = async (id, message) => {
        try {
            await BluetoothSerial.device(id).write(message);
        } catch (e) {
            renderToast('error', 'error', e.message)
        }
    };

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

    const convertTime = (params: any) => {
        if (params.timerCountDown) {
            let timeTemp = parseInt(params.timerCountDown.value.minute) * 60 + parseInt(params.timerCountDown.value.second)
            setTimeDuration(timeTemp)
            setEnablePushNotification(true)
        }
        else
            return 0
    }

    const formatRemainingTime = time => {
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const formatMinutes = minutes <= 9 ? `0${minutes}:` : `${minutes}:`
        const formatSeconds = seconds <= 9 ? `0${seconds}` : `${seconds}`

        return formatMinutes + formatSeconds
    };

    const sendMessageBluetooth = (isPlaying: boolean) => {
        setIsPlaying(isPlaying)
        writeBluetooth(deviceConnect.id, messageBluetooth)
        readBluetooth()
    }

    const restartMessageBluetooth = () => {
        if (typeof deviceConnect !== 'undefined') {
            writeBluetooth(deviceConnect.id, resetLamps)
            //setDisabledReadBluetooth(true)
            clearInterval(idIntervalReadBluetooth);
        }
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0 && !finishedTime) {
            //call api save data
            callDisinfectionAPI()

            restartMessageBluetooth()
            if (enabledPushNotification)
                handleNotification()
            clearInterval(idIntervalReadBluetooth);
            //clear variables
            setDataTemp([])
            setDataIO(COUNTER_DOWN.WITHOUT_DATA_SENSOR)
            setFinishedTime(true)
        } else if (remainingTime === 0) {
            return (
                <View style={[style.timer, { width: width * 0.4, height: width * 0.5 }]}>
                    <Spinner
                        style={style.timerSpinner}
                        isVisible={true}
                        size={width * 0.4}
                        type='Pulse'
                        color='#7f1ae5' />
                    <Text style={[style.timerText, { color: 'red', marginTop: -width * 0.5 }]}>{COUNTER_DOWN.FINISHED_TIME}</Text>
                </View>
            )
        }

        return (
            <View style={[style.timer, { width: width * 0.4, height: width * 0.5 }]}>
                <Text key='timerText' style={style.timerText}>{COUNTER_DOWN.REMAINING_TIME}</Text>
                <Text key='timerValue' style={style.timerValue} accessibilityRole="timer"
                    accessibilityLiveRegion="assertive"
                    importantForAccessibility="yes">{formatRemainingTime(remainingTime)}</Text>
                <Button
                    color={!isPlaying ? '#7f1ae5' : 'brown'}
                    style={style.timerButton}
                    title={!isPlaying ? COUNTER_DOWN.START_BUTTON : COUNTER_DOWN.PAUSE_BUTTON}
                    onPress={() => sendMessageBluetooth(!isPlaying)}
                />
            </View>
        );
    };


    return ({
        key,
        visibleLoader,
        titleToast,
        messageToast,
        typeToast,
        visibleToast,
        dataIO,
        enabledCounterDown,
        width,
        isPlaying,
        timeDuration,
        setIsPlaying,
        setFinishedTime,
        setKey,
        renderTime,
        restartMessageBluetooth,
    })
}
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    mainTitle: {
        flex: 2,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    sensor: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#d9d9d9',
        borderRadius: 10,
        margin: 2
    },
    sensorText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 30,
    },
    timerWrapper: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    timer: {
        flexDirection: 'column',
    },
    timerText: {
        flex: 1,
        color: '#aaa',
        fontSize: 23,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    timerSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    timerValue: {
        flex: 2,
        fontSize: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    timerButton: {
        flex: 1,
        borderRadius: 100
    },
    info: {
        width: 360,
        marginTop: 40,
        marginBottom: 0,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonWrapper: {
        textAlign: 'center',
    },
})