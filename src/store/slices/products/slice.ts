import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const { setLoaded } = productsSlice.actions;
export default productsSlice.reducer;
