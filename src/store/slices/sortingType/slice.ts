import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

export const { setCategory, setSortType } = sortingTypeSlice.actions;
export default sortingTypeSlice.reducer;
