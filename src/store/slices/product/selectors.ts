import { RootStore } from '../..';

export const productSelector = (state: RootStore) => state.product.list;
export const errorSelector = (state: RootStore) => state.product.error;
export const isLoadedSelector = (state: RootStore) => state.product.isLoaded;
export const statusSelector = (state: RootStore) => state.product.status;
