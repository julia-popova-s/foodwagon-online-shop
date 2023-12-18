import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PayloadActionProps, User, UserSliceState } from './types';

const initialState: UserSliceState = {
  email: null,
  id: '',
  isAuth: false,
  list: [],
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
    },
    setOrders(state, action: PayloadAction<PayloadActionProps>) {
      state.list.push({
        [action.payload.orderNumber]: action.payload.list,
        restaurantId: action.payload.id,
        restaurantName: action.payload.name,
      });
    },
    setUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isAuth = true;
    },
  },
});

export const { removeUser, setOrders, setUser } = userSlice.actions;
export default userSlice.reducer;
