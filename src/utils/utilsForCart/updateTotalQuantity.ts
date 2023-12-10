import { CartSliceState } from '../../store/reducers/cart';
import { getSumOfValues } from './getSumOfValues';

export const updateTotalQuantity = (state: CartSliceState) => {
  state.totalQuantity = getSumOfValues(Object.values(state.cart), 'totalCount');
};
