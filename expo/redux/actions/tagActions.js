import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import * as types from '../types';
import { processError } from '../../components/functions';

export const getTags = (query) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/tag`, {
                params: query ? { query } : null,
            });
            return dispatch({ type: types.GET_TAGS, payload: response.data.tags });
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};

export const newTag = (name, token) => {
    return async (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: true });
        try {
            await axios.post(
                `${SERVER_URL}/api/tag/newTag`,
                { name },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            dispatch({
                type: types.SET_SUCCESS,
                payload: 'Successfully added tag',
            });

            getTags(name);
        } catch (e) {
            console.log(e.response.data);
            return dispatch({
                type: types.SET_ERROR,
                payload: processError(e.response.data),
            });
        }
    };
};
