import * as types from '../constants';

export const allFriendsReducer = (state = [], action) => {
    switch (action.type) {
        case types.GET_ALL_FREINDS:
            return [
                ...action.allFriends
            ]
            break;
        case types.REMOVE_FRIEND_ALLLIST:
            return state;
            break;
        default:
            return state;
    }
}

export const addedFriendsReducer = (state = [], action) => {
    switch (action.type) {
        case types.ADD_FRIEND_ADDLIST:
            return state;
            break;
        default:
            return state;
    }
}
