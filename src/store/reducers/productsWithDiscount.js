import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProductsData } from '../../utils/fetchProductsData'

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
  fetchProductsData
)

const productsWithDiscountSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsWithDiscount.fulfilled, (state, action) => {
        state.products = action.payload
        state.status = 'resolve'
        state.isLoaded = !!state.products?.length
      })
      .addCase(fetchProductsWithDiscount.pending, (state) => {
        state.status = 'loading'
        state.isLoaded = false
        state.error = null
      })
      .addCase(fetchProductsWithDiscount.rejected, (state, action) => {
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

  name: 'productsWithDiscount',

  reducers: {
    filterById(state, action) {
      state.currentList = state.products.find((rest) => rest.id === action.payload.id)
    },
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const { filterById, setLoaded } = productsWithDiscountSlice.actions
export default productsWithDiscountSlice.reducer
