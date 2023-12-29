import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { fetchProductsData } from '../../utils/fetchProductsData';
import { MyAsyncThunkConfig, Product, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { FiltersForProducts } from '../../utils/getFilterForProducts';
import { ProductsSliceState } from './types';

const initialState: ProductsSliceState = {
  currentPage: 1,
  error: null,
  isLoaded: false,
  list: [],
  status: Status.LOADING,
};

export const fetchProducts = createAsyncThunk<Product[], FiltersForProducts, MyAsyncThunkConfig>(
  'products/fetchProducts',
  fetchProductsData,
);

const productsSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProducts),

  initialState,
  name: 'products',

  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
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
