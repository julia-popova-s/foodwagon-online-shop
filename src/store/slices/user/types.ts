import { CafeAddress } from '../../utils/getExtraReducers';
import { Coords, DeliveryType } from '../location/types';

export interface CartProduct {
  amount: number;
  discount: number;
  id: string;
  image: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
}

export interface ListItem {
  [id: string]: CartProduct;
}

export interface ProductList {
  items: ListItem;
  totalAmount: number;
  totalCount: number;
}
// export interface OrderItem {
//   date: string;
//   deliveryType: DeliveryType;
//   id: string;
//   list: ProductList;
//   location: UserLocation;
//   name: string;
// }
export interface Order extends OrderListItem {
  orderNumber: number;
}
export interface OrderListItem {
  date: string;
  deliveryType: DeliveryType;
  list: ProductList;
  location: UserLocation;
  restaurantId: string;
  restaurantName: string;
}
export interface UserSliceState {
  email: null | string;
  id: string;
  isAuth: boolean;
  list: OrderListItem[];
  token: string;
}
export interface UserLocation {
  address: CafeAddress | string;
  coords?: Coords;
}

export interface User {
  email: null | string;
  id: string;
}

export enum AuthAPIErrors {
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
}
