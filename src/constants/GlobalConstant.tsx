export const GLOBAL_CONSTANT = {

    TOAST: {
        ERROR: {
            TYPE: 'error',
            TITLE: '¡ERROR!'
        },
        success: {
            type: 'success',
            title: ''
        }
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
    START_BUTTON:'INICIAR',
    PAUSE_BUTTON:'PAUSAR'

}

export const SELECT_OPTION={
    DEFAULT:'Escoja una opción',
    LIST_TYPE_USER:['usuario final', 'administrador','terceros']
}