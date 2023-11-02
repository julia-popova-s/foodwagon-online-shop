import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../../utils/fetchProductsData'
import { getExtraReducers } from '../../utils/getExtraReducers'

// export const fetchProductsWithDiscount = createAsyncThunk(
//   'products/productsWithDiscount',
//   async function ({ filter, restaurantId }, { dispatch, rejectWithValue }) {
//     dispatch(setLoaded(false))

//     const idRequest = restaurantId ? `&restaurantId=${restaurantId}` : ''

//     try {
//       const response = await fetch(
//         `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/products?${idRequest}${
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

export const fetchProductsWithDiscount = createAsyncThunk(
  'products/productsWithDiscount',
  fetchProductsData,
)

const productsWithDiscountSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchProductsWithDiscount),

  initialState: {
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },

  name: 'productsWithDiscount',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})
export const productListSelector = (state) => state.productsWithDiscount.list
export const errorSelector = (state) => state.productsWithDiscount.error
export const isLoadedSelector = (state) => state.productsWithDiscount.isLoaded
export const statusSelector = (state) => state.productsWithDiscount.status

export const { setLoaded } = productsWithDiscountSlice.actions
export default productsWithDiscountSlice.reducer
