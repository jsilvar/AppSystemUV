import React from 'react';
import { Text, View, StyleSheet, Button} from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import { ToastGeneric } from '../../components/generic/ToastGeneric';

//constants
import { COUNTER_DOWN, SCREEN_APP } from '../../constants/GlobalConstant';

import { LoaderGeneric } from '../generic/LoaderGeneric';
import { StackScreenProps } from '@react-navigation/stack';
import { useCounterDown } from '../../hooks/useCounterDown';

interface Props extends StackScreenProps<any, any> { };

export const CounterDown = ({ navigation }: Props) => {

    const {
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
    } = useCounterDown(navigation)

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