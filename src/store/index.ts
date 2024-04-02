import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';

import {
  cart,
  filters,
  location,
  product,
  products,
  productsFastAccess,
  productsFlashDeals,
  productsPopular,
  productsSearch,
  restaurants,
  sortingType,
  user,
} from './slices';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['cart', 'user', 'location', 'restaurants'],
};

const rootReducer = combineReducers({
  cart,
  filters,
  location,
  product,
  products,
  productsFastAccess,
  productsFlashDeals,
  productsPopular,
  productsSearch,
  restaurants,
  sortingType,
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootStore = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
