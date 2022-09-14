import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, StyleSheet, Button, useWindowDimensions, AppState } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Spinner from 'react-native-spinkit';
//navigation
import { useRoute } from '@react-navigation/native';

import { ToastGeneric } from '../../components/generic/ToastGeneric';
import PushNotification from 'react-native-push-notification';

//constants
import { COUNTER_DOWN_API } from '../../constants/ApiResource';
import { CHANGE_PASSWORD_SCREEN, COUNTER_DOWN_SCREEN, LOGIN_SCREEN } from '../../constants/GlobalConstant';
import { CODE_HTTP, CONFIG_COUNTER, ERROR_TOKEN, LOGIN, VERB_HTTP } from '../../constants/ApiResource';
import { COUNTER_DOWN, SCREEN_APP } from '../../constants/GlobalConstant';
import BackgroundService from 'react-native-background-actions';

import BluetoothSerial, {
    withSubscription
} from "react-native-bluetooth-serial-next";
import { AuthContext } from '../../context/AuthContext';
import { LoaderGeneric } from '../generic/LoaderGeneric';

import { PetitionAPI } from '../../util/PetitionAPI';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { };

export const CounterDown = ({ navigation }: Props) => {

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
    const [sensorUV, setSensorUV] = useState(0)
    const [disabledReadBluetooth, setDisabledReadBluetooth] = useState(false)
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
        taskTitle: 'Hilo ejecutándose',
        taskDesc: 'Descripción hilo ejecutándose',
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
        console.log('params', params)
        console.log('navigation', navigation)
        console.log('authstate: ', authState)
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
        console.log('average sense: ', (sumWithInitial / dataTemp.length).toFixed(2), dataTemp.length)
        console.log('average sense: ' + sumWithInitial)

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
            sensor_uv: (sumWithInitial / dataTemp.length).toFixed(2)
        }

        //call api
        let { code, data } = await requestPetition(VERB_HTTP.POST, COUNTER_DOWN_API.REGISTER_DISINFECTION, authState.tokenUser, disinfection)
        setVisibleLoader(false)

        console.log(code, data)
        if (code == CODE_HTTP.CREATED) {
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_SUCCESS, CHANGE_PASSWORD_SCREEN.TOAST_REGISTER_DATA.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_REGISTER_DATA.MESSAGE)
        }
        else {
            errorResponseCallApi(code, data)
        }
    }

    const errorResponseCallApi = (code: string, data: any) => {
        if (code == CODE_HTTP.ERROR_SERVER)
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_SERVER.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_SERVER.MESSAGE)
        else if (code == CODE_HTTP.CONFLICT)
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_NOT_REGISTER.TITLE, data.message)
        else if (code == CODE_HTTP.NOT_FOUND)
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_NOT_FOUND.TITLE, data.message)
        else if (code == CODE_HTTP.NOT_AUTHORIZED) {
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
            setTimeout(() => {
                console.log('navigation', navigation)
                navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
            }, 3500);
        }
        else {
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ROLE_NON_EXISTENT.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ROLE_NON_EXISTENT.MESSAGE)
        }
    }

    const errorCallApi = (code: string, data: any) => {
        setVisibleLoader(false)
        if (code == CODE_HTTP.BAD_REQUEST && data.error_description.search(ERROR_TOKEN.BAD_CREDENTIALS) >= 0)
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_BAD_CREDENTIALS.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_BAD_CREDENTIALS.MESSAGE)
        else if (code == CODE_HTTP.NOT_AUTHORIZED)
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
        else if (code == CODE_HTTP.FORBIDDEN)
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_IS_DENIED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_IS_DENIED.MESSAGE)
        else if (code == CODE_HTTP.NOT_AUTHORIZED) {
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
            navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
        }
        else
            useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_NOT_FOUND.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_NOT_FOUND.MESSAGE)
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
                console.log(i);
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
            console.log("AppState", appState.current);
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
                console.log('hfuasdfasdf')
            }, 1000)
        }

        console.log('AppState: ', appState.current)
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
            console.log(dataTemp, sensorUV.toFixed(2).toString())
            await setDataTemp(dataTemp => [...dataTemp, parseFloat(sensorUV.toFixed(2))])
            await setDataIO(COUNTER_DOWN.DATA_SENSOR.replace('{0}', sensorUV.toFixed(2).toString()))
        }
    }

    const readBluetooth = () => {
        try {
            BluetoothSerial.readEvery(
                (data, intervalId) => {
                    console.log('data arduino', data, 'idInterval', intervalId);
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
            console.log('write device', id, 'message', message)
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
            console.log('time', timeTemp)
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
            console.log('reset lamps evaluated', idIntervalReadBluetooth)
            writeBluetooth(deviceConnect.id, resetLamps)
            //setDisabledReadBluetooth(true)
            clearInterval(idIntervalReadBluetooth);
        }
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0 && !finishedTime) {
            //call api save data
            callDisinfectionAPI()

            console.log('remaining time zero', remainingTime)
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

    return (
        <View style={style.container}>
            <View style={{ height: 1 }}>
                <LoaderGeneric
                    visible={visibleLoader}
                />
                <ToastGeneric
                    title={titleToast}
                    message={messageToast}
                    type={typeToast}
                    visible={visibleToast}
                />
            </View>
            <Text style={style.mainTitle}>{COUNTER_DOWN.TITLE}</Text>
            <View style={style.sensor}>
                <Text style={style.sensorText}>{dataIO}</Text>
            </View>
            <View style={style.timerWrapper}>
                {enabledCounterDown && (
                    <CountdownCircleTimer
                        key={key}
                        size={width * 0.9}
                        strokeWidth={width * 0.08}
                        trailStrokeWidth={width * 0.1}
                        trailColor='#d9d9d9'
                        strokeLinecap='round'
                        isSmoothColorTransition={true}
                        isPlaying={isPlaying}
                        duration={timeDuration}
                        colors={['#ba55d3', '#bb3385', '#78184a', '#DC143C']}
                        colorsTime={[0.75 * timeDuration, 0.5 * timeDuration, 0.25 * timeDuration, 0]}
                        initialRemainingTime={timeDuration}
                        onComplete={() => {
                            // do your stuff here
                            return { shouldRepeat: false, delay: 2 } // repeat animation in 1.5 seconds
                        }}
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                )}
            </View>
            <Button
                style={style.buttonWrapper}
                title='Restart Timer'
                color='red'
                onPress={() => {
                    setIsPlaying(false)
                    setKey(prevKey => prevKey + 1)
                    setFinishedTime(false)
                    restartMessageBluetooth()
                }} />
        </View>
    )
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