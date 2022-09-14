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
import { REGISTER_SCREEN, SELECT_OPTION, SCREEN_APP } from '../constants/GlobalConstant';
import { USERS, ROLES, CODE_HTTP, VERB_HTTP, ROLE_API, ERROR_TOKEN } from '../constants/ApiResource'
//API
import { PetitionAPI } from '../util/PetitionAPI'
import { registerInitialState, RegisterReducer } from '../reducer/RegisterReducer';
import { UserDto } from '../dto/PayloadDtoApi'
//components
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { SelectGeneric } from '../components/generic/SelectGeneric';
import { TextInputGeneric } from '../components/generic/TextInputGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';

interface Props extends StackScreenProps<any, any> { };

export const RegisterScreen = ({ navigation }: Props) => {
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
  const [userDto, setUserDto] = useState<UserDto>('')

  useEffect(() => {
    if (prevValidated.current.validated != validated && prevValidated.current.setValidated != setValidated()) {
      console.log('validate changed: ', registerState)
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
      console.log("data by role: ", data)
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
    setVisibleLoader(true)
    //call api
    let { code, data } = await tokenJWT()
    let { access_token } = data

    console.log('tokenUser: ', code, data)
    if (code == CODE_HTTP.OK) {

      console.log('payload', registerState)
      const payloadUserDto = {
        identification_number: registerState.numberIdentification.value,
        first_name: registerState.firstName.value,
        last_name: registerState.lastName.value,
        email: registerState.email.value,
        password: registerState.password.value,
        role: registerState.role.value,
        enabled: true
      }

      let { code, data } = await requestPetition('post', USERS.CREATE, access_token, payloadUserDto)
      setVisibleLoader(false)
      console.log("data by register: ", data, ' code ', code)
      if (code == CODE_HTTP.OK && data.role == ROLE_API.ADMIN)
        navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
      else if (code == CODE_HTTP.OK && data.role == ROLE_API.USER)
        navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
      else if (code == CODE_HTTP.ERROR_SERVER)
        useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ERROR_SERVER.TITLE, REGISTER_SCREEN.TOAST_ERROR_SERVER.MESSAGE)
      else if (code == CODE_HTTP.CONFLICT)
        useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_NOT_REGISTER.TITLE, data.message)
      else if (code == CODE_HTTP.NOT_AUTHORIZED){
          useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
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
      if (code == CODE_HTTP.NOT_AUTHORIZED){
          useToast(REGISTER_SCREEN.TOAST_ERROR, REGISTER_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
          navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
      }
    }
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
        </View>
        <View key='idRegisterForm' style={styles.form}>
          <View style={styles.titleForm}>
            <Text style={styles.textTitleForm}>REGISTRAR USUARIO</Text>
          </View>
          <View style={styles.mainForm}>
            <ScrollView style={styles.scrollMainForm}>
              <TextInputGeneric
                id='numberIdentification'
                validated={validated}
                textLabel={REGISTER_SCREEN.ID_NUMBER}
                placeHolder={REGISTER_SCREEN.ID_NUMBER_WATERMARK}
                labelRule='Número de identificación'
                rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.NUMBER, KEY_RULE_CONSTANT.MIN_LENGTH, KEY_RULE_CONSTANT.MAX_LENGTH]}
                minLength={5}
                maxLength={11}
                isValidatedField={isValidatedNumberIdentification}
              />
              <TextInputGeneric
                id='firstName'
                validated={validated}
                textLabel={REGISTER_SCREEN.FIRST_NAME}
                placeHolder={REGISTER_SCREEN.FIRST_NAME_WATERMARK}
                labelRule='nombre'
                rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.ALPHABETICAL]}
                isValidatedField={isValidatedFirstName}
              />
              <TextInputGeneric
                id='lastName'
                validated={validated}
                textLabel={REGISTER_SCREEN.LAST_NAME}
                placeHolder={REGISTER_SCREEN.LAST_NAME_WATERMARK}
                labelRule='apellido'
                rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.ALPHABETICAL]}
                isValidatedField={isValidatedLastName}
              />
              <TextInputGeneric
                id='email'
                validated={validated}
                textLabel={REGISTER_SCREEN.EMAIL}
                placeHolder={REGISTER_SCREEN.EMAIL_WATERMARK}
                labelRule='Correo Electrónico'
                rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
                isValidatedField={isValidatedEmail}
              />
              <TextInputGeneric
                id='password'
                validated={validated}
                textLabel={REGISTER_SCREEN.PASSWORD}
                placeHolder={REGISTER_SCREEN.PASSWORD_WATERMARK}
                labelRule='Contraseña'
                rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.PASSWORD, KEY_RULE_CONSTANT.MIN_LENGTH, KEY_RULE_CONSTANT.MAX_LENGTH]}
                minLength={6}
                maxLength={8}
                isValidatedField={isValidatedPassword}
              />
              <TextInputGeneric
                id='confirmPassword'
                validated={validated}
                textLabel={REGISTER_SCREEN.CONFIRM_PASSWORD}
                placeHolder={REGISTER_SCREEN.CONFIRM_PASSWORD_WATERMARK}
                labelRule='Confirmar contraseña'
                rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EQUAL_PASSWORD]}
                equalPassword={registerState.password.value}
                isValidatedField={isValidatedConfirmPassword}
              />
              <SelectGeneric
                id='role'
                validated={validated}
                textLabel={REGISTER_SCREEN.ROLE}
                data={roles}
                defaultValue={SELECT_OPTION.DEFAULT}
                labelRule='rol'
                rules={[KEY_RULE_CONSTANT.REQUIRED]}
                isValidatedField={isValidatedRole}
              />
            </ScrollView>
          </View>
          <View key='fieldLogin' style={styles.buttonForm}>
            <TouchableOpacity
              style={styles.button}
              onPress={enableRegister}
            >
              <Text style={styles.textButton}>{REGISTER_SCREEN.BUTTON_NAME}</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textTitleForm: {
    flex: 1,
    fontSize: 25,
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
  },
  textButton: {
    fontSize: 25,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  }
})