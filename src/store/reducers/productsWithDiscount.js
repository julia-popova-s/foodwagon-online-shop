import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';

export const fetchProductsWithDiscount = createAsyncThunk(
  'products/productsWithDiscount',
  fetchProductsData,
);

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
export const productListSelector = (state) => state.productsWithDiscount.list;
export const errorSelector = (state) => state.productsWithDiscount.error;
export const isLoadedSelector = (state) => state.productsWithDiscount.isLoaded;
export const statusSelector = (state) => state.productsWithDiscount.status;

export const { setLoaded } = productsWithDiscountSlice.actions;
export default productsWithDiscountSlice.reducer;
