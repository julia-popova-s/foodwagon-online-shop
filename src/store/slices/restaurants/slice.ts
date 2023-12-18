import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchRestaurantsData } from '../../utils/fetchRestaurantsData';
import { MyAsyncThunkConfig, Restaurant, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { FiltersForRestaurants } from '../../utils/getFilterForRestaurants';
import { RestaurantSliceState } from './types';

export const fetchRestaurants = createAsyncThunk<Restaurant[], FiltersForRestaurants, MyAsyncThunkConfig>(
  'products/fetchRestaurants',
  fetchRestaurantsData,
);

const initialState: RestaurantSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  status: Status.LOADING,
};

const restaurantsSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchRestaurants),

  initialState,
  name: 'restaurants',

  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },
  },
});

export const { setLoaded } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
