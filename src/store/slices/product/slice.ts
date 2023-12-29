import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { fetchProductsData } from '../../utils/fetchProductsData';
import { MyAsyncThunkConfig, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { FiltersForProducts } from '../../utils/getFilterForProducts';
import { Product } from '../cart/types';
import { ProductSliceState } from './types';

export const fetchProduct = createAsyncThunk<Product[], FiltersForProducts, MyAsyncThunkConfig>(
  'product/fetchProduct',
  fetchProductsData,
);

const initialState: ProductSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  status: Status.LOADING,
};

const productSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProduct),
  initialState,

  name: 'product',

  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
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
