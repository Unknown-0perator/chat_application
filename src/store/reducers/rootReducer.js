import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import searchedUserReducer from './searchedUserReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    search: searchedUserReducer,
});

export default rootReducer;
