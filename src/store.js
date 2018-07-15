import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import promise from 'redux-promise';

const store = createStore(
    rootReducer,
    applyMiddleware(promise)
);
export default store;