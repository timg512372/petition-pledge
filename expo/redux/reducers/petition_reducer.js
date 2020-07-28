import * as types from '../types';

const INITIAL_STATE = {
    timeline: [],
    activity: [],
    tag: [],
    search: {},
    selectedUser: {},
    selectedActivity: {},
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_TIMELINE:
            return { ...state, timeline: action.payload };
        case types.GET_ACTIVITY:
            return { ...state, activity: action.payload };
        case types.GET_PETITIONS:
            return { ...state, tag: action.payload };
        case types.GET_SEARCH:
            return { ...state, search: action.payload };
        case types.GET_SELECTED_PROFILE:
            return { ...state, selectedUser: action.payload };
        case types.GET_SELECTED_ACTIVITY:
            return { ...state, selectedActivity: action.payload };
        default:
            return state;
    }
}
