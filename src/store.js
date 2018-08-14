import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import promise from 'redux-promise';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

export const history = createHistory();

const appRouterMiddleware = routerMiddleware(history);

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initStoreValues = {
  nasa: {
    collection: {
      items: []
    }
  },
  ui: {
    searchCriteria: ''
  }
};

export const store = createStore(
  persistedReducer,
  initStoreValues,
  composeWithDevTools(applyMiddleware(promise, appRouterMiddleware))
);
export const persistor = persistStore(store);
