import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { fetchProductsData } from '../../utils/fetchProductsData';
import { MyAsyncThunkConfig, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { FiltersForProducts } from '../../utils/getFilterForProducts';
import { Product } from '../cart/types';
import { ProductSliceState } from '../product/types';

export const fetchProductsFlashDeals = createAsyncThunk<Product[], FiltersForProducts, MyAsyncThunkConfig>(
  'products/fetchProductsFlashDeals',
  fetchProductsData,
);

const initialState: ProductSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  status: Status.LOADING,
};

const productsFlashDealsSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsFlashDeals),

  initialState,

  name: 'productsFlashDeals',

  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },
  },
});

export const productListSelector = (state: RootStore) => state.productsFlashDeals.list;
export const errorSelector = (state: RootStore) => state.productsFlashDeals.error;
export const isLoadedSelector = (state: RootStore) => state.productsFlashDeals.isLoaded;
export const statusSelector = (state: RootStore) => state.productsFlashDeals.status;

export const { setLoaded } = productsFlashDealsSlice.actions;
export default productsFlashDealsSlice.reducer;
