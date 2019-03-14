import {AUTH_TEST} from "../actions/authorization"

const initialState = {
    authBool: false,
    email: ``,
    token: ``
};

export const authorization = (state = initialState, {type, payload}) => {
    if (type === AUTH_TEST) {
        return {
            authBool: true,
            email: payload.email,
            token: payload.token
        }
    }
    else {
        return state;
    }
};