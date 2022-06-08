
import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Button, Modal, StyleSheet } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker';
import { NUMBER_FIRST_TIME, NUMBER_SECOND_TIME, SELECT_NUMBER } from '../../constants/GlobalConstant'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import MESSAGES_CONSTANT from '../../constants/validator/MessagesConstant';
import RULES_CONSTANT from '../../constants/validator/RulesConstant';
import { useValidation } from 'react-native-form-validator';

interface Props {
  id: string;
  validated: number;
  textLabel: string,
  labelRule: string;
  rules: Array<string>;
  secure?: boolean;
  data: Array<any>;
  defaultValue: string;
  placeHolder: string;
  isValidatedField(obj: any): void;
}

export const TimerGeneric = (props: Props) => {
  const [id, setId] = useState(props.id)
  const [focus, setFocus] = useState(false);
  const [validated, setvalidated] = useState(0)
  const [idTextGeneric, setIdTextGeneric] = useState('')
  const prevIdTextGeneric = useRef({ idTextGeneric, setIdTextGeneric }).current;

  const [tenMinute, setTenMinute] = useState('0')
  const [unitMinute, setUnitMinute] = useState('0')
  const [tenSecond, setTenSecond] = useState('0')
  const [unitSecond, setUnitSecond] = useState('0')

  //rule array adding default value: 'idTextGeneric'
  const [rules, setRules] = useState(props.rules)

  //assemble the object rulesCustomer based on the constants
  const getInitialRulesCustomer = () => {
    const finalArray = [];
    rules.map(ruleCustomer => {
      Object.keys(RULES_CONSTANT).map(key => [key, RULES_CONSTANT[key]]).map(ruleGeneric => {
        if (ruleCustomer === ruleGeneric[0])
          finalArray.push(ruleGeneric)
      })
    })
    return Object.fromEntries(new Map(finalArray))
  }

  const [rulesCustomer, setRulesCustomer] = useState(() => {
    const initialRulesCustomer = getInitialRulesCustomer();
    return initialRulesCustomer;
  })

  //assemble the object rulesCustomer based on the constants
  const getInitialMessagesCustomer = () => {
    const finalArray = [];
    rules.map(ruleCustomer => {
      Object.keys(MESSAGES_CONSTANT.es).map(key => [key, MESSAGES_CONSTANT.es[key]]).map(ruleGeneric => {
        if (ruleCustomer === ruleGeneric[0])
          finalArray.push(ruleGeneric)
      })
    })
    return { es: Object.fromEntries(new Map(finalArray)) }
  }

  const [messagesCustomer, setMessagesCustomer] = useState(() => {
    const initialMessagesCustomer = getInitialMessagesCustomer();
    return initialMessagesCustomer;
  })

  //assemble the object validateCustomer based on the constants
  const getInitialValidateField = () => {
    const finalArray = [];
    rules.map(ruleCustomer => {
      finalArray.push([ruleCustomer, true])
    })
    return Object.fromEntries(new Map(finalArray))
  }

  const [validateField, setValidateField] = useState(() => {
    const initialValidateField = getInitialValidateField()
    return initialValidateField
  })

  const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
    useValidation({
      state: { idTextGeneric },
      deviceLocale: 'es',
      labels: { idTextGeneric: props.labelRule },
      rules: rulesCustomer,
      messages: messagesCustomer
    });

  const onFocus = (key: string) => setFocus(key);

  const onBlur = () => setFocus(null);

  useEffect(() => {
    if (props.validated !== validated) {
      setvalidated(props.validated)
      validateForm()
    }
    if (idTextGeneric !== prevIdTextGeneric.idTextGeneric) {
      validateForm()
    }
    return () => {
      prevIdTextGeneric.idTextGeneric = idTextGeneric
      prevIdTextGeneric.setIdTextGeneric = setIdTextGeneric
    }
  }, [props.validated, idTextGeneric])

  const modifyFormatTime = (timeWithoutFormat:string)=>{
    timeWithoutFormat=timeWithoutFormat===''?'0000':timeWithoutFormat
    return JSON.stringify({
      minute:timeWithoutFormat.slice(0,2),
      second:timeWithoutFormat.slice(2)
    })
  }

  const validateForm = () => {
    if (props.validated===0) {
      props.isValidatedField(JSON.parse(`{"${id}":{"validated":"false","value":${modifyFormatTime(idTextGeneric)}}}`))
    }
    else {
      //validate form
      const validateForm = validate({ idTextGeneric: validateField });
      //inform parent of update
      props.isValidatedField(JSON.parse(`{"${id}":{"validated":${validateForm},"value":${modifyFormatTime(idTextGeneric)}}}`))
    }
  }

  const onChange = (id: string, value: string) => {
    const tempTime = [tenMinute, unitMinute, tenSecond, unitSecond]
    if (id === 'idTenMinute') {
      setTenMinute(value)
      tempTime[0] = value===''?'0':value
    }
    if (id === 'idUnitMinute') {
      setUnitMinute(value)
      tempTime[1] = value===''?'0':value
    }
    if (id === 'idTenSecond') {
      setTenSecond(value)
      tempTime[2] = value===''?'0':value
    }
    if (id === 'idUnitSecond') {
      setUnitSecond(value)
      tempTime[3] = value===''?'0':value
    }

    if (tempTime.join('') === '' || tempTime.join('') === '0' || tempTime.join('') === '00'|| tempTime.join('') === '000'|| tempTime.join('') === '0000'){
      setIdTextGeneric('')
    }   
    else{
      setIdTextGeneric(tempTime.join(''))
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'column', flex: 4 }}>
        <Text key='idMinutes' style={styles.textField}>Minutos</Text>
        <View key='minutes' style={styles.minutes}>
          <View style={{ flex: 1 }}>
            <RNPickerSelect
              placeholder={{ label: SELECT_NUMBER.DEFAULT, value: '', key: 'gray', color: 'gray' }}
              style={{ inputAndroid: { ...stylePicker.inputAndroid, borderWidth: focus === 'idTenMinute' ? 3 : 1 } }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => onChange('idTenMinute', value)}
              items={NUMBER_FIRST_TIME}
              value={tenMinute}
              pickerProps={{
                onFocus: () => onFocus('idTenMinute'),
                onBlur: () => onBlur()
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <RNPickerSelect
              placeholder={{ label: SELECT_NUMBER.DEFAULT, value: '', key: 'gray', color: 'gray' }}
              style={{ flex: 1, inputAndroid: { ...stylePicker.inputAndroid, borderWidth: focus === 'idUnitMinute' ? 3 : 1 } }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => onChange('idUnitMinute', value)}
              items={NUMBER_SECOND_TIME}
              value={unitMinute}
              pickerProps={{
                onFocus: () => onFocus('idUnitMinute'),
                onBlur: () => onBlur()
              }}
            />
          </View>
        </View>
        <Text key='idField' style={styles.textField}>Segundos</Text>
        <View style={styles.seconds}>
          <View style={{ flex: 1 }}>
            <RNPickerSelect
              placeholder={{ label: SELECT_NUMBER.DEFAULT, value: '', key: 'gray', color: 'gray' }}
              style={{ flex: 1, inputAndroid: { ...stylePicker.inputAndroid, borderWidth: focus === 'idTenSecond' ? 3 : 1 } }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => onChange('idTenSecond', value)}
              items={NUMBER_FIRST_TIME}
              value={tenSecond}
              pickerProps={{
                onFocus: () => onFocus('idTenSecond'),
                onBlur: () => onBlur()
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <RNPickerSelect
              placeholder={{ label: SELECT_NUMBER.DEFAULT, value: '', key: 'gray', color: 'gray' }}
              style={{ flex: 1, inputAndroid: { ...stylePicker.inputAndroid, borderWidth: focus === 'idUnitSecond' ? 3 : 1 } }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => onChange('idUnitSecond', value)}
              items={NUMBER_SECOND_TIME}
              value={unitSecond}
              pickerProps={{
                onFocus: () => onFocus('idUnitSecond'),
                onBlur: () => onBlur()
              }}
            />
          </View>
        </View>
        <View style={styles.fullTime}>
          <Text style={[styles.textTime,{fontSize:isFieldInError('idTextGeneric')?30:50}]}>{tenMinute === '' ? '0' : tenMinute}{unitMinute === '' ? '0' : unitMinute}:{tenSecond === '' ? '0' : tenSecond}{unitSecond === '' ? '0' : unitSecond}</Text>
          {isFieldInError('idTextGeneric') &&
                getErrorsInField('idTextGeneric').map((errorMessage, index) => (
                    <Text key={index} style={styles.textError}>{errorMessage}</Text>
                ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {
    margin: 5,
  },
  field: {
    flex: 1,
  },
  textRegister: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  textError: {
    color: 'red',
    fontSize: 10,
    marginLeft: 5
  },
  minutes: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 5,
  },
  seconds: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 5,
  },
  fullTime: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5
  },
  textTime: {
    fontSize: 30
  }
})

const stylePicker = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#7f1ae5',
    borderRadius: 4,
    color: 'black',
    margin: 5,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})