import React, { useState, useRef, useEffect } from 'react'

//navigation
import { StackScreenProps } from '@react-navigation/stack';



const luminariesExample = {
    LAMP1: { l1: true, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false },
    LAMP2: { l1: false, l2: true, l3: false, l4: false, l5: false, l6: false, l7: false },
    LAMP3: { l1: false, l2: false, l3: true, l4: false, l5: false, l6: false, l7: false },
    LAMP4: { l1: false, l2: false, l3: false, l4: true, l5: false, l6: false, l7: false },
    LAMP5: { l1: false, l2: false, l3: false, l4: false, l5: true, l6: false, l7: false },
    LAMP6: { l1: false, l2: false, l3: false, l4: false, l5: false, l6: true, l7: false },
    LAMP7: { l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: true },

    GROUP1: { l1: true, l2: false, l3: false, l4: true, l5: false, l6: false, l7: true },
    GROUP2: { l1: true, l2: false, l3: true, l4: true, l5: true, l6: false, l7: true },
    GROUP3: { l1: true, l2: true, l3: false, l4: true, l5: false, l6: true, l7: true },
    GROUP4: { l1: true, l2: true, l3: false, l4: false, l5: false, l6: true, l7: true },
    GROUP5: { l1: true, l2: false, l3: true, l4: false, l5: true, l6: false, l7: true },

    ALL_LAMPS: { l1: true, l2: true, l3: true, l4: true, l5: true, l6: true, l7: true },
    RESET_LAMPS: { l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false },
}

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
    //const toast
    const [titleToast, setTitleToast] = useState('')
    const [messageToast, setMessageToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    //validated fields
    const [validated, setValidated] = useState(0)
    const [changeValidated,setChangeValidated]=useState(false)
    const prevValidated = usePrevious(validated)
    //values luminaries list
    const [luminariesList, setLuminariesList] = useState({ l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false })
    //values components
    const [classRoom, setClassRoom] = useState('');
    const [luminaries, setLuminaries] = useState('')
    const prevLuminaries = usePrevious(luminaries)
    const [timerCountDown, setTimerCountDown] = useState('')
    //values field form
    const [fieldsForm, setFieldsForm] = useState({
        classRoom: { validated: false, value: '' },
        luminaries: { validated: false, value: '' },
        timerCountDown: { validated: false, value: '' }
    })

    const getValueFieldsForm=async(fieldsForm)=>{
        await setFieldsForm(fieldsForm)
    }
    
    useEffect(() => {
        //call service luminaries
        const apiLuminaries = luminariesExample


        const tempFieldForm = { ...fieldsForm, ...classRoom, ...luminaries, ...timerCountDown }
        //setFieldsForm(tempFieldForm)
        console.log('\n\nuseEffect tempField',tempFieldForm)
        getValueFieldsForm(tempFieldForm)
        console.log('validated', validated, prevValidated, fieldsForm)

        if (luminaries !== prevLuminaries) {
            if (luminaries.luminaries)
                setLuminariesList(apiLuminaries[luminaries.luminaries.value])
        }

        if ((validated !== prevValidated) && !changeValidated) {
            console.log('change validated', fieldsForm)
            setChangeValidated(true)
            
        }else if((validated === prevValidated) && changeValidated){
            setChangeValidated(false)
            checkValidatedAllField(tempFieldForm)
            console.log('accept')
        }

        console.log('end\n\n')
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

        console.log('checkValidated', tempField)
        //check validate
        const validateField = Object.entries(tempField).map(field => { return field[1].validated })

        //check fields that are true     
        var quantityFieldTrue = 0
        validateField.map(field => {
            quantityFieldTrue = field ? (quantityFieldTrue + 1) : quantityFieldTrue
        })

        if (validateField.length === quantityFieldTrue) {
            console.log('ALL FIELDS ARE TRUE', validateField, quantityFieldTrue)
            navigation.navigate('CounterScreen', tempField)
        }
        else
            console.log('AT LEAST ONE FIELD IS FALSE', validateField, quantityFieldTrue)
    }

    return ({
        visible,
        titleToast,
        messageToast,
        typeToast,
        validated,
        luminariesList,
        isValidatedFieldClassRoom,
        isValidatedFieldLuminaries,
        isValidatedFieldTimer,
        acceptConfigCounter
    }
    )
}

/*
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet
} from 'react-native';

//constants
import { CONFIG_COUNTER_SCREEN, SELECT_OPTION, CLASS_ROOMS, LUMINARY } from '../constants/GlobalConstant';
import { KEY_RULE_CONSTANT } from '../constants/validator/KeyRuleConstant';

//components
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';
import { PickerGeneric } from '../components/generic/PickerGeneric';
import { TimerGeneric } from '../components/generic/TimerGeneric';
import { Luminary } from '../components/generic/Luminary';

//navigation
import { StackScreenProps } from '@react-navigation/stack';

//config keyboard

const luminariesExample = {
  LAMP1: { l1: true, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false },
  LAMP2: { l1: false, l2: true, l3: false, l4: false, l5: false, l6: false, l7: false },
  LAMP3: { l1: false, l2: false, l3: true, l4: false, l5: false, l6: false, l7: false },
  LAMP4: { l1: false, l2: false, l3: false, l4: true, l5: false, l6: false, l7: false },
  LAMP5: { l1: false, l2: false, l3: false, l4: false, l5: true, l6: false, l7: false },
  LAMP6: { l1: false, l2: false, l3: false, l4: false, l5: false, l6: true, l7: false },
  LAMP7: { l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: true },

  GROUP1: { l1: true, l2: false, l3: false, l4: true, l5: false, l6: false, l7: true },
  GROUP2: { l1: true, l2: false, l3: true, l4: true, l5: true, l6: false, l7: true },
  GROUP3: { l1: true, l2: true, l3: false, l4: true, l5: false, l6: true, l7: true },
  GROUP4: { l1: true, l2: true, l3: false, l4: false, l5: false, l6: true, l7: true },
  GROUP5: { l1: true, l2: false, l3: true, l4: false, l5: true, l6: false, l7: true },

  ALL_LAMPS: { l1: true, l2: true, l3: true, l4: true, l5: true, l6: true, l7: true },
  RESET_LAMPS: { l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false },
}

interface Props extends StackScreenProps<any, any> {

}

export const ConfigCounterScreen = ({ navigation }: Props) => {

  const [validated, setValidated] = useState(0)
  const [visible, setVisible] = useState(false)
  const [titleToast, setTitleToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [typeToast, setTypeToast] = useState('')
  const [fieldsForm, setFieldsForm] = useState({
    classRoom: { validated: false, value: '' },
    luminaries: { validated: false, value: '' },
    timerCountDown: { validated: false, value: '' }
  })

  const [classRoom, setClassRoom] = useState('');
  const [luminaries, setLuminaries] = useState('')
  const [timerCountDown, setTimerCountDown] = useState('')

  const prevClassRoom = useRef({ classRoom, setClassRoom })
  const prevLuminaries = useRef({ luminaries, setLuminaries })
  const prevTimerCountDown = useRef({ timerCountDown, setTimerCountDown })
  const prevValidated = useRef({validated,setValidated})
  const prevFieldsForm = useRef({ fieldsForm, setFieldsForm })
  const [luminariesList, setLuminariesList] = useState({ l1: false, l2: false, l3: false, l4: false, l5: false, l6: false, l7: false })

  const [deleteThisField, setDeleteThisField] = useState(0)

  const isValidatedFieldClassRoom = (obj: any) => {
    console.log('classroom',obj)
    setClassRoom(obj)
  }
  const isValidatedFieldLuminaries = (obj: any) => {
    console.log('luminaries',obj)
    setLuminaries(obj)
  }
  const isValidatedFieldTimer = (obj: any) => {
    console.log('timer',obj)
    setTimerCountDown(obj)
  }

  const assemblerObjectForm=()=>{
    console.log('fajhsdjhfgajhsdf',classRoom,luminaries,timerCountDown)
    let tempFieldForm=fieldsForm
    tempFieldForm={...tempFieldForm,...classRoom}
    tempFieldForm={...tempFieldForm,...luminaries}
    tempFieldForm={...tempFieldForm,...timerCountDown}
    return tempFieldForm
  }

  const enableConfigCounter = () => {
    validateForm()

    setVisible(true)

    //Toast
    setTypeToast(CONFIG_COUNTER_SCREEN.TOAST_SUCCESS)
    setTitleToast(CONFIG_COUNTER_SCREEN.TOAST_REGISTER.TITLE)
    setMessageToast(CONFIG_COUNTER_SCREEN.TOAST_REGISTER.MESSAGE)

    //restore value visible
    setTimeout(() => {
      setVisible(false)

      checkValidatedAllField(assemblerObjectForm())
    }, 3000)
  }
  const validateForm = () => {
    setValidated((validated + 1))
  }

  const setActivatedLuminaries = (luminaries) => {
    setLuminariesList(luminaries)
  }

  const checkValidatedAllField = (tempFieldForm:any) => {

    console.log('checkValidated',tempFieldForm)
    //check validate
    const validateField = Object.entries(tempFieldForm).map(field => { return field[1].validated })

    //check fields that are true     
    var quantityFieldTrue = 0
    validateField.map(field => {
      quantityFieldTrue = field ? (quantityFieldTrue + 1) : quantityFieldTrue
    })

    if (validateField.length === quantityFieldTrue) {
      console.log('ALL FIELDS ARE TRUE', validateField, quantityFieldTrue)
      navigation.navigate('CounterScreen', tempFieldForm)
    }
    else
      console.log('AT LEAST ONE FIELD IS FALSE', validateField, quantityFieldTrue)
  }

  useEffect(() => {

    setDeleteThisField((deleteThisField+1))
    console.log('\nSTART\n',deleteThisField)
    if (prevFieldsForm.fieldsForm !== fieldsForm) {
      // console.log('\nvalidation use effect config counter screen\n', fieldsForm)
      // console.log('\nvalidation use effect config counter screen PREV FIELDS FORM\n', prevFieldsForm.current)
      // setActivatedLuminaries(luminariesExample[fieldsForm.luminaries.value])
    }

    let tempFieldForm=fieldsForm
    if (prevClassRoom.classRoom !== classRoom) {
      console.log('USEFFECT classRoom ', classRoom)
      tempFieldForm={...tempFieldForm,...classRoom}
    }

    if (prevLuminaries.luminaries !== luminaries) {
      console.log('USEFFECT luminaries', luminaries)
      if (luminaries.luminaries) {
        setActivatedLuminaries(luminariesExample[luminaries.luminaries.value])
        tempFieldForm={...tempFieldForm,...luminaries}
      }
    }

    if (prevTimerCountDown !== timerCountDown) {
      console.log('USEFFECT timerCountDown ', timerCountDown)
      tempFieldForm={...tempFieldForm,...timerCountDown}
    }

    if(prevValidated !== validated){
      console.log('FIELD VALIDATED CHANGE')
      setFieldsForm(tempFieldForm)
    }

    console.log(tempFieldForm)
    setFieldsForm(tempFieldForm)
    console.log('\n END\n')
    return () => {
      prevFieldsForm.fieldsForm = fieldsForm
      prevClassRoom.classRoom = classRoom
      prevLuminaries.luminaries = luminaries
      prevTimerCountDown.timerCountDown = timerCountDown
      prevValidated.validated=validated
    }

  }, [classRoom, luminaries, timerCountDown,validated])

  return (
    <View style={styles.container}>
      <View style={styles.space}>
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
      <View style={styles.form}>
        <View style={styles.mainTitle}>
          <Text style={styles.title}>CONFIGURAR CRONÓMETRO</Text>
        </View>
        <View style={styles.classRooms}>
          <PickerGeneric
            id='classRoom'
            placeHolder={SELECT_OPTION.DEFAULT}
            validated={validated}
            textLabel='Aula'
            data={CLASS_ROOMS}
            defaultValue={SELECT_OPTION.DEFAULT}
            labelRule='Aula'
            rules={[KEY_RULE_CONSTANT.REQUIRED]}
            isValidatedField={isValidatedFieldClassRoom}
          />
        </View>
        <View style={styles.luminaries}>
          <PickerGeneric
            id='luminaries'
            placeHolder={SELECT_OPTION.DEFAULT}
            validated={validated}
            textLabel='Luminarias'
            data={LUMINARY}
            defaultValue={SELECT_OPTION.DEFAULT}
            labelRule='Luminarias'
            rules={[KEY_RULE_CONSTANT.REQUIRED]}
            isValidatedField={isValidatedFieldLuminaries}
          />
        </View>
        <View style={styles.luminary}>
          <Luminary
            stateLuminaries={luminariesList}
          />
        </View>
        <View style={styles.timerGeneric}>
          <TimerGeneric
            id='timerCountDown'
            placeHolder={SELECT_OPTION.DEFAULT}
            validated={validated}
            textLabel={CONFIG_COUNTER_SCREEN.ROLE}
            data={CLASS_ROOMS}
            defaultValue={SELECT_OPTION.DEFAULT}
            labelRule='minutos y/o segundos'
            rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.TIMER]}
            isValidatedField={isValidatedFieldTimer}
          />
        </View>
        <View style={styles.buttonField}>
          <Button style={styles.button} onPress={enableConfigCounter} title={CONFIG_COUNTER_SCREEN.BUTTON_NAME} color='#7f1ae5' />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  space: {
    //flex:1,
    height: 1,
    backgroundColor: 'white'
  },
  form: {
    flex: 1,
    backgroundColor: 'white'
  },
  mainTitle: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  mainForm: {
    flex: 6,
    backgroundColor: 'white'
  },
  classRooms: {
    flex: 1.2,
    backgroundColor: 'white'
  },
  luminaries: {
    flex: 1.2,
    backgroundColor: 'white',
  },
  luminary: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  timerGeneric: {
    flex: 3,
    backgroundColor: 'white'
  },
  buttonField: {
    backgroundColor: 'white',
  },
})


*/
