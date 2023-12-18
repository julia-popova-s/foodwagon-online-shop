import { RootStore } from '../..';

export const productListSelector = (state: RootStore) => state.productsPopular.list;
export const errorSelector = (state: RootStore) => state.productsPopular.error;
export const isLoadedSelector = (state: RootStore) => state.productsPopular.isLoaded;
export const statusSelector = (state: RootStore) => state.productsPopular.status;
