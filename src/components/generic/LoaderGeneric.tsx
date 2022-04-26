import React, { useState, useEffect } from 'react'
import { View, Modal, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';

export const LoaderGeneric = (props) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible])

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <Spinner style={{ marginBottom: 50 }}
                        isVisible={true}
                        size={100}
                        type='9CubeGrid'
                        color='#7f1ae5' />
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