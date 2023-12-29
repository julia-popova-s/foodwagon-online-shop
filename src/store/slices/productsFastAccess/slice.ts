import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { fetchProductsData } from '../../utils/fetchProductsData';
import { MyAsyncThunkConfig, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { FiltersForProducts } from '../../utils/getFilterForProducts';
import { Product } from '../cart/types';
import { ProductSliceState } from '../product/types';

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

const productsFastAccessSlice = createSlice({
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

export const { setLoaded } = productsFastAccessSlice.actions;
export default productsFastAccessSlice.reducer;
