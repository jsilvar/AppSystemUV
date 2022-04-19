import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

//config styles bootstrap
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
//config keyboard
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//constants
import { LOGIN_SCREEN, SPLASH_SCREEN } from '../constants/GlobalConstant';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

interface Props extends StackScreenProps<any,any>{

};

export const LoginScreen = ({navigation}:Props) => {

    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('')
    const [focus, setFocus] = useState(false);

    const onFocus = (id: string) => {
        console.log('onFocus',id)
        setFocus(id)
    }

    const onBlur = () => {
        setFocus(null)
    }

    const enableRegisterScreen=()=>{
        navigation.navigate('RegisterScreen')
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            viewIsInsideTabBar={true}
            enableAutomaticScroll={true}
        >
            <View style={styles.container}>
                <View style={styles.space}></View>
                <View style={styles.form}>
                    <Image
                        resizeMode='contain'
                        style={styles.imageLogo}
                        source={SPLASH_SCREEN.PATH_SPLASH}
                    />
                    <View style={styles.field}>
                        <Text style={styles.textField}>{LOGIN_SCREEN.EMAIL}</Text>
                        <TextInput
                            onFocus={() => onFocus('idEmail')}
                            onBlur={onBlur}
                            selectionColor='#7f1ae5'
                            style={[styles.textInput, { borderWidth: focus === 'idEmail' ? 3 : 1}]}
                            value={email}
                            placeholder={LOGIN_SCREEN.EMAIL_WATERMARK}
                            onChangeText={onChangeEmail}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.textField}>{LOGIN_SCREEN.PASSWORD}</Text>
                        <TextInput
                            onFocus={() => onFocus('idPassword')}
                            onBlur={onBlur}
                            style={[styles.textInput, { borderWidth: focus === 'idPassword' ? 3 : 1}]}
                            selectionColor='#7f1ae5'
                            value={password}
                            placeholder={LOGIN_SCREEN.PASSWORD_WATERMARK}
                            onChangeText={onChangePassword}
                        />
                    </View>
                    <View style={styles.buttonField}>
                        <Button title={LOGIN_SCREEN.BUTTON_NAME} color='#7f1ae5' />
                    </View>
                    <View style={styles.register}>
                        <TouchableOpacity onPress={enableRegisterScreen}>
                            <Text style={styles.textRegister}>{LOGIN_SCREEN.REGISTER}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.space}></View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    space: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    form: {
        flex: 6,
        backgroundColor: 'white'
    },
    imageLogo: {
        alignSelf: 'center',
        flex: 3,
    },
    field: {
        flex: 2,
    },
    buttonField: {
        flex: 1,
        justifyContent: 'center',
    },
    register: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    }
})