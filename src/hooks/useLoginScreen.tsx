import { useState, useEffect, useRef, useReducer, useContext } from 'react';
import { Platform, Alert } from 'react-native'
//constants
import { LOGIN_SCREEN, SCREEN_APP } from '../constants/GlobalConstant';
import { USERS, CODE_HTTP, ROLE_API, ERROR_TOKEN } from '../constants/ApiResource'
//API
import { PetitionAPI } from '../util/PetitionAPI'
import { loginInitialState, LoginReducer } from '../reducer/LoginReducer';
//components
import { AuthContext } from '../context/AuthContext';
import { check, request, checkNotifications, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const useLoginScreen = (navigation) => {
    const [permissionGranted, setPermissionGranted] = useState(false)
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
    const { assignTokenUser, assignUser } = useContext(AuthContext)

    useEffect(() => {
        if (Platform.OS == 'android' && Platform.Version >= 32)
            checkPermission()
    }, [])

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


    const checkPermission = async () => {
        let response = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT); // <-- always blocked
        
        if (response === RESULTS.GRANTED) {
            setPermissionGranted(true)
        } else if (response === RESULTS.DENIED) {
            response = request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT, {
                title: LOGIN_SCREEN.MESSAGE_PERMISSION.TITLE,
                message: LOGIN_SCREEN.MESSAGE_PERMISSION.MESSAGE,
                buttonPositive: LOGIN_SCREEN.MESSAGE_PERMISSION.BUTTON_POSSITIVE,
                buttonNegative: LOGIN_SCREEN.MESSAGE_PERMISSION.BUTTON_NEGATIVE,
            });
            if (response === RESULTS.GRANTED) {
                setPermissionGranted(true)
            } else if (response === RESULTS.DENIED) {
                useToast(LOGIN_SCREEN.TOAST_ERROR, LOGIN_SCREEN.TOAST_PERMISSION_DENIED.TITLE, LOGIN_SCREEN.TOAST_PERMISSION_DENIED.MESSAGE)
            }
        }
    }

    const alertPermissionEnabledBluetooth = () => {
        Alert.alert(
            LOGIN_SCREEN.ALERT_PERMISSION_BLUETOOTH.TITLE,
            LOGIN_SCREEN.ALERT_PERMISSION_BLUETOOTH.MESSAGE,
            [
                {
                    text: LOGIN_SCREEN.ALERT_PERMISSION_BLUETOOTH.CANCEL_BUTTON,
                    style: "cancel",
                    onPress: () => {
                    }
                },
                {
                    text: LOGIN_SCREEN.ALERT_PERMISSION_BLUETOOTH.ACCEPT_BUTTON,
                    onPress: () => {
                        checkPermission()
                    }
                }
            ]
        )
    }

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
        if(!permissionGranted && Platform.OS == 'android' && Platform.Version>=32){
            setTimeout(() => {
                setValidateCallAPI(0)
            }, 1000);
            alertPermissionEnabledBluetooth()
            return
        }

        if (validateCallAPI != 1) {
            setTimeout(() => {
                setValidateCallAPI(0)
            }, 1000);
            return
        }
        else {
            setVisibleLoader(true)
            //call api
            let { code, data } = await tokenJWTUser(loginState.email.value, loginState.password.value)
            let { access_token } = data

            if (code == CODE_HTTP.OK) {
                //context
                assignTokenUser(access_token)

                let { code, data } = await requestPetition('get', USERS.GET_USER_BY_EMAIL.replace('${email}', loginState.email.value), access_token)
                setVisibleLoader(false)

                if (code == CODE_HTTP.OK && data.role == ROLE_API.ADMIN) {
                    //context
                    let user = {
                        email: data.email,
                        identificationNumber: data.identification_number,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        enabled: data.enabled,
                        role: data.role,
                    }
                    assignUser(user)
                    //add logic according to role admin
                    navigation.navigate(SCREEN_APP.BLUETOOTH_DEVICE_CONNECT_SCREEN)
                    //navigation.navigate('ConfigCounterScreen')
                }
                else if (code == CODE_HTTP.OK && data.role == ROLE_API.USER) {
                    //context
                    let user = {
                        email: data.email,
                        identificationNumber: data.identification_number,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        enabled: data.enabled,
                        role: data.role,
                    }
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

    return ({
        visibleLoader,
        titleToast,
        messageToast,
        typeToast,
        visibleToast,
        validated,
        isValidatedEmail,
        isValidatedPassword,
        enableLogin,
        enableRegisterScreen,
        enableFortgotPasswordScreen
    })
}