import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';

export const fetchProductsWithDiscount = createAsyncThunk('products/productsWithDiscount', fetchProductsData);

const productsWithDiscountSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsWithDiscount),

  initialState: {
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },

  name: 'productsWithDiscount',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});
export const productListSelector = (state: RootStore) => state.productsWithDiscount.list;
export const errorSelector = (state: RootStore) => state.productsWithDiscount.error;
export const isLoadedSelector = (state: RootStore) => state.productsWithDiscount.isLoaded;
export const statusSelector = (state: RootStore) => state.productsWithDiscount.status;

export const { setLoaded } = productsWithDiscountSlice.actions;
export default productsWithDiscountSlice.reducer;
