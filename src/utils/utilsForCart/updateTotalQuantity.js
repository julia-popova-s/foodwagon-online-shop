import { getSumOfValues } from './getSumOfValues'

export const updateTotalQuantity = (state) => {
  state.totalQuantity = getSumOfValues(Object.values(state.cart), 'totalCount')
}
