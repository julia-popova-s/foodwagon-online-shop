import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FilterSliceState, ProductOrderType, ProductSortingType } from './types';

const initialState: FilterSliceState = {
  category: 0,
  currentPage: 1,
  orderType: ProductOrderType.DESC,
  searchBy: -1,
  sortType: ProductSortingType.RATING,
};

const filtersSlice = createSlice({
  initialState,
  name: 'filters',
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchBy(state, action: PayloadAction<number>) {
      state.searchBy = action.payload;
    },
    setSortBy(
      state,
      action: PayloadAction<{
        orderType: ProductOrderType;
        sortType: ProductSortingType;
      }>,
    ) {
      state.sortType = action.payload.sortType;
      state.orderType = action.payload.orderType;
    },
  },
});

export const { setCategory, setCurrentPage, setSearchBy, setSortBy } = filtersSlice.actions;
export default filtersSlice.reducer;
