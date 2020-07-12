import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../types';

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginFailure = err => ({ type: LOGIN_FAILURE, payload: err });
export const loginSuccess = token => ({ type: LOGIN_SUCCESS, payload: token });
export const logout = () => ({ type: LOGOUT });

export const login = () => {
    return async dispatch => {
        dispatch(loginRequest());
        try {
            const token = await Promise.resolve('something');
            dispatch(loginSuccess(token))
        } catch(err) {
            dispatch(loginFailure(err))
        }
    }
}