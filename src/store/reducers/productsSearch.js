import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../utils/fetchProductsData'

export const fetchProductsSearch = createAsyncThunk(
  'products/fetchProductsSearch',
  fetchProductsData
)

const productsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsSearch.fulfilled, (state, action) => {
        state.status = 'resolve'
        state.isLoaded = true
        state.products = action.payload
        state.error = null
      })
      .addCase(fetchProductsSearch.pending, (state) => {
        state.status = 'loading'
        state.isLoaded = false
        state.products = []
        state.error = null
      })
      .addCase(fetchProductsSearch.rejected, (state, action) => {
        state.status = 'rejected'
        state.isLoaded = false
        state.products = []
        state.error = action.payload
        console.log(action.payload)
      })
  },
  initialState: {
    currentPage: 1,
    error: null,
    isLoaded: false,
    products: [],
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

export const productListSelector = (state) => state.productsSearch.products
export const errorSelector = (state) => state.productsSearch.error
export const isLoadedSelector = (state) => state.productsSearch.isLoaded
export const statusSelector = (state) => state.productsSearch.status
export const currentPageSelector = (state) => state.productsSearch.currentPage

export const { setCurrentPage, setLoaded } = productsSlice.actions
export default productsSlice.reducer
