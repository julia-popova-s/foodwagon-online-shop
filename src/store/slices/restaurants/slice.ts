import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '../..';
import { getBalloon } from '../../../utils/getBalloon';
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
  location: {
    address: 'Saint Petersburg, Shpalernaya Street, 26',
    coords: [59.94971367493227, 30.35151817345885],
  },
  placemarks: [],
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
    setLocation(state, action) {
      state.location = action.payload;
    },
    setPlacemarks(state) {
      state.placemarks = state.list.map((item) => {
        const {
          address: { city, latitude, longitude, street_addr },
          backgroundId,
          id,
          logo_photos,
          name,
          phone_number,
        } = item;

        return {
          geometry: {
            coordinates: [latitude, longitude],
            type: 'Point',
          },
          id,
          properties: {
            balloonContent: getBalloon(
              id,
              name,
              logo_photos,
              phone_number,
              street_addr,
              latitude,
              longitude,
              backgroundId,
              city,
            ),
          },
          type: 'Feature',
        };
      });
    },
  },
});

export const restaurantListSelector = (state: RootStore) => state.restaurants.list;
export const errorSelector = (state: RootStore) => state.restaurants.error;
export const isLoadedSelector = (state: RootStore) => state.restaurants.isLoaded;
export const statusSelector = (state: RootStore) => state.restaurants.status;
export const placemarkSelector = (state: RootStore) => state.restaurants.placemarks;
export const addressSelector = (state: RootStore) => state.restaurants.location.address;
export const coordsSelector = (state: RootStore) => state.restaurants.location.coords;

export const { setLoaded, setLocation, setPlacemarks } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
