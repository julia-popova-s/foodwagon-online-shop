import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { MyAsyncThunkConfig, Product, Status, getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';
import { FiltersForProducts } from '../../utils/utilsForStore/getFilterForProducts';
import { ProductSliceState } from './product';

export const fetchProductsFastAccess = createAsyncThunk<Product[], FiltersForProducts, MyAsyncThunkConfig>(
  'products/fetchProductsFastAccess',
  fetchProductsData,
);

const initialState: ProductSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  status: Status.LOADING,
};

const productsSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsFastAccess),

  initialState,
  name: 'productsFastAccess',

  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
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
