import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../../utils/fetchProductsData'
import { getExtraReducers } from '../../utils/getExtraReducers'

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
  fetchProductsData,
)

const productsPopularSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsPopular),

  initialState: {
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },

  name: 'productsPopular',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const productListSelector = (state) => state.productsPopular.list
export const errorSelector = (state) => state.productsPopular.error
export const isLoadedSelector = (state) => state.productsPopular.isLoaded
export const statusSelector = (state) => state.productsPopular.status

export const { setLoaded } = productsPopularSlice.actions
export default productsPopularSlice.reducer
