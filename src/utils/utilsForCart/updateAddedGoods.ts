import { CartSliceState } from '../../store/reducers/cart';

export const updateAddedGoods = (state: CartSliceState) => {
  state.addedGoods = Object.entries(state.cart);
};
