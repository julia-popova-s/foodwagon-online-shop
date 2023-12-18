import { RootStore } from '../..';

export const addedGoodsSelector = (state: RootStore) => state.cart.addedGoods;
export const cartSelector = (state: RootStore) => state.cart.cart;
export const totalQuantitySelector = (state: RootStore) => state.cart.totalQuantity;
