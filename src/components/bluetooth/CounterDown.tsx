import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, useWindowDimensions } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Spinner from 'react-native-spinkit';
//constant
import { COUNTER_DOWN } from '../../constants/GlobalConstant'


export const CounterDown = () => {

    const [isPlaying, setIsPlaying] = useState(false)
    const { height, width } = useWindowDimensions()

    useEffect(() => {
        console.log('change pause/run', isPlaying)

    }, [isPlaying])

    const formatRemainingTime = time => {
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const formatMinutes = minutes < 9 ? `0${minutes}:` : `${minutes}:`
        const formatSeconds = seconds < 9 ? `0${seconds}` : `${seconds}`

        return formatMinutes + formatSeconds
    };

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return (
                <View style={[style.timer, { width: width * 0.4, height: width * 0.5 }]}>
                    <Spinner
                        style={style.timerSpinner}
                        isVisible={true}
                        size={width * 0.4}
                        type='Pulse'
                        color='#7f1ae5' />
                    <Text style={[style.timerText, {color:'red', marginTop:-width*0.5}]}>{COUNTER_DOWN.FINISHED_TIME}</Text>
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
                    onPress={() => setIsPlaying(!isPlaying)}
                />
            </View>
        );
    };

    return (
        <View style={style.container}>
            <Text style={style.mainTitle}>{COUNTER_DOWN.TITLE}</Text>
            <View style={style.sensor}>
                <Text style={style.sensorText}>SENSOR UV: 1.001 mW/cm2</Text>
            </View>
            <View style={style.timerWrapper}>
                <CountdownCircleTimer
                    size={width * 0.9}
                    strokeWidth={width * 0.08}
                    trailStrokeWidth={width * 0.1}
                    trailColor='#d9d9d9'
                    strokeLinecap='round'
                    isSmoothColorTransition={true}
                    isPlaying={isPlaying}
                    duration={7}
                    colors={['#ba55d3', '#bb3385', '#78184a', '#DC143C']}
                    colorsTime={[0.75 * 7, 0.5 * 7, 0.25 * 7, 0]}
                    //initialRemainingTime={15}
                    onComplete={() => {
                        // do your stuff here
                        return { shouldRepeat: false, delay: 2 } // repeat animation in 1.5 seconds
                    }}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </View>
            {/* <Button style={style.buttonWrapper} title='Restart Timer' onPress={() => setIsPlaying(!isPlaying)} /> */}
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
        justifyContent:'center',
        borderWidth:3,
        borderColor:'#d9d9d9',
        borderRadius:10, 
        margin:2
    },
    sensorText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize:30,
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
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    timerSpinner:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
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
        flex: 2,
        textAlign: 'center',
    },
})