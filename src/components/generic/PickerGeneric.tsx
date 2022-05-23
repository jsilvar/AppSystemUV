import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

import { useValidation } from 'react-native-form-validator';
import MESSAGES_CONSTANT from '../../constants/validator/MessagesConstant';
import RULES_CONSTANT from '../../constants/validator/RulesConstant';
import LABELS_CONSTANT from '../../constants/validator/LabelsConstant';

const selectedItem = {
    title: 'Selected item title',
    description: 'Secondary long descriptive text ...',
};

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

export const PickerGeneric = (props: Props) => {

    const [id, setId] = useState(props.id)
    const [focus, setFocus] = useState(false);
    const [validated, setvalidated] = useState(0)
    const [idTextGeneric, setIdTextGeneric] = useState('')
    const [textLabel, setTextLabel] = useState(props.textLabel)
    const prevIdTextGeneric = useRef({ idTextGeneric, setIdTextGeneric }).current;

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


    const validateForm = () => {
        if (props.validated===0) {
            props.isValidatedField(JSON.parse(`{"${id}":{"validated":false,"value":"${idTextGeneric}"}}`))
        } else {
            //validate form
            const validateForm = validate({ idTextGeneric: validateField });
            //inform parent of update
            props.isValidatedField(JSON.parse(`{"${id}":{"validated":${validateForm},"value":"${idTextGeneric}"}}`))
        }
    }

    return (
        <View key={id} style={styles.field}>
            <Text key='idField' style={styles.textField}>{textLabel}</Text>
            <RNPickerSelect
                placeholder={{ label: props.placeHolder, value: '', key: 'gray', color: 'gray' }}
                style={{ inputAndroid: { ...stylePicker.inputAndroid, borderWidth: focus === id ? 3 : 1 } }}
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => setIdTextGeneric(value)}
                items={props.data}
                value={idTextGeneric}
                pickerProps={{
                    onFocus: () => onFocus(id),
                    onBlur: () => onBlur()
                }}
            />
            {isFieldInError('idTextGeneric') &&
                getErrorsInField('idTextGeneric').map((errorMessage, index) => (
                    <Text key={index} style={styles.textError}>{errorMessage}</Text>
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    textField: {
        margin: 5,
    },
    field: {
        flex: 2,
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