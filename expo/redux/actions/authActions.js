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

export const logoutUser = (token, navigation) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        console.log('logging out');
        console.log(token);
        try {
            await axios.post(
                `${SERVER_URL}/api/auth/logout`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigation.navigate('Auth');
            return dispatch({ type: types.LOGOUT_USER });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const updateUser = (token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });

        try {
            const response = await axios.get(`${SERVER_URL}/api/user/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return dispatch({ type: types.UPDATE_USER, payload: response.data.users });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const clear = () => {
    return {
        type: types.CLEAR,
    };
};
