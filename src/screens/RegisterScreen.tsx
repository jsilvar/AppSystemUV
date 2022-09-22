import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

//validation
import { KEY_RULE_CONSTANT } from '../constants/validator/KeyRuleConstant';
//config keyboard
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//constants
import { REGISTER_SCREEN, SELECT_OPTION} from '../constants/GlobalConstant';
//components
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { SelectGeneric } from '../components/generic/SelectGeneric';
import { TextInputGeneric } from '../components/generic/TextInputGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';
import { useRegisterScreen } from '../hooks/useRegisterScreen';

interface Props extends StackScreenProps<any, any> { };

export const RegisterScreen = ({navigation}:Props) => {

  const{
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
  }=useRegisterScreen(navigation)

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
            <Text style={styles.textTitleForm}>{REGISTER_SCREEN.TITLE}</Text>
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
                secure={true}
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
                secure={true}
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
    flex: 2,
    margin:2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems:'center',
  },
  textTitleForm: {
    flex: 1,
    fontSize: 25,
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center',
    alignSelf:'center',
    alignItems:'center',
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