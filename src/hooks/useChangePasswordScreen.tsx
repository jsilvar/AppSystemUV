import { useState, useRef, useEffect, useReducer } from 'react';

//constants
import { CHANGE_PASSWORD_SCREEN, SCREEN_APP } from '../constants/GlobalConstant';
import { LOGIN, CODE_HTTP, VERB_HTTP, ROLE_API, ERROR_TOKEN } from '../constants/ApiResource'
//API
import { PetitionAPI } from '../util/PetitionAPI'
import { registerInitialState, RegisterReducer } from '../reducer/RegisterReducer';
import { UserDto } from '../dto/PayloadDtoApi'

export const useChangePasswordScreen = (navigation) => {

  const [pinValue, setPinValue] = useState('')
  //visible toast and loader
  const [visibleLoader, setVisibleLoader] = useState(false)
  const [visibleToast, setVisibleToast] = useState(false)
  const [visiblePinModal, setVisiblePinModal] = useState(false)
  const [visibleFormPassword, setVisibleFormPassword] = useState(false)
  //use validate fields
  const [validated, setValidated] = useState(0)
  const prevValidated = useRef({ validated, setValidated })
  //use in toast
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState('')
  //used in reducer
  const [registerState, dispatch] = useReducer(RegisterReducer, registerInitialState)
  //call api
  const { tokenJWT, requestPetition } = PetitionAPI()

  useEffect(() => {
    if (prevValidated.current.validated != validated) {
      if (
        registerState.email.validated &&
        !visibleFormPassword
      )
        callGeneratePinAPI()
      if (
        visibleFormPassword &&
        registerState.password.validated &&
        registerState.confirmPassword.validated
      )
        callChangePasswordAPI()
    }
    return () => {
      prevValidated.current.validated = validated
      prevValidated.current.setValidated = setValidated
    }
  }, [registerState])


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

  //click button request pin and change password
  const requestPin = async () => {
    setValidated((validated + 1))
  }

  const changePassword = async () => {
    setValidated((validated + 1))
  }

  //validate fields form
  const isValidatedEmail = async (obj: any) => {
    dispatch({ type: 'changeEmail', payload: obj })
  }
  const isValidatedPassword = async (obj: any) => {
    dispatch({ type: 'changePassword', payload: obj })
  }
  const isValidatedConfirmPassword = async (obj: any) => {
    dispatch({ type: 'changeConfirmPassword', payload: obj })
  }
  //pin modal generic
  const getNewPin = () => {
    callGeneratePinAPI()
  }

  const validatePin = (value: string) => {
    setPinValue(value)
    callConfirmPinAPI(value)
  }

  const closePinModal = () => {
    setTimeout(() => {
      setVisiblePinModal(false)
    }, 1000);
  }

  //call register api
  const callGeneratePinAPI = async () => {
    setVisibleLoader(true)
    //call api
    let { code, data } = await tokenJWT()
    let { access_token } = data


    if (code == CODE_HTTP.OK) {
      let { code, data } = await requestPetition(
        VERB_HTTP.GET, LOGIN.GENERATE_PIN.replace('${email}', registerState.email.value), access_token)
      setVisibleLoader(false)
      if (code == CODE_HTTP.ACCEPTED) {
        setVisiblePinModal(true)
        useToast(CHANGE_PASSWORD_SCREEN.TOAST_SUCCESS, CHANGE_PASSWORD_SCREEN.TOAST_SEND_PIN.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_SEND_PIN.MESSAGE)
      }
      else
        errorResponseCallApi(code, data)
    }
    else
      errorCallApi(code, data)
  }

  //call register api
  const callConfirmPinAPI = async (pin: string) => {
    setVisibleLoader(true)
    //call api
    let { code, data } = await tokenJWT()
    let { access_token } = data

    if (code == CODE_HTTP.OK) {

      let methodUrl = LOGIN.CONFIRM_PIN.replace('${email}', registerState.email.value)
      methodUrl = methodUrl.replace('${pin}', pin)
      let { code, data } = await requestPetition(VERB_HTTP.GET, methodUrl, access_token)

      setVisibleLoader(false)
      if (code == CODE_HTTP.OK) {
        setValidated(0)
        setVisiblePinModal(false)
        useToast(CHANGE_PASSWORD_SCREEN.TOAST_SUCCESS, CHANGE_PASSWORD_SCREEN.TOAST_CONFIRM_PIN.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_CONFIRM_PIN.MESSAGE)
        setTimeout(() => {
          setVisibleFormPassword(true)
        }, 1000);
      }
      else
        errorResponseCallApi(code, data)
    }
    else
      errorCallApi(code, data)
  }

  //call register api
  const callChangePasswordAPI = async () => {
    setVisibleLoader(true)
    //call api
    let { code, data } = await tokenJWT()
    let { access_token } = data

    if (code == CODE_HTTP.OK) {
      const payloadUserDto = {
        identification_number: '',
        first_name: '',
        last_name: '',
        email: registerState.email.value,
        password: registerState.password.value,
        role: '',
        enabled: true
      }

      let { code, data } = await requestPetition(
        VERB_HTTP.POST, LOGIN.CHANGE_PASSWORD.replace('${pin}', pinValue), access_token, payloadUserDto)
      setVisibleLoader(false)
      if (code == CODE_HTTP.ACCEPTED) {
        useToast(CHANGE_PASSWORD_SCREEN.TOAST_SUCCESS, CHANGE_PASSWORD_SCREEN.TOAST_CHANGE_PASSWORD.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_CHANGE_PASSWORD.MESSAGE)
        setTimeout(() => {
          navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
        }, 500);
      }
      else
        errorResponseCallApi(code, data)
    }
    else {
      errorCallApi(code, data)
    }
  }

  const errorResponseCallApi = (code: string, data: any) => {
    if (code == CODE_HTTP.ERROR_SERVER)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_SERVER.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_SERVER.MESSAGE)
    else if (code == CODE_HTTP.CONFLICT)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_NOT_REGISTER.TITLE, data.message)
    else if (code == CODE_HTTP.NOT_FOUND)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_NOT_FOUND.TITLE, data.message)
    else {
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ROLE_NON_EXISTENT.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ROLE_NON_EXISTENT.MESSAGE)
    }
  }

  const errorCallApi = (code: string, data: any) => {
    setVisibleLoader(false)
    if (code == CODE_HTTP.BAD_REQUEST && data.error_description.search(ERROR_TOKEN.BAD_CREDENTIALS) >= 0)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_BAD_CREDENTIALS.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_BAD_CREDENTIALS.MESSAGE)
    else if (code == CODE_HTTP.NOT_AUTHORIZED)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
    else if (code == CODE_HTTP.FORBIDDEN)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_IS_DENIED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_IS_DENIED.MESSAGE)
    else
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_NOT_FOUND.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_NOT_FOUND.MESSAGE)
  }

  return({
    registerState,
    visibleLoader,
    titleToast,
    messageToast,
    typeToast,
    visibleToast,
    visiblePinModal,
    visibleFormPassword,
    validated,
    getNewPin,
    validatePin,
    closePinModal,
    isValidatedEmail,
    isValidatedPassword,
    isValidatedConfirmPassword,
    requestPin,
    changePassword,
  })
}