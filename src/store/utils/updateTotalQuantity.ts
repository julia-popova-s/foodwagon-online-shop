import { CartSliceState } from '../slices/cart/types';

export const updateTotalQuantity = (state: CartSliceState) => {
  state.totalQuantity = Object.values(state.cart).reduce((sum, obj) => sum + obj['totalCount'], 0);
};
