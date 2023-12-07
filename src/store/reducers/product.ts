import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';

export const fetchProduct = createAsyncThunk('product/fetchProduct', fetchProductsData);

const productSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProduct),
  initialState: {
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },

  name: 'product',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const productSelector = (state) => state.product.list;
export const errorSelector = (state) => state.product.error;
export const isLoadedSelector = (state) => state.product.isLoaded;
export const statusSelector = (state) => state.product.status;

export const { setLoaded } = productSlice.actions;
export default productSlice.reducer;
