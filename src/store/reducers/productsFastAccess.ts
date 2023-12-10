import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';

export const fetchProductsFastAccess = createAsyncThunk('products/fetchProductsFastAccess', fetchProductsData);

const productsSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsFastAccess),

  initialState: {
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },
  name: 'productsFastAccess',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const productListSelector = (state: RootStore) => state.productsFastAccess.list;
export const errorSelector = (state: RootStore) => state.productsFastAccess.error;
export const isLoadedSelector = (state: RootStore) => state.productsFastAccess.isLoaded;
export const statusSelector = (state: RootStore) => state.productsFastAccess.status;

export const { setLoaded } = productsSlice.actions;
export default productsSlice.reducer;
