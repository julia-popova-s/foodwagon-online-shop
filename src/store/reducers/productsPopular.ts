import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';

export const fetchProductsPopular = createAsyncThunk('products/fetchProductsPopular', fetchProductsData);

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

export const productListSelector = (state: RootStore) => state.productsPopular.list;
export const errorSelector = (state: RootStore) => state.productsPopular.error;
export const isLoadedSelector = (state: RootStore) => state.productsPopular.isLoaded;
export const statusSelector = (state: RootStore) => state.productsPopular.status;

export const { setLoaded } = productsPopularSlice.actions;
export default productsPopularSlice.reducer;
