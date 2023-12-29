import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { RestaurantOrderType, RestaurantSortingType, SortingTypeSliceState } from './types';

const initialState: SortingTypeSliceState = {
  category: 0,
  orderType: RestaurantOrderType.DESC,
  sortType: RestaurantSortingType.RATING,
};

const sortingTypeSlice = createSlice({
  initialState,
  name: 'sortingType',
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSortType(state, action: PayloadAction<{ orderType: RestaurantOrderType; sortType: RestaurantSortingType }>) {
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
