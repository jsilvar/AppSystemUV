export interface IRegisterState {
    numberIdentification: {
        validated: boolean,
        value: string
    };
    firstName: {
        validated: boolean,
        value: string
    };
    lastName: {
        validated: boolean,
        value: string
    };
    email: {
        validated: boolean,
        value: string
    };
    password: {
        validated: boolean,
        value: string
    };
    confirmPassword: {
        validated: boolean,
        value: string
    };
    role: {
        validated: boolean,
        value: string
    };
}

// initial values
export const registerInitialState: IRegisterState = {
    numberIdentification: {
        validated: false,
        value: ''
    },
    firstName: {
        validated: false,
        value: ''
    },
    lastName: {
        validated: false,
        value: ''
    },
    email: {
        validated: false,
        value: ''
    },
    password: {
        validated: false,
        value: ''
    },
    confirmPassword: {
        validated: false,
        value: ''
    },
    role: {
        validated: false,
        value: ''
    }
}

type ACTIONS =
    | { type: 'changeNumberIdentification', payload: { validated: boolean, value: string } }
    | { type: 'changeFirstName', payload: { validated: boolean, value: string } }
    | { type: 'changeLastName', payload: { validated: boolean, value: string } }
    | { type: 'changeEmail', payload: { validated: boolean, value: string } }
    | { type: 'changePassword', payload: { validated: boolean, value: string } }
    | { type: 'changeConfirmPassword', payload: { validated: boolean, value: string } }
    | { type: 'changeRole', payload: { validated: boolean, value: string } };

//state generate
export const RegisterReducer = (state: IRegisterState, action: ACTIONS): IRegisterState => {

    switch (action.type) {
        case 'changeNumberIdentification':
            return {
                ...state,
                numberIdentification: action.payload
            }
        case "changeFirstName":
            return {
                ...state,
                firstName: action.payload
            }
        case 'changeLastName':
            return {
                ...state,
                lastName: action.payload
            }
        case "changeEmail":
            return {
                ...state,
                email: action.payload
            }
        case 'changePassword':
            return {
                ...state,
                password: action.payload
            }
        case "changeConfirmPassword":
            return {
                ...state,
                confirmPassword: action.payload
            }
        case "changeRole":
            return {
                ...state,
                role: action.payload
            }
        default:
            return registerInitialState;
    }
}

