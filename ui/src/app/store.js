import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

import appReducer from 'features/app/appSlice'
import authReducer from 'features/auth/authSlice'


// Add any other reducers you have here
const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
})

// If whitelist is enabled, only those slices will be persisted
// If blacklist is enabled, everything but those slices will be persisted
// whitelist and blacklist are mutually exclusive.  Only one should be enabled at a time.
const persistConfig = {
  key: 'boilerplate',
  whitelist: ['auth'],
  //blacklist: [],
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})
let persistor = persistStore(store);

export {
  store,
  persistor,
};


