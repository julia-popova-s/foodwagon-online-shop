import { RootStore } from '../..';

export const productListSelector = (state: RootStore) => state.productsWithDiscount.list;
export const errorSelector = (state: RootStore) => state.productsWithDiscount.error;
export const isLoadedSelector = (state: RootStore) => state.productsWithDiscount.isLoaded;
export const statusSelector = (state: RootStore) => state.productsWithDiscount.status;
