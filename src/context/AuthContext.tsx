import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";

//structure initial
export interface AuthState {
    user:{
        identificationNumber:number|undefined;
        email:string|undefined;
        firstName:string|undefined;
        lastName:string|undefined;
        role:string|undefined;
        enabled:boolean|undefined
    },
    deviceBluetooth:{
        idDevice:string|undefined;
        name:string|undefined;
        connected:boolean|undefined;
        paired:boolean|undefined;
    },
    isLoggedIn: boolean;
    username?: string;
    email?:string;
    tokenGeneric?:string;
    tokenUser?:string;
    favoriteIcon?: string;
}

// initial values
export const authInitialState: AuthState = {
    user:{
        identificationNumber:undefined,
        email:undefined,
        firstName:undefined,
        lastName:undefined,
        role:undefined,
        enabled:undefined
    },
    deviceBluetooth:{
        idDevice:undefined,
        name:undefined,
        connected:undefined,
        paired:undefined,
    },
    isLoggedIn: false,
    username: undefined,
    email:undefined,
    tokenGeneric:undefined,
    tokenUser:undefined,
    favoriteIcon: undefined
}

//let's use
export interface AuthContextProps {
    authState: AuthState;
    signIn: () => void;
    logout:()=>void;
    changeFavoriteIcon:(iconName:string)=>void;
    changeUsername: (username: string) => void;
    assignUser:({user}:AuthState)=>void;
    assignDeviceBluetooth:({deviceBluetooth}:AuthState)=>void;
    assignTokenGeneric:(token:string)=>void;
    assignTokenUser:(token:string)=>void;
}

//create context
export const AuthContext = createContext({} as AuthContextProps);

//provider components the state
export const AuthProvider = ({ children }: any) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState)

    const changeFavoriteIcon=(iconName:string)=>{
        dispatch({type:'changeFavIcon', payload:iconName})
    }

    const changeUsername=(username:string)=>{
        dispatch({type:'changeFavIcon', payload:username})
    }

    const assignUser=(user:AuthState)=>{
        dispatch({type:'assignUser', payload:user})
    }    

    const assignDeviceBluetooth=(deviceBluetooth:AuthState)=>{
        dispatch({type:'assignDeviceBluetooth', payload:deviceBluetooth})
    }

    const assignTokenGeneric=(token:string)=>{
        dispatch({type:'assignTokenGeneric', payload:token})
    }

    const assignTokenUser=(token:string)=>{
        dispatch({type:'assignTokenUser', payload:token})
    }

    const signIn = () => {
        dispatch({type:'signIn'})
    }

    const logout=()=>{
        dispatch({type:'logout'})
    }

    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            assignUser,
            assignDeviceBluetooth,
            assignTokenGeneric,
            assignTokenUser,
            logout,
            changeFavoriteIcon,
            changeUsername
        }}>
            {children}
        </AuthContext.Provider>
    )
}