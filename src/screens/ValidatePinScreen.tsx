import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
//import icon
import Icon from 'react-native-vector-icons/dist/Entypo';
//config keyboard
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//API
import { PetitionAPI } from '../util/PetitionAPI'
import { registerInitialState, RegisterReducer } from '../reducer/RegisterReducer';
import { UserDto } from '../dto/PayloadDtoApi'
//components
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';
//constants
import { VALIDATE_SCREEN } from '../constants/GlobalConstant'
import { USERS, ROLES, CODE_HTTP, VERB_HTTP, ROLE_API, ERROR_TOKEN, LOGIN } from '../constants/ApiResource'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

interface Props extends StackScreenProps<any, any> { };

export const ValidatePinScreen = ({ navigation }: Props) => {
  //visible toast, loader and botton
  const [visibleLoader, setVisibleLoader] = useState(false)
  const [visibleToast, setVisibleToast] = useState(false)
  const [enabledButton, setEnabledButton] = useState(true)
  //use in toast
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState('')
  //call api
  const { tokenJWT, tokenJWTUser, requestPetition } = PetitionAPI()
  const [userDto, setUserDto] = useState('')

  const { height, width } = useWindowDimensions()
  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: VALIDATE_SCREEN.CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {

    setEnabledButton(value.length != 6)

  }, [value])

  const toggleMask = () => setEnableMask((f) => !f);

  const changeText = (value: string) => {
    console.log('change text: ', value)
    setValue(value)
  }

  //click button validate Token
  const validateToken = async () => {
    console.log('check token')
    callRequestAPI()
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

  //call register api
  const callRequestAPI = async () => {
    setVisibleLoader(true)
    //call api
    let { code, data } = await tokenJWT()
    let { access_token } = data

    console.log('tokenUser: ', code, data)
    if (code == CODE_HTTP.OK) {

      let methodUrl = LOGIN.CONFIRM_PIN.replace('${pin}', value)

      let { code, data } = await requestPetition('get', methodUrl, access_token)
      setVisibleLoader(false)
      console.log("data by register: ", data, ' code ', code)
      if (code == CODE_HTTP.OK && data.role == ROLE_API.ADMIN)
        console.log("call next screen according role admin")
      else if (code == CODE_HTTP.OK && data.role == ROLE_API.USER)
        console.log("call next screen according role user")
      else if (code == CODE_HTTP.ERROR_SERVER)
        useToast(VALIDATE_SCREEN.TOAST_ERROR, VALIDATE_SCREEN.TOAST_ERROR_SERVER.TITLE, VALIDATE_SCREEN.TOAST_ERROR_SERVER.MESSAGE)
      else if (code == CODE_HTTP.CONFLICT)
        useToast(VALIDATE_SCREEN.TOAST_ERROR, VALIDATE_SCREEN.TOAST_NOT_REGISTER.TITLE, data.message)
      else if (code == CODE_HTTP.NOT_FOUND)
        useToast(VALIDATE_SCREEN.TOAST_ERROR, VALIDATE_SCREEN.TOAST_NOT_FOUND.TITLE, VALIDATE_SCREEN.TOAST_NOT_FOUND.MESSAGE)
      else {
        useToast(VALIDATE_SCREEN.TOAST_ERROR, VALIDATE_SCREEN.TOAST_ROLE_NON_EXISTENT.TITLE, VALIDATE_SCREEN.TOAST_ROLE_NON_EXISTENT.MESSAGE)
      }
    }
    else {
      setVisibleLoader(false)
      if (code == CODE_HTTP.BAD_REQUEST && data.error_description.search(ERROR_TOKEN.BAD_CREDENTIALS) >= 0)
        useToast(VALIDATE_SCREEN.TOAST_ERROR, VALIDATE_SCREEN.TOAST_BAD_CREDENTIALS.TITLE, VALIDATE_SCREEN.TOAST_BAD_CREDENTIALS.MESSAGE)
      if (code == CODE_HTTP.NOT_AUTHORIZED)
        useToast(VALIDATE_SCREEN.TOAST_ERROR, VALIDATE_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, VALIDATE_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
      if (code == CODE_HTTP.FORBIDDEN)
        useToast(VALIDATE_SCREEN.TOAST_ERROR, VALIDATE_SCREEN.TOAST_ACCESS_IS_DENIED.TITLE, VALIDATE_SCREEN.TOAST_ACCESS_IS_DENIED.MESSAGE)
      if (code == CODE_HTTP.NOT_FOUND)
        useToast(VALIDATE_SCREEN.TOAST_ERROR, VALIDATE_SCREEN.TOAST_ACCESS_IS_DENIED.TITLE, data.message)
    }
  }

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell, { width: Math.trunc(width / 10), height: Math.trunc(height / 10), fontSize: Math.trunc(width / 11) }]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      viewIsInsideTabBar={true}
      enableAutomaticScroll={true}
    >
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
      <Text style={styles.title}>{VALIDATE_SCREEN.TITLE}</Text>
      <View style={styles.fieldRow}>
        <View style={{ flex: 1, flexDirection: 'row', justifyConten: 'center', alignItems: 'center' }}>
          <View style={{ flex: 5 }}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={changeText}
              cellCount={VALIDATE_SCREEN.CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
          </View>
          <Text style={styles.toggle} onPress={toggleMask}>
            {enableMask ?
              (
                <Icon name="eye-with-line" size={Math.trunc(height / 15)} color="#7b0ee8" />
              ) :
              (
                <Icon name="eye" size={Math.trunc(height / 15)} color="#7b0ee8" />
              )}
          </Text>
        </View>
      </View>
      <View key='fieldLogin' style={styles.buttonForm}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: enabledButton ? '#af73eb' : '#7f1ae5' }]}
          onPress={validateToken}
          disabled={enabledButton}
        >
          <Text style={styles.textButton}>{VALIDATE_SCREEN.BUTTON_NAME}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  space: {
    height: 1
  },
  title: {
    flex: 2,
    textAlign: 'center',
    fontSize: 30,
  },
  fieldRow: {
    flex: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  cell: {
    width: 35,
    height: 55,
    lineHeight: 35,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 4,
    borderRadius: 6,
    backgroundColor: '#bbbbc8',
  },
  toggle: {
    flex: 1,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  buttonForm: {
    flex: 1,
    backgroundColor: '#af73eb',
    fontSize: 25
  },
  button: {
    flex: 1,
    width: '100%',
    backgroundColor: '#7f1ae5',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 30,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  }
});