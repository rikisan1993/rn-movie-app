import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../types';

const initialState = {
    usertoken: null
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST: 
            return {...state};
        case LOGIN_FAILURE:
            return { usertoken: null };
        case LOGIN_SUCCESS:
            return { usertoken: action.payload };
        case LOGOUT:
            return { usertoken: null}
        default:
            return {...state}
    }
}
