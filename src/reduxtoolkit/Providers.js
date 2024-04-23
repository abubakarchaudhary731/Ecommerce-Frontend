'use client'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Store';

export const Providers = ({ children }) => {
    return <Provider store={store}>
                <PersistGate persistor={persistor}>
                   {children}
                </PersistGate>
            </Provider>;
}
