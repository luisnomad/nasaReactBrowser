import { combineReducers } from 'redux';
import nasaApi from './nasaApi';
import uiState from './uiState';

const rootReducer = combineReducers({
    nasa: nasaApi,
    ui: uiState
});

export default rootReducer;