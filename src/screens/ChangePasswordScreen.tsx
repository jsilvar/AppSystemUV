import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useRef, useEffect, useReducer } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

//validation
import { KEY_RULE_CONSTANT } from '../constants/validator/KeyRuleConstant';
//config keyboard
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//constants
import { CHANGE_PASSWORD_SCREEN, LOGIN_SCREEN, SELECT_OPTION } from '../constants/GlobalConstant';
import { LOGIN, CODE_HTTP, VERB_HTTP, ROLE_API, ERROR_TOKEN } from '../constants/ApiResource'
//API
import { PetitionAPI } from '../util/PetitionAPI'
import { registerInitialState, RegisterReducer } from '../reducer/RegisterReducer';
import { UserDto } from '../dto/PayloadDtoApi'
//components
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { SelectGeneric } from '../components/generic/SelectGeneric';
import { TextInputGeneric } from '../components/generic/TextInputGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';
import { ValidatePinScreen } from './ValidatePinScreen';
import { PinModalGeneric } from '../components/generic/PinModalGeneric';

interface Props extends StackScreenProps<any, any> { };

export const ChangePasswordScreen = ({ navigation }: Props) => {

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
  //roles
  const [roles, setRoles] = useState([])
  //call api
  const { tokenJWT, tokenJWTUser, requestPetition } = PetitionAPI()
  const [userDto, setUserDto] = useState<UserDto>('')

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
          navigation.navigate('LoginScreen')
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

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardAwareScroll}
      viewIsInsideTabBar={true}
      enableAutomaticScroll={true}
      // Doesn't work on RN 0.56 for either Android or iOS
      extraHeight={300}
      // Works on iOS but not Android in RN 0.56
      extraScrollHeight={300}
      scrollEnabled={true}
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
          <PinModalGeneric
            nameValidateButton={CHANGE_PASSWORD_SCREEN.MODAL.VALIDATION_BUTTON}
            nameGetPinButton={CHANGE_PASSWORD_SCREEN.MODAL.GET_PIN_BUTTON}
            numberCell={CHANGE_PASSWORD_SCREEN.CELL_COUNT}
            visible={visiblePinModal}
            title={CHANGE_PASSWORD_SCREEN.MODAL.TITLE}
            getNewPin={getNewPin}
            validatePin={(value) => validatePin(value)}
            closePinModal={() => closePinModal()}
          />
        </View>
        <View key='idChagePasswordForm' style={styles.form}>
          <View style={styles.titleForm}>
            <Text style={styles.textTitleForm}>{CHANGE_PASSWORD_SCREEN.TITLE}</Text>
          </View>
          <View style={styles.mainForm}>
            <ScrollView style={styles.scrollMainForm}>
              {
                !visibleFormPassword && (
                  <TextInputGeneric
                    id='email'
                    validated={validated}
                    textLabel={CHANGE_PASSWORD_SCREEN.EMAIL}
                    placeHolder={CHANGE_PASSWORD_SCREEN.EMAIL_WATERMARK}
                    labelRule='Correo Electrónico'
                    rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
                    isValidatedField={isValidatedEmail}
                  />
                )
              }
              {
                visibleFormPassword && (
                  <View>
                    <Text style={styles.subtitle}>{CHANGE_PASSWORD_SCREEN.SUBTITLE.replace('${email}', registerState.email.value)}</Text>
                    <TextInputGeneric
                      id='password'
                      validated={validated}
                      textLabel={CHANGE_PASSWORD_SCREEN.PASSWORD}
                      placeHolder={CHANGE_PASSWORD_SCREEN.PASSWORD_WATERMARK}
                      labelRule='Contraseña'
                      rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.PASSWORD, KEY_RULE_CONSTANT.MIN_LENGTH, KEY_RULE_CONSTANT.MAX_LENGTH]}
                      minLength={6}
                      maxLength={8}
                      isValidatedField={isValidatedPassword}
                    />
                    <TextInputGeneric
                      id='confirmPassword'
                      validated={validated}
                      textLabel={CHANGE_PASSWORD_SCREEN.CONFIRM_PASSWORD}
                      placeHolder={CHANGE_PASSWORD_SCREEN.CONFIRM_PASSWORD_WATERMARK}
                      labelRule='Confirmar contraseña'
                      rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EQUAL_PASSWORD]}
                      equalPassword={registerState.password.value}
                      isValidatedField={isValidatedConfirmPassword}
                    />
                  </View>
                )
              }

            </ScrollView>
          </View>
          <View key='fieldLogin' style={styles.buttonForm}>
            <TouchableOpacity
              style={styles.button}
              onPress={!visibleFormPassword ? requestPin : changePassword}
            >
              <Text style={styles.textButton}>{!visibleFormPassword ? CHANGE_PASSWORD_SCREEN.BUTTON_NAME : CHANGE_PASSWORD_SCREEN.CHANGE_PASSWORD_BUTTON_NAME}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  keyboardAwareScroll: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
  },
  space: {
    height: 1
  },
  titleForm: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  subtitle: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#c3e6cb',
    backgroundColor: '#d4edda',
    borderRadius: 3,
    margin: 2,
    fontSize: 20,
    textAlign: 'justify'
  },
  textTitleForm: {
    flex: 1,
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold'
  },
  scrollMainForm: {
    flex: 1,
  },
  mainForm: {
    flex: 14,
    justifyContent: 'space-between',
    margin: 3
  },
  textField: {
    flex: 2,
  },
  buttonForm: {
    flex: 1,
    backgroundColor: '#af73eb',
    fontSize: 25,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    width: '100%',
    backgroundColor: '#7f1ae5',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  }
})