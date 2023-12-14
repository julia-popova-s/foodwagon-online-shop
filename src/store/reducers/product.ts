import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import {
  ErrorType,
  MyAsyncThunkConfig,
  Product,
  Status,
  getExtraReducers,
} from '../../utils/utilsForStore/getExtraReducers';
import { FiltersForProducts } from '../../utils/utilsForStore/getFilterForProducts';
import { RootStore } from '../index';

export const fetchProduct = createAsyncThunk<Product[], FiltersForProducts, MyAsyncThunkConfig>(
  'product/fetchProduct',
  fetchProductsData,
);

export interface ProductSliceState {
  error: ErrorType;
  isLoaded: boolean;
  list: Product[];
  status: Status;
}

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