import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

//validation
import { KEY_RULE_CONSTANT } from '../constants/validator/KeyRuleConstant';

//config keyboard
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//constants
import { LOGIN_SCREEN, SPLASH_SCREEN } from '../constants/GlobalConstant';
import { LoaderGeneric } from '../components/generic/LoaderGeneric';

import { TextInputGeneric } from '../components/generic/TextInputGeneric';


import ModalGeneric from '../components/bluetooth/ModalGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';


interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation }: Props) => {

    const [visible, setVisible] = useState(false)
    const [validated, setValidated] = useState(0)
    const [fieldsForm, setFieldsForm] = useState({
        email: { validated: false, value: '' },
        password: { validated: false, value: '' }
    })
    const prevFieldsForm = useRef({ fieldsForm, setFieldsForm })
    const [titleToast, setTitleToast] = useState('')
    const [messageToast, setMessageToast] = useState('')
    const [typeToast, setTypeToast] = useState('')

    useEffect(() => {

        if (prevFieldsForm.fieldsForm !== fieldsForm)
            console.log('validation use effect login screen', fieldsForm)

        return () => {
            prevFieldsForm.fieldsForm = fieldsForm
            prevFieldsForm.setFieldsForm = setFieldsForm
        }

    }, [fieldsForm])

    const enableRegisterScreen = () => {
        navigation.navigate('RegisterScreen')
    }

    const enableLogin = () => {
        validateForm()

        setVisible(true)

        //Toast
        setTypeToast(LOGIN_SCREEN.TOAST_SUCCESS)
        setTitleToast(LOGIN_SCREEN.TOAST_REGISTER.TITLE)
        setMessageToast(LOGIN_SCREEN.TOAST_REGISTER.MESSAGE)

        //restore value visible
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }

    const validateForm = () => {
        setValidated((validated + 1))
        console.log('LOGINSCREEN validated form', validated)
    }

    const isValidatedField = (obj: any) => {
        setFieldsForm({ ...fieldsForm, ...obj })
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            viewIsInsideTabBar={true}
            enableAutomaticScroll={true}
            extraHeight='-50'
        >
            <View style={styles.container}>

                <View key='idLoader' style={styles.space}>
                    <LoaderGeneric
                        visible={visible}
                    />
                    <ToastGeneric
                        title={titleToast}
                        message={messageToast}
                        type={typeToast}
                        visible={visible}
                    />
                </View>
                <View key='idLoginForm' style={styles.form}>

                    <Image
                        resizeMode='contain'
                        style={styles.imageLogo}
                        source={SPLASH_SCREEN.PATH_SPLASH}
                    />
                    <TextInputGeneric
                        id='email'
                        validated={validated}
                        textLabel={LOGIN_SCREEN.EMAIL}
                        placeHolder={LOGIN_SCREEN.EMAIL_WATERMARK}
                        labelRule='Correo Electrónico'
                        rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
                        isValidatedField={isValidatedField}
                    />
                    <TextInputGeneric
                        id='password'
                        validated={validated}
                        textLabel={LOGIN_SCREEN.PASSWORD}
                        placeHolder={LOGIN_SCREEN.PASSWORD_WATERMARK}
                        labelRule='Contraseña'
                        rules={[KEY_RULE_CONSTANT.REQUIRED]}
                        isValidatedField={isValidatedField}
                        secure={true}
                    />
                    <View key='fieldLogin' style={styles.buttonField}>
                        <Button onPress={enableLogin} title={LOGIN_SCREEN.BUTTON_NAME} color='#7f1ae5' />
                    </View>
                    <View key='fieldRegister' style={styles.register}>
                        <TouchableOpacity onPress={enableRegisterScreen}>
                            <Text style={styles.textRegister}>{LOGIN_SCREEN.REGISTER}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View key='idSpace' style={styles.space}></View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    space: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
    },
    form: {
        flex: 6,
        backgroundColor: 'white'
    },
    imageLogo: {
        alignSelf: 'center',
        flex: 3,
    },
    field: {
        flex: 2,
    },
    buttonField: {
        flex: 1,
        justifyContent: 'center',
    },
    register: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#7f1ae5',
        padding: 5,
        margin: 5,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        shadowOffset: {
            height: 10,
            width: 10
        },
        elevation: 2
    },
    textField: {
        margin: 2,
    },
    textRegister: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    textError: {
        color: 'red',
        fontSize: 10,
        marginLeft: 5
    }
})