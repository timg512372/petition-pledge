import * as types from '../types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    success: '',
};

export default function (state = INITIAL_STATE, action) {
    console.log(action.type);

    switch (action.type) {
        case types.SET_ERROR:
            return { ...state, loading: false, error: action.payload, success: '' };
        case types.SET_LOADING:
            return { ...state, loading: action.payload, error: '', success: '' };
        case types.SET_SUCCESS:
            return { ...state, loading: false, error: '', success: action.payload };
        case types.CLEAR:
        case types.GET_TIMELINE:
        case types.GET_ACTIVITY:
        case types.GET_PETITIONS:
        case types.GET_SEARCH:
            return INITIAL_STATE;

        default:
            return state;
    }
}
