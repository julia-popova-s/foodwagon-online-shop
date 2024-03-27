import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { OrderItem, User, UserSliceState } from './types';

const initialState: UserSliceState = {
  email: null,
  id: '',
  isAuth: false,
  list: [],
  orderCounter: 1,
  token: '',
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    changeOrderCounter(state) {
      state.orderCounter = state.orderCounter + 1;
    },
    removeUser(state) {
      state.email = null;
      state.id = '';
      state.isAuth = false;
      state.list = [];
      state.token = '';
    },
    setOrders(state, action: PayloadAction<OrderItem>) {
      state.list.push({
        [action.payload.orderNumber]: action.payload.list,
        date: action.payload.date,
        deliveryType: action.payload.deliveryType,
        location: action.payload.location,
        restaurantId: action.payload.id,
        restaurantName: action.payload.name,
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
export const orderCounterSelector = (state: RootStore) => state.user.orderCounter;
export const listSelector = (state: RootStore) => state.user.list;

export const { changeOrderCounter, removeUser, setOrders, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
