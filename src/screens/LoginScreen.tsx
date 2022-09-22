import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

//validation
import { KEY_RULE_CONSTANT } from '../constants/validator/KeyRuleConstant';
//config keyboard
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//constants
import { LOGIN_SCREEN, SPLASH_SCREEN} from '../constants/GlobalConstant';
//components
import { LoaderGeneric } from '../components/generic/LoaderGeneric';
import { TextInputGeneric } from '../components/generic/TextInputGeneric';
import { ToastGeneric } from '../components/generic/ToastGeneric';
import { useLoginScreen } from '../hooks/useLoginScreen';

interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation }: Props) => {
    //useContextCustom
    const {
        visibleLoader,
        titleToast,
        messageToast,
        typeToast,
        visibleToast,
        validated,
        isValidatedEmail,
        isValidatedPassword,
        enableLogin,
        enableRegisterScreen,
        enableFortgotPasswordScreen
    }=useLoginScreen(navigation)
    //render views
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            viewIsInsideTabBar={true}
            enableAutomaticScroll={true}
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
                </View>
                <View key='idLoginForm' style={styles.form}>

                    <Image
                        resizeMode='contain'
                        style={styles.imageLogo}
                        source={SPLASH_SCREEN.PATH_SPLASH}
                    />
                    <TextInputGeneric
                        id='email'
                        validated={validated}
                        textLabel={LOGIN_SCREEN.EMAIL}
                        placeHolder={LOGIN_SCREEN.EMAIL_WATERMARK}
                        labelRule='Correo Electrónico'
                        rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.EMAIL]}
                        isValidatedField={isValidatedEmail}
                    />
                    <TextInputGeneric
                        id='password'
                        validated={validated}
                        textLabel={LOGIN_SCREEN.PASSWORD}
                        placeHolder={LOGIN_SCREEN.PASSWORD_WATERMARK}
                        labelRule='Contraseña'
                        rules={[KEY_RULE_CONSTANT.REQUIRED, KEY_RULE_CONSTANT.PASSWORD, KEY_RULE_CONSTANT.MIN_LENGTH, KEY_RULE_CONSTANT.MAX_LENGTH]}
                        isValidatedField={isValidatedPassword}
                        minLength={6}
                        maxLength={8}
                        secure={true}
                    />
                    <View key='fieldLogin' style={styles.buttonField}>
                        <Button onPress={enableLogin} title={LOGIN_SCREEN.BUTTON_NAME} color='#7f1ae5' />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View key='fieldRegister' style={styles.register}>
                            <TouchableOpacity onPress={enableRegisterScreen}>
                                <Text style={styles.textRegister}>{LOGIN_SCREEN.REGISTER}</Text>
                            </TouchableOpacity>
                        </View>
                        <View key='fieldForgotPassword' style={styles.forgotPassword}>
                            <TouchableOpacity onPress={enableFortgotPasswordScreen}>
                                <Text style={styles.textRegister}>{LOGIN_SCREEN.FORGOT_PASSWORD}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    space: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
    },
    form: {
        flex: 5,
        backgroundColor: 'white'
    },
    imageLogo: {
        alignSelf: 'center',
        flex: 4,
    },
    field: {
        flex: 2,
    },
    buttonField: {
        flex: 1,
        justifyContent: 'center',
    },
    register: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPassword: {
        flex: 0.5,
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
        //textDecorationLine: 'underline'
    },
    textError: {
        color: 'red',
        fontSize: 10,
        marginLeft: 5
    }
})