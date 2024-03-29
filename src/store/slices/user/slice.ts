import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { Order, User, UserSliceState } from './types';

const initialState: UserSliceState = {
  email: null,
  id: '',
  isAuth: false,
  list: [],
  token: '',
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    removeUser(state) {
      state.email = null;
      state.id = '';
      state.isAuth = false;
      state.list = [];
      state.token = '';
    },
    setOrders(state, action: PayloadAction<Order>) {
      state.list.push({
        date: action.payload.date,
        deliveryType: action.payload.deliveryType,
        list: action.payload.list,
        location: action.payload.location,
        restaurantId: action.payload.restaurantId,
        restaurantName: action.payload.restaurantName,
      });
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isAuth = true;
    },
  },
});

export const emailSelector = (state: RootStore) => state.user.email;
export const idSelector = (state: RootStore) => state.user.id;
export const isAuthSelector = (state: RootStore) => state.user.isAuth;
export const listSelector = (state: RootStore) => state.user.list;

export const { removeUser, setOrders, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
