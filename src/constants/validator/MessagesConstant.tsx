'use strict';

const MESSAGES_CONSTANT = {
    es: {
        idTextGeneric: 'El campo "{0}" debe ser un número válido.',
        timer:'Escoja al menos uno de los campos "{0}".',
        password: 'El campo "{0}" debe tener al menos: una mayúscula, minúscula, un número y al menos un carater especial !@#$%&',
        number: 'El campo "{0}" debe ser un número válido.',
        numbers: 'El campo "{0}" debe ser un número válido.',
        email: 'El campo "{0}" debe ser un email válido.',
        required: 'El campo "{0}" es requerido.',
        date: 'El campo "{0}" debe contener una fecha válida ({1}).',
        minlength: 'La longitud del campo "{0}" debe ser mayor que {1} caracteres',
        maxlength: 'La longitud del campo "{0}" debe ser menor que {1} caracteres.',
        equalPassword: 'Las contraseñas son diferentes',
        hasNumber: 'El campo "{0}" debe contener un número.',
        hasUpperCase: 'El campo "{0}" debe contener una letra mayúscula',
        hasLowerCase: 'El campo "{0}" debe contener minúsculas',
        hasSpecialCharacter: 'El campo "{0}" debe contener un carácter especial',
        alphabetical:'El campo "{0}" debe contener caracteres alfabéticos y por mucho un espacio'
    }
}

export default MESSAGES_CONSTANT;
