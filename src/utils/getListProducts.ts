export const getListProducts = (ingredients: string[]) => {
  return ingredients.map((item) => item.toLowerCase()).join(', ');
};
