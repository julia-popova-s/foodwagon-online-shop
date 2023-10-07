import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchRestaurants = createAsyncThunk(
  'products/fetchRestaurants',
  async function ({ category, limit, restaurantId, sortType }, { dispatch, rejectWithValue }) {
    dispatch(setLoaded(false))
    const idRequest = restaurantId ? `&id=${restaurantId}` : ''
    const sortRequest =
      sortType && sortType === 'rating'
        ? '&sortBy=weighted_rating_value&order=desc'
        : sortType === 'popular'
        ? '&sortBy=aggregated_rating_count&order=desc'
        : sortType === 'name'
        ? '&sortBy=name&order=asc'
        : sortType === 'time'
        ? '&sortBy=deliveryTime&order=asc'
        : ''

    const categoryRequest = category && category !== 'All' ? `&cuisines=${category}` : ''

    try {
      const response = await fetch(
        `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/restaurants?${categoryRequest}${
          limit ? `&page=1&limit=${limit}` : ''
        }${sortRequest}${idRequest}`
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

const restSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.list = action.payload
        state.status = 'resolve'
        state.isLoaded = true
      })
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  },
  initialState: {
    error: null,
    isLoaded: false,
    list: [],
    status: null,
  },
  name: 'restaurants',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload
    },
  },
})
export const { setLoaded } = restSlice.actions
export default restSlice.reducer
