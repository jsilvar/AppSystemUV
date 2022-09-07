import { AuthState } from "../context/AuthContext";

type AuthAction =
    | { type: 'signIn' }
    | { type: 'logout' }
    | { type: 'changeFavIcon', payload: string }
    | { type: 'changeUsername', payload: string }
    | { type: 'assignEmail', payload: string }
    | { type: 'assignToken', payload: string };

//state generate
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case "signIn":
            console.log('whats happend')
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
        case 'assignEmail':
            return {
                ...state,
                email: action.payload
            }
        case 'assignToken':
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}