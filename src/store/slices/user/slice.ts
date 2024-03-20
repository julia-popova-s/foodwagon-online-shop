import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { PayloadActionProps, User, UserSliceState } from './types';

const initialState: UserSliceState = {
  email: null,
  id: '',
  isAuth: false,
  list: [],
  orderNumber: 0,
  token: '',
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    changeOrderNumber(state) {
      state.orderNumber = state.orderNumber + 1;
    },
    removeUser(state) {
      state.email = null;
      state.id = '';
      state.isAuth = false;
      state.list = [];
      state.token = '';
    },
    setOrders(state, action: PayloadAction<PayloadActionProps>) {
      state.list.push({
        [action.payload.orderNumber]: action.payload.list,
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
export const orderNumberSelector = (state: RootStore) => state.user.orderNumber;

export const { changeOrderNumber, removeUser, setOrders, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
