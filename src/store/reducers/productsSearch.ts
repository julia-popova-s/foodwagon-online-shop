import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData';
import { Product, getExtraReducers } from '../../utils/utilsForStore/getExtraReducers';
import { FiltersForProducts } from '../../utils/utilsForStore/getFilterForProducts';
import { ProductSliceState, Status } from './product';

export const fetchProductsSearch = createAsyncThunk<Product[], FiltersForProducts>(
  'products/fetchProductsSearch',
  fetchProductsData,
);
interface ProductSearchState extends ProductSliceState {
  currentPage: number;
  searchValue: string;
}

const initialState: ProductSearchState = {
  currentPage: 1,
  error: null,
  isLoaded: false,
  list: [],
  searchValue: '',
  status: Status.LOADING,
};
const productsSlice = createSlice({
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

export const productListSelector = (state: RootStore) => state.productsSearch.list;
export const errorSelector = (state: RootStore) => state.productsSearch.error;
export const isLoadedSelector = (state: RootStore) => state.productsSearch.isLoaded;
export const statusSelector = (state: RootStore) => state.productsSearch.status;
export const currentPageSelector = (state: RootStore) => state.productsSearch.currentPage;

export const { setCurrentPage, setLoaded } = productsSlice.actions;
export default productsSlice.reducer;
