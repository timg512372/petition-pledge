import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import { Platform } from 'react-native';
import * as types from '../types';
import { processError } from '../../components/functions';

export const sendFriendRequest = (uid, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            await axios.post(
                `${SERVER_URL}/api/user/addFriendRequest`,
                { uid },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return dispatch({
                type: types.SET_SUCCESS,
                payload: 'Successfully sent friend request',
            });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const addFriend = (uid, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            await axios.post(
                `${SERVER_URL}/api/user/addFriend`,
                { uid },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            dispatch({
                type: types.SET_SUCCESS,
                payload: 'Successfully added friend',
            });

            let response = await axios.get(`${SERVER_URL}/api/user/friendRequests`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            dispatch({
                type: types.GET_FRIEND_REQUESTS,
                payload: response.data.friendRequests,
            });

            response = await axios.get(`${SERVER_URL}/api/user/friends`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return dispatch({
                type: types.GET_FRIENDS,
                payload: response.data.friends,
            });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const removeFriendRequest = (uid, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            await axios.post(
                `${SERVER_URL}/api/user/removeFriendRequest`,
                { uid },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            dispatch({
                type: types.SET_SUCCESS,
                payload: 'Successfully removed friend request',
            });

            const response = await axios.get(`${SERVER_URL}/api/user/friendRequests`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return dispatch({
                type: types.GET_FRIEND_REQUESTS,
                payload: response.data.friendRequests,
            });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const getFriendRequests = (token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            const response = await axios.get(`${SERVER_URL}/api/user/friendRequests`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return dispatch({
                type: types.GET_FRIEND_REQUESTS,
                payload: response.data.friendRequests,
            });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const getFriends = (token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            const response = await axios.get(`${SERVER_URL}/api/user/friends`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return dispatch({
                type: types.GET_FRIENDS,
                payload: response.data.friends,
            });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const changeProfilePicture = (photo, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });

        const data = new FormData();

        data.append('photo', {
            name: photo.uri,
            type: photo.type,
            uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
        });
        data.append('name', photo.fileName);
        data.append('type', photo.type);

        console.log(data);

        try {
            await axios.post(`${SERVER_URL}/api/user/changeProfilePicture`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const setBio = (bio, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            await axios.post(
                `${SERVER_URL}/api/user/setBio`,
                { bio },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return dispatch({
                type: types.SET_SUCCESS,
                payload: 'Successfully updated description',
            });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};
