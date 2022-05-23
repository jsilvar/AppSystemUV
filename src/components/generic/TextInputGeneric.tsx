import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import uuid from 'react-native-uuid';

//validation
import { useValidation } from 'react-native-form-validator';
import MESSAGES_CONSTANT from '../../constants/validator/MessagesConstant';
import RULES_CONSTANT from '../../constants/validator/RulesConstant';
import LABELS_CONSTANT from '../../constants/validator/LabelsConstant';

import { LOGIN_SCREEN, SPLASH_SCREEN } from '../../constants/GlobalConstant';
import { useLinkProps } from '@react-navigation/native';

interface Props {
    id: string;
    validated: number;
    textLabel: string,
    labelRule: string;
    rules: Array<string>;
    placeHolder: string;
    secure?: boolean;
    isValidatedField(obj: any): void;
}


export const TextInputGeneric = (props: Props) => {

    const [id, setId] = useState(props.id)
    const [focus, setFocus] = useState(false);
    const [validated, setvalidated] = useState(0)
    const [idTextGeneric, setIdTextGeneric] = useState('')
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
            console.log('change validated')
            setvalidated(props.validated)
            validateForm()
        }
        if (idTextGeneric !== prevIdTextGeneric.idTextGeneric) {
            console.log('change idTextGeneric')
            validateForm()
        }
        return () => {
            prevIdTextGeneric.idTextGeneric = idTextGeneric
            prevIdTextGeneric.setIdTextGeneric = setIdTextGeneric
        }
    }, [props.validated, idTextGeneric])


    const validateForm = () => {
        if (!props.validated) {
            props.isValidatedField(JSON.parse(`{"${id}":{"validated":"false,"value":"${idTextGeneric}"}}`))
        }
        else {
            //validate form
            const validateForm = validate({ idTextGeneric: validateField });
            //inform parent of update
            props.isValidatedField(JSON.parse(`{"${id}":{"validated":${validateForm},"value":"${idTextGeneric}"}}`))
        }
    }

    const onChangeText = (newValue: any) => {
        setIdTextGeneric(newValue)
    }

    return (
        <View key={id} style={styles.field}>
            <Text key='idField' style={styles.textField}>{props.textLabel}</Text>
            <TextInput
                key={id}
                onFocus={() => onFocus(id)}
                onBlur={onBlur}
                selectionColor='#7f1ae5'
                style={[styles.textInput, { borderWidth: focus === id ? 3 : 1 }]}
                value={idTextGeneric}
                placeholder={props.placeHolder}
                onChangeText={onChangeText}
                secureTextEntry={props.secure ? true : false}
            />
            {isFieldInError('idTextGeneric') &&
                getErrorsInField('idTextGeneric').map((errorMessage, index) => (
                    <Text key={index} style={styles.textError}>{errorMessage}</Text>
                ))}
        </View>
    )
}


const styles = StyleSheet.create({
    field: {
        flex: 2,
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