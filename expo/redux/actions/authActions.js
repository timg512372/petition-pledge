import * as types from '../types';

export const loginUser = (email, password) => {
    return {
        type: types.LOGIN_USER_SUCCESS,
        payload: { email, password },
    };
};
