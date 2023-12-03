export const updateAddedGoods = (state) => {
  state.addedGoods = Object.entries(state.cart);
};
