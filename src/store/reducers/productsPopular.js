import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../utils/fetchProductsData'

// export const fetchProductsPopular = createAsyncThunk(
//   'products/fetchProductsPopular',
//   async function ({ filter, limit }, { dispatch, rejectWithValue }) {
//     dispatch(setLoaded(false))

//     const limitRequest = limit ? `&page=2&limit=${limit}` : ''

//     try {
//       const response = await fetch(
//         `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/products?${limitRequest}${
//           filter ? filter : ''
//         }`
//       )
//       if (!response.ok) {
//         throw new Error(`ServerError: ${response.status} ${response.statusText}`)
//       }
//       return await response.json()
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   }
// )

export const fetchProductsPopular = createAsyncThunk(
  'products/fetchProductsPopular',
  fetchProductsData
)

const productsPopularSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsPopular.fulfilled, (state, action) => {
        state.products = action.payload
        state.status = 'resolve'
        state.isLoaded = !!state.products?.length
      })
      .addCase(fetchProductsPopular.pending, (state) => {
        state.status = 'loading'
        state.isLoaded = false
        state.products = []
        state.error = null
      })
      .addCase(fetchProductsPopular.rejected, (state, action) => {
        state.status = 'rejected'
        state.isLoaded = false
        state.products = []
        state.error = action.payload
      })
  },
  initialState: {
    error: null,
    isLoaded: false,
    products: [],
    status: null,
  },

  name: 'productsPopular',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const productListSelector = (state) => state.productsPopular.products
export const errorSelector = (state) => state.productsPopular.error
export const isLoadedSelector = (state) => state.productsPopular.isLoaded
export const statusSelector = (state) => state.productsPopular.status

export const { setLoaded } = productsPopularSlice.actions
export default productsPopularSlice.reducer
