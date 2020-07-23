import * as types from '../types';

const INITIAL_STATE = {
    tags: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_TAGS:
            return { ...state, tags: action.payload };
        default:
            return state;
    }
}
