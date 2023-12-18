import { RootStore } from '../..';

export const productListSelector = (state: RootStore) => state.productsFlashDeals.list;
export const errorSelector = (state: RootStore) => state.productsFlashDeals.error;
export const isLoadedSelector = (state: RootStore) => state.productsFlashDeals.isLoaded;
export const statusSelector = (state: RootStore) => state.productsFlashDeals.status;
