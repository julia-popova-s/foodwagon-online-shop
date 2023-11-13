import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../../utils/utilsForStore/fetchProductsData'
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers'

export const fetchProducts = createAsyncThunk('products/fetchProducts', fetchProductsData)

const productsSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProducts),

  initialState: {
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },
  name: 'products',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const productListSelector = (state) => state.products.list
export const errorSelector = (state) => state.products.error
export const isLoadedSelector = (state) => state.products.isLoaded
export const statusSelector = (state) => state.products.status

export const { setLoaded } = productsSlice.actions
export default productsSlice.reducer
