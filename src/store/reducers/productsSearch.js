import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../../utils/fetchProductsData'
import { getExtraReducers } from '../../utils/getExtraReducers'

export const fetchProductsSearch = createAsyncThunk(
  'products/fetchProductsSearch',
  fetchProductsData,
)

const productsSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsSearch),

  initialState: {
    currentPage: 1,
    error: null,
    isLoaded: false,
    list: [],
    searchValue: '',
    status: null,
  },
  name: 'productsSearch',

  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload.replace(' ', '&')
    },
  },
})

export const productListSelector = (state) => state.productsSearch.list
export const errorSelector = (state) => state.productsSearch.error
export const isLoadedSelector = (state) => state.productsSearch.isLoaded
export const statusSelector = (state) => state.productsSearch.status
export const currentPageSelector = (state) => state.productsSearch.currentPage

export const { setCurrentPage, setLoaded } = productsSlice.actions
export default productsSlice.reducer
