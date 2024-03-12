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

export interface PayloadActionProps {
  id: string;
  list: ProductList;
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
