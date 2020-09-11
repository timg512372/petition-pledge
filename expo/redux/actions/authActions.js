import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';
import * as types from '../types';
import { processError } from '../../components/functions';
import * as AppleAuthentication from 'expo-apple-authentication';

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

export const loginToken = (token) => {
    return async (dispatch) => {
        dispatch({ type: types.CACHE_USER });
        try {
            let user = await axios.post(`${SERVER_URL}/api/auth/loginToken`, { token });
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

export const loginApple = (token, name) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        // let fullName = name.givenName + ' ' + name.familyName;

        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            console.log(credential);

            let user = await axios.post(`${SERVER_URL}/api/auth/loginApple`, {
                token: credential.identityToken,
            });

            return dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user.data });
        } catch (e) {
            console.log(e.response ? e.response.data : e.code);
            return dispatch({
                type: types.LOGIN_USER_ERROR,
                payload: processError(e.response ? e.response.data : e.code),
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
    console.log('updating user');
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
