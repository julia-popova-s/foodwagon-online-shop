import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';

export enum CafeSortingType {
  NAME = 'name',
  POPULAR = 'popular',
  RATING = 'rating',
  TIME = 'time',
}

export enum CafeOrderType {
  ASC = 'asc',
  DESC = 'desc',
}

interface SortingTypeSliceState {
  category: number;
  orderType: CafeOrderType;
  sortType: CafeSortingType;
}
const initialState: SortingTypeSliceState = {
  category: 0,
  orderType: CafeOrderType.DESC,
  sortType: CafeSortingType.RATING,
};

const sortingTypeSlice = createSlice({
  initialState,
  name: 'sortingType',
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSortType(state, action: PayloadAction<{ orderType: CafeOrderType; sortType: CafeSortingType }>) {
      state.sortType = action.payload.sortType;
      state.orderType = action.payload.orderType;
    },
  },
});

export const orderTypeSelector = (state: RootStore) => state.sortingType.orderType;
export const sortTypeSelector = (state: RootStore) => state.sortingType.sortType;
export const categorySelector = (state: RootStore) => state.sortingType.category;

export const { setCategory, setSortType } = sortingTypeSlice.actions;
export default sortingTypeSlice.reducer;
