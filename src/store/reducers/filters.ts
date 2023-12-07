import { createSlice } from '@reduxjs/toolkit';

import { SortType } from '../../components/elements/SortPopup/SortPopup';
import { RootStore } from '../index';

interface FilterSliceState {
  category: number;
  currentPage: number;
  searchBy: number;
  sortType: SortType;
}

const initialState: FilterSliceState = {
  category: 0,
  currentPage: 1,
  searchBy: -1,
  sortType: 'popular',
};

const filterSlice = createSlice({
  initialState,
  name: 'filters',
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchBy(state, action) {
      state.searchBy = action.payload;
    },
    setSortBy(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const categorySelector = (state: RootStore) => state.filters.category;
export const currentPageSelector = (state: RootStore) => state.filters.currentPage;
export const searchBySelector = (state: RootStore) => state.filters.searchBy;
export const sortTypeSelector = (state: RootStore) => state.filters.sortType;

export const { setCategory, setCurrentPage, setSearchBy, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;
