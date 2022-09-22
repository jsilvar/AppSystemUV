import React, { useState, useEffect, useLayoutEffect, PropTypes } from 'react'
import {
    View,
    Text,
    Switch,
    StyleSheet
} from 'react-native'
import styles from '../../styles/styles'
import { TOAST } from '../../constants/GlobalConstant';

import BluetoothSerial, {
    withSubscription
} from "react-native-bluetooth-serial-next";

interface Props {
    isEnabled: boolean;
    toggleButton?(isEnabled: boolean): void;
    renderToast?(type: string, title: string, message: string): void;
}

const EnabledBluetooth = (props: Props) => {

    const [isEnabled, setIsEnabled] = useState(props.isEnabled)

    useEffect(() => {
        setIsEnabled(props.isEnabled)
    }, [props.isEnabled])

    useLayoutEffect(() => {
        setIsEnabled(props.isEnabled)
    }, [props.isEnabled])

    const toggleButton = async () => {
        try {
            if (!isEnabled) {
                await BluetoothSerial.enable();
            } else {
                await BluetoothSerial.disable();
            }
            await setIsEnabled(!isEnabled)
            props.toggleButton(!isEnabled)
        } catch (e) {
            renderToast(TOAST.ERROR.TYPE, TOAST.ERROR.TITLE, e.message)
        }
    }

    const renderToast = (type: string, title: string, message: string) => {
        props.renderToast(type, title, message)
    }

    return (
        <View style={styles.enableInfoWrapper}>
            <Text style={{ fontSize: 14, color: "white"}}>
                {isEnabled ? "ON" : "OFF"}
            </Text>
            <Switch onValueChange={toggleButton} value={isEnabled} />
        </View>
    )

}


export default EnabledBluetooth;