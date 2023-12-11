import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  [orderNumber: number]: ProductList;
  restaurantId: string;
  restaurantName: string;
}
interface UserSliceState {
  email: null | string;
  id: string;
  isAuth: boolean;
  list: OrderListItem[];
}
const initialState: UserSliceState = {
  email: null,
  id: '',
  isAuth: false,
  list: [],
};
type User = {
  email: null | string;
  id: string;
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
    setOrders(state, action: PayloadAction<{ id: string; list: ProductList; name: string; orderNumber: number }>) {
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

export const emailSelector = (state: RootStore) => state.user.email;
export const idSelector = (state: RootStore) => state.user.id;
export const isAuthSelector = (state: RootStore) => state.user.isAuth;

export const { removeUser, setOrders, setUser } = userSlice.actions;
export default userSlice.reducer;
