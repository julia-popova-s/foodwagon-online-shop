import { getSumOfValues } from './getSumOfValues'

export const updateAddedGoods = (state) => {
  state.addedGoods = Object.entries(state.cart)
}

export const updateTotalQuantity = (state) => {
  state.totalQuantity = getSumOfValues(Object.values(state.cart), 'totalCount')
}
