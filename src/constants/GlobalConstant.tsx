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
    BUTTON_NAME: 'Ingresar',
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
    CONSTANT_UV:1,
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