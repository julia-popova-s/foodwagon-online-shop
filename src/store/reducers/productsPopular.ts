import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';

export const fetchProductsPopular = createAsyncThunk(
  'products/fetchProductsPopular',
  fetchProductsData,
);

const productsPopularSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsPopular),

  initialState: {
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },

  name: 'productsPopular',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const productListSelector = (state) => state.productsPopular.list;
export const errorSelector = (state) => state.productsPopular.error;
export const isLoadedSelector = (state) => state.productsPopular.isLoaded;
export const statusSelector = (state) => state.productsPopular.status;

export const { setLoaded } = productsPopularSlice.actions;
export default productsPopularSlice.reducer;
