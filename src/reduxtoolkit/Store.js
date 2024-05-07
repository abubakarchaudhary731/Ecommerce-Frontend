import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RegisterSlice from './slices/auth/RegisterSlice';
import LoginSlice from './slices/auth/LoginSlice';
import SnakMessageSlice from './slices/SnakMessageSlice';
import ProductSlice from './slices/products/ProductSlice';
import CartSlice from './slices/cart/CartSlice';
import CheckoutSlice from './slices/cart/CheckoutSlice';
import AddressSlice from './slices/auth/AddressSlice';
import PaymentDetailSlice from './slices/auth/PaymentDetailSlice';
import ConfirmOrderSlice from './slices/order/ConfirmOrderSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  SnakMessages: SnakMessageSlice,
  RegisterUser: RegisterSlice,
  LoginUser: LoginSlice,
  Products: ProductSlice,
  Cart: CartSlice,
  Checkout: CheckoutSlice,
  UserAddress: AddressSlice,
  PaymentDetail: PaymentDetailSlice,
  Orders: ConfirmOrderSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;