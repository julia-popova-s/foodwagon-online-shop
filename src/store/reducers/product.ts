import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';
import { RootStore } from '../index';

export const fetchProduct = createAsyncThunk('product/fetchProduct', fetchProductsData);

interface ProductSliceState {
  error: null,
  isLoaded: false,
  list: [],
  status: null,
}

const initialState: ProductSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  status: null,
};

const productSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProduct),
  initialState,

  name: 'product',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const productSelector = (state: RootStore) => state.product.list;
export const errorSelector = (state: RootStore) => state.product.error;
export const isLoadedSelector = (state: RootStore) => state.product.isLoaded;
export const statusSelector = (state: RootStore) => state.product.status;

export const { setLoaded } = productSlice.actions;
export default productSlice.reducer;
