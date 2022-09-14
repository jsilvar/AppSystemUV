export const GLOBAL_CONSTANT = {
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_REGISTER:{
        TITLE:'¡Registro exitoso!',
        MESSAGE:'Su registro se procesó exitosamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Registro faliido!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    }
}

export const SCREEN_APP={
    BLUETOOTH_DEVICE_CONNECT_SCREEN:'BluetoothDeviceConnectScreen',
    LOGIN_SCREEN:'LoginScreen',
    REGISTER_SCREEN:'RegisterScreen',
    CHANGE_PASSWORD_SCREEN:'ChangePasswordScreen',
    CONFIG_COUNTER_SCREEN:'ConfigCounterScreen',
    COUNTER_BLUETOOTH_SCREEN:'CounterScreen',
    USER_INFO_GENERAL_SCREEN:'UserInfoGeneralScreen',
    VALIDATE_SCREEN:'ValidatePinScreen'
}

export const SPLASH_SCREEN= {
    PATH_SPLASH:require('../images/splash.png')
};

export const LOGIN_SCREEN = {
    EMAIL: 'CORREO ELECTRÓNICO:',
    PASSWORD: 'CONTRASEÑA:',
    EMAIL_WATERMARK: 'Digite su correo electrónico',
    PASSWORD_WATERMARK: 'Digite su contraseña',
    PATH_LOGO: require('../images/water.jpg'),
    BUTTON_NAME: 'Ingresar',
    REGISTER:'Regístrese aquí',
    FORGOT_PASSWORD:'¿Olvidó su contraseña?',
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_REGISTER:{
        TITLE:'¡Registro exitoso!',
        MESSAGE:'Su registro se procesó exitosamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Registro fallido!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    },
    TOAST_ACCESS_TOKEN_EXPIRED:{
        TITLE:'¡Registro fallido!',
        MESSAGE:'Su sesión ha finalizado.'
    },
    TOAST_BAD_CREDENTIALS:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Credenciales inválidas. Ingrese nuavemente su email y contraseña registrados.'
    },
    TOAST_ACCESS_IS_DENIED:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'No está autorizado para este recurso del backend.'
    },
    TOAST_ROLE_NON_EXISTENT:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Rol no registrado previamente. Contacte su administrador.'
    }
}

export const REGISTER_SCREEN = {
    ID_NUMBER: 'NÚMERO DE IDENTIFICACIÓN:',
    EMAIL: 'CORREO ELECTRÓNICO:',
    FIRST_NAME: 'NOMBRE(S):',
    LAST_NAME: 'APELLIDO(S):',
    PASSWORD: 'CONTRASEÑA:',
    CONFIRM_PASSWORD: 'CONFIRMAR CONTRASEÑA:',
    ROLE: 'ROL:',
    ID_NUMBER_WATERMARK: 'Digite su número de identificación',
    EMAIL_WATERMARK: 'Digite su correo electrónico',
    FIRST_NAME_WATERMARK: 'Digite su(s) nombre(s)',
    LAST_NAME_WATERMARK: 'Digite su(s) apellido(s)',
    PASSWORD_WATERMARK: 'Digite su contraseña',
    CONFIRM_PASSWORD_WATERMARK: 'Digite confirmación de contraseña',
    ROLE_WATERMARK: 'Rol:',
    PATH_LOGO: require('../images/water.jpg'),
    BUTTON_NAME: 'REGISTRAR',
    REGISTER:'Regístrese aquí',
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_REGISTER:{
        TITLE:'¡Registro exitoso!',
        MESSAGE:'Su registro se procesó exitosamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Registro fallido!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    },
    TOAST_BAD_CREDENTIALS:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Credenciales inválidas. Ingrese nuavemente su email y contraseña registrados.'
    },
    TOAST_ACCESS_IS_DENIED:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'No está autorizado para este recurso del backend.'
    },
    TOAST_ROLE_NON_EXISTENT:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Rol no registrado previamente. Contacte su administrador.'
    },
    TOAST_ERROR_SERVER:{
        TITLE:'¡Error interno!',
        MESSAGE:'Error interno en el backend. Contacte su administrador.'
    },
    TOAST_ACCESS_TOKEN_EXPIRED:{
        TITLE:'¡Expiró la sesión!',
        MESSAGE:'Ingrese nuevamente desde el inicio de sesión.'
    },
}

export const BLUETOOTH_DEVICE_CONNECT_SCREEN = {
    ID_NUMBER: 'NÚMERO DE IDENTIFICACIÓN:',
    TITLE:'¿Olvido su contraseña? Ingrese el correo registrado en la plataforma',
    SUBTITLE:'Se confirmó el pin para el correo: ${email}. Digite su contraseña.',
    CELL_COUNT:6,
    EMAIL: 'CORREO ELECTRÓNICO:',
    FIRST_NAME: 'NOMBRE(S):',
    LAST_NAME: 'APELLIDO(S):',
    PASSWORD: 'CONTRASEÑA:',
    CONFIRM_PASSWORD: 'CONFIRMAR CONTRASEÑA:',
    ROLE: 'ROL:',
    ID_NUMBER_WATERMARK: 'Digite su número de identificación',
    EMAIL_WATERMARK: 'Digite su correo electrónico',
    FIRST_NAME_WATERMARK: 'Digite su(s) nombre(s)',
    LAST_NAME_WATERMARK: 'Digite su(s) apellido(s)',
    PASSWORD_WATERMARK: 'Digite su contraseña',
    CONFIRM_PASSWORD_WATERMARK: 'Digite confirmación de contraseña',
    ROLE_WATERMARK: 'Rol:',
    PATH_LOGO: require('../images/water.jpg'),
    BUTTON_NAME: 'SOLICITAR PIN',
    CHANGE_PASSWORD_BUTTON_NAME:'CAMBIAR CONTRASEÑA',
    REGISTER:'Regístrese aquí',
    MODAL:{
        TITLE:'ESCOJA UNA OPCIÓN',
        CLOSE_BUTTON:'CERRAR',
        CONNECT_BUTTON:'CONECTAR',
        DISCONNECT_BUTTON:'DESCONECTAR'
    },
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_CONNECT_BLUETOOTH:{
        TITLE:'¡Conexión exitosa!',
        MESSAGE:'Disposivo bluetooth conectado'
    },
    TOAST_DISCONNECT_BLUETOOTH:{
        TITLE:'¡Conexión terminada!',
        MESSAGE:'La conexión con el dispositivo bluetooth finalizó.'
    },
    TOAST_ERROR_BLUETOOTH:{
        TITLE:'¡Falla Bluetooth!',
        MESSAGE:'Error con el dispositivo bluetooth.'
    },
    TOAST_SEND_PIN:{
        TITLE:'¡Pin enviado!',
        MESSAGE:'El pin se envió al correo registrado.'
    },
    TOAST_CONFIRM_PIN:{
        TITLE:'¡Pin confirmado!',
        MESSAGE:'El pin se confirmo exitosamente.'
    },
    TOAST_CHANGE_PASSWORD:{
        TITLE:'¡Contraseña modificada!',
        MESSAGE:'Su contraseña se modificó satisfactoriamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Registro fallido!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    },
    TOAST_ACCESS_TOKEN_EXPIRED:{
        TITLE:'¡Expiró la sesión!',
        MESSAGE:'Ingrese nuevamente desde el inicio de sesión.'
    },
    TOAST_BAD_CREDENTIALS:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Credenciales inválidas. Ingrese nuavemente su email y contraseña registrados.'
    },
    TOAST_ACCESS_IS_DENIED:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'No está autorizado para este recurso del backend.'
    },
    TOAST_ROLE_NON_EXISTENT:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Rol no registrado previamente. Contacte su administrador.'
    },
    TOAST_ERROR_SERVER:{
        TITLE:'¡Error interno!',
        MESSAGE:'Error interno en el backend. Contacte su administrador.'
    },
    TOAST_ERROR_NOT_FOUND:{
        TITLE:'¡Error interno!',
        MESSAGE:'Error del API no parametrizado. Contacte su administrador.'
    },
    TOAST_NOT_FOUND:{
        TITLE:'¡Pin no encontrado!',
        MESSAGE:'Constate el pin enviado al correo registrado.'
    }
}

export const CHANGE_PASSWORD_SCREEN = {
    ID_NUMBER: 'NÚMERO DE IDENTIFICACIÓN:',
    TITLE:'¿Olvido su contraseña? Ingrese el correo registrado en la plataforma',
    SUBTITLE:'Se confirmó el pin para el correo: ${email}. Digite su contraseña.',
    CELL_COUNT:6,
    EMAIL: 'CORREO ELECTRÓNICO:',
    FIRST_NAME: 'NOMBRE(S):',
    LAST_NAME: 'APELLIDO(S):',
    PASSWORD: 'CONTRASEÑA:',
    CONFIRM_PASSWORD: 'CONFIRMAR CONTRASEÑA:',
    ROLE: 'ROL:',
    ID_NUMBER_WATERMARK: 'Digite su número de identificación',
    EMAIL_WATERMARK: 'Digite su correo electrónico',
    FIRST_NAME_WATERMARK: 'Digite su(s) nombre(s)',
    LAST_NAME_WATERMARK: 'Digite su(s) apellido(s)',
    PASSWORD_WATERMARK: 'Digite su contraseña',
    CONFIRM_PASSWORD_WATERMARK: 'Digite confirmación de contraseña',
    ROLE_WATERMARK: 'Rol:',
    PATH_LOGO: require('../images/water.jpg'),
    BUTTON_NAME: 'SOLICITAR PIN',
    CHANGE_PASSWORD_BUTTON_NAME:'CAMBIAR CONTRASEÑA',
    REGISTER:'Regístrese aquí',
    MODAL:{
        TITLE:'DIGITE PIN ENVIADO A SU CORREO',
        CLOSE_BUTTON:'CERRAR',
        VALIDATION_BUTTON:'VALIDAR',
        GET_PIN_BUTTON:'NUEVO PIN'
    },
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_SEND_PIN:{
        TITLE:'¡Pin enviado!',
        MESSAGE:'El pin se envió al correo registrado.'
    },
    TOAST_REGISTER_DATA:{
        TITLE:'¡Registro exitoso!',
        MESSAGE:'El registro de la desinfección fue registrada con éxito.'
    },
    TOAST_CONFIRM_PIN:{
        TITLE:'¡Pin confirmado!',
        MESSAGE:'El pin se confirmo exitosamente.'
    },
    TOAST_CHANGE_PASSWORD:{
        TITLE:'¡Contraseña modificada!',
        MESSAGE:'Su contraseña se modificó satisfactoriamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Registro fallido!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    },
    TOAST_ACCESS_TOKEN_EXPIRED:{
        TITLE:'¡Expiró la sesión!',
        MESSAGE:'Ingrese nuevamente desde el inicio de sesión.'
    },
    TOAST_BAD_CREDENTIALS:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Credenciales inválidas. Ingrese nuavemente su email y contraseña registrados.'
    },
    TOAST_ACCESS_IS_DENIED:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'No está autorizado para este recurso del backend.'
    },
    TOAST_ROLE_NON_EXISTENT:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Rol no registrado previamente. Contacte su administrador.'
    },
    TOAST_ERROR_SERVER:{
        TITLE:'¡Error interno!',
        MESSAGE:'Error interno en el backend. Contacte su administrador.'
    },
    TOAST_ERROR_NOT_FOUND:{
        TITLE:'¡Error interno!',
        MESSAGE:'Error del API no parametrizado. Contacte su administrador.'
    },
    TOAST_NOT_FOUND:{
        TITLE:'¡Pin no encontrado!',
        MESSAGE:'Constate el pin enviado al correo registrado.'
    },
}

export const VALIDATE_SCREEN = {
    TITLE:'Ingrese el pin enviado al correo registrado. Constate también su spam.',
    CELL_COUNT:6,
    PATH_LOGO: require('../images/water.jpg'),
    BUTTON_NAME: 'VALIDAR PIN',
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_RVALIDATE_PIN:{
        TITLE:'¡Pin correcto!',
        MESSAGE:'Su pin se ha validado exitosamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Solicitud fallida!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    },
    TOAST_ACCESS_TOKEN_EXPIRED:{
        TITLE:'¡Expiró la sesión!',
        MESSAGE:'Ingrese nuevamente desde el inicio de sesión.'
    },
    TOAST_BAD_CREDENTIALS:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Credenciales inválidas. Ingrese nuavemente su email y contraseña registrados.'
    },
    TOAST_ACCESS_IS_DENIED:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'No está autorizado para este recurso del backend.'
    },
    TOAST_ROLE_NON_EXISTENT:{
        TITLE:'¡Ingreso fallido!',
        MESSAGE:'Rol no registrado previamente. Contacte su administrador.'
    },
    TOAST_ERROR_SERVER:{
        TITLE:'¡Error interno!',
        MESSAGE:'Error interno en el backend. Contacte su administrador.'
    },
    TOAST_NOT_FOUND:{
        TITLE:'¡Pin no encontrado!',
        MESSAGE:'Constate el pin enviado al correo registrado.'
    }
}

export const USER_INFO_GENERAL_SCREEN={
    TITLE_TABLE:'LISTA DE DESINFECCIONES',
    EMPTY_LIST:'No existe desinfecciones realizadas por el usuario actual.'
}

export const TABLE_DETAIL_DESINFECTION_USER={
    AREA:'ÁREA',
    DATE:'FECHA',
    TIME:'TIEMPO(s)',
    PAGINATION_ROWS:'Filas por página'
}

export const COUNTER_DOWN={
    TITLE:'TIEMPO DE DESINFECCIÓN UV',
    FINISHED_TIME:'Tiempo finalizado',
    REMAINING_TIME:'Tiempo restante',
    WITHOUT_DATA_SENSOR:'Pendiente datos sensor',
    DATA_SENSOR:'SENSOR: {0} mW/cm2',
    CONSTANT_UV:0.5,
    RESET_LAMPS:'RESET_LAMPS',
    START_BUTTON:'INICIAR',
    PAUSE_BUTTON:'PAUSAR',
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_REGISTER:{
        TITLE:'¡Registro exitoso!',
        MESSAGE:'Su registro se procesó exitosamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Registro faliido!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    },
    NOTIFICATION_LOCAL:{
        ID:'countDownSystemUV',
        NAME_CHANNEL:'Channel System UV',
        TITLE:'¡Tiempo Finalizado!',
        MESSAGE:'Desinfección con UV realizada con satisfacción',
        SMALL_ICON:'ic-launcher',
        BIG_TEXT:'La limpieza del aula {0} con el tiempo {1}',
        COLOR:'purple',
        SOUND_NAME:'default'
    }
}

export const SELECT_OPTION={
    DEFAULT:'Escoja una opción',
    LIST_TYPE_USER:['usuario final', 'administrador','terceros']
}

export const SELECT_NUMBER={
    DEFAULT:'Escoja un número'
}

export const NUMBER_FIRST_TIME=[
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
]

export const NUMBER_SECOND_TIME=[
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
]

export const CLASS_ROOMS=[
    { label: 'Aula 1', value: 'classRoom1' },
    { label: 'Aula 2', value: 'classRoom2' },
    { label: 'Aula 3', value: 'classRoom3' },
    { label: 'Aula 4', value: 'classRoom4' },
    { label: 'Aula 5', value: 'classRoom5' },
]

export const LUMINARY=[
    { label: 'Luminaria 1', value: 'LAMP1' },
    { label: 'Luminaria 2', value: 'LAMP2' },
    { label: 'Luminaria 3', value: 'LAMP3' },
    { label: 'Luminaria 4', value: 'LAMP4' },
    { label: 'Luminaria 5', value: 'LAMP5' },
    { label: 'Luminaria 6', value: 'LAMP6' },
    { label: 'Luminaria 7', value: 'LAMP7' },

    { label: 'Grupo 1', value: 'GROUP1' },
    { label: 'Grupo 2', value: 'GROUP2' },
    { label: 'Grupo 3', value: 'GROUP3' },
    { label: 'Grupo 4', value: 'GROUP4' },

    { label: 'Todas las luminarias', value: 'ALL_LAMPS' },
]

export const CONFIG_COUNTER_SCREEN={
    TITLE:'CONFIGURAR CRONÓMETRO',
    ID_NUMBER: 'NÚMERO DE IDENTIFICACIÓN:',
    EMAIL: 'CORREO ELECTRÓNICO:',
    FIRST_NAME: 'NOMBRE(S):',
    LAST_NAME: 'APELLIDO(S):',
    PASSWORD: 'CONTRASEÑA:',
    CONFIRM_PASSWORD: 'CONFIRMAR CONTRASEÑA:',
    ROLE: 'TIMER:',
    ID_NUMBER_WATERMARK: 'Digite su número de identificación',
    EMAIL_WATERMARK: 'Digite su correo electrónico',
    FIRST_NAME_WATERMARK: 'Digite su(s) nombre(s)',
    LAST_NAME_WATERMARK: 'Digite su(s) apellido(s)',
    PASSWORD_WATERMARK: 'Digite su contraseña',
    CONFIRM_PASSWORD_WATERMARK: 'Digite confirmación de contraseña',
    ROLE_WATERMARK: 'Rol:',
    PATH_LOGO: require('../images/water.jpg'),
    BUTTON_NAME: 'Aceptar',
    REGISTER:'Regístrese aquí',
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_REGISTER:{
        TITLE:'¡Registro exitoso!',
        MESSAGE:'Su registro se procesó exitosamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Registro faliido!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    },
}

export const COUNTER_DOWN_SCREEN={
    TITLE:'CONFIGURAR CRONÓMETRO',
    ID_NUMBER: 'NÚMERO DE IDENTIFICACIÓN:',
    EMAIL: 'CORREO ELECTRÓNICO:',
    FIRST_NAME: 'NOMBRE(S):',
    LAST_NAME: 'APELLIDO(S):',
    PASSWORD: 'CONTRASEÑA:',
    CONFIRM_PASSWORD: 'CONFIRMAR CONTRASEÑA:',
    ROLE: 'TIMER:',
    ID_NUMBER_WATERMARK: 'Digite su número de identificación',
    EMAIL_WATERMARK: 'Digite su correo electrónico',
    FIRST_NAME_WATERMARK: 'Digite su(s) nombre(s)',
    LAST_NAME_WATERMARK: 'Digite su(s) apellido(s)',
    PASSWORD_WATERMARK: 'Digite su contraseña',
    CONFIRM_PASSWORD_WATERMARK: 'Digite confirmación de contraseña',
    ROLE_WATERMARK: 'Rol:',
    PATH_LOGO: require('../images/water.jpg'),
    BUTTON_NAME: 'Aceptar',
    REGISTER:'Regístrese aquí',
    TOAST_SUCCESS:'success',
    TOAST_ERROR:'error',
    TOAST_REGISTER:{
        TITLE:'¡Registro exitoso!',
        MESSAGE:'Su registro se procesó exitosamente.'
    },
    TOAST_NOT_REGISTER:{
        TITLE:'¡Registro faliido!',
        MESSAGE:'Su registro genero un error. Intentelo nuevamente o comuníquese con su administrador.'
    },
}