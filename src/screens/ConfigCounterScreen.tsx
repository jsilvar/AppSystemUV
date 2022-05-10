import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet
} from 'react-native';

//config keyboard
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { PickerGeneric } from '../components/generic/PickerGeneric';
import { SelectGeneric } from '../components/generic/SelectGeneric';
import { TextInputGeneric } from '../components/generic/TextInputGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';
import { REGISTER_SCREEN, SELECT_OPTION } from '../constants/GlobalConstant';
import { KEY_RULE_CONSTANT } from '../constants/validator/KeyRuleConstant';

export const ConfigCounterScreen = () => {

  const [validated, setValidated] = useState(0)
  const [visible, setVisible] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState('')
  const [fieldsForm, setFieldsForm] = useState({
    email: { validated: false, value: '' },
    password: { validated: false, value: '' }
  })
  const prevFieldsForm = useRef({ fieldsForm, setFieldsForm })

  const isValidatedField = (obj: any) => {
    setFieldsForm({ ...fieldsForm, ...obj })
  }
  const enableLogin = () => {
    validateForm()

    setVisible(true)

    //Toast
    setTypeToast(REGISTER_SCREEN.TOAST_SUCCESS)
    setTitleToast(REGISTER_SCREEN.TOAST_REGISTER.TITLE)
    setMessageToast(REGISTER_SCREEN.TOAST_REGISTER.MESSAGE)

    //restore value visible
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  const validateForm = () => {
    setValidated((validated + 1))
    console.log('LOGINSCREEN validated form', validated)
  }
  useEffect(() => {

    if (prevFieldsForm.fieldsForm !== fieldsForm)
      console.log('validation use effect login screen', fieldsForm)

    return () => {
      prevFieldsForm.fieldsForm = fieldsForm
      prevFieldsForm.setFieldsForm = setFieldsForm
    }

  }, [fieldsForm])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      viewIsInsideTabBar={true}
      enableAutomaticScroll={true}
      // Doesn't work on RN 0.56 for either Android or iOS
      extraHeight={-300}
      // Works on iOS but not Android in RN 0.56
      extraScrollHeight={-300}
      scrollEnabled={true}
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
        <View key='idRegisterForm' style={styles.form}>
          <ScrollView style={styles.scrollView}>
            <PickerGeneric
              id='idRole'
              validated={validated}
              textLabel={REGISTER_SCREEN.ROLE}
              data={SELECT_OPTION.LIST_TYPE_USER}
              defaultValue={SELECT_OPTION.DEFAULT}
              labelRule='rol'
              rules={[KEY_RULE_CONSTANT.REQUIRED]}
              isValidatedField={isValidatedField}
            />
            <Text style={styles.titleForm}>REGISTRAR USUARIO</Text>
            <TextInputGeneric
              id='firstName'
              validated={validated}
              textLabel={REGISTER_SCREEN.ID_NUMBER}
              placeHolder={REGISTER_SCREEN.ID_NUMBER_WATERMARK}
              labelRule='Número de identificación'
              rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
              isValidatedField={isValidatedField}
            />
            <TextInputGeneric
              id='firstName'
              validated={validated}
              textLabel={REGISTER_SCREEN.FIRST_NAME}
              placeHolder={REGISTER_SCREEN.FIRST_NAME_WATERMARK}
              labelRule='nombre'
              rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
              isValidatedField={isValidatedField}
            />
            <TextInputGeneric
              id='lastName'
              validated={validated}
              textLabel={REGISTER_SCREEN.LAST_NAME}
              placeHolder={REGISTER_SCREEN.LAST_NAME_WATERMARK}
              labelRule='apellido'
              rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
              isValidatedField={isValidatedField}
            />
            <TextInputGeneric
              id='email'
              validated={validated}
              textLabel={REGISTER_SCREEN.EMAIL}
              placeHolder={REGISTER_SCREEN.EMAIL_WATERMARK}
              labelRule='Correo Electrónico'
              rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
              isValidatedField={isValidatedField}
            />
            <TextInputGeneric
              id='password'
              validated={validated}
              textLabel={REGISTER_SCREEN.PASSWORD}
              placeHolder={REGISTER_SCREEN.PASSWORD_WATERMARK}
              labelRule='Contraseña'
              rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
              isValidatedField={isValidatedField}
            />
            <TextInputGeneric
              id='confirmPassword'
              validated={validated}
              textLabel={REGISTER_SCREEN.CONFIRM_PASSWORD}
              placeHolder={REGISTER_SCREEN.CONFIRM_PASSWORD_WATERMARK}
              labelRule='Confirmar contraseña'
              rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
              isValidatedField={isValidatedField}
            />
            <SelectGeneric
              id='idRole'
              validated={validated}
              textLabel={REGISTER_SCREEN.ROLE}
              data={SELECT_OPTION.LIST_TYPE_USER}
              defaultValue={SELECT_OPTION.DEFAULT}
              labelRule='rol'
              rules={[KEY_RULE_CONSTANT.REQUIRED]}
              isValidatedField={isValidatedField}
            />
            <View key='fieldLogin' style={styles.buttonField}>
              <Button style={styles.button} onPress={enableLogin} title={REGISTER_SCREEN.BUTTON_NAME} color='#7f1ae5' />
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  space: {
    //flex: 1,
    height: 1
  },
  titleForm: {
    flex: 1,
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10
  },
  container: {
    flex: 1,
  },
  form: {
    flex: 16,
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
    backgroundColor: 'red',
    bottom: 0,
  },
  button: {
    height: '100%'
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