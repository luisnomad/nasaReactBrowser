import { combineReducers } from 'redux';
import AppReducer from './app_reducer';

const rootReducer = combineReducers({
    nasa: AppReducer
});

export default rootReducer;