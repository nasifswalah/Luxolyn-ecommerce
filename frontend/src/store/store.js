import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import  storage  from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import productReducer from './productSlice.js';
import cartReducer from './cartSlice.js';


const rootReducer = combineReducers({user: userReducer, product: productReducer, cart: cartReducer});

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});


export const persistor = persistStore(store);