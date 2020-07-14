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

            let promises = response.data.feed.map(async (item) => {
                let petition = await axios.get(`${SERVER_URL}/api/petition/petition`, {
                    params: {
                        id: item.petition,
                    },
                });

                let user = await axios.get(`${SERVER_URL}/api/user/publicProfile`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        uid: item.user,
                    },
                });

                let activity = {
                    date: item.date,
                    type: item.type,
                    petition: petition.data.petition,
                    user: user.data.user,
                };
                return activity;
            });

            let timeline = await Promise.all(promises);

            return dispatch({ type: types.GET_TIMELINE, payload: timeline });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const getActivityData = (feed, token) => {
    console.log('getactivity data');
    return async (dispatch) => {
        try {
            console.log(feed);

            let promises = feed.map(async (item) => {
                let petition = await axios.get(`${SERVER_URL}/api/petition/petition`, {
                    params: {
                        id: item.petition,
                    },
                });

                let activity = {
                    date: item.date,
                    type: item.type,
                    petition: petition.data.petition,
                    user: item.user,
                };
                return activity;
            });

            let feedData = await Promise.all(promises);

            return dispatch({ type: types.GET_ACTIVITY, payload: feedData });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const signPetition = (petitionId, token) => {};

export const newPetition = (name, description, url, goal, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            await axios.post(
                `${SERVER_URL}/api/petition/newPetition`,
                { name, description, url, goal },
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
