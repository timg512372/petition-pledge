import * as types from '../types';

const INITIAL_STATE = {
    loading: false,
    cacheLoading: false,
    user: null,
    token: null,
    error: '',
    success: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.CACHE_USER:
            return { ...state, cacheLoading: true, error: '', success: '' };
        case types.LOGIN_USER:
            return { ...state, loading: true, error: '', success: '' };
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                error: '',
                loading: false,
                cacheLoading: false,
            };
        case types.LOGIN_USER_ERROR:
            return { ...state, error: action.payload, loading: false, cacheLoading: false };
        case types.LOGOUT_USER:
            return INITIAL_STATE;
        case types.UPDATE_USER:
            return { ...state, loading: false, user: action.payload };
        case types.FORGOT_PASSWORD:
            return { ...state, loading: false, success: 'Sent Recovery Email' };
        case types.CLEAR_AUTH: {
            return { ...state, loading: false, success: '', error: '' };
        }
        default:
            return state;
    }
}
