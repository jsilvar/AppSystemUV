import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";

//structure initial
export interface AuthState {
    isLoggedIn: Boolean;
    username?: String;
    email?:String;
    token?:String;
    favoriteIcon?: String;
}

// initial values
export const authInitialState: AuthState = {
    isLoggedIn: false,
    username: undefined,
    email:undefined,
    token:undefined,
    favoriteIcon: undefined
}

//let's use
export interface AuthContextProps {
    authState: AuthState;
    signIn: () => void;
    logout:()=>void;
    changeFavoriteIcon:(iconName:string)=>void;
    changeUsername: (username: string) => void;
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

    const assignEmail=(email:string)=>{
        dispatch({type:'assignEmail', payload:email})
    }

    const assignToken=(token:string)=>{
        dispatch({type:'assignToken', payload:token})
    }

    const signIn = () => {
        console.log('call signIn in context')
        dispatch({type:'signIn'})
    }

    const logout=()=>{
        dispatch({type:'logout'})
    }

    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            assignEmail,
            assignToken,
            logout,
            changeFavoriteIcon,
            changeUsername
        }}>
            {children}
        </AuthContext.Provider>
    )
}