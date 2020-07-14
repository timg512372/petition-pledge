import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import * as types from '../types';
import { processError } from '../../components/functions';

export const loginUser = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: types.LOGIN_USER });
        try {
            let user = await axios.post(`${SERVER_URL}/api/auth/login`, { email, password });
            return dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user.data });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.LOGIN_USER_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const registerUser = (name, email, password, cpassword) => {
    console.log(name);
    console.log('registering');
    return async (dispatch) => {
        dispatch({ type: types.LOGIN_USER });
        try {
            let user = await axios.post(`${SERVER_URL}/api/auth/register`, {
                name,
                email,
                password,
                cpassword,
            });
            return dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user.data });
        } catch (e) {
            console.log(e.response.data);

            return dispatch({
                type: types.LOGIN_USER_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const clearAuth = () => {
    return {
        type: types.CLEAR_AUTH,
    };
};
