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
        state.products = action.payload
        state.status = 'resolve'
        state.isLoaded = !!state.products?.length
      })
      .addCase(fetchProductsFastAccess.pending, (state) => {
        state.status = 'loading'
        state.isLoaded = false
        state.error = null
      })
      .addCase(fetchProductsFastAccess.rejected, (state, action) => {
        state.status = 'rejected'
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
  name: 'products',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const { setLoaded } = productsSlice.actions
export default productsSlice.reducer
