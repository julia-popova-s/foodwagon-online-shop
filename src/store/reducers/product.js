import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../utils/fetchProductsData'

export const fetchProduct = createAsyncThunk('product/fetchProduct', fetchProductsData)

const productSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload
        state.status = 'resolve'
        state.isLoaded = true
      })
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.product = []
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
        state.product = []
      })
  },
  initialState: {
    error: null,
    isLoaded: false,
    product: [],
    status: null,
  },

  name: 'product',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const { setLoaded } = productSlice.actions
export default productSlice.reducer
