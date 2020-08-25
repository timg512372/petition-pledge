import * as types from '../types';

const INITIAL_STATE = {
    friendRequests: [],
    friends: [],
    recommendedUsers: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_FRIEND_REQUESTS:
            return { ...state, friendRequests: action.payload };
        case types.GET_FRIENDS:
            return { ...state, friends: action.payload };
        case types.GET_RECOMMENDED_USERS:
            return { ...state, recommendedUsers: action.payload };
        default:
            return state;
    }
}
