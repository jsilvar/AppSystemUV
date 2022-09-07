export interface ILoginState {
    email: {
        validated: boolean,
        value: string
    };
    password: {
        validated: boolean,
        value: string
    };

}

// initial values
export const loginInitialState: ILoginState = {
    email: {
        validated: false,
        value: ''
    },
    password: {
        validated: false,
        value: ''
    }
}

type ACTIONS =
    | { type: 'changeEmail', payload: { validated: boolean, value: string } }
    | { type: 'changePassword', payload: { validated: boolean, value: string } };

//state generate
export const LoginReducer = (state: ILoginState, action: ACTIONS): ILoginState => {

    switch (action.type) {
        case 'changeEmail':
            return {
                ...state,
                email: action.payload
            }
        case "changePassword":
            return {
                ...state,
                password: action.payload
            }
        default:
            return loginInitialState;
    }
}

