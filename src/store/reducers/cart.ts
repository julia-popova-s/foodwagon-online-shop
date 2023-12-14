import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getSumOfValues } from '../../utils/utilsForCart/getSumOfValues';
import { updateAddedGoods } from '../../utils/utilsForCart/updateAddedGoods';
import { updateTotalQuantity } from '../../utils/utilsForCart/updateTotalQuantity';
import { RootStore } from '../index';

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

const initialState: CartSliceState = {
  addedGoods: [],
  cart: {},
  totalQuantity: 0,
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addProduct(state, { payload: info }: PayloadAction<Product>) {
      const { discount, id, price, restaurantId } = info;

      if (state.cart[restaurantId]) {
        //найти нужный ресторан в корзине
        if (state.cart[restaurantId].items[id]) {
          //найти нужную ассортиментную позицию, увеличить количество данной позиции
          state.cart[restaurantId].items[id].quantity++;

          //увеличить сумму данной позиции
          state.cart[restaurantId].items[id].amount +=
            state.cart[restaurantId].items[id].price * (1 - state.cart[restaurantId].items[id].discount / 100);
        } else {
          //если нет данной позиции, то поместить в корзину по id ресторана
          state.cart[restaurantId].items[id] = {
            ...info,
            amount: price * (1 - discount / 100),
            quantity: 1,
          };
        }

        //подсчитать сумму всех товаров из ресторана
        state.cart[restaurantId].totalAmount = getSumOfValues(state.cart[restaurantId].items, 'amount');

        //подсчитать количество всех товаров из ресторана
        state.cart[restaurantId].totalCount = getSumOfValues(state.cart[restaurantId].items, 'quantity');
      } else {
        //если ресторана нет в корзине, поместить позицию по id ресторана
        state.cart[restaurantId] = {
          items: {
            [id]: {
              ...info,
              amount: price * (1 - discount / 100),
              quantity: 1,
            },
          },
          totalAmount: price * (1 - discount / 100),
          totalCount: 1,
        };
      }

      //обновить список добавленных товаров
      updateAddedGoods(state);

      //обновить общее количество товаров в корзине
      updateTotalQuantity(state);
    },

    clearCart(state, { payload: { restaurantId } }: PayloadAction<{ restaurantId: string }>) {
      //зафиксировать количество товаров из ресторана
      const currentCount = state.cart[restaurantId].totalCount;

      //удалить ресторан из списка
      delete state.cart[restaurantId];

      //обновить список добавленных товаров
      updateAddedGoods(state);

      //обновить общее количество товаров в корзине
      state.totalQuantity = state.totalQuantity - currentCount;
    },

    deleteOneProduct(state, { payload: { id, restaurantId } }: PayloadAction<ProductInfoIds>) {
      //зафиксировать цену удаляемого товара
      const currentPrice =
        state.cart[restaurantId].items[id].price * (1 - state.cart[restaurantId].items[id].discount / 100);

      //удалить товар, если количество меньше 1
      if (state.cart[restaurantId].items[id].quantity < 2) {
        delete state.cart[restaurantId].items[id];

        //обновить сумму и количество товаров из ресторана
        state.cart[restaurantId].totalCount -= 1;
        state.cart[restaurantId].totalAmount -= currentPrice;

        //удалить ресторан из списка, если удалены все товары из ресторана
        if (!Object.keys(state.cart[restaurantId].items).length) {
          delete state.cart[restaurantId];
        }
      } else {
        //обновить сумму данной позиции
        state.cart[restaurantId].items[id].amount = state.cart[restaurantId].items[id].amount - currentPrice;

        //обновить количество данной позиции
        state.cart[restaurantId].items[id].quantity -= 1;

        //обновить сумму и количество товаров из ресторана
        state.cart[restaurantId].totalCount -= 1;
        state.cart[restaurantId].totalAmount -= currentPrice;
      }

      //обновить общее количество товаров в корзине
      state.totalQuantity -= 1;

      //обновить список добавленных товаров
      updateAddedGoods(state);
    },

    removeProduct(state, { payload: { id, restaurantId } }: PayloadAction<ProductInfoIds>) {
      //зафиксировать количество и сумму удаляемой позиции
      const currentCount = state.cart[restaurantId].items[id].quantity;
      const currentAmount = state.cart[restaurantId].items[id].amount;

      //удалить позицию
      delete state.cart[restaurantId].items[id];

      //обновить сумму и количество товаров из ресторана
      state.cart[restaurantId].totalCount -= currentCount;
      state.cart[restaurantId].totalAmount -= currentAmount;

      //обновить общее количество товаров в корзине
      state.totalQuantity = state.totalQuantity - currentCount;

      //удалить ресторан из списка, если удалены все товары из ресторана
      if (!Object.keys(state.cart[restaurantId].items).length) {
        delete state.cart[restaurantId];
      }
      //обновить список добавленных товаров
      updateAddedGoods(state);
    },

    setProductCount(state, { payload: { id, quantity, restaurantId } }: PayloadAction<ProductInfoQuantity>) {
      //установить новое значение количества для данной позиции
      state.cart[restaurantId].items[id].quantity = quantity;

      //обновить сумму данной позиции
      state.cart[restaurantId].items[id].amount =
        quantity * state.cart[restaurantId].items[id].price * (1 - state.cart[restaurantId].items[id].discount / 100);

      //подсчитать сумму всех товаров из ресторана
      state.cart[restaurantId].totalAmount = getSumOfValues(state.cart[restaurantId].items, 'amount');

      //подсчитать количество всех товаров из ресторана
      state.cart[restaurantId].totalCount = getSumOfValues(state.cart[restaurantId].items, 'quantity');

      //обновить список добавленных товаров
      updateAddedGoods(state);

      //обновить общее количество товаров в корзине
      updateTotalQuantity(state);
    },
  },
});

export const addedGoodsSelector = (state: RootStore) => state.cart.addedGoods;
export const cartSelector = (state: RootStore) => state.cart.cart;
export const totalQuantitySelector = (state: RootStore) => state.cart.totalQuantity;

export const { addProduct, clearCart, deleteOneProduct, removeProduct, setProductCount } = cartSlice.actions;
export default cartSlice.reducer;