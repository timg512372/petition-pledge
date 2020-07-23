import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import * as types from '../types';
import { processError } from '../../components/functions';

export const getTimeline = (token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            const response = await axios.get(`${SERVER_URL}/api/user/feed`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return dispatch({ type: types.GET_TIMELINE, payload: response.data.feed });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const getActivityData = (token) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/user/activity`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return dispatch({ type: types.GET_ACTIVITY, payload: response.data.activity });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const getPetitions = (tags) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });

        try {
            const response = await axios.get(`${SERVER_URL}/api/petition/`, { params: { tags } });
            return dispatch({ type: types.GET_PETITIONS, payload: response.data.petitions });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const search = (query, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            const petitionSearch = await axios.get(`${SERVER_URL}/api/petition/`, {
                params: { query },
            });

            const userSearch = await axios.get(`${SERVER_URL}/api/user/`, {
                params: { query },
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('searched');

            return dispatch({
                type: types.GET_SEARCH,
                payload: { petitions: petitionSearch.data.petitions, users: userSearch.data.users },
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

export const signPetition = (petitionId, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        console.log(token);
        try {
            await axios.post(
                `${SERVER_URL}/api/petition/signPetition`,
                { id: petitionId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            dispatch({ type: types.SET_SUCCESS, payload: 'Successfully Signed Petition' });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const newPetition = (name, description, url, goal, token, tags) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });

        let trimmedTags = tags.map((tag) => tag.name);
        try {
            await axios.post(
                `${SERVER_URL}/api/petition/newPetition`,
                { name, description, url, goal, tags: trimmedTags },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            dispatch({ type: types.SET_SUCCESS, payload: 'Successfully Created Petition' });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};
