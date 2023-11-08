export const getSumOfValues = (items, prop) =>
  items.reduce((sum, obj) => sum + obj[prop], 0)
