import * as types from '../types';

const INITIAL_STATE = {
    loading: false,
    timeline: [],
    activity: [],
    error: '',
    success: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.SET_ERROR:
            return { ...state, loading: false, error: action.payload, success: '' };
        case types.SET_LOADING:
            return { ...state, loading: action.payload, error: '', success: '' };
        case types.SET_SUCCESS:
            return { ...state, loading: false, error: '', success: action.payload };
        case types.GET_TIMELINE:
            return { ...state, timeline: action.payload, loading: false };
        case types.GET_ACTIVITY:
            return { ...state, activity: action.payload, loading: false };
        default:
            return state;
    }
}
