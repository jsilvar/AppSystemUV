import React, { useEffect } from 'react';
import {
    View,
    Modal,
    StyleSheet
} from 'react-native';

import Toast from 'react-native-toast-message';

interface Props {
    title: string;
    message: string;
    type: string;
    visible: boolean;
}
export const ToastGeneric = (props: Props) => {

    useEffect(() => {
        if (!props.visible) return
        Toast.show({
            type: props.type,
            text1: props.title,
            text2: props.message
        });
    }, [props.visible])

    return (

        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.visible}
            >
                <View style={styles.centeredView}>
                    <Toast
                        position='top'
                        bottomOffset={5}
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        backgroundColor: "rgba(52,52,52,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
});
