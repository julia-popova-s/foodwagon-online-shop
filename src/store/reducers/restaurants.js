import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchRestaurantsData } from '../../utils/utilsForStore/fetchRestaurantsData'
import { getExtraReducers } from '../../utils/utilsForStore/getExtraReducers'

export const fetchRestaurants = createAsyncThunk('products/fetchRestaurants', fetchRestaurantsData)

const restSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchRestaurants),

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

export const restaurantListSelector = (state) => state.restaurants.list
export const errorSelector = (state) => state.restaurants.error
export const isLoadedSelector = (state) => state.restaurants.isLoaded
export const statusSelector = (state) => state.restaurants.status

export const { setLoaded } = restSlice.actions
export default restSlice.reducer
