import { ListItem } from '../../store/reducers/cart';

type Property = 'amount' | 'quantity';

export const getSumOfValues = (items: ListItem, prop: Property) =>
  Object.values(items).reduce((sum, obj) => sum + obj[prop], 0);
