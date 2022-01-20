import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {persistReducer, persistStore} from 'redux-persist'

import appReducer from 'features/app/appSlice'
import authReducer from 'features/auth/authSlice'
import {wireguardApi} from 'features/auth/apiSlice'
import wgPeersReducer from 'features/wgpeers/wgPeersSlice'
import wgServerReducer from 'features/wgserver/wgServerSlice'
import {setupListeners} from '@reduxjs/toolkit/query'


// Add any other reducers you have here
const reducers = combineReducers({
    app: appReducer,
    wgpeers: wgPeersReducer,
    wgservers: wgServerReducer,
    auth: authReducer,
    [wireguardApi.reducerPath]: wireguardApi.reducer,
})

// If whitelist is enabled, only those slices will be persisted
// If blacklist is enabled, everything but those slices will be persisted
// whitelist and blacklist are mutually exclusive.  Only one should be enabled at a time.
const persistConfig = {
    key: 'letsvpn',
    whitelist: ['auth'],
    //blacklist: [],
    storage,
}

//const persistedReducer = persistReducer(persistConfig, reducers)
const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        wireguardApi.middleware,
    )
})


/*
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

 */
let persistor = persistStore(store);

export {
  store,
  persistor,
};

setupListeners(store.dispatch)

