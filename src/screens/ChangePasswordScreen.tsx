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
import { CHANGE_PASSWORD_SCREEN, LOGIN_SCREEN, SELECT_OPTION, SCREEN_APP } from '../constants/GlobalConstant';
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
import { useChangePasswordScreen } from '../hooks/useChangePasswordScreen';

interface Props extends StackScreenProps<any, any> { };

export const ChangePasswordScreen = ({ navigation }: Props) => {
  
  const{
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
  }=useChangePasswordScreen(navigation)

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