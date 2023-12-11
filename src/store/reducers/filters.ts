import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../index';

export type SortType = 'discount' | 'name' | 'popular' | 'price' | 'rating' | 'time' | 'title';
type OrderType = 'asc' | 'desc';

interface FilterSliceState {
  category: number;
  currentPage: number;
  orderType: OrderType;
  searchBy: number;
  sortType: SortType;
}

const initialState: FilterSliceState = {
  category: 0,
  currentPage: 1,
  orderType: 'desc',
  searchBy: -1,
  sortType: 'popular',
};

const filterSlice = createSlice({
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
        orderType: OrderType;
        sortType: SortType;
      }>,
    ) {
      state.sortType = action.payload.sortType;
      state.orderType = action.payload.orderType;
    },
  },
});

export const categorySelector = (state: RootStore) => state.filters.category;
export const currentPageSelector = (state: RootStore) => state.filters.currentPage;
export const searchBySelector = (state: RootStore) => state.filters.searchBy;
export const sortTypeSelector = (state: RootStore) => state.filters.sortType;
export const orderTypeSelector = (state: RootStore) => state.filters.orderType;

export const { setCategory, setCurrentPage, setSearchBy, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;
