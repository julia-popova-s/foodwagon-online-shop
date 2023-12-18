import { RootStore } from '../..';

export const orderTypeSelector = (state: RootStore) => state.sortingType.orderType;
export const sortTypeSelector = (state: RootStore) => state.sortingType.sortType;
export const categorySelector = (state: RootStore) => state.sortingType.category;
