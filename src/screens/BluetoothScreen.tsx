import React, { useState } from 'react'

import {
    View,
    Text,
    SafeAreaView
} from 'react-native'

import BluetoothSerial, {
    withSubscription
} from "react-native-bluetooth-serial-next";

import Toast from 'react-native-toast-message';
import EnabledBluetooth from '../components/bluetooth/EnabledBluetooth';
import DeviceList from '../components/bluetooth/DeviceList';
import GLOBAL_CONSTANT from '../constants/GlobalConstant';

//this line
import ConstantTest from '../constants/DeviceTest'
import ModalGeneric from '../components/bluetooth/ModalGeneric';

class BluetoothScreen extends React.Component {

    constructor(props) {
        super(props)
        this.events = null;
        this.state = {
            isEnabled: false,
            device: null,
            devices: [],
            scanning: false,
            processing: false,
            text: '',
            datIO: '',
            isMenuOpen: false,
            type: 'success',
            modalVisible: false,
            tempDevice:null
        };
        this.toggleBluetooth = this.toggleBluetooth.bind(this)
    }

    async componentDidMount() {
        this.events = this.props.events;
        try {
            const [isEnabled, devices] = await Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]);

            await this.setState({
                isEnabled,
                devices: devices.map(device => ({
                    ...device,
                    paired: true,
                    connected: false
                }))
            });

            console.log('list devices', devices)
        } catch (e) {
            this.renderToast(GLOBAL_CONSTANT.TOAST.ERROR.TYPE, GLOBAL_CONSTANT.TOAST.ERROR.TITLE, e.message)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('component did update')
        if (prevState.isEnabled !== this.state.isEnabled) {
            console.log('change isEnabled, update', this.state.isEnabled)
            if (this.state.isEnabled) {
                console.log('enter section when isEnabled is true')
                setTimeout(() => { this.searchDevicesAndStatus() }, 1000)
            }
        }
    }

    async searchDevicesAndStatus() {
        this.events = this.props.events;
        try {
            const [devices] = await Promise.all([
                BluetoothSerial.list()
            ]);

            await this.setState({
                devices: devices.map(device => ({
                    ...device,
                    paired: true,
                    connected: false
                }))
            });

            console.log('list devices', devices)
        } catch (e) {
            this.renderToast(GLOBAL_CONSTANT.TOAST.ERROR.TYPE, GLOBAL_CONSTANT.TOAST.ERROR.TITLE, e.message)
        }
    }

    //return EnableBluetooth
    async toggleBluetooth(isEnabled?: boolean) {
        console.log('is enabled', isEnabled)
        await this.setState({
            isEnabled
        })
    }

    //Parameterize toast
    renderToast(type: string, title: string, message: string) {
        GLOBAL_CONSTANT.TOAST.show({
            type: type,
            text1: title,
            text2: message
        });
    }


    listDevices = async () => {
        try {
            const list = await BluetoothSerial.list();

            this.setState(({ devices }) => ({
                devices: devices.map(device => {
                    const found = list.find(v => v.id === device.id);

                    if (found) {
                        return {
                            ...found,
                            paired: true,
                            connected: false
                        };
                    }

                    return device;
                })
            }));
        } catch (e) {
            this.renderToast(GLOBAL_CONSTANT.TOAST.ERROR.TYPE, GLOBAL_CONSTANT.TOAST.ERROR.TITLE, e.message)
        }
    };

    onChangeModalVisible(visible) {
        console.log('BLUETOOTH SCREEN MODAL VISIBLE')
        this.setState({
            modalVisible: false
        })
    }

    choiceDevice(id) {
        console.log('FROM BLUETOOTH SCREEN jdklfjlkasd')
        console.log(id)

        var tempDevice
        this.state.devices.map(row => {
            if (row.id == id)
                tempDevice = row
        })

        this.setState({
            modalVisible: true,
            tempDevice
        })

        
    }

    render() {
        const { modalVisible } = this.state
        const [isEnabled, devices] = [true, ConstantTest]
        return (
            <SafeAreaView>
                <Toast />

                <ModalGeneric
                    modalVisible={modalVisible}
                    onChange={(visible) => this.onChangeModalVisible(visible)}
                />

                <EnabledBluetooth
                    isEnabled={isEnabled}
                    toggleButton={(isEnabled) => this.toggleBluetooth(isEnabled)}
                    renderToast={(type, title, message) => this.renderToast(type, title, message)}
                />

                <DeviceList
                    devices={devices}
                    onDevicePressed={(id) => this.choiceDevice(id)}
                    onRefresh={this.listDevices}
                />
            </SafeAreaView>
        )
    }
}

export default withSubscription({ subscriptionName: "events" })(BluetoothScreen);