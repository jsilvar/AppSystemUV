import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
//navigation
import { StackScreenProps } from '@react-navigation/stack';
//storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDto } from '../dto/PayloadDtoApi';
import { PetitionAPI } from '../util/PetitionAPI';
import { CHANGE_PASSWORD_SCREEN, CONFIG_COUNTER_SCREEN, COUNTER_DOWN_SCREEN, SCREEN_APP } from '../constants/GlobalConstant';
import { CODE_HTTP, CONFIG_COUNTER, ERROR_TOKEN, LOGIN, VERB_HTTP } from '../constants/ApiResource';
import { AuthContext } from '../context/AuthContext';
import { HeaderRight } from '../components/generic/HeaderRight';
import { HeaderLeft } from '../components/generic/HeaderLeft';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const useConfigCounterScreen = (navigation) => {

  //const visible loader and toast
  const [visible, setVisible] = useState(false)
  const [visibleLoader, setVisibleLoader] = useState(false)
  const [visibleToast, setVisibleToast] = useState(false)
  //const toast
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState('')
  //validated fields
  const [validated, setValidated] = useState(0)
  const [changeValidated, setChangeValidated] = useState(false)
  const prevValidated = usePrevious(validated)
  //values luminaries list
  const [luminariesList, setLuminariesList] = useState({ lamp1: false, lamp2: false, lamp3: false, lamp4: false, lamp5: false, lamp6: false, lamp7: false })
  //values components
  const [classRoom, setClassRoom] = useState('');
  const [luminaries, setLuminaries] = useState('')
  const prevLuminaries = usePrevious(luminaries)
  const [timerCountDown, setTimerCountDown] = useState('')
  const [deviceBluetoothConnect, setDeviceBluetoothConnect] = useState('')
  const [groupLuminariesList, setGroupLuminariesList] = useState([])
  const [luminariesAPIList, setLuminariesAPIList] = useState([])
  const [classRoomsAPIList, setClassRoomsAPIList] = useState([])
  //context
  const { authState } = useContext(AuthContext)
  //call api
  const { tokenJWTUser, requestPetition } = PetitionAPI()
  //values field form
  const [fieldsForm, setFieldsForm] = useState({
    classRoom: { validated: false, value: '' },
    luminaries: { validated: false, value: '' },
    timerCountDown: { validated: false, value: '' }
  })

  useEffect(() => {
    console.log('navigation', navigation)
    console.log('authstate: ### ', authState)
    callLuminariesAPI()
    callClassRoomsAPI()
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

  //call register api
  const callLuminariesAPI = async () => {
    setVisibleLoader(true)
    //call api
    let { code, data } = await requestPetition(VERB_HTTP.GET, CONFIG_COUNTER.LUMINARIES_LIST, authState.tokenUser)
    setVisibleLoader(false)
    if (code == CODE_HTTP.OK) {
      //ToDo
      let listGroupLuminaries = []
      let listLuminaries = []

      data.map(luminary => {
        let groupLuminaryTemp = JSON.parse(`{"${luminary.name}":${JSON.stringify(luminary.group_luminaries)}}`)
        let luminaryTemp = JSON.parse(`{"idLuminary":"${luminary.id_luminary}", "label": "${luminary.name}", "value": "${luminary.name}" }`)
        listGroupLuminaries.push(groupLuminaryTemp)
        listLuminaries.push(luminaryTemp)

      })
      setGroupLuminariesList(listGroupLuminaries)
      setLuminariesAPIList(listLuminaries)
    }
    else
      errorResponseCallApi(code, data)
  }

  //call register api
  const callClassRoomsAPI = async () => {
    setVisibleLoader(true)
    //call api
    let { code, data } = await requestPetition(VERB_HTTP.GET, CONFIG_COUNTER.CLASS_ROOMS_LIST, authState.tokenUser)
    setVisibleLoader(false)
    if (code == CODE_HTTP.OK) {
      //ToDo
      let classRoomsList = []

      data.map(classRoom => {
        //let dataLuminaryTemp=JSON.parse(`{"${luminary.name}":${JSON.stringify(luminary.group_luminaries)}}`)
        let classRoomTemp = JSON.parse(`{"idClassRoom":"${classRoom.id_class_room}", "label": "${classRoom.name}", "value": "${classRoom.name}" }`)
        classRoomsList.push(classRoomTemp)
      })
      setClassRoomsAPIList(classRoomsList)
    }
    else
      errorResponseCallApi(code, data)
  }

  const errorResponseCallApi = (code: string, data: any) => {
    if (code == CODE_HTTP.ERROR_SERVER)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_SERVER.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_SERVER.MESSAGE)
    else if (code == CODE_HTTP.CONFLICT)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_NOT_REGISTER.TITLE, data.message)
    else if (code == CODE_HTTP.NOT_FOUND)
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_NOT_FOUND.TITLE, data.message)
    else if (code == CODE_HTTP.NOT_AUTHORIZED) {
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
      navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
    }
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
    else if (code == CODE_HTTP.NOT_AUTHORIZED) {
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ACCESS_TOKEN_EXPIRED.MESSAGE)
      navigation.navigate(SCREEN_APP.LOGIN_SCREEN)
    }
    else
      useToast(CHANGE_PASSWORD_SCREEN.TOAST_ERROR, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_NOT_FOUND.TITLE, CHANGE_PASSWORD_SCREEN.TOAST_ERROR_NOT_FOUND.MESSAGE)
  }

  const getAsyncStorage = async () => {
    try {
      const savedDevice = await AsyncStorage.getItem("deviceBluetoothConnect");
      const deviceTemp = JSON.parse(savedDevice);
      await setDeviceBluetoothConnect(deviceTemp)
    } catch (error) {
      console.log(error);
    }
  }

  const getValueFieldsForm = async (fieldsForm) => {
    await setFieldsForm(fieldsForm)
  }

  useEffect(() => {

    //check storage
    getAsyncStorage()

    const tempFieldForm = { ...fieldsForm, ...classRoom, ...luminaries, ...timerCountDown }
    //setFieldsForm(tempFieldForm)
    getValueFieldsForm(tempFieldForm)

    if (luminaries !== prevLuminaries) {
      if (luminaries.luminaries)
        if (groupLuminariesList.length > 0) {
          var group = groupLuminariesList.filter(group => JSON.stringify(group).indexOf(luminaries.luminaries.value) >= 0)
          setLuminariesList(group[0][luminaries.luminaries.value])
        }
    }

    if ((validated !== prevValidated) && !changeValidated) {
      setChangeValidated(true)

    } else if ((validated === prevValidated) && changeValidated) {
      setChangeValidated(false)
      checkValidatedAllField(tempFieldForm)
    }
  }, [classRoom, luminaries, timerCountDown, validated])


  //catch value components
  const isValidatedFieldClassRoom = async (obj: any) => {
    await setClassRoom(obj)
  }
  const isValidatedFieldLuminaries = async (obj: any) => {
    await setLuminaries(obj)
  }
  const isValidatedFieldTimer = async (obj: any) => {
    await setTimerCountDown(obj)
  }

  const acceptConfigCounter = async () => {
    setValidated((validated + 1))
  }

  const checkValidatedAllField = async (tempField) => {

    //check validate
    const validateField = Object.entries(tempField).map(field => { return field[1].validated })

    //check fields that are true     
    var quantityFieldTrue = 0
    validateField.map(field => {
      quantityFieldTrue = field ? (quantityFieldTrue + 1) : quantityFieldTrue
    })

    if (validateField.length === quantityFieldTrue) {
      let classRoom = classRoomsAPIList.filter(classRoomTemp => classRoomTemp.value == fieldsForm.classRoom.value)[0]

      let luminary = luminariesAPIList.filter(luminaryTemp => luminaryTemp.value == fieldsForm.luminaries.value)[0]
      tempField = { classRoom, luminary, ...timerCountDown, deviceBluetoothConnect }
      navigation.navigate(SCREEN_APP.COUNTER_BLUETOOTH_SCREEN, tempField)
    }
    else
      console.log('AT LEAST ONE FIELD IS FALSE', validateField, quantityFieldTrue)
  }

  return ({
    visible,
    visibleLoader,
    titleToast,
    messageToast,
    typeToast,
    validated,
    luminariesList,
    luminariesAPIList,
    classRoomsAPIList,
    isValidatedFieldClassRoom,
    isValidatedFieldLuminaries,
    isValidatedFieldTimer,
    acceptConfigCounter
  }
  )
}
