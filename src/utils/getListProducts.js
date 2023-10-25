export const getListProducts = (ingredients) => {
  return ingredients.map((item) => item.food.toLowerCase()).join(', ')
}
