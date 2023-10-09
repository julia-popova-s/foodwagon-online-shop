import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async function (
    { category, filter, limit, order, page, restaurantId, sortType },
    { dispatch, rejectWithValue }
  ) {
    dispatch(setLoaded(false))

    const sortRequest = sortType ? `&sortBy=${sortType}&order=${order}` : ''

    const categoryRequest = category && category !== 'All' ? `&category=${category}` : ''

    const idRequest = restaurantId ? `&restaurantId=${restaurantId}` : ''

    const limitRequest = limit ? `&limit=${limit}` : ''
    const currentPage = page ? `&page=${page}` : `&page=1`
    try {
      const response = await fetch(
        `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/products?${
          filter ? filter : ''
        }${idRequest}${categoryRequest}${sortRequest}${currentPage}${limitRequest}
        `
      )
      if (!response.ok) {
        throw new Error(`ServerError: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const productsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.status = 'resolve'
        state.isLoaded = true
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'rejected'
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
    filterById(state, action) {
      state.currentList = state.products.find((rest) => rest.id === action.payload.id)
    },
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})

export const { filterById, setLoaded } = productsSlice.actions
export default productsSlice.reducer
