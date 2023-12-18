import { RootStore } from '../..';

export const productListSelector = (state: RootStore) => state.productsSearch.list;
export const errorSelector = (state: RootStore) => state.productsSearch.error;
export const isLoadedSelector = (state: RootStore) => state.productsSearch.isLoaded;
export const statusSelector = (state: RootStore) => state.productsSearch.status;
export const currentPageSelector = (state: RootStore) => state.productsSearch.currentPage;
