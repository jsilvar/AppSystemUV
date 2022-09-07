import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, useWindowDimensions, Modal, Pressable } from 'react-native';
//import icon
import Icon from 'react-native-vector-icons/dist/Entypo';
//config keyboard
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

interface Props {
    title: string,
    numberCell: number,
    nameValidateButton: string,
    nameGetPinButton: string,
    visible: boolean,
    validatePin: (value: string) => void,
    getNewPin: () => void
    closePinModal: () => void
}

export const PinModalGeneric = (propsOwn: Props) => {
    //get props
    const [visible, setVisible] = useState(propsOwn.visible)
    const [title, setTitle] = useState(propsOwn.title)
    const [numberCell, setNumberCell] = useState(propsOwn.numberCell)
    const [nameValidateButton, setNameValidateButton] = useState(propsOwn.nameValidateButton)
    const [nameGetPinButton, setNameGetPinButton] = useState(propsOwn.nameGetPinButton)
    //visible toast, loader and botton
    const [visibleLoader, setVisibleLoader] = useState(false)
    const [visibleToast, setVisibleToast] = useState(false)
    const [enabledButton, setEnabledButton] = useState(true)
    //use in toast
    const [titleToast, setTitleToast] = useState('')
    const [messageToast, setMessageToast] = useState('')
    const [typeToast, setTypeToast] = useState('')

    const { height, width } = useWindowDimensions()
    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: propsOwn.numberCell });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        setValue('')
    }, [])

    useEffect(() => {
        setEnabledButton(value.length != 6)
    }, [value])

    useEffect(() => {
        if (propsOwn.visible)
            setVisible(propsOwn.visible)
        else
            setVisible(propsOwn.visible)
    }, [propsOwn.visible])

    const closeModal = () => {
        setVisible(false)
        propsOwn.closePinModal()
    }

    const toggleMask = () => setEnableMask((f) => !f);

    const changeText = (value: string) => {
        setValue(value)
    }

    const validatePin = () => {
        if (value.length == 6)
            propsOwn.validatePin(value)
    }

    const getNewPin = () => {
        propsOwn.getNewPin()
    }

    const renderCell = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = enableMask ? '•' : symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }

        return (
            <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell, { width: Math.trunc(width / 11), height: Math.trunc(height / 10), fontSize: Math.trunc(width / 11) }]}
                onLayout={getCellOnLayoutHandler(index)}>
                {textChild}
            </Text>
        );
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <View style={styles.closeX} ><Text style={styles.closeTextX} onPress={() => closeModal()}>X</Text></View>
                            <Text style={styles.modalText}>{title}</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={styles.body}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyConten: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 5 }}>
                                    <CodeField
                                        ref={ref}
                                        {...props}
                                        value={value}
                                        onChangeText={changeText}
                                        cellCount={propsOwn.numberCell}
                                        keyboardType="number-pad"
                                        textContentType="oneTimeCode"
                                        renderCell={renderCell}
                                    />
                                </View>
                                <Text style={styles.toggle} onPress={toggleMask}>
                                    {enableMask ?
                                        (
                                            <Icon name="eye-with-line" size={Math.trunc(height / 16)} color="#7b0ee8" />
                                        ) :
                                        (
                                            <Icon name="eye" size={Math.trunc(height / 16)} color="#7b0ee8" />
                                        )}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <View key='fieldLogin' style={styles.buttonForm}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: enabledButton ? '#af73eb' : '#7f1ae5' }]}
                                    onPress={validatePin}
                                    disabled={enabledButton}
                                >
                                    <Text style={styles.textButton}>{nameValidateButton}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => closeModal()}
                            >
                                <Text style={styles.textStyle}>CERRAR</Text>
                            </Pressable>
                            <View key='fieldLogin' style={styles.buttonForm}>
                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={getNewPin}
                                >
                                    <Text style={styles.textButton}>{nameGetPinButton}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "rgba(52,52,52,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        flexDirection: 'column',
        height: '45%',
        width: '90%',
        margin: 0,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonConnect: {
        backgroundColor: "#F194FF",
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonUnpaired: {
        backgroundColor: "#F194FF",
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        flex: 1,
        padding: 1,
        textAlign: "center",
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        flex: 3,
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        textAlignVertical: 'center',
    },
    header: {
        flex: 3,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        padding: 5
    },
    separator: {
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        width: '95%'
    },
    closeX: {
        flex: 1,
        width: '100%',
        right: 0,
        fontSize: 20,
        backgroundColor: 'white',
        alignItems: 'flex-end',
    },
    closeTextX: {
        fontSize: 15,
        fontWeight: 'bold',
        width: 35,
        alignSelf: 'flex-end',
        textAlign: 'center',
    },
    body: {
        flex: 4,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        textAlignVertical: 'center',
        alignSelf: 'center'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        padding: 1,
    },
    root: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    space: {
        height: 1
    },
    title: {
        flex: 2,
        textAlign: 'center',
        fontSize: 20,
    },
    fieldRow: {
        flex: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        //marginLeft: 8,
    },
    cell: {
        width: 35,
        height: 55,
        lineHeight: 35,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 5,
        borderRadius: 6,
        backgroundColor: '#bbbbc8',
    },
    toggle: {
        flex: 1,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    buttonForm: {
        flex: 1,
        backgroundColor: '#af73eb',
        fontSize: 25
    },
    button: {
        flex: 1,
        backgroundColor: '#7f1ae5',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 20,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: "bold",
    }
});