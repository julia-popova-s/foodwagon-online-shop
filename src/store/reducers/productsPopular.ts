import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { MyAsyncThunkConfig, Product, Status, getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';
import { FiltersForProducts } from '../../utils/utilsForStore/getFilterForProducts';
import { ProductSliceState } from './product';

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

export const productListSelector = (state: RootStore) => state.productsPopular.list;
export const errorSelector = (state: RootStore) => state.productsPopular.error;
export const isLoadedSelector = (state: RootStore) => state.productsPopular.isLoaded;
export const statusSelector = (state: RootStore) => state.productsPopular.status;

export const { setLoaded } = productsPopularSlice.actions;
export default productsPopularSlice.reducer;
