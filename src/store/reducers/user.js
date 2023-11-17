import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  id: null,
  isAuth: false,
  list: [],
  token: null,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isAuth = false;
    },
    setOrders(state, action) {
      state.list.push({
        [action.payload.orderNumber]: action.payload.list,
        name: action.payload.name,
      });
    },
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isAuth = true;
    },
  },
});

export const emailSelector = state => state.user.email;
export const tokenSelector = state => state.user.token;
export const idSelector = state => state.user.id;
export const isAuthSelector = state => state.user.isAuth;

export const { removeUser, setOrders, setUser } = userSlice.actions;
export default userSlice.reducer;
