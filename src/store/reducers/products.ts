import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';
import { RootStore } from '../index';

export const fetchProducts = createAsyncThunk('products/fetchProducts', fetchProductsData);

const productsSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProducts),

  initialState: {
    currentPage: 1,
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },
  name: 'products',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const currentPageSelector = (state: RootStore) => state.filters.currentPage;
export const productListSelector = (state: RootStore) => state.products.list;
export const errorSelector = (state: RootStore) => state.products.error;
export const isLoadedSelector = (state: RootStore) => state.products.isLoaded;
export const statusSelector = (state: RootStore) => state.products.status;

export const { setLoaded } = productsSlice.actions;
export default productsSlice.reducer;
