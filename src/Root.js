import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

// Helper Root component to be reused in tests
export default (props) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    {props.children}
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}