import * as redux from 'redux';
import thunk from 'redux-thunk';

import { allFriendsReducer, addedFriendsReducer } from 'reducers';

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        allFriends: allFriendsReducer,
        addedFriends: addedFriendsReducer
    });

    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
}
