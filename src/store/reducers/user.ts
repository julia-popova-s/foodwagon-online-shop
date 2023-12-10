import { createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';

interface CartProduct {
  amount: number;
  discount: number;
  id: string;
  image: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
}

interface ListItem {
  [id: string]: CartProduct;
}
interface ProductList {
  items: ListItem;
  totalAmount: number;
  totalCount: number;
}

interface OrderListItem {
  [orderNumber: string]: ProductList;
}
interface UserSliceState {
  email: null | string;
  id: null | string;
  isAuth: boolean;
  list: OrderListItem[];
  token: null | string;
}
const initialState: UserSliceState = {
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
      state.list = [];
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

export const emailSelector = (state: RootStore) => state.user.email;
export const tokenSelector = (state: RootStore) => state.user.token;
export const idSelector = (state: RootStore) => state.user.id;
export const isAuthSelector = (state: RootStore) => state.user.isAuth;

export const { removeUser, setOrders, setUser } = userSlice.actions;
export default userSlice.reducer;
