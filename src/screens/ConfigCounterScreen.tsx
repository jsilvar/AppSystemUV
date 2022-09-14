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
//hook owner
import { useConfigCounterScreen } from '../hooks/useConfigCounterScreen';


interface Props extends StackScreenProps<any, any> {

}

export const ConfigCounterScreen = ({ navigation }: Props) => {

  const {
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
  }=useConfigCounterScreen(navigation)


  return (
    <View style={styles.container}>
      <View style={styles.space}>
        <LoaderGeneric
          visible={visibleLoader}
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
          <Text style={styles.title}>{CONFIG_COUNTER_SCREEN.TITLE}</Text>
        </View>
        <View style={styles.classRooms}>
          <PickerGeneric
            id='classRoom'
            placeHolder={SELECT_OPTION.DEFAULT}
            validated={validated}
            textLabel='Aula'
            data={classRoomsAPIList}
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
            data={luminariesAPIList}
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
          <Button style={styles.button} onPress={acceptConfigCounter} title={CONFIG_COUNTER_SCREEN.BUTTON_NAME} color='#7f1ae5' />
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
