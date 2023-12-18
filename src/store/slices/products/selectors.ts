import { RootStore } from '../..';

export const currentPageSelector = (state: RootStore) => state.filters.currentPage;
export const productListSelector = (state: RootStore) => state.products.list;
export const errorSelector = (state: RootStore) => state.products.error;
export const isLoadedSelector = (state: RootStore) => state.products.isLoaded;
export const statusSelector = (state: RootStore) => state.products.status;
