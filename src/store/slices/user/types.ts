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

export interface OrderListItem {
  [orderNumber: number]: ProductList;
  date: string;
  deliveryType: DeliveryType;
  location: UserLocation;
  restaurantId: string;
  restaurantName: string;
}
export interface UserSliceState {
  email: null | string;
  id: string;
  isAuth: boolean;
  list: OrderListItem[];
  orderCounter: number;
  token: string;
}
export interface UserLocation {
  address: CafeAddress | string;
  coords?: Coords;
}
export interface OrderItem {
  date: string;
  deliveryType: DeliveryType;
  id: string;
  list: ProductList;
  location: UserLocation;
  name: string;
  orderNumber: number;
}

export interface User {
  email: null | string;
  id: string;
}

export enum AuthAPIErrors {
  EMAIL_ALREADY_EXISTS = 'auth/email-already-exists',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
}
