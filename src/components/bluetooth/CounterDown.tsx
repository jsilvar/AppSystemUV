import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, useWindowDimensions } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Spinner from 'react-native-spinkit';
//constant
import { COUNTER_DOWN } from '../../constants/GlobalConstant'
//navigation
import { useRoute } from '@react-navigation/native';

import { ToastGeneric } from '../../components/generic/ToastGeneric';
import PushNotification from 'react-native-push-notification';

import BluetoothSerial, {
    withSubscription
} from "react-native-bluetooth-serial-next";

interface Params {
    timerCountDown: any,
    deviceBluetoothConnect: any,
    luminaries: any,
}

export const CounterDown = () => {

    const [timeDuration, setTimeDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [key, setKey] = useState(0);
    const { height, width } = useWindowDimensions()
    const { params } = useRoute();
    //bluetooth
    const [deviceConnect, setDeviceConnect] = useState()
    const [messageBluetooth, setMessageBluetooth] = useState()
    const [resetLamps, setResetLamps] = useState(COUNTER_DOWN.RESET_LAMPS)
    const [dateIO, setDataIO] = useState(COUNTER_DOWN.WITHOUT_DATA_SENSOR)
    const [disabledReadBluetooth, setDisabledReadBluetooth] = useState(false)
    const [idIntervalReadBluetooth, setIdIntervalReadBluetooth] = useState()
    //enabled render time
    const [enabledPushNotification, setEnablePushNotification] = useState(false)
    //toast
    const [typeToast, setTypeToast] = useState()
    const [titleToast, setTitleToast] = useState()
    const [messageToast, setMessageToast] = useState()
    const [visibleToast, setVisibleToast] = useState(false)

    useEffect(() => {
        setDeviceConnect(params.deviceBluetoothConnect)
        setMessageBluetooth(params.luminaries.value)
        convertTime(params)
    }, [isPlaying, timeDuration])

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

    const formatDataSensor = (data: string) => {
        if (data === '')
            setDataIO(COUNTER_DOWN.WITHOUT_DATA_SENSOR)
        else {
            const dataTemp = data.substring(data.search('=') + 1, data.search(','))
            let sensorUV = parseFloat(dataTemp) * COUNTER_DOWN.CONSTANT_UV
            setDataIO(COUNTER_DOWN.DATA_SENSOR.replace('{0}', sensorUV.toFixed(2).toString()))
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
        if (remainingTime === 0) {
            console.log('remaining time zero', remainingTime)
            restartMessageBluetooth()
            if (enabledPushNotification)
                handleNotification()
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
                <ToastGeneric
                    title={titleToast}
                    message={messageToast}
                    type={typeToast}
                    visible={visibleToast}
                />
                {/* <LoaderGeneric
                    visible={visibleLoading}
                />
                <ModalGeneric
                    modalVisible={modalVisible}
                    deviceUnique={deviceUnique}
                    onChange={(visible) => onChangeModalVisible(visible)}
                    connect={connect}
                    disconnect={disconnect}
                /> */}
            </View>
            <Text style={style.mainTitle}>{COUNTER_DOWN.TITLE}</Text>
            <View style={style.sensor}>
                <Text style={style.sensorText}>{dateIO}</Text>
            </View>
            <View style={style.timerWrapper}>
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
            </View>
            <Button
                style={style.buttonWrapper}
                title='Restart Timer'
                color='red'
                onPress={() => {
                    setIsPlaying(false)
                    setKey(prevKey => prevKey + 1)
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