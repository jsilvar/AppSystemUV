import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect, useRef, useReducer, useContext } from 'react';
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
import { LOGIN_SCREEN, SPLASH_SCREEN, SCREEN_APP } from '../constants/GlobalConstant';
import { USERS, CODE_HTTP, VERB_HTTP, ROLE_API, ERROR_TOKEN } from '../constants/ApiResource'
//API
import { PetitionAPI } from '../util/PetitionAPI'
import { loginInitialState, LoginReducer } from '../reducer/LoginReducer';
//components
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { TextInputGeneric } from '../components/generic/TextInputGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation }: Props) => {
    //visible toast and loader
    const [visibleLoader, setVisibleLoader] = useState(false)
    const [visibleToast, setVisibleToast] = useState(false)
    //used validate fields
    const [validated, setValidated] = useState(0)
    const prevValidated = useRef({ validated, setValidated })
    //use in toast
    const [titleToast, setTitleToast] = useState('')
    const [messageToast, setMessageToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    //used in reducer
    const [loginState, dispatch] = useReducer(LoginReducer, loginInitialState)
    //call api
    const { tokenJWTUser, requestPetition } = PetitionAPI()
    const [validateCallAPI, setValidateCallAPI] = useState(0)
    //context
    const {assignTokenGeneric, assignTokenUser, assignEmail, authState, assignUser}=useContext(AuthContext)

    useEffect(() => {
        if (loginState.email.validated && loginState.password.validated
            && prevValidated.current.validated != validated) {
            prevValidated.current.validated = validated
            setValidateCallAPI(validateCallAPI + 1)
        }
    }, [loginState])

    useEffect(() => {
        if (prevValidated.current.validated != validated) {
            if (loginState.email.validated && loginState.password.validated) {
                prevValidated.current.validated = validated
                setValidateCallAPI(validateCallAPI + 1)
            }
        }
        else if (!loginState.email.validated || !loginState.password.validated)
            prevValidated.current.validated = validated
    }, [validated])

    useEffect(() => {
        if (validateCallAPI == 1)
            callLoginAPI()
    }, [validateCallAPI])

    //use toast
    const useToast = (type: string, title: string, message: string) => {
        setTypeToast(type)
        setTitleToast(title)
        setMessageToast(message)
        setVisibleToast(true)
        setTimeout(() => {
            setVisibleToast(false)
        }, 3000);
    }

    //Go to screen RegisterScreen or ForgotPasswordScreen
    const enableRegisterScreen = () => {
        navigation.navigate(SCREEN_APP.REGISTER_SCREEN)
    }

    const enableFortgotPasswordScreen = () => {
        navigation.navigate(SCREEN_APP.CHANGE_PASSWORD_SCREEN)
    }

    //click button login
    const enableLogin = async () => {
        setValidated((validated + 1))
    }

    //validate fields form
    const isValidatedEmail = async (obj: any) => {
        dispatch({ type: 'changeEmail', payload: obj })
    }
    const isValidatedPassword = async (obj: any) => {
        dispatch({ type: 'changePassword', payload: obj })
    }

    //call login api
    const callLoginAPI = async () => {

        if (validateCallAPI != 1) {
            console.log('not execute')
            setTimeout(() => {
                setValidateCallAPI(0)
            }, 1000);
            return
        }
        else {

            console.log('\nexecute function...\n')

            setVisibleLoader(true)
            //call api
            let { code, data } = await tokenJWTUser(loginState.email.value, loginState.password.value)
            let { access_token } = data

            console.log('tokenUser: ', code, data)
            if (code == CODE_HTTP.OK) {
                //context
                assignTokenUser(access_token)
                

                let { code, data } = await requestPetition('get', USERS.GET_USER_BY_EMAIL.replace('${email}', loginState.email.value), access_token)
                setVisibleLoader(false)
                console.log("data by email: ", data)
                if (code == CODE_HTTP.OK && data.role == ROLE_API.ADMIN){
                    //context
                    let user={
                        email:data.email,
                        identificationNumber:data.identification_number,
                        firstName:data.first_name,
                        lastName:data.last_name,
                        enabled:data.enabled,
                        role:data.role,
                    }
                    assignUser(user)
                    //add logic according to role admin
                    navigation.navigate(SCREEN_APP.BLUETOOTH_DEVICE_CONNECT_SCREEN)
                    //navigation.navigate('ConfigCounterScreen')
                }
                else if (code == CODE_HTTP.OK && data.role == ROLE_API.USER){
                    //context
                    let user={
                        email:data.email,
                        identificationNumber:data.identification_number,
                        firstName:data.first_name,
                        lastName:data.last_name,
                        enabled:data.enabled,
                        role:data.role,
                    }
                    console.log('user data: ',user)
                    assignUser(user)
                    //add logic according to role user
                    navigation.navigate(SCREEN_APP.BLUETOOTH_DEVICE_CONNECT_SCREEN)
                    //navigation.navigate('ConfigCounterScreen')
                }
                else {
                    useToast(LOGIN_SCREEN.TOAST_ERROR, LOGIN_SCREEN.TOAST_ROLE_NON_EXISTENT.TITLE, LOGIN_SCREEN.TOAST_ROLE_NON_EXISTENT.MESSAGE)
                }
            }
            else {
                setVisibleLoader(false)
                if (code == CODE_HTTP.BAD_REQUEST && data.error_description.search(ERROR_TOKEN.BAD_CREDENTIALS) >= 0)
                    useToast(LOGIN_SCREEN.TOAST_ERROR, LOGIN_SCREEN.TOAST_BAD_CREDENTIALS.TITLE, LOGIN_SCREEN.TOAST_BAD_CREDENTIALS.MESSAGE)
                if (code == CODE_HTTP.NOT_AUTHORIZED)
                    useToast(LOGIN_SCREEN.TOAST_ERROR, LOGIN_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, LOGIN_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
                if (code == CODE_HTTP.FORBIDDEN)
                    useToast(LOGIN_SCREEN.TOAST_ERROR, LOGIN_SCREEN.TOAST_ACCESS_IS_DENIED.TITLE, LOGIN_SCREEN.TOAST_ACCESS_IS_DENIED.MESSAGE)
            }
            
            setTimeout(() => {
                setValidateCallAPI(0)
            }, 1000);
        }
    }

    //render views
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            viewIsInsideTabBar={true}
            enableAutomaticScroll={true}
        >
            <View style={styles.container}>

                <View key='idLoader' style={styles.space}>
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
                        isValidatedField={isValidatedEmail}
                    />
                    <TextInputGeneric
                        id='password'
                        validated={validated}
                        textLabel={LOGIN_SCREEN.PASSWORD}
                        placeHolder={LOGIN_SCREEN.PASSWORD_WATERMARK}
                        labelRule='Contraseña'
                        rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.PASSWORD, KEY_RULE_CONSTANT.MIN_LENGTH, KEY_RULE_CONSTANT.MAX_LENGTH]}
                        isValidatedField={isValidatedPassword}
                        minLength={6}
                        maxLength={8}
                        secure={true}
                    />
                    <View key='fieldLogin' style={styles.buttonField}>
                        <Button onPress={enableLogin} title={LOGIN_SCREEN.BUTTON_NAME} color='#7f1ae5' />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View key='fieldRegister' style={styles.register}>
                            <TouchableOpacity onPress={enableRegisterScreen}>
                                <Text style={styles.textRegister}>{LOGIN_SCREEN.REGISTER}</Text>
                            </TouchableOpacity>
                        </View>
                        <View key='fieldForgotPassword' style={styles.forgotPassword}>
                            <TouchableOpacity onPress={enableFortgotPasswordScreen}>
                                <Text style={styles.textRegister}>{LOGIN_SCREEN.FORGOT_PASSWORD}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
        flex: 5,
        backgroundColor: 'white'
    },
    imageLogo: {
        alignSelf: 'center',
        flex: 4,
    },
    field: {
        flex: 2,
    },
    buttonField: {
        flex: 1,
        justifyContent: 'center',
    },
    register: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPassword: {
        flex: 0.5,
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
        //textDecorationLine: 'underline'
    },
    textError: {
        color: 'red',
        fontSize: 10,
        marginLeft: 5
    }
})