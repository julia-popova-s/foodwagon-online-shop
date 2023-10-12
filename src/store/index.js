import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'

import {
  cart,
  filters,
  product,
  products,
  productsSearch,
  productsPopular,
  productsWithDiscount,
  restaurants,
  sortingType,
} from './reducers'

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['cart'],
}

const rootReducer = combineReducers({
  cart,
  filters,
  product,
  products,
  productsSearch,
  productsPopular,
  productsWithDiscount,
  restaurants,
  sortingType,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
