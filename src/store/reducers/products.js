import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProductsData } from '../../utils/fetchProductsData'
import { getExtraReducers } from '../../utils/getExtraReducers'
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async function (
//     { category, filter, limit, order, page, restaurantId, sortType },
//     { dispatch, rejectWithValue }
//   ) {
//     dispatch(setLoaded(false))

//     const sortRequest = sortType ? `&sortBy=${sortType}&order=${order}` : ''

//     const categoryRequest = category && category !== 'All' ? `&category=${category}` : ''

//     const idRequest = restaurantId ? `&restaurantId=${restaurantId}` : ''

//     const limitRequest = limit ? `&limit=${limit}` : ''
//     const currentPage = page ? `&page=${page}` : `&page=1`
//     try {
//       const response = await fetch(
//         `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/products?${
//           filter ? filter : ''
//         }${idRequest}${categoryRequest}${sortRequest}${currentPage}${limitRequest}
//         `
//       )

//       if (!response.ok) {
//         // throw new Error(`ServerError: ${response.status} ${response.statusText}`)
//         return rejectWithValue(response.status)
//       }
//       return await response.json()
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   }
// )
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
