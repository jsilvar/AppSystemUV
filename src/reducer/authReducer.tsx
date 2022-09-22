import { AuthState } from "../context/AuthContext";

type AuthAction =
    | { type: 'signIn' }
    | { type: 'logout' }
    | { type: 'changeFavIcon', payload: string }
    | { type: 'changeUsername', payload: string }
    | { type: 'assignUser', payload:any}
    | { type: 'assignDeviceBluetooth', payload:any}
    | { type: 'assignTokenGeneric', payload: string }
    | { type: 'assignTokenUser', payload: string };

//state generate
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case "signIn":
            return {
                ...state,
                isLoggedIn: true,
                username: 'no-username-yet'
            }
        case 'changeFavIcon':
            return {
                ...state,
                favoriteIcon: action.payload
            }
        case 'changeUsername':
            return {
                ...state,
                username: action.payload
            }
        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                username: undefined,
                favoriteIcon: undefined
            }
        case 'assignUser':{
            return{
                ...state,
                user:action.payload
            }
        }
        case 'assignDeviceBluetooth':{
            return{
                ...state,
                deviceBluetooth:action.payload
            }
        }
        case 'assignTokenGeneric':
            return {
                ...state,
                tokenGeneric: action.payload
            }
        case 'assignTokenUser':
            return {
                ...state,
                tokenUser: action.payload
            }
        default:
            return state;
    }
}