import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    useWindowDimensions,
    StyleSheet
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import { useValidation } from 'react-native-form-validator';
import MESSAGES_CONSTANT from '../../constants/validator/MessagesConstant';
import RULES_CONSTANT from '../../constants/validator/RulesConstant';
import LABELS_CONSTANT from '../../constants/validator/LabelsConstant';

interface Props {
    id: string;
    validated: number;
    textLabel: string,
    labelRule: string;
    rules: Array<string>;
    secure?: boolean;
    data: Array<String>;
    defaultValue: string;
    isValidatedField(obj: any): void;
}

export const SelectGeneric = (props: Props) => {

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
        if (!props.validated) return
        //validate form
        const validateForm = validate({ idTextGeneric: validateField });
        //inform parent of update
        props.isValidatedField(JSON.parse(`{"validated":${validateForm},"value":"${idTextGeneric}"}`))
    }

    return (
        <View key={id} style={styles.field}>
            <Text key='idField' style={styles.textField}>{textLabel}</Text>
            <SelectDropdown
                data={props.data}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setIdTextGeneric(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                defaultButtonText={props.defaultValue}
                buttonStyle={styles.dropdown4BtnStyle}
                buttonTextStyle={styles.dropdown4BtnTxtStyle}
                // renderDropdownIcon={isOpened => {
                //   return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                // }}
                //dropdownIconPosition={'left'}
                dropdownStyle={styles.dropdown4DropdownStyle}
                rowStyle={styles.dropdown4RowStyle}
                rowTextStyle={styles.dropdown4RowTxtStyle}
            />
            {isFieldInError('idTextGeneric') &&
                getErrorsInField('idTextGeneric').map((errorMessage, index) => (
                    <Text key={index} style={styles.textError}>{errorMessage}</Text>
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: '100%', height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    dropdown4BtnStyle: {
        width: '98%',
        height: 35,
        backgroundColor: '#FFF',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#7f1ae5',
        margin: 5,
        fontSize: 10
    },
    dropdown4BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 15, padding: 0 },
    dropdown4DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown4RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown4RowTxtStyle: { color: '#444', textAlign: 'left' },
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
        margin: 5,
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
});

