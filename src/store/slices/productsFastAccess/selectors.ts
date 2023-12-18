import { RootStore } from '../..';

export const productListSelector = (state: RootStore) => state.productsFastAccess.list;
export const errorSelector = (state: RootStore) => state.productsFastAccess.error;
export const isLoadedSelector = (state: RootStore) => state.productsFastAccess.isLoaded;
export const statusSelector = (state: RootStore) => state.productsFastAccess.status;
