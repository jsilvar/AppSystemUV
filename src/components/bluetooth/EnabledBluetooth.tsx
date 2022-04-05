import React, { PropTypes } from 'react'
import {
    View,
    Text,
    Switch
} from 'react-native'
import styles from '../../styles/styles'
import { TOAST } from '../../constants/GlobalConstant';

import BluetoothSerial, {
    withSubscription
} from "react-native-bluetooth-serial-next";

interface IPropsEnableBluetooth {
    isEnabled: boolean;
    toggleButton(isEnabled: boolean): void;
    renderToast(type: string, title: string, message: string): void;
}

interface IStateEnableBluetooth {
    isEnabled?: boolean;
}

class EnabledBluetooth extends React.Component<IPropsEnableBluetooth, IStateEnableBluetooth>{

    constructor(props: IPropsEnableBluetooth) {
        super(props)
        this.state = {
            isEnabled: this.props.isEnabled
        }
        this.toggleButton = this.toggleButton.bind(this)
        this.renderToast = this.renderToast.bind(this)
    }

    componentDidUpdate(prevProps, prevState): void {
        if (prevProps.isEnabled !== this.props.isEnabled)
            this.setState({
                isEnabled: this.props.isEnabled
            })
    }

    async toggleButton() {
        try {
            const { isEnabled } = this.state
            if (!isEnabled) {
                await BluetoothSerial.enable();
            } else {
                await BluetoothSerial.disable();
            }
            //await this.setState({ isEnabled: !isEnabled })
            this.props.toggleButton(!isEnabled)
        } catch (e) {
            this.renderToast(TOAST.ERROR.TYPE, TOAST.ERROR.TITLE, e.message)
        }
    }

    renderToast(type: string, title: string, message: string) {
        this.props.renderToast(type, title, message)
    }

    render() {
        const { isEnabled } = this.state
        return (
            <View style={styles.topBar}>
                <Text style={styles.heading}>Bluetooth Example</Text>
                <View style={styles.enableInfoWrapper}>
                    <Text style={{ fontSize: 14, color: "#fff", paddingRight: 10 }}>
                        {isEnabled ? "ON" : "OFF"}
                    </Text>
                    <Switch onValueChange={this.toggleButton} value={isEnabled} />
                </View>
            </View>
        )
    }
}

export default EnabledBluetooth;