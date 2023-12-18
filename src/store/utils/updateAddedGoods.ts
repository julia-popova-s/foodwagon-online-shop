import { CartSliceState } from '../slices/cart/types';

export const updateAddedGoods = (state: CartSliceState) => {
  state.addedGoods = Object.entries(state.cart);
};
