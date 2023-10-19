import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../utils/fetchProductsData'

export const fetchProductsFastAccess = createAsyncThunk(
  'products/fetchProductsFastAccess',
  fetchProductsData
)

const productsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsFastAccess.fulfilled, (state, action) => {
        state.status = 'resolve'
        state.products = action.payload
        state.isLoaded = true
        state.error = null
      })
      .addCase(fetchProductsFastAccess.pending, (state) => {
        state.status = 'loading'
        state.products = []
        state.isLoaded = false
        state.error = null
      })
      .addCase(fetchProductsFastAccess.rejected, (state, action) => {
        state.status = 'rejected'
        state.products = []
        state.isLoaded = false
        state.error = action.payload
      })
  },
  initialState: {
    error: null,
    isLoaded: false,
    products: [],
    status: null,
  },
  name: 'productsFastAccess',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const productListSelector = (state) => state.productsFastAccess.products
export const errorSelector = (state) => state.productsFastAccess.error
export const isLoadedSelector = (state) => state.productsFastAccess.isLoaded
export const statusSelector = (state) => state.productsFastAccess.status

export const { setLoaded } = productsSlice.actions
export default productsSlice.reducer
