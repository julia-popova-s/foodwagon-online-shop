export interface Product {
  discount: number;
  id: string;
  image: string;
  price: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
}

export interface ProductInfoIds {
  id: string;
  restaurantId: string;
}

export interface ProductInfoQuantity extends ProductInfoIds {
  quantity: number;
}

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

export interface CartType {
  [restaurantId: string]: ProductList;
}

type AddedGoodsItem = [string, ProductList];

export interface CartSliceState {
  addedGoods: AddedGoodsItem[];
  cart: CartType;
  totalQuantity: number;
}
