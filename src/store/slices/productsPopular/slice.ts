import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/fetchProductsData';
import { MyAsyncThunkConfig, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { FiltersForProducts } from '../../utils/getFilterForProducts';
import { Product } from '../cart/types';
import { ProductSliceState } from '../product/types';

export const fetchProductsPopular = createAsyncThunk<Product[], FiltersForProducts, MyAsyncThunkConfig>(
  'products/fetchProductsPopular',
  fetchProductsData,
);

const initialState: ProductSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  status: Status.LOADING,
};

const productsPopularSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsPopular),

  initialState,

  name: 'productsPopular',

  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },
  },
});

export const { setLoaded } = productsPopularSlice.actions;
export default productsPopularSlice.reducer;
