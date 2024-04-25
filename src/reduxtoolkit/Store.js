import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RegisterSlice from './slices/auth/RegisterSlice';
import LoginSlice from './slices/auth/LoginSlice';
import SnakMessageSlice from './slices/SnakMessageSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  SnakMessages: SnakMessageSlice,
  RegisterUser: RegisterSlice,
  LoginUser: LoginSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;