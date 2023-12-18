import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/fetchProductsData';
import { MyAsyncThunkConfig, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { FiltersForProducts } from '../../utils/getFilterForProducts';
import { Product } from '../cart/types';
import { ProductSliceState } from '../product/types';

export const fetchProductsWithDiscount = createAsyncThunk<Product[], FiltersForProducts, MyAsyncThunkConfig>(
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

export const { setLoaded } = productsWithDiscountSlice.actions;
export default productsWithDiscountSlice.reducer;
