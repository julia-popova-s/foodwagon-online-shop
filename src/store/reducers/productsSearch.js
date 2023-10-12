import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../../utils/fetchProductsData'

export const fetchProductsSearch = createAsyncThunk(
  'products/fetchProductsSearch',
  fetchProductsData
)

const productsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsSearch.fulfilled, (state, action) => {
        state.products = action.payload
        state.status = 'resolve'
        state.isLoaded = !!state.products?.length
      })
      .addCase(fetchProductsSearch.pending, (state) => {
        state.status = 'loading'
        state.isLoaded = false
        state.error = null
      })
      .addCase(fetchProductsSearch.rejected, (state, action) => {
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
