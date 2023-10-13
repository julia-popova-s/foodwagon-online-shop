import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProductsData } from '../utils/fetchProductsData'

// export const fetchProduct = createAsyncThunk(
//   'products/fetchProduct',
//   async function (
//     { category, filter, limit, order, restaurantId, sortType },
//     { dispatch, rejectWithValue }
//   ) {
//     dispatch(setLoaded(false))

//     try {
//       const response = await fetch(
//         `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/products?${filter ? filter : ''}
//         `
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

export const fetchProduct = createAsyncThunk('products/fetchProduct', fetchProductsData)

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
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
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
    filterById(state, action) {
      state.currentList = state.products.find((rest) => rest.id === action.payload.id)
    },
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const { filterById, setLoaded } = productSlice.actions
export default productSlice.reducer
