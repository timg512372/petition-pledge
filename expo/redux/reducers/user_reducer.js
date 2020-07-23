import * as types from '../types';

const INITIAL_STATE = {
    friendRequests: [],
    friends: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_FRIEND_REQUESTS:
            return { ...state, friendRequests: action.payload };
        case types.GET_FRIENDS:
            return { ...state, friends: action.payload };
        default:
            return state;
    }
}
