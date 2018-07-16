import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import promise from 'redux-promise';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

const appRouterMiddleware = routerMiddleware(history);

const store = createStore(
    rootReducer,
    applyMiddleware(promise),
    applyMiddleware(appRouterMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;