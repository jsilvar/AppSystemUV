import { useState, useRef, useEffect, useReducer } from 'react';

//constants
import { REGISTER_SCREEN, SCREEN_APP } from '../constants/GlobalConstant';
import { USERS, ROLES, CODE_HTTP, VERB_HTTP, ROLE_API, ERROR_TOKEN } from '../constants/ApiResource'
//API
import { PetitionAPI } from '../util/PetitionAPI'
import { registerInitialState, RegisterReducer } from '../reducer/RegisterReducer';

export const useRegisterScreen = (navigation) => {
    //visible toast and loader
    const [visibleLoader, setVisibleLoader] = useState(false)
    const [visibleToast, setVisibleToast] = useState(false)
    //use validate fields
    const [validated, setValidated] = useState(0)
    const prevValidated = useRef({ validated, setValidated })
    //use in toast
    const [titleToast, setTitleToast] = useState('')
    const [messageToast, setMessageToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    //used in reducer
    const [registerState, dispatch] = useReducer(RegisterReducer, registerInitialState)
    //roles
    const [roles, setRoles] = useState([])
    //call api
    const { tokenJWT, tokenJWTUser, requestPetition } = PetitionAPI()
    const [validateCallAPI, setValidateCallAPI] = useState(0)

    useEffect(() => {
        if (registerState.numberIdentification.validated &&
            registerState.firstName.validated &&
            registerState.lastName.validated &&
            registerState.email.validated &&
            registerState.password.validated &&
            registerState.confirmPassword.validated &&
            registerState.role.validated &&
            prevValidated.current.validated != validated) {
            prevValidated.current.validated = validated
            setValidateCallAPI(validateCallAPI + 1)
        }
    }, [registerState])

    useEffect(() => {
        if (prevValidated.current.validated != validated) {
            if (registerState.numberIdentification.validated &&
                registerState.firstName.validated &&
                registerState.lastName.validated &&
                registerState.email.validated &&
                registerState.password.validated &&
                registerState.confirmPassword.validated &&
                registerState.role.validated) {
                prevValidated.current.validated = validated
                setValidateCallAPI(validateCallAPI + 1)
            }
        }
        else if (
            !registerState.numberIdentification.validated ||
            !registerState.firstName.validated ||
            !registerState.lastName.validated ||
            !registerState.email.validated ||
            !registerState.password.validated ||
            !registerState.confirmPassword.validated ||
            !registerState.role.validated
        )
            prevValidated.current.validated = validated
    }, [validated])

    useEffect(() => {
        if (validateCallAPI == 1)
            callRequestAPI()
    }, [validateCallAPI])

    useEffect(() => {
        if (prevValidated.current.validated != validated && prevValidated.current.setValidated != setValidated()) {
            if (registerState.numberIdentification.validated &&
                registerState.firstName.validated &&
                registerState.lastName.validated &&
                registerState.email.validated &&
                registerState.password.validated &&
                registerState.confirmPassword.validated &&
                registerState.role.validated
            )
                callRequestAPI()
        }
        return () => {
            prevValidated.current.validated = validated
            prevValidated.current.setValidated = setValidated
        }
    }, [registerState])

    useEffect(() => {
        callGetRoles()
    }, [])

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

    //click button login
    const enableRegister = async () => {
        setValidated((validated + 1))
    }

    //validate fields form
    const isValidatedNumberIdentification = async (obj: any) => {
        dispatch({ type: 'changeNumberIdentification', payload: obj })
    }
    const isValidatedFirstName = async (obj: any) => {
        dispatch({ type: 'changeFirstName', payload: obj })
    }
    const isValidatedLastName = async (obj: any) => {
        dispatch({ type: 'changeLastName', payload: obj })
    }
    const isValidatedEmail = async (obj: any) => {
        dispatch({ type: 'changeEmail', payload: obj })
    }
    const isValidatedPassword = async (obj: any) => {
        dispatch({ type: 'changePassword', payload: obj })
    }
    const isValidatedConfirmPassword = async (obj: any) => {
        dispatch({ type: 'changeConfirmPassword', payload: obj })
    }
    const isValidatedRole = async (obj: any) => {
        dispatch({ type: 'changeRole', payload: obj })
    }

    //call role api
    const callGetRoles = async () => {
        setVisibleLoader(true)
        //call api
        let { code, data } = await tokenJWT()
        let { access_token } = data

        if (code == CODE_HTTP.OK) {
            let { code, data } = await requestPetition('get', ROLES.LIST_ROLES, access_token)
            setVisibleLoader(false)
            let roleTemp = []
            data.map(role => {
                roleTemp.push(role.name)
            })
            setRoles(roleTemp)
        } else {
            setVisibleLoader(false)
            if (code == CODE_HTTP.BAD_REQUEST && data.error_description.search(ERROR_TOKEN.BAD_CREDENTIALS) >= 0)
                useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_BAD_CREDENTIALS.TITLE, REGISTER_SCREEN.TOAST_BAD_CREDENTIALS.MESSAGE)
            if (code == CODE_HTTP.NOT_AUTHORIZED)
                useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
            if (code == CODE_HTTP.FORBIDDEN)
                useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ACCESS_IS_DENIED.TITLE, REGISTER_SCREEN.TOAST_ACCESS_IS_DENIED.MESSAGE)
        }

    }
    //call register api
    const callRequestAPI = async () => {
        if (validateCallAPI != 1) {
            setTimeout(() => {
                setValidateCallAPI(0)
            }, 1000);
            return
        }
        else {
            setVisibleLoader(true)
            //call api
            let { code, data } = await tokenJWT()
            let { access_token } = data

            if (code == CODE_HTTP.OK) {
                const payloadUserDto = {
                    identification_number: registerState.numberIdentification.value,
                    first_name: registerState.firstName.value,
                    last_name: registerState.lastName.value,
                    email: registerState.email.value,
                    password: registerState.password.value,
                    role: registerState.role.value,
                    enabled: true
                }

                let { code, data } = await requestPetition(VERB_HTTP.POST, USERS.CREATE, access_token, payloadUserDto)
                setVisibleLoader(false)
                if (code == CODE_HTTP.OK && data.role == ROLE_API.ADMIN) {
                    useToast(REGISTER_SCREEN.TOAST_SUCCESS, REGISTER_SCREEN.TOAST_REGISTER.TITLE, REGISTER_SCREEN.TOAST_REGISTER.MESSAGE)
                    setTimeout(() => {
                        navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
                    }, 3500);
                }
                else if (code == CODE_HTTP.OK && data.role == ROLE_API.USER) {
                    useToast(REGISTER_SCREEN.TOAST_SUCCESS, REGISTER_SCREEN.TOAST_REGISTER.TITLE, REGISTER_SCREEN.TOAST_REGISTER.MESSAGE)
                    setTimeout(() => {
                        navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
                    }, 3500);
                }
                else if (code == CODE_HTTP.ERROR_SERVER)
                    useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ERROR_SERVER.TITLE, REGISTER_SCREEN.TOAST_ERROR_SERVER.MESSAGE)
                else if (code == CODE_HTTP.CONFLICT)
                    useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_NOT_REGISTER.TITLE, data.message)
                else if (code == CODE_HTTP.NOT_AUTHORIZED) {
                    useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
                    navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
                }
                else {
                    useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ROLE_NON_EXISTENT.TITLE, REGISTER_SCREEN.TOAST_ROLE_NON_EXISTENT.MESSAGE)
                }
            }
            else {
                setVisibleLoader(false)
                if (code == CODE_HTTP.BAD_REQUEST && data.error_description.search(ERROR_TOKEN.BAD_CREDENTIALS) >= 0)
                    useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_BAD_CREDENTIALS.TITLE, REGISTER_SCREEN.TOAST_BAD_CREDENTIALS.MESSAGE)
                if (code == CODE_HTTP.NOT_AUTHORIZED)
                    useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
                if (code == CODE_HTTP.FORBIDDEN)
                    useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ACCESS_IS_DENIED.TITLE, REGISTER_SCREEN.TOAST_ACCESS_IS_DENIED.MESSAGE)
                if (code == CODE_HTTP.NOT_AUTHORIZED) {
                    useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
                    navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
                }
            }
            setTimeout(() => {
                setValidateCallAPI(0)
            }, 1000);
        }
    }
    return ({
        registerState,
        roles,
        visibleLoader,
        titleToast,
        messageToast,
        typeToast,
        visibleToast,
        validated,
        isValidatedEmail,
        isValidatedPassword,
        isValidatedNumberIdentification,
        isValidatedFirstName,
        isValidatedLastName,
        isValidatedConfirmPassword,
        isValidatedRole,
        enableRegister
    })
}