import * as types from '../constants';
import api from 'api';

export const startGetAllFriends = () => {
    return (dispatch, getState) => {
        return api.getFriends().then((allFriends) => {
            dispatch(getAllFriends(allFriends));
        })
    }
}

export const getAllFriends = (allFriends) => {
    return {
        type: types.GET_ALL_FREINDS,
        allFriends
    }
}
