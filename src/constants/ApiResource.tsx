export const SERVER_DEVELOPMENT = 'http://localhost:8080'
export const SERVER_PRODUCTION = 'https://api-system-uv.herokuapp.com'
export const CODE_HTTP = {
    OK: '200',
    CREATED: '201',
    ACCEPTED:'202',
    BAD_REQUEST: '400',
    NOT_AUTHORIZED: '401',
    FORBIDDEN: '403',
    NOT_FOUND: '404',
    CONFLICT:'409',
    ERROR_SERVER: '500'
}
export const VERB_HTTP = {
    POST: 'post',
    PUT: 'put',
    GET: 'get',
    DELETE: 'delete'
}
export const ROLE_API = {
    ADMIN: 'admin',
    USER: 'user',
    GENERIC: 'generic'
}
export const AUTH_BASIC = {
    PASSWORD: 'fwCuNQGJmCLI',
    USER_NAME: 'systemUVClientId'
}
export const ERROR_TOKEN = {
    BAD_CREDENTIALS:'Bad credentials',//400
    ACCESS_TOKEN_EXPIRED:'Access token expired',//401
    ACCESS_IS_DENIED:'Access is denied',//403
}
export const TOKEN_JWT_GENERIC = {
    RESOURCE: '/oauth/token',
    GRANT_TYPE: 'password',
    PASSWORD: '@UserGeneric2022',
    USER_NAME: 'usergeneric@usergeneric.co'
}

export const USERS = {
    CREATE: '/users',
    UPDATE: '/users',
    GET_USER_BY_EMAIL: '/users/${email}',
    GET_USER_BY_EMAIL_IDENTIFICATION_NUMBER: '/users/${email}/${identificationNumber}',
    DELETE_USER_BY_EMAIL_IDENTIFICATION_NUMBER: '/users/${email}/${identificationNumber}',
    LIST_USER: '/users/list',
    VALIDATED_ACCOUNT:'/users/validate-account/${pin}/${email}'
}

export const ROLES={
    LIST_ROLES:'/roles',
    ROLE_BY_ID:'/roles/${id}'
}

export const LOGIN = {
    CHANGE_PASSWORD: '/login/change-password/${pin}',
    GENERATE_PIN: '/login/generate-pin/${email}',
    CONFIRM_PIN: '/login/confirm-pin/${pin}/${email}',
}