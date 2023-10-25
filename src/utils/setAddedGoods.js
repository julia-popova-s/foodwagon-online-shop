import { getSumOfValues } from './getSumOfValues'

export const setAddedGoods = (state) => {
  state.addedGoods = Object.entries(state.cart)
  const currentList = Object.values(state.cart).reduce((acc, val) => {
    return { ...acc, ...val }
  }, {})
  state.totalQuantity = getSumOfValues(Object.values(currentList), 'totalCount')
}
