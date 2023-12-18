import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchProductsData } from '../../utils/fetchProductsData';
import { MyAsyncThunkConfig, Product, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { FiltersForProducts } from '../../utils/getFilterForProducts';
import { ProductSearchState } from './types';

export const fetchProductsSearch = createAsyncThunk<Product[], FiltersForProducts, MyAsyncThunkConfig>(
  'products/fetchProductsSearch',
  fetchProductsData,
);

const initialState: ProductSearchState = {
  currentPage: 1,
  error: null,
  isLoaded: false,
  list: [],
  searchValue: '',
  status: Status.LOADING,
};

const productsSearchSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsSearch),

  initialState,
  name: 'productsSearch',

  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload.replace(' ', '&');
    },
  },
});

export const { setCurrentPage, setLoaded } = productsSearchSlice.actions;
export default productsSearchSlice.reducer;
