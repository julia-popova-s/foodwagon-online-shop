import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { Product, Status, getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';
import { FiltersForProducts } from '../../utils/utilsForStore/getFilterForProducts';
import { ProductSliceState } from './product';

export const fetchProductsWithDiscount = createAsyncThunk<Product[], FiltersForProducts>(
  'products/productsWithDiscount',
  fetchProductsData,
);

const initialState: ProductSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  status: Status.LOADING,
};

const productsWithDiscountSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsWithDiscount),

  initialState,

  name: 'productsWithDiscount',

  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
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
